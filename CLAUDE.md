# Ancient Path - Project Documentation

## Overview

Ancient Path is a bilingual (English/Spanish) content platform for Jason R. Henderson's
spiritual teachings, writings, and resources. The site serves as a hub for Christian
teachings, blog posts, podcast distribution, meeting recordings, and educational
resources.

**Live Site**: https://hender.blog **Tech Stack**: Next.js 13 (App Router), React 18,
TypeScript, Tailwind CSS, Cosmic CMS **Version**: 3.2.1

## Project Purpose

This platform solves the need for:

- Distributing Christian teachings and spiritual content in multiple languages
- Managing podcast distribution with proper RSS feeds for iTunes
- Hosting meeting recordings with a global audio player
- Providing parenting resources and book recommendations

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

1. **Hybrid Rendering** - Server Components by default with selective Client Components
2. **React Context + Reducer** - Global state management for audio player, language,
   sidebar
3. **Request Deduplication** - React's `cache()` function wraps data fetchers
4. **Server Actions** - Language initialization and server-side logic
5. **Dynamic Routing** - Slug-based routing for posts, teachings, and series

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
- **Dynamic Path Conversion**: `getAlternateLanguagePath()` converts between languages
- **Language Switcher**: Toggle in Chrome component updates state and redirects
- **Type Safety**: `type Language = "en" | "es"`

### Content Management (Cosmic CMS)

All content is fetched from Cosmic CMS:

- `getAllPosts()` - Fetch all blog posts
- `getPost(slug, language)` - Get single post
- `getAllSeries()` - Fetch all teaching series
- `getSeries(slug, language)` - Get single series with related posts
- `getAllMeetingAudios()` - Fetch meeting recordings

**Caching Strategy**: Always fetches fresh data from Cosmic CMS with React `cache()` for
request deduplication within a render cycle.

### Podcast System

Dual-language podcast feeds are generated on-demand:

1. **On-Demand Generation**: RSS feeds are generated when requested
2. **RSS Generation**: Fetches posts and series from Cosmic CMS, converts to iTunes-compatible XML
3. **Feed Endpoints**:
   - `/podcast.en.rss/route.ts` - English feed
   - `/podcast.es.rss/route.ts` - Spanish feed
4. **Caching**: Route responses cached for 60 minutes - generated RSS XML is served from cache
5. **Fresh Data**: When cache expires, feeds regenerate with fresh data from Cosmic CMS
6. **Metadata**: Supports iTunes podcast tags, enclosures, series info

### Series Support

Content can be organized into series:

- Each series has its own landing page
- Posts can belong to a series via `series` metadata
- `SeriesNav` component shows series context and navigation
- Series-aware sorting and filtering

## Environment Variables

Required environment variables (set in `.env.local`):

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
VERCEL_ENV=development|preview|production
VERCEL_URL=your-deployment-url
```

## Development Workflow

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Run tests
npm test
```

### Making Changes

1. **Adding a New Page**
   - Create file in `app/(ui)/your-route/page.tsx`
   - Add corresponding Spanish route if needed
   - Update navigation in `GlobalNav.tsx`
   - Add language path mapping in `navigation.ts`

2. **Adding Content Types**
   - Define TypeScript types in `lib/types.ts`
   - Add fetcher function in `lib/get-data.ts`
   - Create conversion function in `lib/data-conversion.ts`
   - Update relevant templates

3. **Styling Components**
   - Use Tailwind utility classes first
   - Create CSS module for complex scoped styles
   - Add custom Tailwind classes in `styles/globals.css`
   - Update `tailwind.config.ts` for theme extensions

4. **State Management**
   - Add action types in `lib/state/store.ts`
   - Update reducer with new action handlers
   - Use `useGlobalState()` hook in components
   - Dispatch actions via `dispatch(action)`

## Important Files

### Core Application Files

- `app/(ui)/layout.tsx` - Root layout, wraps app with providers
- `components/Chrome.tsx` - Main layout shell (sidebar, nav, audio player)
- `lib/state/GlobalStateProvider.tsx` - Context provider for global state
- `lib/state/store.ts` - Reducer logic and state schema

### Data Layer

- `lib/get-data.ts` - All Cosmic CMS data fetching functions
- `lib/data-conversion.ts` - Converts API responses to domain models
- `lib/types.ts` - TypeScript type definitions for entire app

### Content Pages

- `app/(ui)/page.tsx` - Home page
- `app/(ui)/teachings/page.tsx` - Teachings list (English)
- `app/(ui)/teachings/[slug]/page.tsx` - Individual teaching
- `app/(ui)/posts/[slug]/page.tsx` - Individual blog post

### API Routes

- `app/api/download-audio/[url]/route.ts` - Audio proxy
- `app/(ui)/podcast.en.rss/route.ts` - English podcast RSS feed
- `app/(ui)/podcast.es.rss/route.ts` - Spanish podcast RSS feed

### Utilities

- `lib/navigation.ts` - Language-aware path conversion
- `lib/dates.ts` - Date formatting helpers
- `lib/podcast.ts` - RSS XML generation
- `lib/actions.ts` - Server actions (language init)

## Code Conventions

### TypeScript

- Explicit types for all function parameters and returns
- Separate API types (`ApiPost`) from domain types (`Post`)
- Use discriminated unions for complex state (e.g., `AudioState`)

### Components

- Async server components by default
- Use `"use client"` directive only when needed
- Props interfaces inline or in same file

### Styling

- Tailwind utility classes for most styling
- CSS Modules for complex component styles
- Custom classes in `globals.css` using @layer directive
- Responsive design with mobile-first approach

### File Naming

- PascalCase: React components (`AudioPlayer.tsx`)
- kebab-case: Route segments (`app/(ui)/acerca-de-mi/`)
- camelCase: Utility functions (`getAllPosts`)
- Bilingual routes: English first, then Spanish parallel

### State Management

- Context + Reducer pattern for global state
- Avoid prop drilling
- Keep state minimal and normalized
- Side effects in useEffect hooks

## Common Tasks

### Update Site Content

Content is managed in Cosmic CMS dashboard. No code changes needed for:

- Adding/editing posts
- Adding/editing teachings
- Adding/editing meeting audios
- Updating series information

Podcast RSS feeds are generated automatically on-demand with 60-minute caching.

## Deployment

### Vercel Deployment

The site auto-deploys on push to master:

1. Push commits to GitHub
2. Vercel detects changes
3. Runs `npm run build`
4. Deploys to production

### Environment Variables

Set in Vercel dashboard:

- Navigate to Project Settings > Environment Variables
- Add all variables from `.env.local`
- Set appropriate scope (Production, Preview, Development)

## Testing

### Running Tests

```bash
npm test              # Run all tests
npm test -- --watch   # Watch mode
```
