# Search Functionality Setup Guide

## ✅ Frontend (Already Done)
The Header component in `src/components/Header.tsx` is now fully configured with:
- Search input with debouncing (300ms)
- Loading state with spinner
- Results dropdown with game cards
- Empty state handling
- Error handling
- Mobile and desktop responsive design

## 🔧 Backend Setup Required

### Step 1: Add the Search Route to Your Backend

You have two options:

#### Option A: Create a New Routes File (Recommended)
1. Create a new file in your backend: `routes/search.js`
2. Copy the code from `games_admin/BACKEND_SEARCH_ROUTE.js`
3. In your main server file (e.g., `server.js` or `app.js`), add:
   ```javascript
   const searchRoutes = require('./routes/search');
   app.use(searchRoutes);
   ```

#### Option B: Add to Existing Routes File
1. Open your existing games routes file
2. Copy the route handler from `games_admin/BACKEND_SEARCH_ROUTE.js`
3. Add it to your existing routes

### Step 2: Verify Database Schema

The search route expects these columns:
- `games` table:
  - `id`
  - `title`
  - `slug`
  - `thumbnail_url`
  - `description`
  - `category_id`

- `categories` table:
  - `id`
  - `name`

If your column names are different, update the SQL query in the search route.

### Step 3: Test the API

1. Start your backend server (usually on port 8000)
2. Test the endpoint in your browser or Postman:
   ```
   http://localhost:8000/api/games/search?q=test
   ```

Expected response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Game Title",
      "slug": "game-title",
      "thumbnail_url": "http://...",
      "description": "...",
      "category_name": "Action",
      "category_id": 1
    }
  ],
  "count": 1
}
```

### Step 4: Test Frontend

1. Start your Next.js app: `npm run dev`
2. Type in the search bar (minimum 3 characters)
3. Results should appear after 300ms

## 🎯 Features

- **Debounced Search**: Waits 300ms after typing stops
- **Smart Matching**: Prioritizes exact matches, then partial matches
- **Category Search**: Also searches in category names
- **Limit Results**: Returns max 10 results for performance
- **Loading State**: Shows spinner while searching
- **Empty State**: Friendly message when no results found
- **Error Handling**: Gracefully handles API errors
- **Click to Navigate**: Clicking a result navigates to `/game/{slug}`

## 🐛 Troubleshooting

### Search not working?
1. Check browser console for errors
2. Verify backend is running on the correct port
3. Check `NEXT_PUBLIC_API_URL` in `.env.local`
4. Test the API endpoint directly in browser

### No results showing?
1. Verify you have games in your database
2. Check that column names match in the SQL query
3. Try searching for a game title you know exists

### CORS errors?
Add CORS middleware to your backend:
```javascript
const cors = require('cors');
app.use(cors());
```

## 📝 Customization

### Change minimum search length:
In `Header.tsx`, line ~75:
```javascript
if (searchQuery.trim().length > 2) {  // Change 2 to your desired length
```

### Change debounce delay:
In `Header.tsx`, line ~76:
```javascript
}, 300);  // Change 300 to your desired milliseconds
```

### Change result limit:
In backend route, change `LIMIT 10` to your desired number

### Add more search fields:
Add more columns to the WHERE clause:
```sql
WHERE g.title LIKE ? 
  OR g.description LIKE ?
  OR c.name LIKE ?
  OR g.tags LIKE ?  -- Add more fields
```
