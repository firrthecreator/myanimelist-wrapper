# MyAnimeList Wrapper - Documentation

Welcome to the comprehensive documentation for the MyAnimeList Wrapper library. This directory contains detailed guides, API references, and best practices.

## 📚 Documentation Structure

### Core Documentation

- **[Installation & Setup](INSTALLATION.md)** - Get started in minutes
  - Quick installation for npm/yarn/pnpm
  - Platform-specific setup (Node.js, React, Vue, Angular)
  - Project structure recommendations
  - Configuration options
  - Dependency requirements
  - Development setup

- **[API Reference](API.md)** - Complete API documentation for all endpoints
  - Anime endpoints
  - Manga endpoints
  - Character endpoints
  - People endpoints
  - Seasons, Top, Random endpoints
  - And all other available endpoints

- **[Best Practices & Advanced Patterns](BEST-PRACTICES.md)** - Learn advanced techniques
  - Rate limiting strategies
  - Caching patterns
  - Error handling best practices
  - Concurrent requests handling
  - Performance optimization
  - Testing approaches

- **[Troubleshooting Guide](TROUBLESHOOTING.md)** - Solve common issues
  - Rate limiting errors (429)
  - Not found errors (404)
  - Network/timeout issues
  - Type errors in TypeScript
  - CORS errors in browsers
  - Performance issues
  - FAQ section

### Quick Links

- **Main README** - [Back to main README](../README.md)
- **Examples** - [View usage examples](../examples/)
- **Contributing** - [How to contribute](../CONTRIBUTING.md)

---

## 🚀 Getting Started

If you're new to this library, start here:

1. **[Installation & Setup](INSTALLATION.md)** - Install and configure
2. **[Main README](../README.md#quick-start)** - Quick start guide
3. **[API Reference](API.md)** - Learn available endpoints
4. **[Best Practices](BEST-PRACTICES.md)** - Write efficient code
5. **[Examples](../examples/)** - See real-world usage

---

## 📖 Full API Documentation

### Endpoint Categories

#### Content APIs
- **Anime** - Get anime information, search, characters, episodes, news
- **Manga** - Get manga information, search, characters
- **Characters** - Get character details and pictures
- **People** - Get voice actor and creator information

#### Browse & Discover
- **Seasons** - Get anime by season and year
- **Schedules** - Get anime by airing day
- **Top** - Get top-ranked anime, manga, characters
- **Random** - Get random content
- **Genres** - Browse all genres and themes

#### Social APIs
- **Users** - Get user profiles and statistics
- **Reviews** - Get user reviews and ratings
- **Recommendations** - Get user recommendations
- **Clubs** - Get club information

#### Production APIs
- **Producers** - Get studio and production company info
- **Magazines** - Get manga magazine information

For detailed endpoint documentation with parameters and examples, see [API Reference](API.md).

---

## 💡 Key Features

✨ **Full TypeScript Support** - Complete type definitions for all responses

📦 **Complete Coverage** - All Jikan API v4 endpoints implemented

⚡ **Rate Limit Friendly** - Built-in rate limit handling strategies

🛡️ **Error Handling** - Comprehensive error classes with recovery suggestions

🔄 **Caching Support** - Multiple caching strategies covered in best practices

📊 **Pagination** - Full pagination support for all list endpoints

---

## 🔧 Configuration

The client can be configured with custom options:

```typescript
import { JikanClient } from 'myanimelist-wrapper';

const jikan = new JikanClient({
  baseUrl: 'https://api.jikan.moe/v4',
  timeout: 30000,
  headers: {
    'Accept': 'application/json'
  }
});
```

For more configuration details, see [API Reference - Client Configuration](API.md#client-configuration).

---

## 📝 Common Tasks

### Search for Anime
```typescript
const results = await jikan.anime.search({
  q: 'naruto',
  type: 'tv',
  limit: 10
});
```

### Get Anime Information
```typescript
const anime = await jikan.anime.getById(5114);
console.log(anime.data.title);
console.log(anime.data.score);
```

### Handle Rate Limiting
```typescript
// Implement delays between requests
const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

for (const id of [1, 5, 10]) {
  const anime = await jikan.anime.getById(id);
  await wait(400);
}
```

For more examples and patterns, see [Best Practices](BEST-PRACTICES.md) and [Examples](../examples/).

---

## ❓ FAQ

**Q: How do I install the package?**  
A: See [Installation & Setup](INSTALLATION.md)

**Q: What's the rate limit?**  
A: ~3-4 requests per second (recommended: 400ms delay between requests)

**Q: Can I use this in the browser?**  
A: Use a backend proxy due to CORS. See [Installation - React Example](INSTALLATION.md#react-example)

**Q: How do I handle errors?**  
A: Use `JikanError` class. See [Best Practices - Error Handling](BEST-PRACTICES.md#error-handling-best-practices)

**Q: Can I cache results?**  
A: Yes! See [Best Practices - Caching Patterns](BEST-PRACTICES.md#caching-patterns)

**Q: Where do I report issues?**  
A: [GitHub Issues](https://github.com/firrthecreator/myanimelist-wrapper/issues)

For more FAQ, see [Troubleshooting FAQ](TROUBLESHOOTING.md#faq).

---

## 🔗 External Resources

- **[Jikan API Documentation](https://docs.api.jikan.moe/)** - Official Jikan API docs
- **[MyAnimeList](https://myanimelist.net/)** - The data source
- **[GitHub Repository](https://github.com/firrthecreator/myanimelist-wrapper)** - Source code and issues
- **[npm Package](https://www.npmjs.com/package/myanimelist-wrapper)** - Installation and stats

---

## 🔍 Generating TypeDoc Documentation

To generate HTML documentation from TypeScript comments:

```bash
npm run docs
```

This generates interactive HTML documentation in the `docs/html` directory using [TypeDoc](https://typedoc.org/).

---

## 📄 License

MIT © 2026 [Firr, The Creator](https://github.com/firrthecreator)

---

**Last updated: January 2026**
