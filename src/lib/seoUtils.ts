// SEO Utilities for fetching and applying metadata

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://game-backend-production-3988.up.railway.app';

export interface SeoMetadata {
  id: number;
  entityType: string;
  entityId: number;
  pageName: string;
  pageSlug: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  robots: string;
  structuredData?: any;
}

/**
 * Fetch SEO metadata by page slug
 */
export async function fetchSeoMetadataBySlug(slug: string): Promise<SeoMetadata | null> {
  try {
    const normalizedSlug = slug.replace(/^\/+/, '');
    const response = await fetch(
      `${API_BASE_URL}/api/seo/type/page/slug/${normalizedSlug}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      console.warn(`SEO metadata not found for slug: ${slug}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching SEO metadata:', error);
    return null;
  }
}

/**
 * Generate metadata object for Next.js Metadata API
 */
export function generateMetadata(seoData: SeoMetadata | null, defaultMetadata?: any) {
  if (!seoData) {
    return defaultMetadata || {};
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://game-web-app1.vercel.app';

  return {
    title: seoData.metaTitle || defaultMetadata?.title,
    description: seoData.metaDescription || defaultMetadata?.description,
    keywords: seoData.metaKeywords || defaultMetadata?.keywords,
    robots: seoData.robots || 'index, follow',
    canonical: seoData.canonicalUrl || `${baseUrl}${seoData.pageSlug}`,
    openGraph: {
      title: seoData.ogTitle || seoData.metaTitle,
      description: seoData.ogDescription || seoData.metaDescription,
      type: 'website' as const,
      url: seoData.canonicalUrl || `${baseUrl}${seoData.pageSlug}`,
      images: seoData.ogImage
        ? [
            {
              url: seoData.ogImage,
              width: 1200,
              height: 630,
              alt: seoData.ogTitle || seoData.metaTitle,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: seoData.twitterTitle || seoData.metaTitle,
      description: seoData.twitterDescription || seoData.metaDescription,
      images: seoData.twitterImage ? [seoData.twitterImage] : [],
    },
  };
}

/**
 * Generate structured data (JSON-LD)
 */
export function generateStructuredData(seoData: SeoMetadata | null) {
  if (!seoData?.structuredData) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    ...seoData.structuredData,
  };
}
