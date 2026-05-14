# Security Policy

## Reporting a vulnerability

`movie-trailer` is a small library and its attack surface is limited (it makes HTTPS requests to TMDB on your behalf). Still — if you've found something, please report it privately:

➔ https://github.com/lacymorrow/movie-trailer/security/advisories/new

Or email **lacy@lacymorrow.com** with `[movie-trailer security]` in the subject.

Expect an acknowledgement within 72 hours.

## Supported versions

Only the latest published version on npm receives security updates.

## Scope

In scope:
- The published `movie-trailer` npm package
- Network handling, response parsing, callback contract

Out of scope:
- Vulnerabilities in TMDB's API (please report to TMDB)
- Issues in transitive dependencies (report upstream)
