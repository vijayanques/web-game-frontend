# Architecture - Dynamic Game Detail Page

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                    http://0.0.0.0:3000                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP Request
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (game_web_app1)                      │
│                         Next.js 15                               │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  /game/[slug]/page.tsx                                    │  │
│  │  - Dynamic route handler                                  │  │
│  │  - Fetches game data                                      │  │
│  │  - Renders UI components                                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  /lib/api.ts                                              │  │
│  │  - getGameBySlug()                                        │  │
│  │  - getSimilarGames()                                      │  │
│  │  - trackGamePlay()                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  /types/game.ts                                           │  │
│  │  - TypeScript interfaces                                  │  │
│  │  - Type safety                                            │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ API Calls
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND (games_admin)                          │
│                  http://192.168.1.118:8000                      │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  GET /api/games/[slug]                                    │  │
│  │  - Fetch game by slug                                     │  │
│  │  - Return enriched game data                              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  GET /api/games?category=X&limit=Y                        │  │
│  │  - List/filter games                                      │  │
│  │  - Return similar games                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  POST /api/user-activity                                  │  │
│  │  - Track game plays                                       │  │
│  │  - Store user activity                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ SQL Queries
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE (MySQL)                            │
│                         games_db                                 │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │   categories     │  │      games       │  │user_activity │ │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────┤ │
│  │ id               │  │ id               │  │ id           │ │
│  │ name             │  │ title            │  │ user_id      │ │
│  │ slug             │  │ slug             │  │ game_id      │ │
│  │ description      │  │ description      │  │ category_id  │ │
│  │ created_at       │  │ thumbnail        │  │ played_at    │ │
│  └──────────────────┘  │ game_url         │  └──────────────┘ │
│                        │ iframe_url       │                    │
│                        │ rating           │                    │
│                        │ category_id (FK) │                    │
│                        │ is_active        │                    │
│                        │ created_at       │                    │
│                        │ updated_at       │                    │
│                        └──────────────────┘                    │
└─────────────────────────────────────────────────────────────────┘
```

## Request Flow

### 1. User Visits Game Page

```
User enters URL: /game/valorant-champions
         │
         ▼
Next.js Router matches: /game/[slug]
         │
         ▼
page.tsx component loads
         │
         ▼
useEffect hook triggers
         │
         ▼
Calls: getGameBySlug('valorant-champions')
```

### 2. Fetch Game Data

```
Frontend: getGameBySlug('valorant-champions')
         │
         ▼
API Call: GET http://192.168.1.118:8000/api/games/valorant-champions
         │
         ▼
Backend: /api/games/[slug]/route.ts
         │
         ▼
SQL Query: SELECT * FROM games WHERE slug = 'valorant-champions'
         │
         ▼
Database returns game data
         │
         ▼
Backend enriches data (adds howToPlay, tips, etc.)
         │
         ▼
Returns JSON response
         │
         ▼
Frontend receives data
         │
         ▼
Updates state: setGame(data)
         │
         ▼
React re-renders with game data
```

### 3. Fetch Similar Games

```
Frontend: getSimilarGames(categoryId, gameId)
         │
         ▼
API Call: GET /api/games?category=1&exclude=5&limit=6
         │
         ▼
Backend: /api/games/route.ts
         │
         ▼
SQL Query: SELECT * FROM games 
           WHERE category_id = 1 
           AND id != 5 
           LIMIT 6
         │
         ▼
Database returns similar games
         │
         ▼
Returns JSON response
         │
         ▼
Frontend receives data
         │
         ▼
Updates state: setSimilarGames(data)
         │
         ▼
React re-renders similar games section
```

### 4. Track User Activity

```
User clicks "Play Now"
         │
         ▼
handlePlayGame() function
         │
         ▼
Calls: trackGamePlay(userId, gameId, categoryId)
         │
         ▼
API Call: POST /api/user-activity
         │
         ▼
Backend: /api/user-activity/route.ts
         │
         ▼
SQL Query: INSERT INTO user_activity 
           (user_id, game_id, category_id) 
           VALUES (1, 5, 1)
         │
         ▼
Database saves activity
         │
         ▼
Returns success response
         │
         ▼
Activity tracked (used for recommendations)
```

## Component Structure

```
page.tsx (Main Component)
│
├── Game Player Section
│   ├── iframe (game embed)
│   ├── Loading overlay
│   └── Control bar
│       ├── Like button
│       ├── Wishlist button
│       └── Share button
│
├── Game Info Section
│   ├── Title & metadata
│   ├── Developer info
│   ├── Rating & votes
│   └── Platforms
│
├── Tags Section
│   └── Category tags
│
├── Tabs Navigation
│   ├── All
│   ├── Overview
│   └── Gameplay
│
├── Content Sections
│   ├── Overview
│   │   ├── Description
│   │   ├── How to Play
│   │   ├── Game Modes
│   │   ├── Tips
│   │   └── Features
│   │
│   └── Gameplay
│       └── Controls
│
└── Sidebar
    ├── Play button card
    ├── Quick stats
    ├── Similar games
    └── Platforms info
```

## Data Models

### GameDetail Interface
```typescript
interface GameDetail {
  id: number
  title: string
  slug: string
  description: string
  thumbnail: string
  game_url: string
  iframe_url?: string
  rating: number
  votes: string
  category: string
  category_id: number
  developer: string
  released: string
  technology: string
  platforms: string[]
  howToPlay?: HowToPlayStep[]
  gameModes?: GameMode[]
  tips?: string[]
  features?: string[]
  tags?: Tag[]
  controls?: Control[]
}
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Valorant Champions",
    "slug": "valorant-champions",
    ...
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Game not found"
}
```

## Database Relationships

```
categories (1) ──────< (N) games
                         │
                         │
                         │
                         ▼
                    user_activity (N)
                         │
                         │
                         ▼
                      users (1)
```

## Caching Strategy

```
┌─────────────────────────────────────────┐
│         Browser Cache                    │
│  - Static assets (images, CSS, JS)      │
│  - Duration: 1 year                      │
└─────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│      Next.js Data Cache                  │
│  - API responses                         │
│  - Duration: 5 minutes (revalidate)     │
└─────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│      Backend API                         │
│  - Fresh data from database              │
└─────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│      MySQL Database                      │
│  - Source of truth                       │
└─────────────────────────────────────────┘
```

## Security Considerations

1. **SQL Injection Prevention**
   - Using parameterized queries
   - mysql2 library handles escaping

2. **XSS Prevention**
   - React automatically escapes content
   - Sanitize user input

3. **CORS**
   - Configure allowed origins
   - Restrict API access

4. **Rate Limiting**
   - Implement rate limiting on API
   - Prevent abuse

## Performance Optimizations

1. **Database Indexes**
   ```sql
   CREATE INDEX idx_games_slug ON games(slug);
   CREATE INDEX idx_games_category_rating ON games(category_id, rating);
   ```

2. **Connection Pooling**
   - MySQL connection pool (10 connections)
   - Reuse connections

3. **Data Caching**
   - Next.js revalidate: 300 seconds
   - Reduce database queries

4. **Lazy Loading**
   - Load similar games after main content
   - Optimize initial page load

## Scalability

### Current Setup (Small Scale)
- Single MySQL instance
- Direct API calls
- No caching layer

### Future Improvements (Large Scale)
- Add Redis for caching
- Implement CDN for static assets
- Database read replicas
- Load balancer for API
- Microservices architecture

## Monitoring & Logging

### What to Monitor:
1. API response times
2. Database query performance
3. Error rates
4. User activity patterns
5. Popular games

### Logging Strategy:
```javascript
// Backend logging
console.log('[API] GET /api/games/valorant-champions')
console.error('[ERROR] Database connection failed')

// Frontend logging
console.log('[FETCH] Loading game:', slug)
console.error('[ERROR] Failed to fetch game:', error)
```

## Deployment Architecture

```
┌─────────────────────────────────────────┐
│         Production Environment           │
├─────────────────────────────────────────┤
│                                          │
│  Frontend (Vercel/Netlify)              │
│  - Next.js app                           │
│  - Static assets on CDN                  │
│                                          │
│  Backend (VPS/Cloud)                     │
│  - Node.js API                           │
│  - PM2 process manager                   │
│                                          │
│  Database (Managed MySQL)                │
│  - AWS RDS / DigitalOcean                │
│  - Automated backups                     │
│                                          │
└─────────────────────────────────────────┘
```

## Summary

This architecture provides:
- ✅ Clean separation of concerns
- ✅ Type-safe data flow
- ✅ Scalable structure
- ✅ Easy to maintain
- ✅ Performance optimized
- ✅ Security best practices

The system is designed to be simple yet powerful, allowing for easy expansion and customization as your needs grow.
