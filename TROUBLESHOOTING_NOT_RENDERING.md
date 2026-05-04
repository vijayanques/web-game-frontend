# Game Detail Page Not Rendering - Troubleshooting Guide

## 🔴 Problem
The game detail page shows a loading spinner but never displays the game content.

## 🔍 Root Causes

1. **Backend server not running**
2. **Database not configured**
3. **No games in database**
4. **API endpoint errors**
5. **CORS issues**

## ✅ Step-by-Step Fix

### Step 1: Configure Database (CRITICAL)

Edit `games_admin/.env`:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_actual_password
DB_NAME=games_db    # ← Change from "your_database_name"
```

### Step 2: Create Database & Tables

```bash
# Open MySQL
mysql -u root -p

# Create database
CREATE DATABASE IF NOT EXISTS games_db;
USE games_db;

# Create categories table
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

# Create games table
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
  FOREIGN KEY (category_id) REFERENCES categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

# Create user_activity table
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

### Step 3: Add Sample Game Data

```sql
-- Insert categories
INSERT INTO categories (name, slug, description) VALUES
('FPS', 'fps', 'First Person Shooter games'),
('Action', 'action', 'Action-packed games'),
('Sandbox', 'sandbox', 'Open-world sandbox games');

-- Insert sample games
INSERT INTO games (title, slug, description, thumbnail, game_url, rating, category_id, is_active) VALUES
(
  'Valorant Champions',
  'valorant-champions',
  'Valorant is a tactical 5v5 character-based shooter where precise gunplay meets unique agent abilities.',
  '/images/valorant.jpg',
  'https://playvalorant.com',
  4.8,
  1,
  1
),
(
  'Minecraft',
  'minecraft',
  'Minecraft is a sandbox game that allows players to build, explore, and survive in a blocky world.',
  '/images/minecraft.jpg',
  'https://minecraft.net',
  4.9,
  3,
  1
),
(
  'Bloxd.io',
  'bloxd-io',
  'Bloxd.io is an IO adventure game with Minecraft-style visuals where you can navigate obstacle courses.',
  '/images/bloxd.jpg',
  'https://bloxd.io',
  4.3,
  3,
  1
);

-- Verify data
SELECT * FROM games;
```

### Step 4: Start Backend Server

```bash
cd games_admin

# Install dependencies if needed
npm install mysql2

# Start the server
npm run dev
```

**Expected output:**
```
▲ Next.js 15.x.x
- Local:        http://localhost:3000
- Network:      http://192.168.1.118:8000
```

### Step 5: Test Backend API

Open a new terminal and test:

```bash
# Test if backend is running
curl http://192.168.1.118:8000/api/games/valorant-champions

# Expected response:
# {"success":true,"data":{...game data...}}
```

If you get an error, check:
- Backend server is running
- Database credentials are correct
- Games exist in database

### Step 6: Start Frontend Server

```bash
cd game_web_app1
npm run dev
```

### Step 7: Test the Page

Visit: `http://0.0.0.0:3000/game/valorant-champions`

## 🧪 Debugging Steps

### Check 1: Backend Server Running?

```bash
# Windows PowerShell
Get-Process -Name node

# Should show node processes running
```

### Check 2: Database Connection

```bash
mysql -u root -p -e "USE games_db; SELECT COUNT(*) FROM games;"

# Should show number of games (at least 1)
```

### Check 3: API Response

```bash
curl http://192.168.1.118:8000/api/games/valorant-champions

# Should return JSON with game data
```

### Check 4: Browser Console

1. Open page: `http://0.0.0.0:3000/game/valorant-champions`
2. Press F12 to open DevTools
3. Go to Console tab
4. Look for errors

**Common errors:**

#### Error: "Failed to fetch"
**Solution:** Backend server not running. Start it with `npm run dev` in games_admin folder.

#### Error: "Game not found" (404)
**Solution:** Game doesn't exist in database. Add games using SQL above.

#### Error: "Database connection failed"
**Solution:** Check database credentials in `games_admin/.env`

#### Error: "CORS policy"
**Solution:** Add CORS headers to backend (see below)

### Check 5: Network Tab

1. Open DevTools (F12)
2. Go to Network tab
3. Refresh page
4. Look for API calls

**What to check:**
- API call to `/api/games/valorant-champions` should be Status 200
- Response should contain game data
- If Status 404: Game doesn't exist
- If Status 500: Server error (check backend console)

## 🔧 Common Fixes

### Fix 1: Database Name Wrong

Edit `games_admin/.env`:
```env
DB_NAME=games_db  # Not "your_database_name"
```

### Fix 2: No Games in Database

```sql
-- Check if games exist
SELECT * FROM games;

-- If empty, add sample data (see Step 3 above)
```

### Fix 3: Backend Not Running

```bash
cd games_admin
npm run dev
```

### Fix 4: Wrong Port

Check `games_admin/.env`:
```env
NEXT_PUBLIC_API_URL=http://192.168.1.118:8000
```

Check `game_web_app1/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://192.168.1.118:8000
```

### Fix 5: CORS Issues

If you see CORS errors, add to `games_admin/next.config.ts`:

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ]
  },
}

export default nextConfig
```

## 📊 Verification Checklist

- [ ] MySQL server is running
- [ ] Database `games_db` exists
- [ ] Tables created (categories, games, user_activity)
- [ ] At least one game in database
- [ ] `games_admin/.env` has correct DB credentials
- [ ] Backend server running on port 8000
- [ ] Frontend server running on port 3000
- [ ] API endpoint returns data: `curl http://192.168.1.118:8000/api/games/valorant-champions`
- [ ] Browser console shows no errors
- [ ] Page displays game content

## 🎯 Quick Test

Run this complete test:

```bash
# 1. Check database
mysql -u root -p -e "USE games_db; SELECT id, title, slug FROM games LIMIT 3;"

# 2. Test API
curl http://192.168.1.118:8000/api/games/valorant-champions

# 3. Check if both servers running
# Backend should be on :8000
# Frontend should be on :3000
```

## 💡 Still Not Working?

### Option 1: Use Mock Data (Temporary)

Edit `game_web_app1/src/app/game/[slug]/page.tsx`:

Add this mock data at the top:
```typescript
const MOCK_GAME = {
  id: 1,
  title: 'Test Game',
  slug: 'test-game',
  developer: 'Test Studio',
  rating: 4.5,
  votes: '1000',
  released: 'January 2025',
  technology: 'HTML5',
  platforms: ['Browser'],
  description: 'This is a test game to verify the page renders.',
  thumbnail: '',
  game_url: '',
  category: 'Action',
  category_id: 1,
  howToPlay: [
    { title: 'Step 1', body: 'Test step 1' }
  ],
  tips: ['Test tip 1'],
  features: ['Test feature 1'],
  tags: [{ label: 'Test', count: 1 }],
  controls: [{ key: 'WASD', action: 'Move' }]
}
```

Then in the fetch function, add:
```typescript
// For testing, use mock data
setGame(MOCK_GAME)
setLoading(false)
return
```

This will let you see if the page renders correctly.

### Option 2: Check Logs

**Backend logs:**
```bash
cd games_admin
npm run dev
# Watch for errors in console
```

**Frontend logs:**
```bash
cd game_web_app1
npm run dev
# Watch for errors in console
```

## 📞 Need More Help?

1. Check backend console for errors
2. Check browser console (F12) for errors
3. Verify database has data
4. Test API endpoint directly
5. Check both servers are running

---

**Most Common Issue:** Database name is still `your_database_name` instead of `games_db`

**Quick Fix:** 
1. Edit `games_admin/.env`
2. Change `DB_NAME=games_db`
3. Restart backend server
4. Refresh page
