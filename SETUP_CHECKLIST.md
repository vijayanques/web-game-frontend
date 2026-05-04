# Setup Checklist - Dynamic Game Detail Page

Use this checklist to ensure everything is set up correctly.

## ✅ Pre-requisites

- [ ] Node.js installed (v18 or higher)
- [ ] MySQL installed and running
- [ ] npm or yarn installed
- [ ] Both projects cloned (games_admin and game_web_app1)

## ✅ Database Setup

- [ ] MySQL server is running
- [ ] Created database: `games_db`
- [ ] Created `categories` table
- [ ] Created `games` table
- [ ] Created `user_activity` table
- [ ] Loaded sample data from `sample_game_data.sql`
- [ ] Verified data with: `SELECT * FROM games;`

### Quick Test:
```bash
mysql -u root -p -e "USE games_db; SELECT COUNT(*) FROM games;"
```
Expected: Should show at least 10 games

## ✅ Backend Setup (games_admin)

- [ ] Installed dependencies: `npm install`
- [ ] Installed mysql2: `npm install mysql2`
- [ ] Created/updated `.env` file with database credentials
- [ ] Verified DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
- [ ] API route exists: `src/app/api/games/[slug]/route.ts`
- [ ] API route exists: `src/app/api/games/route.ts`
- [ ] API route exists: `src/app/api/user-activity/route.ts`
- [ ] Started backend: `npm run dev`
- [ ] Backend running on: `http://192.168.1.118:8000`

### Quick Test:
```bash
curl http://192.168.1.118:8000/api/games/valorant-champions
```
Expected: Should return game data JSON

## ✅ Frontend Setup (game_web_app1)

- [ ] Installed dependencies: `npm install`
- [ ] Verified `.env.local` has `NEXT_PUBLIC_API_URL`
- [ ] Created `src/app/game/[slug]/page.tsx`
- [ ] Created `src/types/game.ts`
- [ ] Created `src/lib/api.ts`
- [ ] Started frontend: `npm run dev`
- [ ] Frontend running on: `http://0.0.0.0:3000`

### Quick Test:
Visit: `http://0.0.0.0:3000/game/valorant-champions`
Expected: Should show game detail page

## ✅ Functionality Tests

### Test 1: Game Detail Page
- [ ] Visit `/game/valorant-champions`
- [ ] Game title displays correctly
- [ ] Game description shows
- [ ] Rating and votes display
- [ ] Similar games section appears
- [ ] No console errors

### Test 2: Different Games
- [ ] Visit `/game/minecraft`
- [ ] Visit `/game/bloxd-io`
- [ ] Visit `/game/cs2`
- [ ] All pages load correctly

### Test 3: 404 Handling
- [ ] Visit `/game/non-existent-game`
- [ ] Shows "Game Not Found" message
- [ ] No server errors

### Test 4: Similar Games
- [ ] Similar games section shows games
- [ ] Games are from same category
- [ ] Current game is not in similar games list
- [ ] Clicking similar game navigates correctly

### Test 5: User Interactions
- [ ] Click "Play Now" button
- [ ] Click "Like" button (toggles state)
- [ ] Click "Wishlist" button (toggles state)
- [ ] Check browser console for activity tracking

### Test 6: Activity Tracking
```bash
# Check if activity was tracked
mysql -u root -p -e "USE games_db; SELECT * FROM user_activity ORDER BY played_at DESC LIMIT 5;"
```
- [ ] New entries appear when playing games

## ✅ API Endpoints Tests

### Test GET /api/games/[slug]
```bash
curl http://192.168.1.118:8000/api/games/valorant-champions
```
- [ ] Returns 200 status
- [ ] Returns game data
- [ ] Has all required fields

### Test GET /api/games (with filters)
```bash
curl "http://192.168.1.118:8000/api/games?category=1&limit=6"
```
- [ ] Returns 200 status
- [ ] Returns array of games
- [ ] Respects limit parameter

### Test POST /api/user-activity
```bash
curl -X POST http://192.168.1.118:8000/api/user-activity \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "gameId": 1, "categoryId": 1}'
```
- [ ] Returns 200 status
- [ ] Returns success message
- [ ] Data saved in database

## ✅ Performance Checks

- [ ] Page loads in < 2 seconds
- [ ] No memory leaks in console
- [ ] Images load properly
- [ ] Smooth scrolling and interactions
- [ ] Responsive on mobile (test with DevTools)

## ✅ Browser Compatibility

Test in different browsers:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browsers

## ✅ Code Quality

- [ ] No TypeScript errors: `npm run build`
- [ ] No console errors in browser
- [ ] No console warnings in terminal
- [ ] Code follows project structure

## ✅ Documentation

- [ ] Read `QUICK_START.md`
- [ ] Read `DYNAMIC_GAME_DETAIL_README.md`
- [ ] Read `IMPLEMENTATION_SUMMARY.md`
- [ ] Understand API endpoints
- [ ] Know how to add new games

## ✅ Optional Enhancements

- [ ] Add more games to database
- [ ] Customize styling/colors
- [ ] Add your own game thumbnails
- [ ] Implement user authentication
- [ ] Add reviews system
- [ ] Add screenshots gallery

## 🐛 Troubleshooting

If any test fails, check:

### Backend Issues:
```bash
# Check backend is running
curl http://192.168.1.118:8000/api/games/valorant-champions

# Check database connection
mysql -u root -p -e "SELECT 1"

# Check environment variables
cat games_admin/.env
```

### Frontend Issues:
```bash
# Check frontend is running
curl http://0.0.0.0:3000

# Check environment variables
cat game_web_app1/.env.local

# Check for build errors
cd game_web_app1
npm run build
```

### Database Issues:
```bash
# Check tables exist
mysql -u root -p -e "USE games_db; SHOW TABLES;"

# Check data exists
mysql -u root -p -e "USE games_db; SELECT COUNT(*) FROM games;"

# Check indexes
mysql -u root -p -e "USE games_db; SHOW INDEX FROM games;"
```

## 📊 Success Metrics

Your setup is complete when:
- ✅ All checkboxes above are checked
- ✅ All tests pass
- ✅ No errors in console
- ✅ Pages load quickly
- ✅ Data flows correctly from DB to UI

## 🎉 Next Steps

Once everything is checked:
1. Add more games to your database
2. Customize the design
3. Add your own features
4. Deploy to production
5. Share with users!

## 📞 Need Help?

If you're stuck:
1. Check the error message carefully
2. Review the documentation files
3. Test API endpoints independently
4. Verify database has data
5. Check environment variables

---

**Completion Status:** _____ / _____ items checked

**Date Completed:** _______________

**Notes:**
_________________________________
_________________________________
_________________________________
