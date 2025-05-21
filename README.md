# MyAnimeList Wrapper

[![npm version](https://img.shields.io/npm/v/@firrthecreator/myanimelist-wrapper.svg)](https://www.npmjs.com/package/myanimelist-wrapper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/firrthecreator/myanimelist-wrapper/actions/workflows/ci.yml/badge.svg)](https://github.com/firrthecreator/myanimelist-wrapper/actions/workflows/ci.yml)

A comprehensive TypeScript wrapper for the Jikan API v4 (unofficial MyAnimeList API).

## Features

* **Full TypeScript Support**: Complete type definitions for all API responses
* **Complete API Coverage**: All Jikan API v4 endpoints implemented
* **Modular Design**: Clean, maintainable code structure
* **Error Handling**: Robust error handling with custom error classes
* **Comprehensive Documentation**: Detailed JSDoc comments and examples
* **Tested**: Unit tests for reliability

## Installation

```bash
npm install myanimelist-wrapper
```

## Quick Start

```typescript
import { JikanClient } from 'myanimelist-wrapper';

// Create a new client
const jikan = new JikanClient();

// Get anime by ID
const getAnime = async () => {
  try {
    const response = await jikan.anime.getById(5114); // Fullmetal Alchemist: Brotherhood
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching anime:', error);
  }
};

// Search for anime
const searchAnime = async () => {
  try {
    const response = await jikan.anime.search({
      q: 'attack on titan',
      limit: 5
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error searching anime:', error);
  }
};

getAnime();
searchAnime();
```

## API Documentation

### Client Initialization

```typescript
import { JikanClient } from 'myanimelist-wrapper';

// Default options
const jikan = new JikanClient();

// With custom options
const jikanWithOptions = new JikanClient({
  baseUrl: 'https://api.jikan.moe/v4', // Default
  timeout: 30000, // Default: 30 seconds
  headers: {
    'Accept': 'application/json',
    // Add custom headers here
  }
});
```

### Available Endpoints

The client provides access to all Jikan API v4 endpoints through these properties:

* `anime` - Anime-related endpoints
* `manga` - Manga-related endpoints
* `characters` - Character-related endpoints
* `people` - People-related endpoints
* `clubs` - Club-related endpoints
* `seasons` - Season-related endpoints
* `schedules` - Schedule-related endpoints
* `top` - Top-rated content endpoints
* `genres` - Genre-related endpoints
* `producers` - Producer-related endpoints
* `magazines` - Magazine-related endpoints
* `users` - User-related endpoints
* `reviews` - Review-related endpoints
* `recommendations` - Recommendation-related endpoints
* `random` - Random content endpoints

### Examples

#### Anime

```typescript
// Get anime by ID
const anime = await jikan.anime.getById(5114);

// Get anime characters
const characters = await jikan.anime.getCharacters(5114);

// Search for anime
const searchResults = await jikan.anime.search({
  q: 'one piece',
  type: 'tv',
  score: 8,
  limit: 10
});

// Get anime episodes
const episodes = await jikan.anime.getEpisodes(5114, 1);

// Get anime statistics
const stats = await jikan.anime.getStatistics(5114);
```

#### Manga

```typescript
// Get manga by ID
const manga = await jikan.manga.getById(1);

// Get manga characters
const characters = await jikan.manga.getCharacters(1);

// Search for manga
const searchResults = await jikan.manga.search({
  q: 'berserk',
  type: 'manga',
  score: 8,
  limit: 10
});
```

#### Characters

```typescript
// Get character by ID
const character = await jikan.characters.getById(1);

// Get character pictures
const pictures = await jikan.characters.getPictures(1);

// Search for characters
const searchResults = await jikan.characters.search({
  q: 'luffy',
  limit: 10
});
```

#### Seasons

```typescript
// Get current season anime
const currentSeason = await jikan.seasons.getCurrent();

// Get specific season anime
const winter2022 = await jikan.seasons.getSeason(2022, 'winter');

// Get upcoming season anime
const upcoming = await jikan.seasons.getUpcoming();
```

#### Top

```typescript
// Get top anime
const topAnime = await jikan.top.getAnime({
  filter: 'airing',
  limit: 10
});

// Get top manga
const topManga = await jikan.top.getManga({
  filter: 'publishing',
  limit: 10
});

// Get top characters
const topCharacters = await jikan.top.getCharacters({
  limit: 10
});
```

#### Random

```typescript
// Get random anime
const randomAnime = await jikan.random.getAnime();

// Get random manga
const randomManga = await jikan.random.getManga();

// Get random character
const randomCharacter = await jikan.random.getCharacter();
```

## Error Handling

The client provides a custom `JikanError` class for error handling:

```typescript
try {
  const anime = await jikan.anime.getById(5114);
  console.log(anime.data);
} catch (error) {
  if (error instanceof JikanError) {
    console.error(`API Error (${error.status}): ${error.message}`);
    if (error.data) {
      console.error('Error data:', error.data);
    }
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Rate Limiting

The Jikan API has rate limits. To avoid hitting these limits, you can add delays between requests:

```typescript
// Helper function to wait between requests
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Example with rate limiting
async function fetchWithRateLimiting() {
  for (const id of [1, 2, 3, 4, 5]) {
    const anime = await jikan.anime.getById(id);
    console.log(anime.data.title);
    
    // Wait 400ms between requests
    await wait(400);
  }
}
```

## Pagination

Many endpoints return paginated results. You can navigate through pages like this:

```typescript
// Get first page
const firstPage = await jikan.top.getAnime({ limit: 10 });

// Check if there's a next page
if (firstPage.pagination.has_next_page) {
  // Get next page
  const nextPage = await jikan.top.getAnime({
    page: firstPage.pagination.current_page + 1,
    limit: 10
  });
}
```

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT