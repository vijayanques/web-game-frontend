'use client';

import { useEffect, useState } from 'react';

interface SeoMetadata {
  id?: number;
  entityType?: string;
  entityId?: number;
  pageName?: string;
  pageSlug?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  robots?: string;
  structuredData?: any;
}

export function usePageSeo(pageSlug: string) {
  const [seoMetadata, setSeoMetadata] = useState<SeoMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeoMetadata = async () => {
      try {
        setLoading(true);
        setError(null);

        const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://game-backend-production-3988.up.railway.app';
        const cleanedApiUrl = rawApiUrl.replace(/\/+$/, '');
        const apiPrefix = cleanedApiUrl.endsWith('/api') ? cleanedApiUrl : `${cleanedApiUrl}/api`;
        
        // Normalize slug: remove leading/trailing slashes
        const normalizedSlug = pageSlug.replace(/^\/+|\/+$/g, '');
        const encodedSlug = encodeURIComponent(normalizedSlug);
        
        // Try fetching by slug first
        const slugUrl = `${apiPrefix}/seo/type/page/slug/${encodedSlug}`;
        console.debug('🔍 Fetching page SEO by slug:', slugUrl);
        
        let response = await fetch(slugUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const pageData = await response.json();
          console.debug('✅ SEO metadata found by slug:', pageData);
          setSeoMetadata(pageData);
          return;
        }

        // If slug endpoint fails, try fetching all pages and filter
        if (response.status === 404) {
          console.warn('⚠️ Slug endpoint returned 404, trying list endpoint:', slugUrl);
          const listUrl = `${apiPrefix}/seo/type/page`;
          response = await fetch(listUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const result = await response.json();
            const pages = result.data || [];
            
            // Find matching page by slug
            const matchedPage = pages.find((p: SeoMetadata) => {
              const pageSlugNormalized = String(p.pageSlug || '').replace(/^\/+|\/+$/g, '').trim();
              return pageSlugNormalized === normalizedSlug;
            });

            if (matchedPage) {
              console.debug('✅ SEO metadata found in list:', matchedPage);
              setSeoMetadata(matchedPage);
            } else {
              console.warn('⚠️ Page SEO metadata not found for slug:', normalizedSlug);
              console.debug('Available pages:', pages.map((p: SeoMetadata) => p.pageSlug));
              setSeoMetadata(null);
            }
          } else {
            console.error('❌ Failed to fetch page SEO list:', response.status, listUrl);
            setError(`Failed to fetch SEO metadata: ${response.status}`);
          }
        } else {
          console.error('❌ SEO metadata fetch failed:', response.status, response.statusText);
          setError(`Failed to fetch SEO metadata: ${response.status}`);
        }
      } catch (error) {
        console.error('❌ Error fetching SEO metadata for page:', pageSlug, error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    if (pageSlug) {
      fetchSeoMetadata();
    } else {
      setLoading(false);
    }
  }, [pageSlug]);

  return { seoMetadata, loading, error };
}
