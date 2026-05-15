<div align="center">
  <a href="https://github.com/lacymorrow/movie-trailer">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/lacymorrow/movie-trailer/master/.github/assets/logo-horizontal-dark.svg">
      <img src="https://raw.githubusercontent.com/lacymorrow/movie-trailer/master/.github/assets/logo-horizontal.svg" alt="movie-trailer" width="360">
    </picture>
  </a>

  <p><strong>Find YouTube trailer URLs for any movie or TV show</strong> ➔ "Up" → https://www.youtube.com/watch?v=…</p>

  <p>
    <a href="https://www.npmjs.com/package/movie-trailer"><img alt="npm version" src="https://img.shields.io/npm/v/movie-trailer?style=flat"></a>
    <a href="https://www.npmjs.com/package/movie-trailer"><img alt="npm downloads" src="https://img.shields.io/npm/dm/movie-trailer?style=flat"></a>
    <a href="https://github.com/lacymorrow/movie-trailer/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/lacymorrow/movie-trailer/ci.yml?style=flat&label=CI"></a>
    <a href="./LICENSE"><img alt="License" src="https://img.shields.io/npm/l/movie-trailer?style=flat"></a>
    <a href="https://npm.runkit.com/movie-trailer"><img alt="Try on RunKit" src="https://img.shields.io/badge/Try-RunKit-f55fa6?style=flat"></a>
  </p>

  <img src="./demo.svg?sanitize=true" alt="movie-trailer demo" width="700">
</div>

---

> [!IMPORTANT]
> This library is **feature-complete** and only receives bug-fix updates. Feature requests still welcome — please open an issue.

## Features

- Fetch YouTube trailers for any movie or TV show
- Return one URL or many — videos, IDs, or full URLs
- Async/await, Promise, **and** callback API
- Use anywhere — browser or Node, UMD bundle ([browser support](https://caniuse.com/#feat=fetch))
- Works in React + Next.js, client and server, via [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch)
- Bring your own TMDB API key, or use the default

## Install

```bash
npm install movie-trailer
```

In the browser:

```html
<!-- movieTrailer as a window global -->
<script src="https://unpkg.com/movie-trailer"></script>
```

Also available via [JSDelivr](https://cdn.jsdelivr.net/npm/movie-trailer/index.min.js).

## Usage

```js
const movieTrailer = require("movie-trailer");
// or: import movieTrailer from "movie-trailer";

await movieTrailer("Up");
//=> https://www.youtube.com/watch?v=...
```

### TV shows

```js
await movieTrailer("Shameless", { videoType: "tv" });
//=> https://www.youtube.com/watch?v=...
```

### Many trailers — IDs only

```js
await movieTrailer("Oceans Eleven", { id: true, multi: true });
//=> ["XXXXXXXXX", "XXXXXXXXX", ...]
```

### Year disambiguation + multiple URLs

```js
await movieTrailer("Oceans Eleven", { year: "1960", multi: true });
//=> ["https://www.youtube.com/watch?v=...", ...]
```

### Legacy positional year

```js
await movieTrailer("Oceans Eleven", 1960);
//=> https://www.youtube.com/watch?v=...
```

> [!TIP]
> Try it live — [open in RunKit](https://runkit.com/lacymorrow/movie-trailer) ([example output](https://runkit.io/lacymorrow/movie-trailer/branches/master?search=Avatar)).

## API

### `movieTrailer(movie [, options] [, callback])`

Pass a movie or show title (or `null` if searching by `tmdbId`). Returns a Promise that resolves to a YouTube URL — or an array of URLs / IDs depending on `options`.

| Option | Type | Default | Description |
|---|---|---|---|
| `apiKey` | `string` | TMDB default | Use your own TMDB key — [get one free](https://developers.themoviedb.org/) |
| `id` | `boolean` | `false` | Return only YouTube video IDs (e.g. `"abc123"` instead of full URLs) |
| `language` | `string` | | Movie release language code (e.g. `"de_DE"`) |
| `multi` | `boolean` | `false` | Return an array of results instead of a single result |
| `tmdbId` | `string \| number` | | Search by TMDB content ID instead of a title (pass `null` as the first argument) |
| `year` | `string \| number` | | Release-year disambiguator |
| `videoType` | `"movie" \| "tv"` | `"movie"` | Movie or TV search |

The third argument may also be a Node-style `(err, response) => void` callback.

### Search by TMDB ID

```js
await movieTrailer(null, { tmdbId: 161 });  // Ocean's Eleven
```

## CLI

```bash
npx movie-trailer --help
#  Usage
#    $ npx movie-trailer movie
#
#  Options
#    --api_key, -k   Your own TMDB API key
#    --id,      -i   Return just the YouTube video ID
#    --language,-l   Language code (e.g. 'de_DE')
#    --multi,   -m   Return an array of URLs
#    --tmdb_id, -t   Search by TMDB ID
#    --year,    -y   Release year
#
#  Example
#    $ npx movie-trailer 'Oceans Eleven' -y 1960 -m
#    => https://www.youtube.com/watch?v=...
```

## Related

Part of a small family of media-data utilities:

- [album-art](https://github.com/lacymorrow/album-art) — Fetch album and artist cover art.
- [movie-art](https://github.com/lacymorrow/movie-art) — Get the poster art for a movie.
- [movie-info](https://github.com/lacymorrow/movie-info) — Get info, images, and ratings about a movie.

## Acknowledgments

- [TMDB](https://www.themoviedb.org) — trailer metadata (subject to the [TMDB Terms of Service](https://www.themoviedb.org/documentation/api/terms-of-use)).
- [YouTube](https://www.youtube.com) — where the trailers actually live.

## License

[MIT](./LICENSE) © [Lacy Morrow](https://lacymorrow.com)

<div align="center">
  <sub>If movie-trailer saved you time, consider <a href="https://github.com/sponsors/lacymorrow">sponsoring on GitHub</a>, <a href="https://patreon.com/lacymorrow">supporting on Patreon</a>, or <a href="https://buymeacoffee.com/lm">buying a coffee</a>.</sub>
</div>
