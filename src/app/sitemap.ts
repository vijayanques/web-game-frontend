import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://game-web-app1.vercel.app';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/forgot-password`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Fetch categories
  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const catResponse = await fetch('https://game-backend-production-3988.up.railway.app/api/categories', {
      cache: 'no-store',
    });
    
    if (catResponse.ok) {
      const catData = await catResponse.json();
      const categories = catData.data || catData.categories || [];
      categoryRoutes = categories
        .filter((cat: any) => cat.isActive !== false)
        .map((category: any) => ({
          url: `${baseUrl}/category/${category.slug}`,
          lastModified: new Date(category.updatedAt || category.createdAt || new Date()),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }));
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

  // Fetch games
  let gameRoutes: MetadataRoute.Sitemap = [];
  try {
    const gameResponse = await fetch('https://game-backend-production-3988.up.railway.app/api/games', {
      cache: 'no-store',
    });
    
    if (gameResponse.ok) {
      const gameData = await gameResponse.json();
      const games = gameData.data || gameData.games || [];
      gameRoutes = games.map((game: any) => ({
        url: `${baseUrl}/game/${game.slug}`,
        lastModified: new Date(game.updatedAt || game.createdAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      }));
    }
  } catch (error) {
    console.error('Error fetching games:', error);
  }

  return [...staticRoutes, ...categoryRoutes, ...gameRoutes];
}
