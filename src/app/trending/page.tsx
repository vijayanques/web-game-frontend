import type { Metadata } from 'next';
import TrendingClient from './TrendingClient';
import { generateMetadataFromSeo } from '@/lib/seoMetadataFetcher';

export async function generateMetadata(): Promise<Metadata> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://game-backend-production-3988.up.railway.app/api';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://theplayfree.com';

  try {
    const response = await fetch(`${apiUrl}/seo/type/page/slug/%2Ftrending`, { 
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
      const result = await response.json();
      const seoData = result.record || result.data || result;
      
      if (seoData && seoData.metaTitle) {
        return generateMetadataFromSeo(seoData, {
          title: 'Trending Games - Top Ranked Games | Theplayfree',
          description: 'Explore the most played and trending games on Theplayfree right now.',
          url: `${baseUrl}/trending`,
        });
      }
    }
  } catch (error) {
    console.error('Error fetching trending page metadata:', error);
  }

  return {
    title: 'Trending Games - Top Ranked Games | Theplayfree',
    description: 'Explore the most played and trending games on Theplayfree right now. See what everyone is playing!',
    alternates: {
      canonical: `${baseUrl}/trending`,
    },
    openGraph: {
      title: 'Trending Games - Top Ranked Games | Theplayfree',
      description: 'Explore the most played and trending games on Theplayfree right now.',
      images: ['/Images/favicon.png'],
    }
  };
}

export default function TrendingPage() {
  return <TrendingClient />;
}
