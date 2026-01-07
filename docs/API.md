# Complete API Reference

This document provides a comprehensive reference for all available endpoints in the MyAnimeList Wrapper.

## Table of Contents

1. [Anime Endpoints](#anime-endpoints)
2. [Manga Endpoints](#manga-endpoints)
3. [Character Endpoints](#character-endpoints)
4. [People Endpoints](#people-endpoints)
5. [Clubs Endpoints](#clubs-endpoints)
6. [Seasons Endpoints](#seasons-endpoints)
7. [Schedules Endpoints](#schedules-endpoints)
8. [Top Endpoints](#top-endpoints)
9. [Genres Endpoints](#genres-endpoints)
10. [Producers Endpoints](#producers-endpoints)
11. [Magazines Endpoints](#magazines-endpoints)
12. [Users Endpoints](#users-endpoints)
13. [Reviews Endpoints](#reviews-endpoints)
14. [Recommendations Endpoints](#recommendations-endpoints)
15. [Random Endpoints](#random-endpoints)
16. [Type Definitions](#type-definitions)

---

## Anime Endpoints

### `getById(id: number)`

Get detailed information about a specific anime.

**Parameters:**
- `id` (number, required): MyAnimeList anime ID

**Returns:** `Promise<ApiResponse<Anime>>`

**Example:**
```typescript
const anime = await jikan.anime.getById(5114);
console.log(anime.data.title);           // "Fullmetal Alchemist: Brotherhood"
console.log(anime.data.score);           // 9.1
console.log(anime.data.episodes);        // 64
console.log(anime.data.aired.from);      // "2009-04-05T00:00:00+00:00"
console.log(anime.data.genres);          // Array of genres
console.log(anime.data.demographics);    // Target demographics
```

**Response Fields:**
- `mal_id`: MyAnimeList ID
- `title`: English title
- `title_english`: English title (alternative)
- `title_japanese`: Japanese title
- `type`: Anime type (TV, Movie, OVA, etc.)
- `episodes`: Number of episodes (null if ongoing)
- `status`: Current status (Finished Airing, Currently Airing, etc.)
- `aired`: Airing dates
- `score`: Average score (0-10)
- `scored_by`: Number of users who scored
- `genres`: Array of genre objects
- `demographics`: Target demographic
- `season`: Season (winter, spring, summer, fall)
- `year`: Release year
- `synopses`: Plot synopsis
- `background`: Background information
- `images`: Available images (jpg, webp)
- `trailer`: Trailer information
- `source`: Manga/light novel source
- `duration`: Episode duration
- `rating`: Age rating
- `studios`: Production studios
- `producers`: Production companies
- `relations`: Related anime/manga

---

### `search(query: AnimeSearchQuery)`

Search for anime with various filters.

**Parameters:**
```typescript
interface AnimeSearchQuery {
  q?: string;              // Search query
  type?: string;           // anime, manga, character, person, etc.
  score?: number;          // Minimum score (0-10)
  min_score?: number;      // Minimum score
  max_score?: number;      // Maximum score
  status?: string;         // airing, complete, upcoming
  rating?: string;         // g, pg, pg13, r, r+, rx
  sfw?: boolean;           // Safe for work filter
  genres?: number[];       // Genre IDs (comma separated)
  genres_exclude?: number[]; // Exclude genre IDs
  order_by?: string;       // score, mal_id, title, type, episodes, status, start_date, end_date, duration, rating, members, favorites
  sort?: string;           // desc, asc
  limit?: number;          // Results per page (1-25, default: 25)
  page?: number;           // Page number (default: 1)
}
```

**Returns:** `Promise<ApiResponse<Anime[]>>`

**Example:**
```typescript
const results = await jikan.anime.search({
  q: 'naruto',
  type: 'tv',
  status: 'complete',
  score: 8,
  limit: 10,
  page: 1
});

results.data.forEach(anime => {
  console.log(`${anime.title} - Score: ${anime.score}`);
});

// Check pagination
console.log(`Current page: ${results.pagination.current_page}`);
console.log(`Has next page: ${results.pagination.has_next_page}`);
```

---

### `getCharacters(id: number)`

Get all characters in an anime.

**Parameters:**
- `id` (number, required): Anime ID

**Returns:** `Promise<ApiResponse<AnimeCharacter[]>>`

**Response Structure:**
```typescript
interface AnimeCharacter {
  character: {
    mal_id: number;
    name: string;
    images: Images;
    url: string;
  };
  role: string;              // Main, Supporting, Background
  voice_actors: VoiceActor[];
}

interface VoiceActor {
  person: {
    mal_id: number;
    name: string;
    images: Images;
    url: string;
  };
  language: string;          // "Japanese", "English", etc.
}
```

**Example:**
```typescript
const characters = await jikan.anime.getCharacters(5114);
characters.data.forEach(char => {
  console.log(`${char.character.name} (${char.role})`);
  
  if (char.voice_actors.length > 0) {
    const japaneseVA = char.voice_actors.find(va => va.language === 'Japanese');
    if (japaneseVA) {
      console.log(`  VA (JP): ${japaneseVA.person.name}`);
    }
  }
});
```

---

### `getEpisodes(id: number, page?: number)`

Get episodes for an anime.

**Parameters:**
- `id` (number, required): Anime ID
- `page` (number, optional): Page number (default: 1)

**Returns:** `Promise<ApiResponse<Episode[]>>`

**Response Structure:**
```typescript
interface Episode {
  mal_id: number;
  url: string;
  title: string;
  title_japanese: string;
  title_romanized: string;
  aired: string;             // ISO date
  score: number;
  filler: boolean;
  recap: boolean;
  forum_url: string;
}
```

**Example:**
```typescript
const episodes = await jikan.anime.getEpisodes(5114, 1);
episodes.data.forEach(ep => {
  console.log(`Episode ${ep.mal_id}: ${ep.title}`);
  console.log(`  Aired: ${ep.aired}`);
  console.log(`  Score: ${ep.score}`);
  console.log(`  Filler: ${ep.filler}`);
});

// Get all episodes
if (episodes.pagination.has_next_page) {
  const page2 = await jikan.anime.getEpisodes(5114, 2);
}
```

---

### `getNews(id: number, page?: number)`

Get news articles about an anime.

**Parameters:**
- `id` (number, required): Anime ID
- `page` (number, optional): Page number (default: 1)

**Returns:** `Promise<ApiResponse<News[]>>`

**Example:**
```typescript
const news = await jikan.anime.getNews(5114);
news.data.forEach(article => {
  console.log(`${article.title}`);
  console.log(`  URL: ${article.url}`);
  console.log(`  Posted: ${article.date}`);
  console.log(`  Author: ${article.author_name}`);
});
```

---

### `getForums(id: number)`

Get forum topics for an anime.

**Parameters:**
- `id` (number, required): Anime ID

**Returns:** `Promise<ApiResponse<Forum[]>>`

---

### `getStatistics(id: number)`

Get statistics for an anime (scores, watching status).

**Parameters:**
- `id` (number, required): Anime ID

**Returns:** `Promise<ApiResponse<Statistics[]>>`

**Response Structure:**
```typescript
interface Statistics {
  scores: Array<{
    score: number;
    percentage: number;
    votes: number;
  }>;
  status: Array<{
    status: string;      // "watching", "completed", "on_hold", "dropped", "plan_to_watch"
    percentage: number;
    votes: number;
  }>;
}
```

---

## Manga Endpoints

### `getById(id: number)`

Get detailed information about a specific manga.

**Parameters:**
- `id` (number, required): MyAnimeList manga ID

**Returns:** `Promise<ApiResponse<Manga>>`

**Example:**
```typescript
const manga = await jikan.manga.getById(1);
console.log(manga.data.title);          // "Berserk"
console.log(manga.data.type);           // "Manga"
console.log(manga.data.chapters);       // 364 (or null if ongoing)
console.log(manga.data.volumes);        // 40
console.log(manga.data.score);          // 9.6
```

---

### `search(query: MangaSearchQuery)`

Search for manga with filters.

**Parameters:**
```typescript
interface MangaSearchQuery {
  q?: string;                // Search query
  type?: string;             // manga, novel, lightnovel, oneshot, doujin, manhwa, manhua
  score?: number;            // Minimum score (0-10)
  status?: string;           // publishing, complete, hiatus, discontinued, upcoming
  genres?: number[];         // Genre IDs
  limit?: number;            // Results per page (1-25, default: 25)
  page?: number;             // Page number (default: 1)
}
```

**Returns:** `Promise<ApiResponse<Manga[]>>`

---

### `getCharacters(id: number)`

Get all characters in a manga.

**Parameters:**
- `id` (number, required): Manga ID

**Returns:** `Promise<ApiResponse<MangaCharacter[]>>`

---

## Character Endpoints

### `getById(id: number)`

Get detailed information about a character.

**Parameters:**
- `id` (number, required): Character ID

**Returns:** `Promise<ApiResponse<Character>>`

**Response Fields:**
```typescript
interface Character {
  mal_id: number;
  url: string;
  name: string;
  name_kanji: string;
  nicknames: string[];
  about: string;             // Character biography
  images: Images;
  favorites: number;
  anime: Array<{
    role: string;            // "Main", "Supporting", "Background"
    anime: AnimeSmall;
  }>;
  manga: Array<{
    role: string;
    manga: MangaSmall;
  }>;
}
```

**Example:**
```typescript
const character = await jikan.characters.getById(1);
console.log(character.data.name);       // "Monkey D. Luffy"
console.log(character.data.about);      // Character biography
console.log(character.data.favorites);  // Number of favorites
console.log(character.data.anime);      // Anime appearances
```

---

### `search(query: CharacterSearchQuery)`

Search for characters.

**Parameters:**
```typescript
interface CharacterSearchQuery {
  q?: string;              // Search query
  limit?: number;          // Results per page (1-25, default: 25)
  page?: number;           // Page number (default: 1)
}
```

**Returns:** `Promise<ApiResponse<Character[]>>`

---

### `getPictures(id: number)`

Get all pictures/artwork of a character.

**Parameters:**
- `id` (number, required): Character ID

**Returns:** `Promise<ApiResponse<Picture[]>>`

**Example:**
```typescript
const pictures = await jikan.characters.getPictures(1);
pictures.data.forEach(pic => {
  console.log(pic.jpg.image_url);
  console.log(pic.jpg.small_image_url);
  if (pic.webp) {
    console.log(pic.webp.image_url);
  }
});
```

---

## People Endpoints

### `getById(id: number)`

Get detailed information about a person (voice actor, creator, etc.).

**Parameters:**
- `id` (number, required): Person ID

**Returns:** `Promise<ApiResponse<Person>>`

**Response Fields:**
```typescript
interface Person {
  mal_id: number;
  url: string;
  name: string;
  name_kanji: string;
  website_url: string;
  images: Images;
  given_name: string;
  family_name: string;
  alternate_names: string[];
  birthday: string;
  favorites: number;
  about: string;             // Biography
  voices: Array<{            // Voice acting roles
    language: string;
    anime: AnimeSmall;
    character: CharacterSmall;
  }>;
  anime: Array<{             // Anime staff roles
    position: string;        // Director, Producer, Music Composer, etc.
    anime: AnimeSmall;
  }>;
  manga: Array<{             // Manga roles
    position: string;        // Author, Illustrator, etc.
    manga: MangaSmall;
  }>;
}
```

---

### `search(query: PersonSearchQuery)`

Search for people.

**Parameters:**
```typescript
interface PersonSearchQuery {
  q?: string;              // Search query
  limit?: number;          // Results per page (1-25, default: 25)
  page?: number;           // Page number (default: 1)
}
```

**Returns:** `Promise<ApiResponse<Person[]>>`

---

### `getPictures(id: number)`

Get pictures of a person.

**Parameters:**
- `id` (number, required): Person ID

**Returns:** `Promise<ApiResponse<Picture[]>>`

---

## Seasons Endpoints

### `getCurrent()`

Get anime for the current season.

**Returns:** `Promise<ApiResponse<Anime[]>>`

**Example:**
```typescript
const currentSeason = await jikan.seasons.getCurrent();
console.log(`${currentSeason.data.length} anime this season`);
currentSeason.data.forEach(anime => {
  console.log(`${anime.title} (${anime.airing_status})`);
});
```

---

### `getSeason(year: number, season: string)`

Get anime for a specific season and year.

**Parameters:**
- `year` (number, required): Year (e.g., 2024)
- `season` (string, required): Season (winter, spring, summer, fall)

**Returns:** `Promise<ApiResponse<Anime[]>>`

**Example:**
```typescript
const winter2024 = await jikan.seasons.getSeason(2024, 'winter');
const spring2024 = await jikan.seasons.getSeason(2024, 'spring');
const summer2024 = await jikan.seasons.getSeason(2024, 'summer');
const fall2024 = await jikan.seasons.getSeason(2024, 'fall');
```

---

### `getUpcoming()`

Get upcoming anime for future seasons.

**Returns:** `Promise<ApiResponse<Anime[]>>`

---

## Schedules Endpoints

### `getSchedule(day?: string, limit?: number, page?: number)`

Get anime by airing day and schedule.

**Parameters:**
- `day` (string, optional): Airing day (monday, tuesday, wednesday, thursday, friday, saturday, sunday, other, unknown)
- `limit` (number, optional): Results per page (default: 25)
- `page` (number, optional): Page number (default: 1)

**Returns:** `Promise<ApiResponse<Anime[]>>`

**Example:**
```typescript
// Get all anime airing on Monday
const mondayAnime = await jikan.schedules.getSchedule('monday');

// Get all anime with pagination
const allScheduled = await jikan.schedules.getSchedule(undefined, 25, 1);
```

---

## Top Endpoints

### `getAnime(options: TopOptions)`

Get top-ranked anime.

**Parameters:**
```typescript
interface TopOptions {
  filter?: string;       // airing, upcoming, byPopularity, favorite, none (default)
  limit?: number;        // Results per page (1-25, default: 25)
  page?: number;         // Page number (default: 1)
}
```

**Returns:** `Promise<ApiResponse<TopAnime[]>>`

**Example:**
```typescript
// Top airing anime
const topAiring = await jikan.top.getAnime({ filter: 'airing', limit: 10 });

// Top favorite anime
const topFavorite = await jikan.top.getAnime({ filter: 'favorite', limit: 10 });

// All-time top anime
const allTimeTop = await jikan.top.getAnime({ limit: 25 });

topAiring.data.forEach((anime, index) => {
  console.log(`${index + 1}. ${anime.title} - ${anime.score}`);
});
```

---

### `getManga(options: TopOptions)`

Get top-ranked manga.

**Parameters:** Same as `getAnime()`

**Returns:** `Promise<ApiResponse<TopManga[]>>`

---

### `getCharacters(options: { limit?: number; page?: number })`

Get top-ranked characters.

**Parameters:**
- `limit` (number, optional): Results per page (1-25, default: 25)
- `page` (number, optional): Page number (default: 1)

**Returns:** `Promise<ApiResponse<TopCharacter[]>>`

---

### `getPeople(options: { limit?: number; page?: number })`

Get top-ranked people (voice actors, creators, etc.).

**Parameters:** Same as `getCharacters()`

**Returns:** `Promise<ApiResponse<TopPerson[]>>`

---

## Genres Endpoints

### `getAnimeGenres()`

Get all anime genres with count information.

**Returns:** `Promise<ApiResponse<Genre[]>>`

**Response Structure:**
```typescript
interface Genre {
  mal_id: number;
  type: string;           // "anime"
  name: string;           // "Action", "Adventure", etc.
  url: string;
  count: number;
}
```

**Example:**
```typescript
const genres = await jikan.genres.getAnimeGenres();
genres.data.forEach(genre => {
  console.log(`${genre.name}: ${genre.count} anime`);
});

// Find specific genre
const actionGenre = genres.data.find(g => g.name === 'Action');
console.log(`Action has ${actionGenre.count} anime`);
```

---

### `getMangaGenres()`

Get all manga genres.

**Returns:** `Promise<ApiResponse<Genre[]>>`

---

### `getAnimeExplicitGenres()`

Get explicit genres for anime (themes, demographics).

**Returns:** `Promise<ApiResponse<Genre[]>>`

---

### `getMangaExplicitGenres()`

Get explicit genres for manga.

**Returns:** `Promise<ApiResponse<Genre[]>>`

---

## Producers Endpoints

### `getById(id: number)`

Get information about a producer (studio, company).

**Parameters:**
- `id` (number, required): Producer ID

**Returns:** `Promise<ApiResponse<Producer>>`

**Response Structure:**
```typescript
interface Producer {
  mal_id: number;
  name: string;
  titles: Array<{
    type: string;
    title: string;
  }>;
  images: Images;
  url: string;
  established: string;
  about: string;
  count: number;
}
```

---

### `search(query: ProducerSearchQuery)`

Search for producers.

**Parameters:**
```typescript
interface ProducerSearchQuery {
  q?: string;              // Search query
  limit?: number;          // Results per page (1-25, default: 25)
  page?: number;           // Page number (default: 1)
  order_by?: string;       // count, favorites
  sort?: string;           // desc, asc
}
```

**Returns:** `Promise<ApiResponse<Producer[]>>`

---

## Magazines Endpoints

### `search(query: MagazineSearchQuery)`

Search for magazines that publish manga.

**Parameters:**
```typescript
interface MagazineSearchQuery {
  q?: string;              // Search query
  limit?: number;          // Results per page (1-25, default: 25)
  page?: number;           // Page number (default: 1)
  order_by?: string;       // count, favorites
  sort?: string;           // desc, asc
}
```

**Returns:** `Promise<ApiResponse<Magazine[]>>`

---

## Users Endpoints

### `getById(username: string)`

Get basic user profile information.

**Parameters:**
- `username` (string, required): MyAnimeList username

**Returns:** `Promise<ApiResponse<User>>`

**Response Structure:**
```typescript
interface User {
  mal_id: number;
  username: string;
  url: string;
  images: Images;
  last_online: string;     // ISO date
  gender: string;
  birthday: string;
  location: string;
  joined_date: string;     // ISO date
}
```

**Example:**
```typescript
const user = await jikan.users.getById('firrthecreator');
console.log(user.data.username);
console.log(user.data.joined_date);
console.log(user.data.last_online);
```

---

### `getFullProfile(username: string)`

Get complete user profile with statistics and favorites.

**Parameters:**
- `username` (string, required): MyAnimeList username

**Returns:** `Promise<ApiResponse<UserFull>>`

**Response Structure:**
```typescript
interface UserFull extends User {
  statistics: {
    anime: {
      days_watched: number;
      mean_score: number;
      watching: number;
      completed: number;
      on_hold: number;
      dropped: number;
      plan_to_watch: number;
      total_entries: number;
      rewatched: number;
      episodes_watched: number;
    };
    manga: {
      days_read: number;
      mean_score: number;
      reading: number;
      completed: number;
      on_hold: number;
      dropped: number;
      plan_to_read: number;
      total_entries: number;
      reread: number;
      chapters_read: number;
      volumes_read: number;
    };
  };
  favorites: {
    anime: AnimeSmall[];
    manga: MangaSmall[];
    characters: CharacterSmall[];
    people: PersonSmall[];
  };
  updates: {
    anime: UserHistoryEntry[];
    manga: UserHistoryEntry[];
  };
}
```

**Example:**
```typescript
const profile = await jikan.users.getFullProfile('firrthecreator');
console.log(`Anime watched: ${profile.data.statistics.anime.days_watched} days`);
console.log(`Mean anime score: ${profile.data.statistics.anime.mean_score}`);
console.log(`Manga read: ${profile.data.statistics.manga.chapters_read} chapters`);
console.log(`Favorite anime: ${profile.data.favorites.anime[0].title}`);
```

---

### `getHistory(username: string, type: 'anime' | 'manga')`

Get user's watch/read history.

**Parameters:**
- `username` (string, required): MyAnimeList username
- `type` (string, required): 'anime' or 'manga'

**Returns:** `Promise<ApiResponse<UserHistoryEntry[]>>`

**Response Structure:**
```typescript
interface UserHistoryEntry {
  entry: {
    mal_id: number;
    url: string;
    name: string;
    title: string;
    type: string;
    images: Images;
  };
  date: string;            // ISO date
  increment: number;        // Episodes/chapters watched
  status: string;          // "Watching", "Completed", etc.
}
```

**Example:**
```typescript
const history = await jikan.users.getHistory('firrthecreator', 'anime');
history.data.forEach(entry => {
  console.log(`${entry.entry.title}: +${entry.increment} episodes`);
  console.log(`  Date: ${entry.date}`);
});
```

---

### `search(query: UserSearchQuery)`

Search for users.

**Parameters:**
```typescript
interface UserSearchQuery {
  q?: string;              // Search query
  gender?: string;         // any, male, female
  location?: string;       // User location
  min_age?: number;
  max_age?: number;
  limit?: number;          // Results per page (1-25, default: 25)
  page?: number;           // Page number (default: 1)
}
```

**Returns:** `Promise<ApiResponse<User[]>>`

---

## Reviews Endpoints

### `getAnimeReviews(page?: number, limit?: number)`

Get latest anime reviews.

**Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Results per page (1-25, default: 25)

**Returns:** `Promise<ApiResponse<Review[]>>`

**Response Structure:**
```typescript
interface Review {
  mal_id: number;
  url: string;
  type: string;            // "anime" or "manga"
  reactions: {
    overall: number;
    nice: number;
    love_it: number;
    fun: number;
    confusing: number;
    informative: number;
    well_written: number;
    creative: number;
  };
  date: string;            // ISO date
  review: string;
  score: number;           // 1-10
  tags: string[];
  user: {
    username: string;
    url: string;
    images: Images;
  };
  anime?: AnimeSmall;
  manga?: MangaSmall;
}
```

**Example:**
```typescript
const reviews = await jikan.reviews.getAnimeReviews();
reviews.data.forEach(review => {
  console.log(`${review.anime.title}`);
  console.log(`  Rating: ${review.score}/10`);
  console.log(`  Helpful: ${review.reactions.nice}`);
  console.log(`  Review: ${review.review.substring(0, 100)}...`);
});
```

---

### `getMangaReviews(page?: number, limit?: number)`

Get latest manga reviews.

**Parameters:** Same as `getAnimeReviews()`

**Returns:** `Promise<ApiResponse<Review[]>>`

---

## Recommendations Endpoints

### `getRecommendations(page?: number, limit?: number)`

Get anime and manga recommendations.

**Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Results per page (1-25, default: 25)

**Returns:** `Promise<ApiResponse<Recommendation[]>>`

**Response Structure:**
```typescript
interface Recommendation {
  mal_id: number;
  url: string;
  entry_1: {
    mal_id: number;
    url: string;
    images: Images;
    title: string;
  };
  entry_2: {
    mal_id: number;
    url: string;
    images: Images;
    title: string;
  };
  url: string;
  weight: number;          // Number of users recommending
  type: string;            // "anime" or "manga"
}
```

**Example:**
```typescript
const recommendations = await jikan.recommendations.getRecommendations();
recommendations.data.forEach(rec => {
  console.log(
    `If you like "${rec.entry_1.title}", try "${rec.entry_2.title}"`
  );
  console.log(`  Recommended by ${rec.weight} users`);
});
```

---

## Random Endpoints

### `getAnime()`

Get a random anime.

**Returns:** `Promise<ApiResponse<Anime>>`

**Example:**
```typescript
const random = await jikan.random.getAnime();
console.log(`Random anime: ${random.data.title}`);
console.log(`  Score: ${random.data.score}`);
console.log(`  Type: ${random.data.type}`);
```

---

### `getManga()`

Get a random manga.

**Returns:** `Promise<ApiResponse<Manga>>`

---

### `getCharacter()`

Get a random character.

**Returns:** `Promise<ApiResponse<Character>>`

---

### `getPerson()`

Get a random person (voice actor, creator, etc.).

**Returns:** `Promise<ApiResponse<Person>>`

---

### `getUser()`

Get a random user.

**Returns:** `Promise<ApiResponse<User>>`

---

## Type Definitions

All TypeScript type definitions are exported from the main package:

```typescript
import type {
  // Main entities
  Anime,
  Manga,
  Character,
  Person,
  Club,
  Genre,
  Producer,
  Magazine,
  User,
  Review,
  Recommendation,
  
  // Query types
  AnimeSearchQuery,
  MangaSearchQuery,
  CharacterSearchQuery,
  PersonSearchQuery,
  
  // Response types
  ApiResponse,
  PaginationInfo,
  Images,
  
  // Error types
  JikanError,
  ErrorResponse
} from 'myanimelist-wrapper';
```

### Common Response Types

```typescript
interface ApiResponse<T> {
  data: T;
  pagination?: PaginationInfo;
}

interface PaginationInfo {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

interface Images {
  jpg: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
  webp?: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
}

interface JikanError extends Error {
  status: number;
  message: string;
  data?: ErrorResponse;
}

interface ErrorResponse {
  error: string;
  message: string;
  type: string;
}
```

---

## Rate Limiting

The Jikan API enforces rate limits:
- **Requests per second**: ~3-4 requests/second
- **Recommended delay**: 400ms between requests
- **Status code**: `429 Too Many Requests` when limited

Always implement rate limiting in production applications.

---

## Pagination

Most list endpoints support pagination:

```typescript
interface PaginationOptions {
  limit?: number;  // Items per page (1-25, default: 25)
  page?: number;   // Page number (default: 1)
}

// Response includes pagination info
response.pagination.has_next_page      // Boolean
response.pagination.current_page       // Current page number
response.pagination.last_visible_page  // Last available page
```

---

*Last updated: 2026*
