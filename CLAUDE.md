# Ancient Path - Project Documentation

## Session Startup - User Detection

**At the start of every session, run `pwd` to check the current working
directory path.**

- If the path contains `jared`, `kiah`, or `miciah`, proceed normally with this
  documentation.
- If the path does NOT contain any of those names, assume you are working with
  **Jason**.
  - **Read and follow the instructions in `JASON.md`** in addition to this file.
  - JASON.md contains specific instructions for onboarding Jason, handling git
    commits for him, starting the dev server, and other workflow guidance.

---

## Overview

Ancient Path is a bilingual (English/Spanish) content platform for Jason R.
Henderson's spiritual teachings, writings, and resources. The site serves as a
hub for Christian teachings, blog posts, podcast distribution, meeting
recordings, and educational resources.

**Live Site**: https://hender.blog

## Architecture

### Tech Stack

**Core Framework**

- Next.js 13.5.4 (App Router with Server Components)
- React 18
- TypeScript (strict mode enabled)

**Styling**

- Tailwind CSS 3.4.1 with custom configuration
- @tailwindcss/typography for prose content
- CSS Modules for component-scoped styles
- PostCSS with Autoprefixer

**External Services**

- **Cosmic CMS** (@cosmicjs/sdk) - Headless CMS for all content
- **Formspree** (@formspree/react) - Contact form handling
- **Digital Ocean Spaces** - Asset hosting for podcast images
- **Vercel** - Deployment platform

### Architecture Patterns

- Server Components by default, Client Components where needed
- React Context + Reducer for global state (audio player, language, sidebar)
- React `cache()` wraps data fetchers for request deduplication

## Directory Structure

```
/
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── download-audio/      # Audio proxy endpoint
│   └── (ui)/                    # UI route group (23 pages)
│       ├── page.tsx             # Home page
│       ├── layout.tsx           # Root layout with providers
│       ├── teachings/           # English teachings
│       ├── ensenanzas/          # Spanish teachings
│       ├── posts/               # English blog posts
│       ├── publicaciones/       # Spanish blog posts
│       ├── podcast-en/          # English podcast page
│       ├── podcast-es/          # Spanish podcast page
│       ├── podcast.en.rss/      # English RSS feed
│       ├── podcast.es.rss/      # Spanish RSS feed
│       ├── meetings/            # English meeting audios
│       ├── reuniones/           # Spanish meeting audios
│       ├── about/               # English about page
│       ├── acerca-de-mi/        # Spanish about page
│       ├── books/               # Books page
│       ├── libros/              # Spanish books page
│       ├── parenting/           # Parenting resources
│       ├── crianza/             # Spanish parenting
│       ├── contact/             # Contact form
│       └── contacto/            # Spanish contact form
│
├── components/                  # Reusable React components
│   ├── AudioPlayer.tsx          # Global audio player widget
│   ├── Chrome.tsx               # Main layout shell with sidebar
│   ├── GlobalNav.tsx            # Navigation component
│   ├── LanguageSwitcher.tsx     # Language toggle
│   ├── Button.tsx               # Reusable button
│   ├── PostPreview.tsx          # Post list item
│   ├── SeriesNav.tsx            # Series navigation
│   └── templates/**             # Page-specific templates
│
├── lib/                         # Utilities and business logic
│   ├── get-data.ts              # Cosmic CMS data fetching
│   ├── types.ts                 # TypeScript type definitions
│   ├── data-conversion.ts       # API to domain model conversion
│   ├── podcast.ts               # RSS XML generation
│   ├── actions.ts               # Server actions
│   ├── navigation.ts            # Language-aware routing
│   ├── hooks.ts                 # Custom React hooks
│   ├── dates.ts                 # Date formatting utilities
│   ├── fonts.ts                 # Font loading configuration
│   ├── CachePost.tsx            # Client component for post caching
│   ├── __tests__/               # Unit tests
│   └── state/                   # Global state management
│       ├── GlobalStateProvider.tsx
│       └── store.ts             # Reducer and state schema
```

## Key Concepts

### Bilingual Content System

The site supports English and Spanish with:

- **Language Detection**: Server actions check cookies, then browser headers
- **Path-based Routing**: `/teachings` (EN) vs `/ensenanzas` (ES)
- **Dynamic Path Conversion**: `getAlternateLanguagePath()` converts between
  languages
- **Language Switcher**: Toggle in Chrome component updates state and redirects
- **Type Safety**: `type Language = "en" | "es"`

### Content Management (Cosmic CMS)

All content is fetched from Cosmic CMS via `lib/get-data.ts`:

- `getPostsForList()` / `getPostsForRSS()` - Fetch posts (list vs full content)
- `getTeachingsForList()` - Fetch teachings for list display
- `getPostBySlug(slug)` - Get single post/teaching by slug
- `getAllSeries()` / `getSeriesBySlug(slug)` - Fetch series
- `getPostsBySeriesId(id)` - Get posts in a series
- `getAllMeetingAudios()` - Fetch meeting recordings

**Caching**: Next.js revalidation (1 hour) + React `cache()` for request
deduplication.

### Podcast System

iTunes-compatible RSS feeds generated on-demand at `/podcast.en.rss` and
`/podcast.es.rss`. Cached for 1 hour. Generation logic in `lib/podcast.ts`.

### Series Support

Posts/teachings can belong to a series. Series have landing pages at
`/teachings/series/[slug]`.

## Environment Variables

Set in `.env.local`: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`,
`NEXT_PUBLIC_FORMSPREE_ID`

## Development Workflow

```bash
npm install    # Install dependencies
npm run dev    # Dev server
npm run build  # Production build
npm test       # Run tests
npm run typecheck  # Type check
```

### Making Changes

- **New page**: Create in `app/(ui)/your-route/page.tsx`, add Spanish route,
  update `navigation.ts`
- **New content type**: Add types in `lib/types.ts`, fetcher in
  `lib/get-data.ts`, converter in `lib/data-conversion.ts`

## Code Conventions

- **TypeScript**: Separate API types (`ApiPost`) from domain types (`Post`) in
  `lib/types.ts`
- **Components**: Server components by default, `"use client"` only when needed
- **Styling**: Tailwind utility classes, CSS Modules for complex styles
- **State**: Context + Reducer pattern in `lib/state/`

## Deployment

Auto-deploys to Vercel on push to master. Environment variables set in Vercel
dashboard.
