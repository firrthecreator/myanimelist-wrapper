# Best Practices & Advanced Patterns

This guide covers best practices, design patterns, and advanced techniques for using the MyAnimeList Wrapper.

## Table of Contents

1. [Rate Limiting Strategies](#rate-limiting-strategies)
2. [Caching Patterns](#caching-patterns)
3. [Error Handling Best Practices](#error-handling-best-practices)
4. [Concurrent Requests](#concurrent-requests)
5. [Performance Optimization](#performance-optimization)
6. [Testing](#testing)
7. [Common Patterns](#common-patterns)

---

## Rate Limiting Strategies

### Simple Delay Strategy

The simplest approach for small-scale applications:

```typescript
async function fetchWithDelay(
  ids: number[],
  delayMs = 400
): Promise<Anime[]> {
  const results: Anime[] = [];
  
  for (const id of ids) {
    try {
      const response = await jikan.anime.getById(id);
      results.push(response.data);
      
      // Only delay if there are more items
      if (id !== ids[ids.length - 1]) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    } catch (error) {
      console.error(`Failed to fetch anime ${id}:`, error);
    }
  }
  
  return results;
}

// Usage
const animes = await fetchWithDelay([1, 5, 10, 15, 20]);
```

### Queue-Based Strategy

Better for handling large volumes of requests:

```typescript
class RequestQueue {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;
  private readonly delayMs: number;
  
  constructor(delayMs = 400) {
    this.delayMs = delayMs;
  }
  
  async enqueue<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          resolve(await fn());
        } catch (error) {
          reject(error);
        }
      });
      
      if (!this.processing) {
        this.process();
      }
    });
  }
  
  private async process() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    
    while (this.queue.length > 0) {
      const fn = this.queue.shift();
      if (fn) {
        await fn();
        // Delay between requests
        await new Promise(resolve => 
          setTimeout(resolve, this.delayMs)
        );
      }
    }
    
    this.processing = false;
  }
  
  get length(): number {
    return this.queue.length;
  }
}

// Usage
const queue = new RequestQueue(400);

const anime1 = queue.enqueue(() => jikan.anime.getById(1));
const anime2 = queue.enqueue(() => jikan.anime.getById(5));
const anime3 = queue.enqueue(() => jikan.anime.getById(10));

const results = await Promise.all([anime1, anime2, anime3]);
```

### Batch Processing Strategy

Optimal for balanced concurrency:

```typescript
async function batchFetch<T>(
  items: number[],
  fetcher: (id: number) => Promise<T>,
  batchSize = 3,
  delayMs = 1000
): Promise<T[]> {
  const results: T[] = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    
    // Process batch in parallel
    const batchResults = await Promise.allSettled(
      batch.map(item => fetcher(item))
    );
    
    // Handle results
    batchResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        results.push(result.value);
      } else {
        console.error(
          `Failed to fetch item ${batch[index]}:`,
          result.reason
        );
      }
    });
    
    // Delay between batches
    if (i + batchSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  return results;
}

// Usage
const animes = await batchFetch(
  [1, 5, 10, 15, 20, 25, 30],
  id => jikan.anime.getById(id),
  3,    // 3 concurrent requests
  1000  // 1 second between batches
);
```

### Exponential Backoff for Retries

Handle rate limiting gracefully:

```typescript
async function fetchWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelayMs = 1000
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (
        error instanceof JikanError && 
        error.status === 429 && 
        attempt < maxRetries
      ) {
        const delayMs = baseDelayMs * Math.pow(2, attempt);
        console.log(`Rate limited. Retrying in ${delayMs}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      } else {
        throw error;
      }
    }
  }
  
  throw lastError;
}

// Usage
const anime = await fetchWithBackoff(
  () => jikan.anime.getById(5114),
  3,    // max retries
  1000  // base delay
);
```

---

## Caching Patterns

### In-Memory LRU Cache

```typescript
class LRUCache<T> {
  private cache: Map<string, { value: T; expiry: number }> = new Map();
  private readonly maxSize: number;
  private readonly ttlMs: number;
  
  constructor(maxSize = 100, ttlMs = 3600000) {
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
  }
  
  set(key: string, value: T): void {
    // Remove expired items
    this.cleanup();
    
    // Remove oldest item if cache is full
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, {
      value,
      expiry: Date.now() + this.ttlMs
    });
  }
  
  get(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    // Check expiry
    if (item.expiry < Date.now()) {
      this.cache.delete(key);
      return null;
    }
    
    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, item);
    
    return item.value;
  }
  
  private cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (item.expiry < now) {
        this.cache.delete(key);
      }
    }
  }
  
  clear(): void {
    this.cache.clear();
  }
}

// Usage
const cache = new LRUCache<Anime>(100, 3600000); // 100 items, 1 hour TTL

async function getCachedAnime(id: number): Promise<Anime> {
  const cached = cache.get(`anime:${id}`);
  if (cached) return cached;
  
  const response = await jikan.anime.getById(id);
  cache.set(`anime:${id}`, response.data);
  
  return response.data;
}

// Usage
const anime1 = await getCachedAnime(5114); // From API
const anime2 = await getCachedAnime(5114); // From cache
```

### Persistent Cache with localStorage

```typescript
class PersistentCache<T> {
  private readonly prefix: string;
  private readonly ttlMs: number;
  
  constructor(prefix = 'jikan_cache:', ttlMs = 3600000) {
    this.prefix = prefix;
    this.ttlMs = ttlMs;
  }
  
  set(key: string, value: T): void {
    const item = {
      value,
      expiry: Date.now() + this.ttlMs
    };
    
    try {
      localStorage.setItem(
        this.prefix + key,
        JSON.stringify(item)
      );
    } catch (error) {
      console.warn('Failed to cache item:', error);
    }
  }
  
  get(key: string): T | null {
    try {
      const item = localStorage.getItem(this.prefix + key);
      if (!item) return null;
      
      const parsed = JSON.parse(item);
      
      // Check expiry
      if (parsed.expiry < Date.now()) {
        this.remove(key);
        return null;
      }
      
      return parsed.value;
    } catch (error) {
      console.warn('Failed to retrieve cached item:', error);
      return null;
    }
  }
  
  remove(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }
  
  clear(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }
}

// Usage (browser only)
const cache = new PersistentCache<Anime>('myanimelist:anime:', 86400000);

async function getCachedAnime(id: number): Promise<Anime> {
  const cached = cache.get(String(id));
  if (cached) return cached;
  
  const response = await jikan.anime.getById(id);
  cache.set(String(id), response.data);
  
  return response.data;
}
```

---

## Error Handling Best Practices

### Comprehensive Error Handling

```typescript
import { JikanError } from 'myanimelist-wrapper';

async function safeApiCall<T>(
  fn: () => Promise<T>,
  context: string
): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof JikanError) {
      switch (error.status) {
        case 400:
          console.error(`[${context}] Invalid request: ${error.message}`);
          return null;
        
        case 404:
          console.warn(`[${context}] Resource not found: ${error.message}`);
          return null;
        
        case 429:
          console.error(`[${context}] Rate limited. Please retry later.`);
          throw error; // Re-throw for upstream handling
        
        case 500:
        case 502:
        case 503:
          console.error(`[${context}] Server error. Retry later.`);
          throw error; // Re-throw for retry logic
        
        default:
          console.error(`[${context}] API error ${error.status}: ${error.message}`);
          return null;
      }
    } else if (error instanceof TypeError) {
      console.error(`[${context}] Network error: ${error.message}`);
      return null;
    } else {
      console.error(`[${context}] Unexpected error:`, error);
      return null;
    }
  }
}

// Usage
const anime = await safeApiCall(
  () => jikan.anime.getById(5114),
  'Fetch Anime'
);
```

### Error Recovery Pattern

```typescript
async function fetchWithRecovery<T>(
  fn: () => Promise<T>,
  fallback: () => Promise<T> | T,
  context: string
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.warn(`[${context}] Primary fetch failed. Using fallback.`, error);
    
    try {
      return await fallback();
    } catch (fallbackError) {
      console.error(`[${context}] Fallback also failed:`, fallbackError);
      throw error; // Throw original error
    }
  }
}

// Usage
const anime = await fetchWithRecovery(
  () => jikan.anime.getById(5114),
  () => getCachedAnime(5114), // Fallback to cache
  'Fetch Anime'
);
```

---

## Concurrent Requests

### Parallel Fetching with Limits

```typescript
async function parallelFetch<T>(
  tasks: Array<() => Promise<T>>,
  concurrency = 3
): Promise<PromiseSettledResult<T>[]> {
  const results: PromiseSettledResult<T>[] = [];
  const executing: Promise<any>[] = [];
  
  for (const task of tasks) {
    const promise = (async () => {
      try {
        const result = await task();
        results.push({ status: 'fulfilled', value: result });
      } catch (error) {
        results.push({ status: 'rejected', reason: error });
      }
    })();
    
    executing.push(promise);
    
    if (executing.length >= concurrency) {
      await Promise.race(executing);
      // Remove completed promise
      executing.splice(executing.findIndex(p => p === promise), 1);
    }
  }
  
  await Promise.all(executing);
  return results;
}

// Usage
const animeIds = [1, 5, 10, 15, 20, 25, 30];
const results = await parallelFetch(
  animeIds.map(id => () => jikan.anime.getById(id)),
  3 // Max 3 concurrent requests
);

results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    console.log(`${animeIds[index]}: ${result.value.data.title}`);
  } else {
    console.error(`${animeIds[index]}: ${result.reason}`);
  }
});
```

---

## Performance Optimization

### Bulk Search Instead of Individual Fetches

```typescript
// ❌ Inefficient - 100 API calls
async function inefficientFetch(ids: number[]) {
  const animes = await Promise.all(
    ids.map(id => jikan.anime.getById(id))
  );
  return animes;
}

// ✅ Efficient - Use search and filter
async function efficientFetch(query: string) {
  const results = await jikan.anime.search({ q: query });
  return results.data;
}
```

### Lazy Loading and Pagination

```typescript
class AnimeIterator {
  private page = 1;
  private query: string;
  private exhausted = false;
  
  constructor(query: string) {
    this.query = query;
  }
  
  async next(): Promise<Anime | null> {
    if (this.exhausted) return null;
    
    const response = await jikan.anime.search({
      q: this.query,
      page: this.page,
      limit: 1
    });
    
    if (response.data.length === 0) {
      this.exhausted = true;
      return null;
    }
    
    const anime = response.data[0];
    
    if (!response.pagination?.has_next_page) {
      this.exhausted = true;
    } else {
      this.page++;
    }
    
    return anime;
  }
}

// Usage
const iterator = new AnimeIterator('naruto');
let anime = await iterator.next();
while (anime) {
  console.log(anime.title);
  anime = await iterator.next();
}
```

---

## Testing

### Unit Testing with Vitest

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { JikanClient } from 'myanimelist-wrapper';

describe('JikanClient', () => {
  let client: JikanClient;
  
  beforeEach(() => {
    client = new JikanClient();
  });
  
  it('should fetch anime by ID', async () => {
    const response = await client.anime.getById(5114);
    
    expect(response.data).toBeDefined();
    expect(response.data.mal_id).toBe(5114);
    expect(response.data.title).toBeDefined();
  });
  
  it('should handle not found errors', async () => {
    expect(async () => {
      await client.anime.getById(999999999);
    }).rejects.toThrow();
  });
  
  it('should search anime', async () => {
    const response = await client.anime.search({
      q: 'naruto',
      limit: 5
    });
    
    expect(response.data).toBeInstanceOf(Array);
    expect(response.data.length).toBeLessThanOrEqual(5);
  });
});
```

### Mocking for Testing

```typescript
import { vi } from 'vitest';

// Mock the JikanClient
const mockClient = {
  anime: {
    getById: vi.fn().mockResolvedValue({
      data: {
        mal_id: 5114,
        title: 'Fullmetal Alchemist: Brotherhood'
      }
    })
  }
};

// Use in tests
expect(await mockClient.anime.getById(5114)).toEqual({
  data: {
    mal_id: 5114,
    title: 'Fullmetal Alchemist: Brotherhood'
  }
});
```

---

## Common Patterns

### Search and Filter Pattern

```typescript
async function findAnimeByGenre(
  genreId: number,
  minScore = 7
): Promise<Anime[]> {
  let allResults: Anime[] = [];
  let page = 1;
  let hasMore = true;
  
  while (hasMore && allResults.length < 50) {
    const response = await jikan.anime.search({
      genres: [genreId],
      score: minScore,
      page,
      limit: 25
    });
    
    allResults = allResults.concat(response.data);
    hasMore = response.pagination?.has_next_page ?? false;
    page++;
  }
  
  return allResults.slice(0, 50);
}

// Usage
const actionAnimes = await findAnimeByGenre(1, 8);
```

### Caching with Auto-Refresh

```typescript
class CachedAnimeClient {
  private cache: Map<number, { data: Anime; timestamp: number }> = new Map();
  private readonly ttlMs = 3600000; // 1 hour
  
  async getById(id: number, forceRefresh = false): Promise<Anime> {
    const cached = this.cache.get(id);
    
    if (cached && !forceRefresh && Date.now() - cached.timestamp < this.ttlMs) {
      return cached.data;
    }
    
    const response = await jikan.anime.getById(id);
    this.cache.set(id, {
      data: response.data,
      timestamp: Date.now()
    });
    
    return response.data;
  }
  
  clearCache(id?: number): void {
    if (id) {
      this.cache.delete(id);
    } else {
      this.cache.clear();
    }
  }
}

// Usage
const client = new CachedAnimeClient();
const anime1 = await client.getById(5114);      // From API
const anime2 = await client.getById(5114);      // From cache
const anime3 = await client.getById(5114, true); // Refresh from API
```

---

*Last updated: 2026*
