# Installation & Setup Guide

Get started with the MyAnimeList Wrapper in minutes.

## Quick Installation

### Step 1: Install the Package

```bash
# Using npm
npm install myanimelist-wrapper

# Using yarn
yarn add myanimelist-wrapper

# Using pnpm
pnpm add myanimelist-wrapper
```

### Step 2: Import and Initialize

```typescript
import { JikanClient } from 'myanimelist-wrapper';

// Create a new client
const jikan = new JikanClient();

// Use it!
const anime = await jikan.anime.getById(5114);
console.log(anime.data.title);
```

### Step 3: (Optional) Configure Options

```typescript
const jikan = new JikanClient({
  baseUrl: 'https://api.jikan.moe/v4',
  timeout: 30000,
  headers: {
    'User-Agent': 'MyApp/1.0'
  }
});
```

---

## Platform Setup

### Node.js / Express / NestJS

**Requirements:**
- Node.js 16 or higher
- npm, yarn, or pnpm

**Installation:**

```bash
npm install myanimelist-wrapper
```

**Usage:**

```typescript
import { JikanClient } from 'myanimelist-wrapper';

const jikan = new JikanClient();

export async function getAnime(req, res) {
  try {
    const anime = await jikan.anime.getById(req.params.id);
    res.json(anime.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### React / Vue / Angular (Web)

**Important:** Due to CORS restrictions, you cannot use this directly in the browser. Use a backend proxy instead.

**Recommended Setup:**

```typescript
// Frontend code
async function getAnime(id: number) {
  // Call your backend API, not the Jikan API directly
  const response = await fetch(`/api/anime/${id}`);
  return response.json();
}

// Backend (Node.js/Express)
import { JikanClient } from 'myanimelist-wrapper';

const jikan = new JikanClient();

app.get('/api/anime/:id', async (req, res) => {
  try {
    const anime = await jikan.anime.getById(parseInt(req.params.id));
    res.json(anime.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### React Example

```typescript
import { useState, useEffect } from 'react';
import type { Anime } from 'myanimelist-wrapper';

export function AnimeViewer({ animeId }: { animeId: number }) {
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/anime/${animeId}`);
        const data = await response.json();
        setAnime(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    })();
  }, [animeId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!anime) return <div>Not found</div>;

  return (
    <div>
      <h1>{anime.title}</h1>
      <p>Score: {anime.score}</p>
      <p>Episodes: {anime.episodes}</p>
    </div>
  );
}
```

### TypeScript Configuration

**tsconfig.json:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

---

## Project Structure

### Recommended Folder Layout

```
project/
├── src/
│   ├── api/
│   │   ├── anime.ts        # Anime-related endpoints
│   │   ├── manga.ts        # Manga-related endpoints
│   │   └── index.ts        # Export all endpoints
│   ├── services/
│   │   └── jikan.ts        # JikanClient initialization
│   ├── types/
│   │   └── index.ts        # Local type definitions
│   └── index.ts            # Main entry point
├── tests/
│   ├── api/
│   │   └── anime.test.ts
│   └── services/
│       └── jikan.test.ts
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

### Initialize JikanClient Globally

**src/services/jikan.ts:**

```typescript
import { JikanClient } from 'myanimelist-wrapper';

export const jikan = new JikanClient({
  baseUrl: 'https://api.jikan.moe/v4',
  timeout: 30000
});
```

**src/api/anime.ts:**

```typescript
import { jikan } from '../services/jikan';
import type { Anime, ApiResponse } from 'myanimelist-wrapper';

export async function getAnimeById(id: number): Promise<Anime> {
  const response = await jikan.anime.getById(id);
  return response.data;
}

export async function searchAnime(query: string, limit = 10): Promise<Anime[]> {
  const response = await jikan.anime.search({
    q: query,
    limit
  });
  return response.data;
}
```

---

## Configuration Options

### Full Configuration Example

```typescript
import { JikanClient } from 'myanimelist-wrapper';

const jikan = new JikanClient({
  // Base API URL
  baseUrl: 'https://api.jikan.moe/v4',

  // Request timeout (ms)
  timeout: 30000,

  // Custom HTTP headers
  headers: {
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip',
    'User-Agent': 'MyApp/1.0'
  },

  // Retry configuration
  retryAttempts: 3,
  retryDelay: 1000,

  // Response caching
  cacheEnabled: true,
  cacheTTL: 3600000 // 1 hour
});
```

### Environment-Based Configuration

```typescript
const jikan = new JikanClient({
  baseUrl: process.env.JIKAN_BASE_URL || 'https://api.jikan.moe/v4',
  timeout: parseInt(process.env.JIKAN_TIMEOUT || '30000'),
  cacheEnabled: process.env.NODE_ENV !== 'development'
});
```

---

## Dependency Requirements

### Minimum Requirements

- **Node.js**: 16.0.0 or higher
- **TypeScript**: 4.7.0 or higher (for TypeScript projects)
- **No external dependencies** - Uses native Node.js APIs only

### Compatible Versions

| Package | Version |
|---------|---------|
| Node.js | ≥16.0.0 |
| TypeScript | ≥4.7.0 |
| npm | ≥7.0.0 |
| yarn | ≥1.22.0 |
| pnpm | ≥6.0.0 |

---

## Development Setup

### Clone and Setup

```bash
# Clone repository
git clone https://github.com/firrthecreator/myanimelist-wrapper.git
cd myanimelist-wrapper

# Install dependencies
npm install

# Build project
npm run build

# Run tests
npm test

# Format code
npm run format

# Lint code
npm run lint
```

### Available Scripts

```json
{
  "scripts": {
    "build": "tsc",              // Compile TypeScript
    "clean": "rimraf dist",      // Clean build directory
    "lint": "eslint . --fix",    // Lint and fix code
    "format": "prettier --write", // Format code
    "test": "vitest run",        // Run tests once
    "test:watch": "vitest",      // Watch tests
    "test:coverage": "vitest run --coverage",
    "docs": "typedoc --out docs src/index.ts",
    "prepare": "husky install"
  }
}
```

---

## Troubleshooting Installation

### Issue: Cannot find module

**Error:**
```
Error: Cannot find module 'myanimelist-wrapper'
```

**Solution:**
```bash
# Reinstall package
npm uninstall myanimelist-wrapper
npm install myanimelist-wrapper

# Or clear npm cache
npm cache clean --force
npm install
```

### Issue: TypeScript errors

**Error:**
```
error TS2307: Cannot find module 'myanimelist-wrapper'
```

**Solution:**
1. Ensure TypeScript is installed: `npm install --save-dev typescript`
2. Check `tsconfig.json` has correct settings
3. Run `npm install` again

### Issue: Type definitions not found

**Error:**
```
Could not find a declaration file for module 'myanimelist-wrapper'
```

**Solution:**
- Package includes `.d.ts` files
- Ensure TypeScript version ≥4.7.0
- Clear cache: `npm cache clean --force`

### Issue: CORS errors in browser

**Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- Create a backend proxy (see [React Example](#react-example) above)
- Never use directly in browser
- Always route through backend API

---

## Next Steps

After installation:

1. **Read Quick Start** - [README.md](../README.md#quick-start)
2. **Explore Examples** - [examples/](../examples/)
3. **Learn API** - [API Reference](API.md)
4. **Advanced Techniques** - [Best Practices](BEST-PRACTICES.md)
5. **Troubleshoot Issues** - [Troubleshooting Guide](TROUBLESHOOTING.md)

---

## Getting Help

- **Documentation**: [docs/README.md](README.md)
- **Issues**: [GitHub Issues](https://github.com/firrthecreator/myanimelist-wrapper/issues)
- **Discussions**: [GitHub Discussions](https://github.com/firrthecreator/myanimelist-wrapper/discussions)
- **API Status**: [Jikan API](https://jikan.moe/)

---

*Last updated: January 2026*
