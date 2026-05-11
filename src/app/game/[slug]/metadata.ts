// Game Page Metadata Generation
import { Metadata } from 'next';

interface GameData {
  id: number;
  title: string;
  slug: string;
  description?: string;
}

interface SeoData {
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
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    // Fetch game data
    const gameResponse = await fetch(
      `https://game-backend-production-3988.up.railway.app/api/games/${slug}`,
      { cache: 'no-store' }
    );

    if (!gameResponse.ok) {
      console.error('Failed to fetch game:', gameResponse.status);
      return {
        title: 'Game Not Found',
        description: 'The game you are looking for does not exist.',
      };
    }

    const gameResult = await gameResponse.json();
    const game: GameData = gameResult.data || gameResult;

    // Fetch SEO metadata
    const seoResponse = await fetch(
      `https://game-backend-production-3988.up.railway.app/api/seo/game/${game.id}`,
      { cache: 'no-store' }
    );

    if (seoResponse.ok) {
      const seoData: SeoData = await seoResponse.json();
      
      // If SEO metadata exists, use it
      if (seoData.metaTitle) {
        return {
          title: seoData.metaTitle,
          description: seoData.metaDescription || '',
          keywords: seoData.metaKeywords?.split(',').map(k => k.trim()) || [],
          robots: seoData.robots || 'index, follow',
          alternates: {
            canonical: seoData.canonicalUrl || `https://game-web-app1.vercel.app/game/${slug}`,
          },
          openGraph: {
            type: 'website',
            url: seoData.canonicalUrl || `https://game-web-app1.vercel.app/game/${slug}`,
            title: seoData.ogTitle || seoData.metaTitle,
            description: seoData.ogDescription || seoData.metaDescription || '',
            images: seoData.ogImage ? [{
              url: seoData.ogImage,
              width: 1200,
              height: 630,
              alt: seoData.ogTitle || seoData.metaTitle,
            }] : [],
          },
          twitter: {
            card: 'summary_large_image',
            title: seoData.twitterTitle || seoData.metaTitle,
            description: seoData.twitterDescription || seoData.metaDescription || '',
            images: seoData.twitterImage ? [seoData.twitterImage] : [],
          },
        };
      }
    }

    // Fallback to game title if no SEO metadata
    return {
      title: game.title,
      description: game.description || '',
    };

  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error Loading Game',
      description: 'An error occurred while loading the game.',
    };
  }
}
