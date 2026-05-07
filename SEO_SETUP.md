# SEO Setup Guide for ThePlayFree

## Overview
This document outlines the SEO implementation for ThePlayFree website including sitemap, robots.txt, and structured data.

## Files Created

### 1. **sitemap.ts** (`src/app/sitemap.ts`)
- Generates dynamic XML sitemap
- Includes static routes (home, login, signup, etc.)
- Includes dynamic routes (categories, games)
- Automatically accessible at `/sitemap.xml`
- Updates with proper change frequency and priority

### 2. **robots.ts** (`src/app/robots.ts`)
- Defines crawling rules for search engines
- Allows all user agents to crawl public pages
- Disallows crawling of admin, API, and private routes
- Points to sitemap location
- Optimized for Google, Bing, and other search engines

### 3. **metadata.ts** (`src/lib/metadata.ts`)
- Centralized metadata configuration
- Provides default metadata for all pages
- Helper function `getPageMetadata()` for page-specific metadata
- Includes Open Graph and Twitter Card support

### 4. **seo.ts** (`src/config/seo.ts`)
- SEO configuration constants
- Routes mapping
- Categories list
- Easy to update and maintain

### 5. **layout.tsx** (Updated)
- Added JSON-LD structured data
- Implements WebSite schema for better search engine understanding
- Includes search action schema

## Environment Variables

Add to your `.env.local`:
```
NEXT_PUBLIC_BASE_URL=https://theplayfree.com
```

## How It Works

### Sitemap Generation
- Next.js automatically generates `/sitemap.xml` from the `sitemap.ts` file
- Includes all static and dynamic routes
- Search engines can discover all pages easily

### Robots.txt
- Automatically generated at `/robots.txt` from `robots.ts`
- Controls which pages search engines can crawl
- Points to sitemap for discovery

### Structured Data
- JSON-LD schema added to layout for WebSite type
- Helps search engines understand site structure
- Improves rich snippets in search results

## SEO Best Practices Implemented

✅ **Sitemap**: Helps search engines discover all pages
✅ **Robots.txt**: Controls crawler access
✅ **Structured Data**: JSON-LD schema for better understanding
✅ **Meta Tags**: Open Graph and Twitter Card support
✅ **Canonical URLs**: Prevents duplicate content issues
✅ **Mobile Friendly**: Responsive design
✅ **Fast Loading**: Optimized images and code splitting

## Next Steps

### 1. Update Base URL
Make sure `NEXT_PUBLIC_BASE_URL` is set correctly in production:
```bash
NEXT_PUBLIC_BASE_URL=https://theplayfree.com
```

### 2. Add Page-Specific Metadata
For each page, use the `getPageMetadata()` helper:
```typescript
import { getPageMetadata } from '@/lib/metadata';

export const metadata = getPageMetadata(
  'Page Title',
  'Page description',
  '/page-path',
  '/og-image.png'
);
```

### 3. Update Dynamic Routes
For dynamic pages (games, categories), add metadata:
```typescript
export async function generateMetadata({ params }) {
  return getPageMetadata(
    `${params.slug} - Games`,
    'Description here',
    `/category/${params.slug}`
  );
}
```

### 4. Submit to Search Engines
- Google Search Console: https://search.google.com/search-console
- Bing Webmaster Tools: https://www.bing.com/webmasters
- Submit your sitemap URL: `https://theplayfree.com/sitemap.xml`

### 5. Monitor Performance
- Track rankings in Google Search Console
- Monitor crawl errors
- Check indexation status
- Review search queries and CTR

## Testing

### Test Sitemap
Visit: `https://theplayfree.com/sitemap.xml`

### Test Robots.txt
Visit: `https://theplayfree.com/robots.txt`

### Validate Structured Data
Use Google's Rich Results Test: https://search.google.com/test/rich-results

### Check Mobile Friendliness
Use Google's Mobile-Friendly Test: https://search.google.com/mobile-friendly

## Maintenance

### Update Sitemap
Edit `src/app/sitemap.ts` to add/remove routes or change priorities.

### Update Robots Rules
Edit `src/app/robots.ts` to modify crawling rules.

### Update Metadata
Edit `src/config/seo.ts` to update site-wide metadata.

## Additional Resources

- [Next.js Metadata Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
