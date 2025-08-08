# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm run dev` - Start development server with cache refresh and turbopack
- `pnpm run build` - Build production version with cache refresh
- `pnpm start` - Start production server
- `pnpm run lint` - Run Next.js linting
- `pnpm run cache:posts` - Manually refresh posts cache from Notion

The `cache:posts` command automatically runs before dev and build to ensure fresh content.

## Architecture Overview

This is a Next.js 15+ blog powered by Notion as CMS. The architecture follows these key patterns:

### Content Management System
- **Notion Integration**: Uses `@notionhq/client` to fetch content from Notion database
- **Caching Strategy**: Posts are cached locally in `posts-cache.json` to avoid API rate limits
- **Content Processing**: `notion-to-md` converts Notion pages to markdown for rendering

### Data Flow
1. `scripts/cache-posts.ts` fetches published posts from Notion and stores them in local cache
2. `src/lib/notion.ts` provides utilities for reading from cache and interacting with Notion API
3. Posts are served from cache for better performance

### Key Components
- `src/lib/notion.ts` - Core Notion integration and data fetching
- `scripts/cache-posts.ts` - Caching script that runs before build/dev
- `src/app/posts/[slug]/page.tsx` - Dynamic post pages
- `src/components/mdx-component.tsx` - Markdown rendering with custom components

### Required Environment Variables
- `NOTION_TOKEN` - Notion integration token
- `NOTION_DATABASE_ID` - ID of Notion database containing posts
- `NEXT_PUBLIC_SITE_URL` - Site URL for SEO and metadata

### Database Schema
Notion database must have these properties:
- `Title` (title) - Post title
- `Status` (status) - Publication status (must be "Published" to appear)
- `Published Date` (date) - Publication date for sorting
- `Author` (people) - Post author
- `Tags` (multi-select) - Post tags
- `Category` (select) - Post category
- `Featured Image` (url) - Cover image URL

### Styling and UI
- Uses Tailwind CSS v4 with custom configuration
- shadcn/ui components in `src/components/ui/`
- Dark mode support via `next-themes`
- Typography plugin for markdown content rendering
- Custom typography system: Space Mono (headings), Raleway (body), Open Sans (paragraphs)

### Visual Style Guide
The project includes a complete visual style guide in `visual-style-guide/` directory that is excluded from builds but serves as reference material. This contains component examples, font documentation, and design system guidelines.[byterover-mcp]

# important 
always use byterover-retrive-knowledge tool to get the related context before any tasks 
always use byterover-store-knowledge to store all the critical informations after sucessful tasks