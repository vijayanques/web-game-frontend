// Category Page Metadata Generation
// Server-side metadata generation for dynamic category pages

import { Metadata } from 'next';
import {
  fetchSeoMetadata,
  generateMetadataFromSeo,
  generateCategoryStructuredData,
} from '@/lib/seoMetadataFetcher';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://theplayfree.com';

interface CategoryData {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

async function fetchCategoryData(slug: string): Promise<CategoryData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    // Handle both direct data and wrapped response
    return result.data || result;
  } catch (error) {
    console.error('Error fetching category data:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Fetch category data
  const category = await fetchCategoryData(slug);

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The category you are looking for does not exist.',
    };
  }

  // Fetch SEO metadata from backend
  const seoData = await fetchSeoMetadata('category', category.id);

  // Generate fallback data
  const fallbackData = {
    title: `${category.name} Games - Play Free Online`,
    description:
      category.description ||
      `Explore and play free ${category.name} games online at ThePlayFree`,
    url: `${BASE_URL}/category/${slug}`,
    image: category.image,
  };

  // Generate metadata from SEO data or fallback
  return generateMetadataFromSeo(seoData, fallbackData);
}
