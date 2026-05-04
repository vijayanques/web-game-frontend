# Search Functionality Debug Guide

## ✅ What I Fixed

1. **Added search endpoint** to backend: `GET /api/games/search?q=query`
2. **Added search controller** function in `gameController.js`
3. **Added console logging** to help debug issues
4. **Fixed response format** to match frontend expectations

## 🚀 How to Test

### Step 1: Restart Your Backend Server
```bash
cd game_web_backend
npm start
# or
node src/server.js
```

### Step 2: Test the API Directly
Open your browser and go to:
```
http://192.168.1.118:8000/api/games/search?q=test
```

You should see a response like:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Game Title",
      "slug": "game-title",
      "thumbnail_url": "https://...",
      "description": "...",
      "category_name": "Action",
      "category_id": 1,
      "genre": "Adventure",
      "rating": 4.5
    }
  ],
  "count": 1
}
```

### Step 3: Test in Frontend
1. Make sure your backend is running
2. Start your Next.js app:
   ```bash
   cd game_web_app1
   npm run dev
   ```
3. Open browser console (F12)
4. Type in the search bar (minimum 3 characters)
5. Watch the console logs:
   ```
   🔍 Searching for: your-search-term
   📡 API URL: http://192.168.1.118:8000/api/games/search?q=your-search-term
   📥 Response status: 200
   ✅ Search results: { success: true, data: [...], count: 1 }
   ```

## 🐛 Troubleshooting

### Issue: "No games found" even though you have games

**Check 1: Is your game active?**
- The search only returns games where `isActive = true`
- Check your database: `SELECT * FROM games WHERE isActive = 1;`

**Check 2: What's the game title?**
- Search is case-insensitive
- Try searching for just part of the title
- Example: If game is "Super Mario", try searching "mario" or "super"

**Check 3: Check the console logs**
- Open browser console (F12)
- Look for the search logs
- Check if the API is being called
- Check the response data

**Check 4: Test the API directly**
```bash
# Test with curl
curl "http://192.168.1.118:8000/api/games/search?q=test"

# Or in browser
http://192.168.1.118:8000/api/games/search?q=test
```

### Issue: Network error or CORS error

**Solution: Check CORS settings**
In your backend `server.js`, make sure you have:
```javascript
const cors = require('cors');
app.use(cors());
```

### Issue: Backend not responding

**Check:**
1. Is the backend server running?
2. Is it running on port 8000?
3. Can you access: `http://192.168.1.118:8000/health`

### Issue: Wrong API URL

**Check `.env.local` file:**
```
NEXT_PUBLIC_API_URL=http://192.168.1.118:8000
```

Make sure this matches your backend server address.

## 📊 Database Check

Run this SQL to see your games:
```sql
SELECT 
  g.id,
  g.title,
  g.slug,
  g.isActive,
  c.name as category_name
FROM games g
LEFT JOIN categories c ON g.categoryId = c.id;
```

If `isActive` is 0 or NULL, the game won't show in search results.

## 🔧 Quick Fixes

### Make all games active:
```sql
UPDATE games SET isActive = 1;
```

### Test with a specific game:
```sql
-- Find your game
SELECT id, title, slug, isActive FROM games LIMIT 1;

-- Make sure it's active
UPDATE games SET isActive = 1 WHERE id = 1;
```

## 📝 Search Features

- **Minimum length**: 3 characters
- **Debounce**: 300ms delay after typing
- **Searches in**: title, description, genre
- **Limit**: 10 results max
- **Sorting**: Exact matches first, then partial matches
- **Case insensitive**: "MARIO" = "mario" = "Mario"

## 🎯 Expected Behavior

1. Type 3+ characters → Wait 300ms → API call
2. Loading spinner appears
3. Results dropdown shows
4. Click result → Navigate to game page
5. Click X or outside → Close dropdown
