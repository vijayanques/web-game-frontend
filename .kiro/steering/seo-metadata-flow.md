---
inclusion: manual
---

# SEO Metadata Flow Architecture

## Overview

This document describes the complete flow for managing and implementing SEO metadata across the ThePlayFree ecosystem. The system allows admins to add SEO metadata (meta titles, descriptions, keywords, OG images, etc.) from the admin dashboard, which automatically gets implemented on the respective frontend pages.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     ADMIN DASHBOARD                             │
│                   (games_admin)                                  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Game/Category Edit Page                                 │  │
│  │  ├─ Basic Info (title, description, etc.)               │  │
│  │  └─ SEO Metadata Form Component                          │  │
│  │     ├─ Meta Title (60 chars)                             │  │
│  │     ├─ Meta Description (160 chars)                      │  │
│  │     ├─ Meta Keywords                                     │  │
│  │     ├─ Canonical URL                                     │  │
│  │     ├─ OG Title, Description, Image                      │  │
│  │     ├─ Twitter Title, Description, Image                 │  │
│  │     └─ Robots Meta Tag                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           │                                      │
│                           │ Save SEO Metadata                    │
│                           ▼                                      │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ POST /api/seo/:entityType/:entityId
                            │
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND API                                   │
│                (game_web_backend)                                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  SEO Controller (seoController.js)                       │  │
│  │  ├─ GET /seo/:entityType/:entityId                       │  │
│  │  ├─ POST /seo/:entityType/:entityId (upsert)             │  │
│  │  ├─ PUT /seo/:entityType/:entityId (update)              │  │
│  │  ├─ DELETE /seo/:entityType/:entityId                    │  │
│  │  └─ GET /seo/type/:entityType (list all)                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           │                                      │
│                           ▼                                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Database (seo_metadata table)                           │  │
│  │  ├─ entityType (game | category)                         │  │
│  │  ├─ entityId (reference to game/category)                │  │
│  │  ├─ metaTitle, metaDescription, metaKeywords            │  │
│  │  ├─ canonicalUrl                                         │  │
│  │  ├─ ogTitle, ogDescription, ogImage                      │  │
│  │  ├─ twitterTitle, twitterDescription, twitterImage      │  │
│  │  ├─ robots                                               │  │
│  │  └─ structuredData (JSON)                                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           │                                      │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ GET /api/seo/:entityType/:entityId
                            │
┌─────────────────────────────────────────────────────────────────┐
│                   FRONTEND APPLICATION                           │
│                   (game_web_app1)                                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Dynamic Page (game/[slug]/page.tsx)                     │  │
│  │  or (category/[slug]/page.tsx)                           │  │
│  │                                                          │  │
│  │  ┌────────────────────────────────────────────────────┐ │  │
│  │  │ generateMetadata() - Server Component              │ │  │
│  │  │ 1. Fetch game/category data                        │ │  │
│  │  │ 2. Fetch SEO metadata from backend                 │ │  │
│  │  │ 3. Generate Next.js Metadata object                │ │  │
│  │  │ 4. Return metadata to Next.js                      │ │  │
│  │  └────────────────────────────────────────────────────┘ │  │
│  │                                                          │  │
│  │  ┌────────────────────────────────────────────────────┐ │  │
│  │  │ Page Component                                     │ │  │
│  │  │ 1. Render page content                             │ │  │
│  │  │ 2. Include StructuredData component                │ │  │
│  │  │    (renders JSON-LD in <head>)                     │ │  │
│  │  └────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           │                                      │
│                           ▼                                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  HTML Head (Generated by Next.js)                        │  │
│  │  ├─ <title>Meta Title</title>                            │  │
│  │  ├─ <meta name="description" content="...">             │  │
│  │  ├─ <meta name="keywords" content="...">                │  │
│  │  ├─ <link rel="canonical" href="...">                   │  │
│  │  ├─ <meta property="og:title" content="...">            │  │
│  │  ├─ <meta property="og:description" content="...">      │  │
│  │  ├─ <meta property="og:image" content="...">            │  │
│  │  ├─ <meta name="twitter:title" content="...">           │  │
│  │  ├─ <meta name="twitter:description" content="...">     │  │
│  │  ├─ <meta name="twitter:image" content="...">           │  │
│  │  ├─ <meta name="robots" content="...">                  │  │
│  │  └─ <script type="application/ld+json">...</script>     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           │                                      │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
                    ┌──────────────────┐
                    │  Search Engines  │
                    │  Social Media    │
                    │  Browsers        │
                    └──────────────────┘
```

## Data Flow

### 1. Admin Creates/Updates SEO Metadata

**Location**: `games_admin/src/components/SeoMetadataForm.tsx`

- Admin navigates to game/category edit page
- Fills in SEO metadata form with:
  - Meta title (60 chars max)
  - Meta description (160 chars max)
  - Keywords (comma-separated)
  - Canonical URL
  - OG tags (title, description, image)
  - Twitter tags (title, description, image)
  - Robots meta tag
- Clicks "Save SEO Metadata"

### 2. Backend Stores Metadata

**Location**: `game_web_backend/src/controllers/seoController.js`

- API endpoint: `POST /api/seo/:entityType/:entityId`
- Controller validates entity exists
- Creates or updates `SeoMetadata` record in database
- Returns success response

**Database Table**: `seo_metadata`
- Stores all SEO metadata with unique constraint on (entityType, entityId)
- Includes JSON field for custom structured data

### 3. Frontend Fetches and Implements Metadata

**Location**: `game_web_app1/src/app/game/[slug]/metadata.ts` (or category equivalent)

- Next.js calls `generateMetadata()` at build/request time
- Function fetches:
  1. Game/category data from backend
  2. SEO metadata from backend
- Generates Next.js `Metadata` object with:
  - Title, description, keywords
  - Canonical URL
  - Open Graph tags
  - Twitter Card tags
  - Robots meta tag
- Next.js automatically injects into `<head>`

### 4. Structured Data Rendering

**Location**: `game_web_app1/src/components/StructuredData.tsx`

- Page component includes `<StructuredData>` component
- Renders JSON-LD in `<script type="application/ld+json">`
- Search engines parse for rich snippets

## Key Files

### Backend

| File | Purpose |
|------|---------|
| `game_web_backend/src/models/SeoMetadata.js` | Database model for SEO metadata |
| `game_web_backend/src/controllers/seoController.js` | API logic for CRUD operations |
| `game_web_backend/src/routes/seoRoutes.js` | API route definitions |

### Frontend

| File | Purpose |
|------|---------|
| `game_web_app1/src/lib/seoMetadataFetcher.ts` | Utility functions for fetching and generating metadata |
| `game_web_app1/src/app/game/[slug]/metadata.ts` | Server-side metadata generation for game pages |
| `game_web_app1/src/app/category/[slug]/metadata.ts` | Server-side metadata generation for category pages |
| `game_web_app1/src/components/StructuredData.tsx` | Component for rendering JSON-LD |

### Admin

| File | Purpose |
|------|---------|
| `games_admin/src/components/SeoMetadataForm.tsx` | Form component for managing SEO metadata |

## API Endpoints

### Get SEO Metadata
```
GET /api/seo/:entityType/:entityId
```
- Returns SEO metadata for a specific entity
- Response: `SeoMetadata` object or 404

### Create/Update SEO Metadata
```
POST /api/seo/:entityType/:entityId
PUT /api/seo/:entityType/:entityId
```
- Request body: SEO metadata fields
- Response: Created/updated `SeoMetadata` object

### Delete SEO Metadata
```
DELETE /api/seo/:entityType/:entityId
```
- Deletes SEO metadata for an entity
- Response: Success message

### List SEO Metadata by Type
```
GET /api/seo/type/:entityType?page=1&limit=20
```
- Lists all SEO metadata for a specific entity type
- Supports pagination
- Response: Paginated list of `SeoMetadata` objects

## Implementation Checklist

- [ ] Add `SeoMetadata` model to backend
- [ ] Create SEO controller and routes
- [ ] Register routes in main Express app
- [ ] Create `seoMetadataFetcher.ts` utility
- [ ] Create metadata generation files for game and category pages
- [ ] Create `SeoMetadataForm` component in admin
- [ ] Integrate form into game/category edit pages
- [ ] Test metadata generation in browser DevTools
- [ ] Verify Open Graph tags with social media debuggers
- [ ] Test structured data with Google Rich Results Test

## Best Practices

### Meta Titles
- Keep between 50-60 characters
- Include primary keyword
- Make it compelling for CTR
- Example: "Play Action Games Free Online | ThePlayFree"

### Meta Descriptions
- Keep between 150-160 characters
- Include primary keyword naturally
- Include call-to-action
- Example: "Discover 100+ free action games. Play instantly in your browser. No downloads needed. Join 1M+ players today!"

### Keywords
- 3-5 primary keywords
- Comma-separated
- Relevant to content
- Example: "action games, free games, online games, browser games"

### Open Graph Images
- Size: 1200x630px (optimal for most platforms)
- Format: JPG or PNG
- Include game thumbnail or category image
- Ensure text is readable at small sizes

### Canonical URLs
- Use absolute URLs
- Point to preferred version
- Prevent duplicate content issues
- Example: "https://theplayfree.com/game/example-game"

### Robots Meta Tag
- Default: "index, follow"
- Use "noindex" for duplicate/thin content
- Use "nofollow" for untrusted links

## Caching Strategy

- Frontend metadata: Cached for 1 hour (3600 seconds)
- Backend API responses: No caching (always fresh)
- Database queries: Optimized with indexes on (entityType, entityId)

## Future Enhancements

1. **Bulk SEO Management**: Import/export SEO metadata
2. **SEO Score**: Calculate SEO score based on metadata completeness
3. **Keyword Research**: Integrate keyword research tools
4. **Competitor Analysis**: Compare metadata with competitors
5. **Auto-generation**: AI-powered metadata suggestions
6. **Sitemap Generation**: Auto-generate XML sitemaps
7. **Robots.txt Management**: Dynamic robots.txt generation
8. **Redirect Management**: Track and manage 301 redirects
