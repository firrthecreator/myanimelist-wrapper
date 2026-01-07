# Troubleshooting Guide

This guide helps you resolve common issues when using the MyAnimeList Wrapper.

## Common Issues

### 1. 429 - Too Many Requests (Rate Limited)

**Problem:** You're getting `429 Too Many Requests` errors.

**Causes:**
- Making requests too quickly without delays
- Making parallel requests without proper concurrency control
- Previous rate limiting has not expired

**Solutions:**

**Option 1: Add Delays Between Requests**
```typescript
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch with proper delays
for (const id of [1, 5, 10]) {
  const anime = await jikan.anime.getById(id);
  console.log(anime.data.title);
  await wait(400); // Wait 400ms between requests
}
```

**Option 2: Use Batch Processing**
```typescript
async function batchFetch(ids: number[]) {
  const batchSize = 3;
  
  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    
    // Fetch 3 at a time
    await Promise.all(batch.map(id => jikan.anime.getById(id)));
    
    // Wait between batches
    await new Promise(r => setTimeout(r, 1000));
  }
}
```

**Option 3: Implement Exponential Backoff**
```typescript
async function fetchWithBackoff(fn: () => Promise<any>, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (error?.status === 429 && attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
        console.log(`Rate limited. Waiting ${delay}ms...`);
        await new Promise(r => setTimeout(r, delay));
      } else {
        throw error;
      }
    }
  }
}
```

---

### 2. 404 - Not Found

**Problem:** Getting `404 Resource not found` errors.

**Causes:**
- Invalid anime/manga ID
- ID doesn't exist in MyAnimeList database
- Typo in endpoint call

**Solutions:**

```typescript
import { JikanError } from 'myanimelist-wrapper';

try {
  const anime = await jikan.anime.getById(999999999);
} catch (error) {
  if (error instanceof JikanError && error.status === 404) {
    console.log('Anime not found. Try searching instead:');
    
    const results = await jikan.anime.search({ q: 'your-anime-name' });
    if (results.data.length > 0) {
      const foundId = results.data[0].mal_id;
      const foundAnime = await jikan.anime.getById(foundId);
      console.log(foundAnime.data);
    }
  }
}
```

**Verify ID before fetching:**
```typescript
// Search for anime ID first
const searchResults = await jikan.anime.search({ q: 'naruto', limit: 1 });
const correctId = searchResults.data[0].mal_id;

// Now fetch with verified ID
const anime = await jikan.anime.getById(correctId);
```

---

### 3. Network Errors / Connection Timeout

**Problem:** `TimeoutError` or general network errors.

**Causes:**
- Slow internet connection
- Jikan API server is down
- Default timeout is too short
- Request is being blocked (CORS, firewall)

**Solutions:**

**Increase Timeout:**
```typescript
const jikan = new JikanClient({
  timeout: 60000, // 60 seconds (default: 30 seconds)
  baseUrl: 'https://api.jikan.moe/v4'
});
```

**Implement Retry Logic:**
```typescript
async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  delayMs = 2000
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      
      console.log(`Attempt ${attempt} failed. Retrying in ${delayMs}ms...`);
      await new Promise(r => setTimeout(r, delayMs));
      delayMs *= 2; // Exponential backoff
    }
  }
  
  throw new Error('All retry attempts failed');
}

// Usage
const anime = await fetchWithRetry(() => jikan.anime.getById(5114));
```

**Check API Status:**
```typescript
// Try a simple endpoint to check if API is working
try {
  const random = await jikan.random.getAnime();
  console.log('API is working');
} catch (error) {
  console.error('API might be down:', error);
}
```

---

### 4. Empty Results / null Data

**Problem:** Getting empty data arrays or null values.

**Causes:**
- Search query returns no results
- Optional fields are undefined
- Pagination beyond available pages

**Solutions:**

**Check Response Before Using:**
```typescript
const results = await jikan.anime.search({ q: 'extremely-obscure-anime-name' });

if (results.data.length === 0) {
  console.log('No results found. Try a different search term.');
} else {
  results.data.forEach(anime => {
    console.log(anime.title);
  });
}
```

**Handle Missing Optional Fields:**
```typescript
const anime = await jikan.anime.getById(5114);

// These might be null or undefined
const episodes = anime.data.episodes ?? 'Unknown';
const aired = anime.data.aired?.from ?? 'Unknown';
const synopsis = anime.data.synopsis ?? 'No synopsis available';

console.log(`Episodes: ${episodes}`);
console.log(`Aired: ${aired}`);
console.log(`Synopsis: ${synopsis}`);
```

**Validate Pagination:**
```typescript
const results = await jikan.anime.search({ q: 'naruto', page: 999 });

if (results.data.length === 0 && !results.pagination.has_next_page) {
  console.log('You\'ve reached the last page');
}
```

---

### 5. Type Errors in TypeScript

**Problem:** TypeScript compilation errors or type mismatches.

**Causes:**
- Missing type imports
- Using wrong endpoint methods
- Incorrect parameter types
- Version mismatch between types and runtime

**Solutions:**

**Import Types Correctly:**
```typescript
// ❌ Wrong
const anime: any = await jikan.anime.getById(5114);

// ✅ Correct
import type { Anime, ApiResponse } from 'myanimelist-wrapper';

const response: ApiResponse<Anime> = await jikan.anime.getById(5114);
const anime: Anime = response.data;
```

**Use Proper Type Annotations:**
```typescript
import type {
  Anime,
  AnimeSearchQuery,
  ApiResponse,
  JikanError
} from 'myanimelist-wrapper';

// Type-safe search
const query: AnimeSearchQuery = {
  q: 'naruto',
  type: 'tv',
  score: 8,
  limit: 10
};

const results: ApiResponse<Anime[]> = await jikan.anime.search(query);
```

**Check Method Signatures:**
```typescript
// Make sure you're using the right method
const anime = await jikan.anime.getById(5114);           // ✅ Correct
const anime = await jikan.anime.get(5114);              // ❌ Wrong - method doesn't exist

const characters = await jikan.anime.getCharacters(5114); // ✅ Correct
const characters = await jikan.anime.characters(5114);   // ❌ Wrong
```

---

### 6. Inconsistent or Missing Data

**Problem:** Some fields are missing, null, or inconsistent across similar objects.

**Causes:**
- MyAnimeList data is incomplete or user-submitted
- Different anime types have different available fields
- Data changes frequently

**Solutions:**

**Provide Sensible Defaults:**
```typescript
interface SafeAnime {
  id: number;
  title: string;
  episodes: number | null;
  score: number;
  type: string;
}

function safeAnimeData(anime: Anime): SafeAnime {
  return {
    id: anime.mal_id,
    title: anime.title ?? 'Unknown',
    episodes: anime.episodes,
    score: anime.score ?? 0,
    type: anime.type ?? 'Unknown'
  };
}

const anime = await jikan.anime.getById(5114);
const safe = safeAnimeData(anime);
console.log(safe);
```

**Handle Optional Fields Gracefully:**
```typescript
const anime = await jikan.anime.getById(5114);

// Use optional chaining and nullish coalescing
const trailer = anime.data.trailer?.url ?? 'No trailer available';
const synopsis = anime.data.synopsis?.substring(0, 200) ?? 'No synopsis';
const episodes = anime.data.episodes ?? 'Ongoing';

console.log(`Title: ${anime.data.title}`);
console.log(`Episodes: ${episodes}`);
console.log(`Trailer: ${trailer}`);
console.log(`Synopsis: ${synopsis}...`);
```

---

### 7. CORS Errors (Browser)

**Problem:** Getting CORS (Cross-Origin Resource Sharing) errors in the browser.

**Causes:**
- Making requests directly from browser to Jikan API
- Jikan API doesn't allow direct browser requests
- Security policy prevents cross-origin requests

**Solutions:**

**Use a Backend Proxy:**
```typescript
// ❌ Don't make direct requests from browser
const anime = await jikan.anime.getById(5114); // CORS error

// ✅ Use your backend as a proxy
const response = await fetch('/api/anime/5114');
const anime = await response.json();
```

**Backend Implementation (Node.js/Express):**
```typescript
app.get('/api/anime/:id', async (req, res) => {
  try {
    const response = await jikan.anime.getById(parseInt(req.params.id));
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

**Use CORS Proxy (Development Only):**
```typescript
// ⚠️ Only for development - security risk for production
const corsProxy = 'https://cors-anywhere.herokuapp.com/';
const jikan = new JikanClient({
  baseUrl: corsProxy + 'https://api.jikan.moe/v4'
});
```

---

### 8. Memory Leaks with Large Datasets

**Problem:** Application memory usage grows over time, especially with caching.

**Causes:**
- Unlimited cache growth
- Forgotten event listeners
- Unreleased resources

**Solutions:**

**Implement Cache Size Limits:**
```typescript
class LimitedCache {
  private cache: Map<string, any> = new Map();
  private readonly maxSize = 100;
  
  set(key: string, value: any) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, value);
  }
  
  get(key: string) {
    return this.cache.get(key);
  }
  
  clear() {
    this.cache.clear();
  }
}
```

**Add Cleanup Logic:**
```typescript
// Automatically clear old cache entries
setInterval(() => {
  cache.clear();
  console.log('Cache cleared');
}, 3600000); // Every hour
```

---

### 9. Slow Performance / Timeout on Large Requests

**Problem:** Fetching large amounts of data is slow or timing out.

**Causes:**
- Requesting too much data at once
- Network latency
- Not implementing pagination properly

**Solutions:**

**Use Pagination Instead of Fetching All:**
```typescript
// ❌ Slow - trying to fetch all at once
async function getAllAnimes() {
  let page = 1;
  let allAnimes = [];
  
  while (true) {
    const response = await jikan.anime.search({ 
      q: 'naruto',
      page,
      limit: 25
    });
    
    allAnimes = allAnimes.concat(response.data);
    
    if (!response.pagination.has_next_page) break;
    page++;
  }
  
  return allAnimes; // Might take very long
}

// ✅ Better - use pagination and process as you go
async function* getAllAnimesLazy() {
  let page = 1;
  
  while (true) {
    const response = await jikan.anime.search({ 
      q: 'naruto',
      page,
      limit: 25
    });
    
    for (const anime of response.data) {
      yield anime;
    }
    
    if (!response.pagination.has_next_page) break;
    page++;
    
    // Rate limiting
    await new Promise(r => setTimeout(r, 500));
  }
}

// Usage
for await (const anime of getAllAnimesLazy()) {
  console.log(anime.title);
}
```

**Reduce Data Transfer:**
```typescript
// Request only what you need
const results = await jikan.anime.search({
  q: 'naruto',
  limit: 10, // Limit results
  page: 1    // Only get first page
});

// Process incrementally
results.data.slice(0, 5).forEach(anime => {
  console.log(anime.title);
});
```

---

## Getting Help

If you can't find a solution here:

1. **Check the API Documentation**: See [API.md](API.md)
2. **Review Best Practices**: See [BEST-PRACTICES.md](BEST-PRACTICES.md)
3. **Search Issues**: [GitHub Issues](https://github.com/firrthecreator/myanimelist-wrapper/issues)
4. **Check Jikan Status**: [Jikan API Status](https://jikan.moe/)
5. **Open an Issue**: [Report a Bug](https://github.com/firrthecreator/myanimelist-wrapper/issues/new)

---

## FAQ

### Q: What's the rate limit?
**A:** Approximately 3-4 requests per second. Recommended delay: 400ms between requests.

### Q: Can I use this in the browser?
**A:** Direct usage has CORS issues. Use a backend proxy instead.

### Q: How long is data cached?
**A:** By default, no caching is done. Implement your own caching strategy if needed.

### Q: Why am I getting null values?
**A:** MyAnimeList data is incomplete. Always check for null/undefined values.

### Q: How do I search for a specific anime?
**A:** Use `jikan.anime.search()` with your query and filters.

### Q: Can I filter by genre?
**A:** Yes, use `genres` parameter in search: `jikan.anime.search({ genres: [1] })`

### Q: How do I get pagination?
**A:** Responses include `pagination` object with `has_next_page` and `current_page`.

---

*Last updated: 2026*
