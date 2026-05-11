// Game Page Metadata Generation
// Server-side metadata generation for dynamic game pages

import { Metadata } from 'next';
import {
  fetchSeoMetadata,
  generateMetadataFromSeo,
  generateGameStructuredData,
} from '@/lib/seoMetadataFetcher';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://theplayfree.com';

interface GameData {
  id: number;
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  rating?: number;
  genre?: string;
}

async function fetchGameData(slug: string): Promise<GameData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/games/${slug}`, {
      next: { revalidate: 0 }, // No caching - always fetch fresh
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    // Handle both direct data and wrapped response
    return result.data || result;
  } catch (error) {
    console.error('Error fetching game data:', error);
    return null;
  }
}

export const revalidate = 0; // Disable caching for dynamic metadata

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Fetch game data
  const game = await fetchGameData(slug);

  if (!game) {
    return {
      title: 'Game Not Found',
      description: 'The game you are looking for does not exist.',
    };
  }

  // Fetch SEO metadata from backend - THIS IS THE ONLY SOURCE
  const seoData = await fetchSeoMetadata('game', game.id);
  
  console.log('🔍 Game ID:', game.id);
  console.log('🔍 SEO Data fetched:', seoData);

  // If SEO metadata exists, use ONLY that
  if (seoData && seoData.metaTitle) {
    return {
      title: seoData.metaTitle,
      description: seoData.metaDescription || '',
      keywords: seoData.metaKeywords ? seoData.metaKeywords.split(',').map(k => k.trim()) : [],
      robots: seoData.robots || 'index, follow',
      alternates: {
        canonical: seoData.canonicalUrl || `${BASE_URL}/game/${slug}`,
      },
      openGraph: {
        type: 'website',
        url: seoData.canonicalUrl || `${BASE_URL}/game/${slug}`,
        title: seoData.ogTitle || seoData.metaTitle,
        description: seoData.ogDescription || seoData.metaDescription || '',
        images: seoData.ogImage ? [
          {
            url: seoData.ogImage,
            width: 1200,
            height: 630,
            alt: seoData.ogTitle || seoData.metaTitle,
          },
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: seoData.twitterTitle || seoData.metaTitle,
        description: seoData.twitterDescription || seoData.metaDescription || '',
        images: seoData.twitterImage ? [seoData.twitterImage] : [],
      },
    };
  }

  // If no SEO metadata, return empty/minimal metadata
  return {
    title: game.title,
    description: '',
  };
}
