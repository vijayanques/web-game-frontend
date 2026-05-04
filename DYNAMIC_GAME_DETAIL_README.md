# Dynamic Game Detail Page - Implementation Guide

## Overview
The game detail page is now fully dynamic, fetching all data from your backend API. This guide explains how it works and how to customize it.

## Features

### ✅ Dynamic Data Fetching
- Fetches game details from `/api/games/[slug]`
- Loads similar games based on category
- Tracks user activity when playing games
- Real-time loading and error states

### ✅ SEO-Friendly
- Uses Next.js dynamic routes with `[slug]`
- Proper meta tags (can be enhanced with metadata API)
- Clean URLs like `/game/valorant-champions`

### ✅ User Interactions
- Like/Unlike games
- Add to wishlist
- Share functionality
- Play tracking for recommendations

## API Endpoints Required

### 1. Get Game by Slug
**Endpoint:** `GET /api/games/[slug]`

**Example:** `http://192.168.1.118:8000/api/games/valorant-champions`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Valorant Champions",
    "slug": "valorant-champions",
    "description": "A tactical 5v5 shooter...",
    "thumbnail": "/images/game.jpg",
    "game_url": "/play/valorant",
    "iframe_url": "https://example.com/game",
    "rating": 4.8,
    "category": "FPS",
    "category_id": 2,
    "developer": "Riot Games",
    "votes": "1,400,526",
    "released": "March 2021",
    "technology": "HTML5",
    "platforms": ["Browser (desktop, mobile, tablet)"],
    "howToPlay": [
      {
        "title": "Choose Your Agent",
        "body": "Select from 25+ unique agents..."
      }
    ],
    "gameModes": [
      {
        "name": "Competitive",
        "desc": "Ranked 5v5 matches..."
      }
    ],
    "tips": [
      "Communicate with your team",
      "Learn agent abilities"
    ],
    "features": [
      "25+ unique agents",
      "Tactical gameplay"
    ],
    "tags": [
      { "label": "FPS", "count": 121 },
      { "label": "Tactical", "count": 89 }
    ],
    "controls": [
      { "key": "WASD", "action": "Move" },
      { "key": "Mouse", "action": "Aim" }
    ]
  }
}
```

### 2. Get Similar Games
**Endpoint:** `GET /api/games?category={id}&limit={n}&exclude={id}`

**Example:** `http://192.168.1.118:8000/api/games?category=2&limit=6&exclude=1`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "name": "CS2",
      "slug": "cs2",
      "tag": "FPS",
      "rating": 4.7,
      "players": "2.1M",
      "thumbnail": "/images/cs2.jpg",
      "url": "/game/cs2"
    }
  ],
  "count": 6
}
```

### 3. Track User Activity
**Endpoint:** `POST /api/user-activity`

**Request Body:**
```json
{
  "userId": 1,
  "gameId": 5,
  "categoryId": 2
}
```

**Response:**
```json
{
  "success": true,
  "message": "Activity tracked successfully"
}
```

## Database Schema

### Games Table
```sql
CREATE TABLE games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  thumbnail VARCHAR(500),
  game_url VARCHAR(500),
  iframe_url VARCHAR(500),
  rating DECIMAL(3,1) DEFAULT 0,
  category_id INT,
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_category (category_id),
  INDEX idx_rating (rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### Categories Table
```sql
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### User Activity Table
```sql
CREATE TABLE user_activity (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  game_id INT NOT NULL,
  category_id INT NOT NULL,
  played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_activity_user_id (user_id),
  INDEX idx_user_activity_category_id (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## Setup Instructions

### 1. Backend Setup (games_admin)

#### Install Dependencies
```bash
cd games_admin
npm install mysql2
```

#### Configure Environment Variables
Create or update `.env` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=games_db
```

#### Create Database Tables
Run the SQL schemas above in your MySQL database.

#### Start Backend Server
```bash
npm run dev
```

The backend should be running on `http://192.168.1.118:8000`

### 2. Frontend Setup (game_web_app1)

#### Configure API URL
The `.env.local` file should have:
```env
NEXT_PUBLIC_API_URL=http://192.168.1.118:8000
```

#### Start Frontend Server
```bash
cd game_web_app1
npm run dev
```

The frontend should be running on `http://0.0.0.0:3000`

### 3. Test the Dynamic Page

#### Add Sample Game Data
```sql
INSERT INTO categories (name, slug, description) VALUES
('FPS', 'fps', 'First Person Shooter games'),
('Action', 'action', 'Action-packed games'),
('Strategy', 'strategy', 'Strategic gameplay');

INSERT INTO games (title, slug, description, thumbnail, game_url, rating, category_id) VALUES
('Valorant Champions', 'valorant-champions', 'A tactical 5v5 character-based shooter', '/images/valorant.jpg', 'https://playvalorant.com', 4.8, 1),
('CS2', 'cs2', 'Counter-Strike 2 - The legendary FPS', '/images/cs2.jpg', 'https://counter-strike.net', 4.7, 1),
('Apex Legends', 'apex-legends', 'Battle Royale with unique legends', '/images/apex.jpg', 'https://ea.com/apex', 4.6, 1);
```

#### Visit the Game Page
Navigate to: `http://0.0.0.0:3000/game/valorant-champions`

## Customization

### Adding More Game Fields

#### 1. Update Database
```sql
ALTER TABLE games ADD COLUMN developer VARCHAR(255);
ALTER TABLE games ADD COLUMN release_date DATE;
ALTER TABLE games ADD COLUMN player_count INT DEFAULT 0;
```

#### 2. Update API Response
Edit `games_admin/src/app/api/games/[slug]/route.ts`:
```typescript
const enrichedGame = {
  ...game,
  developer: game.developer || 'Unknown',
  released: game.release_date,
  // ... other fields
};
```

#### 3. Update Frontend Type
Edit `game_web_app1/src/app/game/[slug]/page.tsx`:
```typescript
interface GameData {
  // ... existing fields
  developer: string
  release_date: string
  player_count: number
}
```

### Storing Rich Content (How to Play, Tips, etc.)

#### Option 1: JSON Fields (Recommended)
```sql
ALTER TABLE games 
ADD COLUMN how_to_play JSON,
ADD COLUMN game_modes JSON,
ADD COLUMN tips JSON,
ADD COLUMN features JSON,
ADD COLUMN controls JSON;
```

Insert data:
```sql
UPDATE games SET 
  how_to_play = JSON_ARRAY(
    JSON_OBJECT('title', 'Step 1', 'body', 'Description...'),
    JSON_OBJECT('title', 'Step 2', 'body', 'Description...')
  ),
  tips = JSON_ARRAY('Tip 1', 'Tip 2', 'Tip 3')
WHERE id = 1;
```

#### Option 2: Separate Tables
```sql
CREATE TABLE game_tips (
  id INT AUTO_INCREMENT PRIMARY KEY,
  game_id INT NOT NULL,
  tip TEXT NOT NULL,
  FOREIGN KEY (game_id) REFERENCES games(id)
);

CREATE TABLE game_controls (
  id INT AUTO_INCREMENT PRIMARY KEY,
  game_id INT NOT NULL,
  key_binding VARCHAR(50) NOT NULL,
  action VARCHAR(100) NOT NULL,
  FOREIGN KEY (game_id) REFERENCES games(id)
);
```

### Adding Tags System

```sql
CREATE TABLE tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE game_tags (
  game_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (game_id, tag_id),
  FOREIGN KEY (game_id) REFERENCES games(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);
```

Update API to fetch tags:
```typescript
const [tags] = await pool.query(`
  SELECT t.name as label, COUNT(*) as count
  FROM game_tags gt
  INNER JOIN tags t ON gt.tag_id = t.id
  WHERE gt.game_id = ?
  GROUP BY t.id
`, [gameId]);
```

## Performance Optimization

### 1. Enable Caching
```typescript
// In route.ts
export const revalidate = 300; // Cache for 5 minutes

// Or use Redis
import { Redis } from '@upstash/redis';
const redis = new Redis({ /* config */ });

const cacheKey = `game:${slug}`;
const cached = await redis.get(cacheKey);
if (cached) return NextResponse.json(cached);

// ... fetch from DB
await redis.set(cacheKey, data, { ex: 300 });
```

### 2. Add Database Indexes
```sql
CREATE INDEX idx_games_slug ON games(slug);
CREATE INDEX idx_games_category_rating ON games(category_id, rating DESC);
CREATE INDEX idx_games_active ON games(is_active);
```

### 3. Optimize Images
Use Next.js Image component:
```tsx
import Image from 'next/image';

<Image 
  src={game.thumbnail} 
  alt={game.title}
  width={400}
  height={300}
  priority
/>
```

## Testing

### Test API Endpoints
```bash
# Get game by slug
curl http://192.168.1.118:8000/api/games/valorant-champions

# Get similar games
curl "http://192.168.1.118:8000/api/games?category=1&limit=6&exclude=1"

# Track activity
curl -X POST http://192.168.1.118:8000/api/user-activity \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "gameId": 1, "categoryId": 1}'
```

### Test Frontend
1. Visit `http://0.0.0.0:3000/game/valorant-champions`
2. Check that game data loads
3. Click "Play Now" button
4. Verify activity is tracked in database
5. Check similar games section

## Troubleshooting

### Game Not Found (404)
- Check if game exists in database
- Verify slug matches exactly
- Check `is_active = 1` in database

### API Connection Failed
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check backend server is running
- Test API endpoint directly with curl

### Database Connection Error
- Verify MySQL credentials in `.env`
- Check MySQL server is running
- Test connection: `mysql -u root -p`

### Similar Games Not Loading
- Check if category_id is set for the game
- Verify other games exist in same category
- Check API response in browser DevTools

## Next Steps

1. **Add Authentication**: Integrate user authentication to track real user IDs
2. **Add Reviews**: Create a reviews system for games
3. **Add Screenshots**: Store and display game screenshots
4. **Add Video Trailers**: Embed game trailers
5. **Add Achievements**: Track and display game achievements
6. **Add Leaderboards**: Show top players for each game
7. **Add Social Features**: Share, comment, and rate games

## Support

For issues or questions:
1. Check the console for error messages
2. Verify all environment variables are set
3. Test API endpoints independently
4. Check database for data integrity
