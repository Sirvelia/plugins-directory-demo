# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application using the App Router that provides a WordPress plugin directory search interface. The application integrates with the Ploogins API to search and display WordPress plugins with AI-powered overviews, filtering, comparison tools, and detailed plugin views.

**Key Technologies:**
- Next.js 16 with App Router and Turbopack
- React 19
- TypeScript (strict mode)
- Tailwind CSS 4
- Zustand for state management
- Radix UI components
- OpenAI SDK for AI overviews
- Vercel Analytics & Speed Insights

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build production version with Turbopack
npm run build

# Start production server
npm start
```

## Architecture

### Route Structure

The app uses Next.js route groups for organization:

- **`app/(main)/`** - Main application routes
  - `/search/[query]` - Search entry point that processes query parameters and creates search intent, then redirects to results
  - `/results/[search_intent_id]` - Displays search results with sorting, filtering, and comparison tools
  - `/[slug]` - Individual plugin detail pages
  - `/compare` - Side-by-side plugin comparison view

- **`app/(root)/`** - Root route (home page)

### Data Flow

1. **Search Flow:**
   - User enters query → `/search/[query]` page
   - Page calls `createSearchIntent()` server action with search parameters
   - API returns `search_intent_id`
   - Redirects to `/results/[search_intent_id]`
   - Results page calls `getResults()` to fetch plugin data

2. **Refine Parameters:**
   Search accepts URL params: `latestWP`, `lastUpdated`, `popularity`, `rating`
   These map to API params: `min_tested_version`, `min_last_updated`, `min_active_installs`, `min_rating`

3. **AI Overview:**
   - When search has `hyde` field, AI overview is shown
   - Calls `getAIOverview()` server action with search intent UUID
   - Uses OpenAI GPT-4o-mini to generate concise search strategy explanation

### Server Actions (`actions/`)

All API interactions use server actions:

- **`search.ts`** - Creates search intents and fetches results from Ploogins API
- **`ai-overview.ts`** - Generates AI-powered search strategy summaries using OpenAI
- **`plugin-data.ts`** - Fetches individual plugin data
- **`related-plugins.ts`** - Fetches related plugins
- **`suggerence.ts`** - Gets plugin insights
- **`token.ts`** - Generates JWT tokens for API authentication

All API calls use an axios instance with automatic JWT token injection via interceptors.

### State Management

**Zustand Store (`stores/compareStore.ts`):**
- Manages plugin comparison feature
- Maximum 4 plugins can be compared simultaneously
- Prevents duplicate additions
- Global state accessible across the app

### Component Organization

Components are organized by feature in `components/`:

- **Search Components:** `SearchInput`, `SearchActions` (includes Sort, Refine, Compare buttons, AI Overview)
- **Display Components:** `PluginGrid`, `PluginCard`, `Results`
- **Detail Components:** `SinglePlugin` (with tabs for details, installation, FAQ, changelog, reviews)
- **Comparison:** `CompareResults`, `CompareFooter`
- **UI Components:** `components/ui/` contains Radix-based components (tabs, buttons, cards, etc.)

### Type Definitions (`types/index.ts`)

Core types:
- `WordPressPlugin` - Complete plugin data structure from WordPress.org API
- `SearchIntent` - Search intent response with plugin results
- `SearchIntentParams` - Parameters for creating search intents
- `SearchResults` - Search results including query and optional HyDE description
- `SuggerencePluginInsights` - AI-generated plugin analysis

### Utilities (`lib/`)

- **`parse-faq.ts`** - Parses WordPress FAQ HTML structure
- **`utils.ts`** - Common utilities including `cn()` for className merging

### Environment Variables

Required in `.env`:
- `SERVICE_NAME` - Service identifier for Ploogins API
- `LICENSE_KEY` - License key for Ploogins API
- `PLOOGINS_SECRET` - Secret for JWT token generation
- `OPENAI_API_KEY` - OpenAI API key for AI overviews

### Image Configuration

Next.js image optimization is configured for:
- `plugins.svn.wordpress.org` - Plugin banners/screenshots
- `ps.w.org` - WordPress.org plugin assets
- `secure.gravatar.com` - Author avatars

### Path Aliases

Use `@/*` to import from project root (configured in `tsconfig.json`).

## Key Features

- **AI-Powered Search:** Uses HyDE (Hypothetical Document Embeddings) for semantic plugin search
- **Advanced Filtering:** Filter by WordPress version compatibility, last update, popularity, ratings
- **Plugin Comparison:** Compare up to 4 plugins side-by-side
- **AI Overview:** GPT-4o-mini generates concise explanations of search strategy
- **Single Plugin View:** Detailed tabs for plugin info, installation, FAQ, changelog, reviews
- **Responsive Design:** Mobile-first responsive layout with Tailwind CSS

## Important Notes

- All API calls require JWT authentication (handled automatically by axios interceptor)
- Search intent IDs are UUIDs that expire - they reference cached search results
- The app uses React 19 with Next.js 16 - ensure compatibility when adding dependencies
- Turbopack is enabled for both dev and build - don't disable it
- Client components are clearly marked with `'use client'`
- Server actions are marked with `'use server'`
