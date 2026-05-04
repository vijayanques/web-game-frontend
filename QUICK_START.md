# Quick Start Guide - Dynamic Game Detail Page

## 🚀 Get Started in 5 Minutes

### Step 1: Database Setup (2 minutes)

#### Create the Database
```bash
mysql -u root -p
```

```sql
CREATE DATABASE IF NOT EXISTS games_db;
USE games_db;
```

#### Create Tables
```sql
-- Categories table
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Games table
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
  INDEX idx_rating (rating),
  FOREIGN KEY (category_id) REFERENCES categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- User activity table
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

#### Load Sample Data
```bash
# From the games_admin directory
mysql -u root -p games_db < database/sample_game_data.sql
```

### Step 2: Backend Configuration (1 minute)

#### Update Environment Variables
Edit `games_admin/.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=games_db
```

#### Install Dependencies (if not already installed)
```bash
cd games_admin
npm install mysql2
```

#### Start Backend Server
```bash
npm run dev
```

Backend should be running on `http://192.168.1.118:8000`

### Step 3: Frontend Configuration (1 minute)

#### Verify Environment Variables
Check `game_web_app1/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://192.168.1.118:8000
HOSTNAME=0.0.0.0
PORT=3000
```

#### Start Frontend Server
```bash
cd game_web_app1
npm run dev
```

Frontend should be running on `http://0.0.0.0:3000`

### Step 4: Test It! (1 minute)

#### Test Backend API
```bash
# Test game detail endpoint
curl http://192.168.1.118:8000/api/games/valorant-champions

# Test games list endpoint
curl http://192.168.1.118:8000/api/games?category=1&limit=6

# Test activity tracking
curl -X POST http://192.168.1.118:8000/api/games/user-activity \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "gameId": 1, "categoryId": 1}'
```

#### Test Frontend
Open your browser and visit:
- `http://0.0.0.0:3000/game/valorant-champions`
- `http://0.0.0.0:3000/game/minecraft`
- `http://0.0.0.0:3000/game/bloxd-io`

## ✅ What You Should See

### Game Detail Page Features:
1. ✅ Game title and metadata
2. ✅ Game player (iframe or placeholder)
3. ✅ Rating and votes
4. ✅ Description and overview
5. ✅ How to play section
6. ✅ Game modes
7. ✅ Tips and features
8. ✅ Controls section
9. ✅ Similar games (based on category)
10. ✅ Like/wishlist buttons
11. ✅ Activity tracking

## 🔧 Troubleshooting

### Backend Issues

#### "Cannot connect to database"
```bash
# Check MySQL is running
sudo systemctl status mysql

# Test connection
mysql -u root -p -e "SELECT 1"

# Verify database exists
mysql -u root -p -e "SHOW DATABASES LIKE 'games_db'"
```

#### "Game not found" (404)
```bash
# Check if games exist
mysql -u root -p games_db -e "SELECT id, title, slug FROM games"

# Verify slug matches URL
# URL: /game/valorant-champions
# Slug in DB should be: valorant-champions
```

### Frontend Issues

#### "Failed to fetch game data"
```bash
# Check backend is running
curl http://192.168.1.118:8000/api/games/valorant-champions

# Check NEXT_PUBLIC_API_URL in .env.local
cat game_web_app1/.env.local

# Check browser console for errors
# Open DevTools (F12) > Console tab
```

#### "Similar games not loading"
```bash
# Check if category_id is set
mysql -u root -p games_db -e "SELECT id, title, category_id FROM games"

# Check if multiple games exist in same category
mysql -u root -p games_db -e "
  SELECT c.name, COUNT(*) as game_count 
  FROM games g 
  JOIN categories c ON g.category_id = c.id 
  GROUP BY c.id
"
```

## 📝 Adding Your Own Games

### Method 1: Direct SQL Insert
```sql
USE games_db;

INSERT INTO games (title, slug, description, thumbnail, game_url, rating, category_id) 
VALUES (
  'Your Game Title',
  'your-game-slug',  -- Must be URL-friendly (lowercase, hyphens)
  'Your game description here...',
  '/Images/your-game.jpg',
  'https://yourgame.com',
  4.5,
  1,  -- Category ID (1=FPS, 2=Action, etc.)
  1   -- is_active (1=active, 0=inactive)
);
```

### Method 2: Using Admin Panel (if available)
1. Go to your admin panel
2. Navigate to Games section
3. Click "Add New Game"
4. Fill in the form
5. Make sure to set a unique slug

### Important: Slug Format
- ✅ Good: `valorant-champions`, `minecraft`, `among-us`
- ❌ Bad: `Valorant Champions`, `Mine Craft`, `among_us`

The slug must be:
- Lowercase
- No spaces (use hyphens)
- URL-friendly
- Unique

## 🎨 Customization

### Change Game Card Colors
Edit `game_web_app1/src/app/game/[slug]/page.tsx`:
```typescript
// Find the similar games section
const gradients = [
  'from-orange-500 to-red-700',
  'from-blue-500 to-purple-700',
  'from-green-500 to-teal-700',
  // Add more gradients
];
```

### Add More Metadata Fields
1. Add column to database:
```sql
ALTER TABLE games ADD COLUMN developer VARCHAR(255);
ALTER TABLE games ADD COLUMN player_count INT DEFAULT 0;
```

2. Update API response in `games_admin/src/app/api/games/[slug]/route.ts`

3. Update TypeScript interface in frontend

### Customize Content Sections
Edit the `enrichedGame` object in `games_admin/src/app/api/games/[slug]/route.ts`:
```typescript
howToPlay: [
  {
    title: 'Your Custom Step',
    body: 'Your custom description'
  }
],
tips: [
  'Your custom tip 1',
  'Your custom tip 2'
],
// etc.
```

## 📊 Monitoring

### Check User Activity
```sql
-- Most played games
SELECT g.title, COUNT(*) as play_count
FROM user_activity ua
JOIN games g ON ua.game_id = g.id
GROUP BY g.id
ORDER BY play_count DESC
LIMIT 10;

-- Most active users
SELECT user_id, COUNT(*) as play_count
FROM user_activity
GROUP BY user_id
ORDER BY play_count DESC
LIMIT 10;

-- Popular categories
SELECT c.name, COUNT(*) as play_count
FROM user_activity ua
JOIN categories c ON ua.category_id = c.id
GROUP BY c.id
ORDER BY play_count DESC;
```

## 🚀 Next Steps

1. **Add More Games**: Populate your database with more games
2. **Customize Styling**: Update colors, fonts, and layouts
3. **Add Authentication**: Integrate user login system
4. **Add Reviews**: Let users review games
5. **Add Screenshots**: Upload and display game screenshots
6. **Optimize Performance**: Add caching and CDN

## 📚 Documentation

- Full documentation: `DYNAMIC_GAME_DETAIL_README.md`
- Backend API docs: `games_admin/BACKEND_IMPLEMENTATION.md`
- Database schema: `games_admin/database/`

## 💡 Tips

1. Always use unique slugs for games
2. Set `is_active = 1` for games you want to display
3. Use high-quality thumbnails (recommended: 800x600px)
4. Keep descriptions concise but informative
5. Test on mobile devices for responsive design

## 🆘 Need Help?

1. Check the console logs (browser and terminal)
2. Verify all environment variables are set
3. Test API endpoints with curl
4. Check database for data integrity
5. Review the full documentation

Happy gaming! 🎮
