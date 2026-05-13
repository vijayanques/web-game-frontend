---
inclusion: manual
---

# SEO Metadata Flow - Quick Reference Card

## 🎯 What This Does

Allows admins to add SEO metadata (titles, descriptions, keywords, OG images) from the admin dashboard, which automatically appears on frontend pages.

## 📁 Files Created

### Backend (game_web_backend)
```
src/models/SeoMetadata.js          ← Database model
src/controllers/seoController.js   ← API logic
src/routes/seoRoutes.js            ← Routes
```

### Frontend (game_web_app1)
```
src/lib/seoMetadataFetcher.ts      ← Utilities
src/app/game/[slug]/metadata.ts    ← Game metadata
src/app/category/[slug]/metadata.ts ← Category metadata
src/components/StructuredData.tsx  ← JSON-LD component
```

### Admin (games_admin)
```
src/components/SeoMetadataForm.tsx  ← Form component
```

## 🔌 Integration Steps

### 1. Backend
```javascript
// Add to models/index.js
const SeoMetadata = require('./SeoMetadata');
module.exports = { Game, Category, SeoMetadata };

// Add to main app.js
const seoRoutes = require('./routes/seoRoutes');
app.use('/api/seo', seoRoutes);
```

### 2. Frontend
```typescript
// In game/[slug]/page.tsx
import { generateMetadata } from './metadata';
export { generateMetadata };
```

### 3. Admin
```typescript
// In game edit page
import SeoMetadataForm from '@/components/SeoMetadataForm';

<SeoMetadataForm
  entityType="game"
  entityId={gameId}
  entityTitle={gameName}
/>
```

## 📊 Data Flow

```
Admin Form
    ↓
POST /api/seo/game/:id
    ↓
Database (seo_metadata table)
    ↓
GET /api/seo/game/:id (from frontend)
    ↓
generateMetadata() function
    ↓
HTML <head> tags
    ↓
Search Engines / Social Media
```

## 🔗 API Endpoints

```bash
# Get metadata
GET /api/seo/game/123

# Create/Update metadata
POST /api/seo/game/123
PUT /api/seo/game/123

# Delete metadata
DELETE /api/seo/game/123

# List all
GET /api/seo/type/game?page=1&limit=20
```

## 📝 Form Fields

| Field | Max Length | Purpose |
|-------|-----------|---------|
| metaTitle | 60 chars | SEO title tag |
| metaDescription | 160 chars | SEO description |
| metaKeywords | 255 chars | Keywords (comma-separated) |
| canonicalUrl | 500 chars | Canonical URL |
| ogTitle | 100 chars | Facebook title |
| ogDescription | 160 chars | Facebook description |
| ogImage | 500 chars | Facebook image URL |
| twitterTitle | 100 chars | Twitter title |
| twitterDescription | 160 chars | Twitter description |
| twitterImage | 500 chars | Twitter image URL |
| robots | 100 chars | Robots meta tag |

## 🎨 Form Sections

1. **Basic SEO**
   - Meta Title (60 chars)
   - Meta Description (160 chars)
   - Meta Keywords
   - Canonical URL

2. **Open Graph** (Facebook/LinkedIn)
   - OG Title
   - OG Description
   - OG Image (1200x630px)

3. **Twitter Card**
   - Twitter Title
   - Twitter Description
   - Twitter Image

4. **Advanced**
   - Robots Meta Tag

## ✅ Testing

### API Test
```bash
curl http://localhost:5000/api/seo/game/1
```

### Browser Test
1. Open game page
2. Right-click → View Page Source
3. Look for `<title>`, `<meta name="description">`, `<meta property="og:*">`

### Social Media Test
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

### Structured Data Test
- Google: https://search.google.com/test/rich-results

## 🚀 Performance

- **Caching**: 1 hour (3600 seconds)
- **Database Index**: (entityType, entityId)
- **API Response Time**: <100ms
- **Page Load Impact**: Minimal (server-side generation)

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Metadata not showing | Check API is running, verify env vars |
| Images not loading | Use absolute URLs (http/https) |
| Structured data invalid | Use Google Rich Results Test |
| Slow page load | Check caching is working |
| Form not saving | Check backend API endpoint |

## 📚 Documentation

- **Architecture**: `seo-metadata-flow.md`
- **Implementation**: `seo-implementation-guide.md`
- **Diagrams**: `seo-flow-diagram.md`
- **API Reference**: `seo-api-reference.md`
- **Overview**: `README.md`

## 🎯 Best Practices

### Title (50-60 chars)
✅ "Play Action Games Free Online | ThePlayFree"
❌ "Games"

### Description (150-160 chars)
✅ "Discover 100+ free action games. Play instantly in your browser. No downloads needed."
❌ "Action games"

### Keywords
✅ "action games, free games, online games"
❌ "games, game, gaming, play, free, online, action, adventure, puzzle, sports, strategy"

### OG Image
✅ 1200x630px, high quality, relevant
❌ Small, low quality, generic

### Canonical URL
✅ "https://theplayfree.com/game/example-game"
❌ "https://theplayfree.com/game/example-game?ref=social"

## 🔄 Workflow

1. **Admin** → Fills SEO form → Clicks Save
2. **Backend** → Validates → Stores in DB → Returns success
3. **Admin** → Sees success toast
4. **User** → Visits page
5. **Frontend** → Fetches metadata → Generates tags
6. **Browser** → Renders page with SEO tags
7. **Search Engine** → Crawls and indexes
8. **Social Media** → Shows preview when shared

## 📊 Database Schema

```sql
CREATE TABLE seo_metadata (
  id INT PRIMARY KEY AUTO_INCREMENT,
  entityType ENUM('game', 'category'),
  entityId INT,
  metaTitle VARCHAR(60),
  metaDescription VARCHAR(160),
  metaKeywords VARCHAR(255),
  canonicalUrl VARCHAR(500),
  ogTitle VARCHAR(100),
  ogDescription VARCHAR(160),
  ogImage VARCHAR(500),
  twitterTitle VARCHAR(100),
  twitterDescription VARCHAR(160),
  twitterImage VARCHAR(500),
  robots VARCHAR(100),
  structuredData JSON,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,
  UNIQUE KEY (entityType, entityId)
);
```

## 🎓 Learning Path

1. Read `README.md` for overview
2. Review `seo-flow-diagram.md` for visual understanding
3. Follow `seo-implementation-guide.md` for setup
4. Reference `seo-api-reference.md` for API details
5. Use `seo-metadata-flow.md` for deep dive

## 💡 Pro Tips

- Use character counters in form to stay within limits
- Test OG images with social media debuggers
- Monitor Google Search Console for indexation
- Update metadata for new games/categories
- Use canonical URLs to prevent duplicate content
- Include primary keyword in title and description
- Make descriptions compelling for CTR

## 🔐 Security

- Validate all inputs on backend
- Sanitize URLs before storing
- Validate image URLs
- Use HTTPS for all URLs
- Consider adding authentication to API

## 📈 Monitoring

- Google Search Console: Indexation status
- Google Analytics: Organic traffic
- Social media: Sharing metrics
- Search rankings: Keyword positions

## 🚀 Next Steps

1. ✅ Implement core system
2. ⬜ Add bulk operations
3. ⬜ Add AI suggestions
4. ⬜ Add analytics dashboard
5. ⬜ Add sitemap generation

---

**Quick Start**: 2 hours to full implementation
**Maintenance**: 5 mins per game/category
**ROI**: Improved SEO rankings, better social sharing
