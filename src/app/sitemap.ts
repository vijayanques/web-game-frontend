import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://game-web-app1.vercel.app';

  // Static routes - always included
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

  // Try to fetch categories
  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://game-backend-production-3988.up.railway.app';
    const catResponse = await fetch(`${apiUrl}/api/categories`, {
      next: { revalidate: 3600 },
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

  // Try to fetch games
  let gameRoutes: MetadataRoute.Sitemap = [];
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://game-backend-production-3988.up.railway.app';
    const gameResponse = await fetch(`${apiUrl}/api/games`, {
      next: { revalidate: 3600 },
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
