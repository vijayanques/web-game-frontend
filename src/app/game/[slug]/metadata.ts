// Game Page Metadata Generation
import { Metadata } from 'next';
import { formatImageUrl, sanitizeMetaText, generateCanonicalUrl } from '@/lib/metadata-utils';

interface GameData {
  id: number;
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
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
      if (seoData && seoData.metaTitle) {
        // Use canonical URL from database if provided, otherwise generate it
        const canonicalUrl = seoData.canonicalUrl || generateCanonicalUrl(slug);
        
        // Format images for social media (handle Cloudinary URLs)
        const ogImage = formatImageUrl(seoData.ogImage) || formatImageUrl(game.thumbnail);
        const twitterImage = formatImageUrl(seoData.twitterImage) || ogImage;
        
        // Sanitize text for meta tags
        const metaTitle = sanitizeMetaText(seoData.metaTitle, 60);
        const metaDescription = sanitizeMetaText(seoData.metaDescription, 160);
        const ogTitle = sanitizeMetaText(seoData.ogTitle || seoData.metaTitle, 60);
        const ogDescription = sanitizeMetaText(seoData.ogDescription || seoData.metaDescription, 160);
        const twitterTitle = sanitizeMetaText(seoData.twitterTitle || seoData.metaTitle, 70);
        const twitterDescription = sanitizeMetaText(seoData.twitterDescription || seoData.metaDescription, 200);
        
        const metadata: Metadata = {
          title: metaTitle,
          description: metaDescription,
          keywords: seoData.metaKeywords?.split(',').map(k => k.trim()).filter(Boolean) || [],
          robots: seoData.robots || 'index, follow',
          alternates: {
            canonical: canonicalUrl,
          },
          openGraph: {
            type: 'website',
            url: canonicalUrl,
            title: ogTitle,
            description: ogDescription,
            siteName: 'Theplayfree',
            images: ogImage ? [{
              url: ogImage,
              width: 1200,
              height: 630,
              alt: ogTitle,
              type: 'image/jpeg',
            }] : [],
          },
          twitter: {
            card: 'summary_large_image',
            title: twitterTitle,
            description: twitterDescription,
            images: twitterImage ? [twitterImage] : [],
            creator: '@theplayfree',
            site: '@theplayfree',
          },
        };

        console.log('Generated metadata with SEO data:', {
          title: metaTitle,
          canonicalUrl,
          ogImage,
          twitterImage,
        });

        return metadata;
      }
    } else {
      console.log('No SEO metadata found for game:', game.id);
    }

    // Fallback to game title if no SEO metadata
    const canonicalUrl = generateCanonicalUrl(slug);
    const gameTitle = sanitizeMetaText(game.title, 60);
    const gameDescription = sanitizeMetaText(game.description, 160);
    const gameImage = formatImageUrl(game.thumbnail);

    return {
      title: `${gameTitle} - Play Free Online`,
      description: gameDescription || `Play ${gameTitle} for free online`,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        type: 'website',
        url: canonicalUrl,
        title: gameTitle,
        description: gameDescription || `Play ${gameTitle} for free online`,
        siteName: 'Theplayfree',
        images: gameImage ? [{
          url: gameImage,
          width: 1200,
          height: 630,
          alt: gameTitle,
          type: 'image/jpeg',
        }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: gameTitle,
        description: gameDescription || `Play ${gameTitle} for free online`,
        images: gameImage ? [gameImage] : [],
        creator: '@theplayfree',
        site: '@theplayfree',
      },
    };

  } catch (error) {
    console.error('Error generating metadata:', error);
    // Return a basic fallback instead of error
    return {
      title: `${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')}`,
      description: `Play this game for free online`,
    };
  }
}
