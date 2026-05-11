// SEO Metadata Fetcher
// Fetches SEO metadata from backend and generates Next.js Metadata objects

import { Metadata } from 'next';

const getApiBaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || 'https://game-backend-production-3988.up.railway.app/api';
  // Ensure /api is at the end
  return url.endsWith('/api') ? url : `${url}/api`;
};

const API_BASE_URL = getApiBaseUrl();

export interface SeoMetadataRecord {
  id: number;
  entityType: 'game' | 'category';
  entityId: number;
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
  structuredData?: Record<string, any>;
}

// Fetch SEO metadata from backend
export async function fetchSeoMetadata(
  entityType: 'game' | 'category',
  entityId: number
): Promise<SeoMetadataRecord | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://game-backend-production-3988.up.railway.app/api';
    const url = `${apiUrl}/seo/${entityType}/${entityId}`;
    
    console.log('🔍 Fetching SEO metadata from:', url);
    
    const response = await fetch(url, { 
      cache: 'no-store' // Disable caching
    });

    console.log('🔍 SEO Response status:', response.status);

    if (!response.ok) {
      console.error('❌ Failed to fetch SEO metadata:', response.status);
      return null;
    }

    const data = await response.json();
    console.log('✅ SEO metadata:', data);
    
    return data;
  } catch (error) {
    console.error('❌ Error fetching SEO metadata:', error);
    return null;
  }
}

// Generate Next.js Metadata from SEO record
export function generateMetadataFromSeo(
  seoData: SeoMetadataRecord | null,
  fallbackData: {
    title: string;
    description: string;
    url: string;
    image?: string;
  }
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://theplayfree.com';

  if (!seoData) {
    // Use fallback data if no SEO metadata found
    return {
      title: fallbackData.title,
      description: fallbackData.description,
      alternates: {
        canonical: fallbackData.url,
      },
      openGraph: {
        type: 'website',
        url: fallbackData.url,
        title: fallbackData.title,
        description: fallbackData.description,
        images: fallbackData.image
          ? [
              {
                url: fallbackData.image,
                width: 1200,
                height: 630,
                alt: fallbackData.title,
              },
            ]
          : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: fallbackData.title,
        description: fallbackData.description,
        images: fallbackData.image ? [fallbackData.image] : undefined,
      },
    };
  }

  // Use SEO metadata
  const title = seoData.metaTitle || fallbackData.title;
  const description = seoData.metaDescription || fallbackData.description;
  const canonicalUrl = seoData.canonicalUrl || fallbackData.url;
  const ogImage = seoData.ogImage || fallbackData.image;

  return {
    title,
    description,
    keywords: seoData.metaKeywords
      ? seoData.metaKeywords.split(',').map((k) => k.trim())
      : undefined,
    robots: seoData.robots || 'index, follow',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: seoData.ogTitle || title,
      description: seoData.ogDescription || description,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: seoData.ogTitle || title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.twitterTitle || title,
      description: seoData.twitterDescription || description,
      images: seoData.twitterImage ? [seoData.twitterImage] : undefined,
    },
  };
}

// Generate structured data (JSON-LD) for games
export function generateGameStructuredData(
  game: {
    id: number;
    title: string;
    slug: string;
    description?: string;
    thumbnail?: string;
    rating?: number;
    genre?: string;
  },
  seoData: SeoMetadataRecord | null
): Record<string, any> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://theplayfree.com';
  const url = `${baseUrl}/game/${game.slug}`;

  const structuredData = seoData?.structuredData || {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.title,
    description: game.description || '',
    url,
    image: game.thumbnail,
    genre: game.genre,
    aggregateRating: game.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: game.rating,
          bestRating: 10,
          worstRating: 0,
        }
      : undefined,
  };

  return structuredData;
}

// Generate structured data for categories
export function generateCategoryStructuredData(
  category: {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
  },
  seoData: SeoMetadataRecord | null
): Record<string, any> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://theplayfree.com';
  const url = `${baseUrl}/category/${category.slug}`;

  const structuredData = seoData?.structuredData || {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description || '',
    url,
    image: category.image,
  };

  return structuredData;
}
