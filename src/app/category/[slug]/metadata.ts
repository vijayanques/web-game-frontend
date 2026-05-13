// Category Page Metadata Generation
import { Metadata } from 'next';

interface CategoryData {
  id: number;
  name: string;
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
    let apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://game-backend-production-3988.up.railway.app';
    // Ensure /api is at the end
    if (!apiUrl.endsWith('/api')) {
      apiUrl = `${apiUrl}/api`;
    }
    
    // Fetch all categories to find the one with matching slug
    const categoriesResponse = await fetch(
      `${apiUrl}/categories`,
      { cache: 'no-store' }
    );

    if (!categoriesResponse.ok) {
      console.error('Failed to fetch categories:', categoriesResponse.status);
      return {
        title: 'Category Not Found',
        description: 'The category you are looking for does not exist.',
      };
    }

    const categoriesResult = await categoriesResponse.json();
    
    // Handle both array and object with data property
    const categories: CategoryData[] = Array.isArray(categoriesResult) 
      ? categoriesResult 
      : (categoriesResult.data || categoriesResult.categories || []);
    
    // Find category by slug
    const category = categories.find((cat: CategoryData) => {
      const categorySlug = cat.slug || cat.name.toLowerCase().replace(/\s+/g, '');
      return categorySlug === slug;
    });

    if (!category) {
      console.error('Category not found for slug:', slug);
      return {
        title: 'Category Not Found',
        description: 'The category you are looking for does not exist.',
      };
    }

    // Fetch SEO metadata
    const seoResponse = await fetch(
      `${apiUrl}/seo/category/${category.id}`,
      { cache: 'no-store' }
    );

    if (seoResponse.ok) {
      const seoData: SeoData = await seoResponse.json();
      
      // If SEO metadata exists, use it
      if (seoData && seoData.metaTitle) {
        // Use canonical URL from database if provided, otherwise generate it
        const canonicalUrl = seoData.canonicalUrl || `https://game-web-app1.vercel.app/category/${slug}`;
        
        return {
          title: seoData.metaTitle,
          description: seoData.metaDescription || '',
          keywords: seoData.metaKeywords?.split(',').map(k => k.trim()) || [],
          robots: seoData.robots || 'index, follow',
          alternates: {
            canonical: canonicalUrl,
          },
          openGraph: {
            type: 'website',
            url: canonicalUrl,
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
    } else {
      console.log('No SEO metadata found for category:', category.id);
    }

    // Fallback to category name if no SEO metadata
    return {
      title: `${category.name} Games - Play Free Online`,
      description: category.description || `Browse and play all ${category.name} games for free online`,
      alternates: {
        canonical: `https://game-web-app1.vercel.app/category/${slug}`,
      },
    };

  } catch (error) {
    console.error('Error generating metadata:', error);
    // Return a basic fallback instead of error
    return {
      title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Games`,
      description: `Play free ${slug} games online`,
    };
  }
}
