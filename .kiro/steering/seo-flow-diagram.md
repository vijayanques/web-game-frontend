---
inclusion: manual
---

# SEO Metadata Flow - Visual Diagrams

## Complete User Journey

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          ADMIN WORKFLOW                                  │
└─────────────────────────────────────────────────────────────────────────┘

1. ADMIN LOGS IN
   └─> Admin Dashboard (games_admin)

2. NAVIGATE TO GAME/CATEGORY
   └─> Edit Game/Category Page
       ├─ Basic Info Section
       │  ├─ Title
       │  ├─ Description
       │  └─ Image
       │
       └─ SEO Metadata Section (NEW)
          ├─ Meta Title (60 chars)
          ├─ Meta Description (160 chars)
          ├─ Meta Keywords
          ├─ Canonical URL
          ├─ OG Tags (Title, Description, Image)
          ├─ Twitter Tags (Title, Description, Image)
          └─ Robots Meta Tag

3. FILL IN SEO METADATA
   └─> Admin enters SEO information
       ├─ Validates character limits
       ├─ Shows real-time character count
       └─ Provides helpful hints

4. CLICK "SAVE SEO METADATA"
   └─> SeoMetadataForm Component
       ├─ Validates form data
       ├─ Sends POST request to backend
       └─ Shows success/error toast

5. BACKEND PROCESSES REQUEST
   └─> seoController.upsertSeoMetadata()
       ├─ Validates entity exists
       ├─ Creates or updates SeoMetadata record
       ├─ Stores in database
       └─ Returns success response

6. ADMIN SEES SUCCESS MESSAGE
   └─> "SEO metadata saved successfully"
       └─> Metadata is now live on frontend


┌─────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND WORKFLOW                                 │
└─────────────────────────────────────────────────────────────────────────┘

1. USER VISITS GAME PAGE
   └─> Browser requests: /game/example-game

2. NEXT.JS GENERATES METADATA
   └─> generateMetadata() function runs (server-side)
       ├─ Fetch game data from backend
       │  └─> GET /api/games/slug/example-game
       │
       ├─ Fetch SEO metadata from backend
       │  └─> GET /api/seo/game/123
       │
       ├─ Generate Metadata object
       │  ├─ title: from metaTitle
       │  ├─ description: from metaDescription
       │  ├─ keywords: from metaKeywords
       │  ├─ alternates.canonical: from canonicalUrl
       │  ├─ openGraph: from og* fields
       │  ├─ twitter: from twitter* fields
       │  └─ robots: from robots field
       │
       └─ Return Metadata to Next.js

3. NEXT.JS INJECTS INTO HEAD
   └─> HTML <head> section includes:
       ├─ <title>Meta Title</title>
       ├─ <meta name="description" content="...">
       ├─ <meta name="keywords" content="...">
       ├─ <meta name="robots" content="...">
       ├─ <link rel="canonical" href="...">
       ├─ <meta property="og:title" content="...">
       ├─ <meta property="og:description" content="...">
       ├─ <meta property="og:image" content="...">
       ├─ <meta name="twitter:title" content="...">
       ├─ <meta name="twitter:description" content="...">
       ├─ <meta name="twitter:image" content="...">
       └─ <script type="application/ld+json">...</script>

4. PAGE RENDERS
   └─> Browser displays page with metadata in head

5. SEARCH ENGINES CRAWL
   └─> Google, Bing, etc. read metadata
       ├─ Index page with proper title/description
       ├─ Parse Open Graph tags for social sharing
       ├─ Parse JSON-LD for rich snippets
       └─ Use canonical URL to avoid duplicates

6. SOCIAL MEDIA PREVIEW
   └─> When user shares on Facebook/Twitter
       ├─ Platform fetches OG/Twitter tags
       ├─ Displays custom preview
       └─ Shows OG image


┌─────────────────────────────────────────────────────────────────────────┐
│                      DATA FLOW SEQUENCE                                  │
└─────────────────────────────────────────────────────────────────────────┘

TIME: T0 - Admin saves metadata
┌──────────────────────────────────────────────────────────────────────┐
│ Admin Dashboard                                                      │
│ └─> SeoMetadataForm.handleSubmit()                                   │
│     └─> POST /api/seo/game/123                                       │
│         {                                                            │
│           metaTitle: "Play Action Games Free",                       │
│           metaDescription: "Discover 100+ free action games...",     │
│           metaKeywords: "action, games, free",                       │
│           ogImage: "https://cdn.example.com/og-image.jpg",           │
│           ...                                                        │
│         }                                                            │
└──────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│ Backend API                                                          │
│ └─> seoController.upsertSeoMetadata()                                │
│     ├─> Validate game exists                                         │
│     ├─> Find or create SeoMetadata record                            │
│     ├─> Update with new values                                       │
│     └─> Save to database                                             │
└──────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│ Database                                                             │
│ seo_metadata table                                                   │
│ ┌────────────────────────────────────────────────────────────────┐  │
│ │ id | entityType | entityId | metaTitle | metaDescription | ... │  │
│ ├────────────────────────────────────────────────────────────────┤  │
│ │ 1  | game       | 123      | Play...   | Discover 100+...  | ... │  │
│ └────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    Response: 200 OK
                    └─> Admin sees success toast


TIME: T1+ - User visits page (1+ hour later)
┌──────────────────────────────────────────────────────────────────────┐
│ Browser                                                              │
│ GET /game/example-game                                               │
└──────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│ Next.js Server                                                       │
│ └─> generateMetadata({ params: { slug: 'example-game' } })           │
│     ├─> fetchGameData('example-game')                                │
│     │   └─> GET /api/games/slug/example-game                         │
│     │       └─> Returns: { id: 123, title: "...", ... }              │
│     │                                                                │
│     ├─> fetchSeoMetadata('game', 123)                                │
│     │   └─> GET /api/seo/game/123                                    │
│     │       └─> Returns: { metaTitle: "...", ... }                   │
│     │                                                                │
│     └─> generateMetadataFromSeo(seoData, fallbackData)               │
│         └─> Returns Metadata object                                  │
└──────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│ Next.js                                                              │
│ └─> Injects metadata into HTML <head>                                │
│     ├─ <title>Play Action Games Free</title>                         │
│     ├─ <meta name="description" content="Discover 100+...">          │
│     ├─ <meta property="og:image" content="https://...">              │
│     └─ ... (all other tags)                                          │
└──────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│ Browser                                                              │
│ └─> Renders HTML with metadata in <head>                             │
│     └─> User sees page with proper title/description                 │
└──────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────────┐
│ Search Engines / Social Media                                        │
│ └─> Crawl page and read metadata                                     │
│     ├─ Google indexes with proper title/description                  │
│     ├─ Facebook shows OG preview when shared                         │
│     ├─ Twitter shows Twitter Card preview                            │
│     └─ Rich snippets from JSON-LD                                    │
└──────────────────────────────────────────────────────────────────────┘
```

## Component Interaction Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    ADMIN APPLICATION                            │
│                   (games_admin)                                  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  GameEditPage                                            │  │
│  │  ├─ Displays game basic info                             │  │
│  │  └─ Renders SeoMetadataForm component                    │  │
│  │     │                                                    │  │
│  │     ├─ useQuery: Fetch existing SEO metadata             │  │
│  │     │  └─> GET /api/seo/game/:id                         │  │
│  │     │                                                    │  │
│  │     ├─ Form fields with validation                       │  │
│  │     │  ├─ metaTitle (max 60 chars)                       │  │
│  │     │  ├─ metaDescription (max 160 chars)                │  │
│  │     │  ├─ metaKeywords                                   │  │
│  │     │  ├─ canonicalUrl                                   │  │
│  │     │  ├─ ogTitle, ogDescription, ogImage                │  │
│  │     │  ├─ twitterTitle, twitterDescription, twitterImage │  │
│  │     │  └─ robots (select dropdown)                       │  │
│  │     │                                                    │  │
│  │     ├─ useMutation: Save SEO metadata                     │  │
│  │     │  └─> POST /api/seo/game/:id                        │  │
│  │     │                                                    │  │
│  │     └─ Toast notifications                               │  │
│  │        ├─ Success: "SEO metadata saved"                  │  │
│  │        └─ Error: "Failed to save"                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP Requests
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND API                                  │
│                (game_web_backend)                               │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  seoRoutes.js                                            │  │
│  │  ├─ GET /seo/:entityType/:entityId                       │  │
│  │  ├─ POST /seo/:entityType/:entityId                      │  │
│  │  ├─ PUT /seo/:entityType/:entityId                       │  │
│  │  ├─ DELETE /seo/:entityType/:entityId                    │  │
│  │  └─ GET /seo/type/:entityType                            │  │
│  │     │                                                    │  │
│  │     └─> seoController.js                                 │  │
│  │        ├─ getSeoMetadata()                               │  │
│  │        ├─ upsertSeoMetadata()                            │  │
│  │        ├─ deleteSeoMetadata()                            │  │
│  │        └─ getSeoMetadataByType()                         │  │
│  │           │                                              │  │
│  │           └─> SeoMetadata Model                          │  │
│  │              └─> Database (seo_metadata table)           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP Requests
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  FRONTEND APPLICATION                           │
│                   (game_web_app1)                               │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  game/[slug]/page.tsx                                    │  │
│  │  ├─ export generateMetadata()                            │  │
│  │  │  ├─ fetchGameData(slug)                               │  │
│  │  │  │  └─> GET /api/games/slug/:slug                     │  │
│  │  │  │                                                    │  │
│  │  │  ├─ fetchSeoMetadata('game', gameId)                  │  │
│  │  │  │  └─> GET /api/seo/game/:id                         │  │
│  │  │  │                                                    │  │
│  │  │  └─ generateMetadataFromSeo(seoData, fallback)        │  │
│  │  │     └─> Returns Metadata object                       │  │
│  │  │                                                       │  │
│  │  └─ export default GamePage()                            │  │
│  │     ├─ Renders page content                              │  │
│  │     └─ Includes <StructuredData> component               │  │
│  │        └─> Renders JSON-LD in <script>                   │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  seoMetadataFetcher.ts (Utilities)                       │  │
│  │  ├─ fetchSeoMetadata()                                   │  │
│  │  ├─ generateMetadataFromSeo()                            │  │
│  │  ├─ generateGameStructuredData()                         │  │
│  │  └─ generateCategoryStructuredData()                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  StructuredData.tsx (Component)                          │  │
│  │  └─> Renders <script type="application/ld+json">         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTML with metadata
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BROWSER / SEARCH ENGINES                      │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  HTML <head>                                             │  │
│  │  ├─ <title>Meta Title</title>                            │  │
│  │  ├─ <meta name="description" content="...">              │  │
│  │  ├─ <meta name="keywords" content="...">                 │  │
│  │  ├─ <meta name="robots" content="...">                   │  │
│  │  ├─ <link rel="canonical" href="...">                    │  │
│  │  ├─ <meta property="og:title" content="...">             │  │
│  │  ├─ <meta property="og:description" content="...">       │  │
│  │  ├─ <meta property="og:image" content="...">             │  │
│  │  ├─ <meta name="twitter:title" content="...">            │  │
│  │  ├─ <meta name="twitter:description" content="...">      │  │
│  │  ├─ <meta name="twitter:image" content="...">            │  │
│  │  └─ <script type="application/ld+json">...</script>      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Search Engine Results                                   │  │
│  │  ├─ Title from <title> tag                               │  │
│  │  ├─ Description from meta description                    │  │
│  │  ├─ URL with canonical link                              │  │
│  │  └─ Rich snippets from JSON-LD                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Social Media Preview                                    │  │
│  │  ├─ Title from og:title                                  │  │
│  │  ├─ Description from og:description                      │  │
│  │  ├─ Image from og:image                                  │  │
│  │  └─ (or Twitter tags if og tags missing)                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## State Management Flow

```
Admin Form State:
┌─────────────────────────────────────────┐
│ formData = {                            │
│   metaTitle: string                     │
│   metaDescription: string               │
│   metaKeywords: string                  │
│   canonicalUrl: string                  │
│   ogTitle: string                       │
│   ogDescription: string                 │
│   ogImage: string                       │
│   twitterTitle: string                  │
│   twitterDescription: string            │
│   twitterImage: string                  │
│   robots: string                        │
│ }                                       │
└─────────────────────────────────────────┘
         │
         │ onChange
         ▼
┌─────────────────────────────────────────┐
│ setFormData(prev => ({                  │
│   ...prev,                              │
│   [name]: value                         │
│ }))                                     │
└─────────────────────────────────────────┘
         │
         │ onSubmit
         ▼
┌─────────────────────────────────────────┐
│ saveMutation.mutate(formData)            │
│ ├─ Loading state: true                  │
│ ├─ POST /api/seo/game/:id               │
│ └─ Loading state: false                 │
└─────────────────────────────────────────┘
         │
         ├─ Success
         │  └─> toast.success()
         │      └─> onSuccess callback
         │
         └─ Error
            └─> toast.error()
```

## Caching Strategy

```
Frontend Caching (1 hour):
┌──────────────────────────────────────────────────┐
│ fetch(url, { next: { revalidate: 3600 } })       │
│                                                  │
│ Time: 0:00 - First request                       │
│ └─> Fetch from backend, cache result             │
│                                                  │
│ Time: 0:30 - Second request                      │
│ └─> Return cached result (no API call)           │
│                                                  │
│ Time: 1:00 - Third request                       │
│ └─> Cache expired, fetch fresh data              │
└──────────────────────────────────────────────────┘

Database Indexes:
┌──────────────────────────────────────────────────┐
│ UNIQUE INDEX idx_entity                          │
│ ON seo_metadata(entityType, entityId)            │
│                                                  │
│ Enables fast lookups:                            │
│ SELECT * FROM seo_metadata                       │
│ WHERE entityType='game' AND entityId=123         │
│ └─> O(1) lookup time                             │
└──────────────────────────────────────────────────┘
```
