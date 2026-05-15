import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import { generateMetadataFromSeo } from '@/lib/seoMetadataFetcher';

export async function generateMetadata(): Promise<Metadata> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://game-backend-production-3988.up.railway.app/api';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://theplayfree.com';

  try {
    // Fetch SEO metadata for the home page (static page slug "/")
    // We use the specialized slug endpoint
    const response = await fetch(`${apiUrl}/seo/type/page/slug/%2F`, { 
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
      const result = await response.json();
      const seoData = result.record || result.data || result;
      
      if (seoData && seoData.metaTitle) {
        return generateMetadataFromSeo(seoData, {
          title: 'Theplayfree - Free Browser Games',
          description: 'Play free games online at Theplayfree',
          url: baseUrl,
        });
      }
    }
    
    console.warn('Home page SEO metadata not found in API, using defaults');
  } catch (error) {
    console.error('Error fetching home page metadata:', error);
  }

  // Final fallback metadata
  return {
    title: 'Theplayfree - Free Browser Games',
    description: 'ThePlayFree is your destination for quick, free, and entertaining browser games.',
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      title: 'Theplayfree - Free Browser Games',
      description: 'ThePlayFree is your destination for quick, free, and entertaining browser games.',
      type: 'website',
      url: baseUrl,
      images: [
        {
          url: '/Images/favicon.png',
          width: 1200,
          height: 630,
          alt: 'Theplayfree',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Theplayfree - Free Browser Games',
      description: 'ThePlayFree is your destination for quick, free, and entertaining browser games.',
      images: ['/Images/favicon.png'],
    },
  };
}

export default function Home() {
  return <HomeClient />;
}
