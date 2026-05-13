---
inclusion: manual
---

# SEO Metadata Implementation Guide

## Quick Start

### Step 1: Backend Setup

1. **Add SeoMetadata model** to backend models index:
   ```javascript
   // game_web_backend/src/models/index.js
   const SeoMetadata = require('./SeoMetadata');
   module.exports = { Game, Category, SeoMetadata };
   ```

2. **Register SEO routes** in main Express app:
   ```javascript
   // game_web_backend/src/index.js or app.js
   const seoRoutes = require('./routes/seoRoutes');
   app.use('/api/seo', seoRoutes);
   ```

3. **Run database migration** to create `seo_metadata` table:
   ```bash
   npx sequelize-cli db:migrate
   ```
   Or manually create table:
   ```sql
   CREATE TABLE seo_metadata (
     id INT PRIMARY KEY AUTO_INCREMENT,
     entityType ENUM('game', 'category') NOT NULL,
     entityId INT NOT NULL,
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
     robots VARCHAR(100) DEFAULT 'index, follow',
     structuredData JSON,
     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     UNIQUE KEY unique_entity (entityType, entityId)
   );
   ```

### Step 2: Frontend Setup

1. **Add API endpoint** to environment:
   ```bash
   # game_web_app1/.env.local
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

2. **Update game page** to use metadata generation:
   ```typescript
   // game_web_app1/src/app/game/[slug]/page.tsx
   import { generateMetadata } from './metadata';
   
   export { generateMetadata };
   
   export default function GamePage({ params }) {
     // ... existing page code
   }
   ```

3. **Add structured data** to game page:
   ```typescript
   // In game page component
   import StructuredData from '@/components/StructuredData';
   import { generateGameStructuredData } from '@/lib/seoMetadataFetcher';
   
   export default function GamePage() {
     const structuredData = generateGameStructuredData(game, seoData);
     
     return (
       <>
         <StructuredData data={structuredData} />
         {/* page content */}
       </>
     );
   }
   ```

### Step 3: Admin Integration

1. **Add SEO form** to game/category edit page:
   ```typescript
   // games_admin/src/app/games/[id]/page.tsx
   import SeoMetadataForm from '@/components/SeoMetadataForm';
   
   export default function GameEditPage({ params }) {
     return (
       <div>
         {/* existing form fields */}
         <SeoMetadataForm
           entityType="game"
           entityId={gameId}
           entityTitle={gameName}
           onSuccess={() => {
             // Refresh data or show success message
           }}
         />
       </div>
     );
   }
   ```

## Testing

### 1. Test Backend API

```bash
# Get SEO metadata
curl http://localhost:5000/api/seo/game/1

# Create/update SEO metadata
curl -X POST http://localhost:5000/api/seo/game/1 \
  -H "Content-Type: application/json" \
  -d '{
    "metaTitle": "Play Action Games Free",
    "metaDescription": "Discover 100+ free action games online",
    "metaKeywords": "action, games, free",
    "ogImage": "https://example.com/image.jpg"
  }'

# List all game SEO metadata
curl http://localhost:5000/api/seo/type/game?page=1&limit=20
```

### 2. Test Frontend Metadata

1. Open game page in browser
2. Right-click → View Page Source
3. Look for in `<head>`:
   - `<title>` tag
   - `<meta name="description">`
   - `<meta property="og:title">`
   - `<meta property="og:image">`
   - `<script type="application/ld+json">`

### 3. Test Social Media Sharing

**Facebook**: https://developers.facebook.com/tools/debug/
- Paste game URL
- Check OG tags are correct

**Twitter**: https://cards-dev.twitter.com/validator
- Paste game URL
- Verify Twitter Card tags

**LinkedIn**: https://www.linkedin.com/post-inspector/
- Paste game URL
- Check preview

### 4. Test Structured Data

**Google Rich Results Test**: https://search.google.com/test/rich-results
- Paste game URL
- Verify JSON-LD is valid
- Check for rich result eligibility

## Troubleshooting

### Metadata Not Appearing

1. **Check API is running**:
   ```bash
   curl http://localhost:5000/api/seo/game/1
   ```

2. **Check environment variables**:
   ```bash
   echo $NEXT_PUBLIC_API_URL
   ```

3. **Check browser console** for fetch errors

4. **Verify database** has SEO metadata:
   ```sql
   SELECT * FROM seo_metadata WHERE entityType='game' AND entityId=1;
   ```

### Images Not Loading

1. **Verify image URLs** are absolute (start with http/https)
2. **Check CORS** if images from different domain
3. **Test image URL** directly in browser
4. **Verify image dimensions** (1200x630px recommended)

### Structured Data Invalid

1. **Use Google Rich Results Test** to identify errors
2. **Check JSON syntax** in structuredData field
3. **Verify required fields** are present
4. **Test with different entity types** (VideoGame, CollectionPage, etc.)

## Performance Optimization

### Caching

The system caches metadata for 1 hour:
```typescript
// In seoMetadataFetcher.ts
const response = await fetch(url, { 
  next: { revalidate: 3600 } // 1 hour cache
});
```

To adjust cache time:
```typescript
// Cache for 24 hours
{ next: { revalidate: 86400 } }

// No cache (always fresh)
{ next: { revalidate: 0 } }
```

### Database Indexes

Ensure indexes exist for performance:
```sql
-- Already created in model, but verify:
CREATE UNIQUE INDEX idx_entity ON seo_metadata(entityType, entityId);
```

### Image Optimization

1. **Use CDN** for OG images
2. **Compress images** before uploading
3. **Use WebP format** when possible
4. **Lazy load** images in admin form

## SEO Best Practices

### Title Tags
- ✅ Include primary keyword
- ✅ Keep 50-60 characters
- ✅ Make compelling for CTR
- ❌ Don't keyword stuff
- ❌ Don't use generic titles

### Meta Descriptions
- ✅ Include primary keyword
- ✅ Keep 150-160 characters
- ✅ Include call-to-action
- ✅ Unique for each page
- ❌ Don't duplicate descriptions
- ❌ Don't include special characters

### Keywords
- ✅ Use 3-5 primary keywords
- ✅ Include long-tail keywords
- ✅ Match search intent
- ❌ Don't keyword stuff
- ❌ Don't use irrelevant keywords

### Open Graph Tags
- ✅ Use high-quality images (1200x630px)
- ✅ Include descriptive titles
- ✅ Write compelling descriptions
- ✅ Test with social debuggers
- ❌ Don't use low-quality images
- ❌ Don't use misleading titles

### Canonical URLs
- ✅ Use absolute URLs
- ✅ Point to preferred version
- ✅ Prevent duplicate content
- ❌ Don't use relative URLs
- ❌ Don't point to different domain

## Monitoring

### Track Metadata Updates

Add logging to track when metadata is updated:
```javascript
// In seoController.js
exports.upsertSeoMetadata = async (req, res) => {
  // ... existing code
  console.log(`SEO metadata updated for ${entityType}:${entityId}`);
  // ... rest of code
};
```

### Monitor Search Performance

1. **Google Search Console**: Track impressions, clicks, CTR
2. **Google Analytics**: Monitor organic traffic
3. **Bing Webmaster Tools**: Track Bing performance
4. **SEMrush/Ahrefs**: Monitor rankings

### Check Indexation

```bash
# Google
site:theplayfree.com/game/

# Bing
site:theplayfree.com/game/
```

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Metadata not showing | API not running | Start backend server |
| Wrong metadata | Cached version | Clear browser cache or wait 1 hour |
| Images not loading | Invalid URL | Use absolute URLs starting with http/https |
| Structured data invalid | JSON syntax error | Validate with Google Rich Results Test |
| Slow page load | Too many API calls | Implement caching strategy |
| Duplicate content | Multiple URLs | Set canonical URLs correctly |

## Next Steps

1. ✅ Implement core SEO metadata system
2. ⬜ Add bulk SEO management
3. ⬜ Implement SEO score calculation
4. ⬜ Add AI-powered metadata suggestions
5. ⬜ Create SEO analytics dashboard
6. ⬜ Implement sitemap generation
7. ⬜ Add redirect management
