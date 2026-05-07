import { NextResponse } from 'next/server';

async function fetchGames() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://game-backend-production-3988.up.railway.app';
    const response = await fetch(`${apiUrl}/api/games`, { next: { revalidate: 3600 } });
    if (!response.ok) return [];
    const data = await response.json();
    return data.data || data.games || (Array.isArray(data) ? data : []);
  } catch { return []; }
}

async function fetchCategories() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://game-backend-production-3988.up.railway.app';
    const response = await fetch(`${apiUrl}/api/categories`, { next: { revalidate: 3600 } });
    if (!response.ok) return [];
    const data = await response.json();
    const categories = data.data || data.categories || (Array.isArray(data) ? data : []);
    return categories.filter((cat: any) => cat.isActive !== false);
  } catch { return []; }
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://game-web-app1.vercel.app';

  const staticRoutes = [
    { url: baseUrl, lastmod: new Date().toISOString(), changefreq: 'daily', priority: 1 },
    { url: `${baseUrl}/login`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/signup`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about-us`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/terms-of-service`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/profile`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/forgot-password`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.5 },
  ];

  const categories = await fetchCategories();
  const categoryRoutes = categories.map((cat: any) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastmod: new Date(cat.updatedAt || cat.createdAt || new Date()).toISOString(),
    changefreq: 'weekly',
    priority: 0.8,
  }));

  const games = await fetchGames();
  const gameRoutes = games.map((game: any) => ({
    url: `${baseUrl}/game/${game.slug}`,
    lastmod: new Date(game.updatedAt || game.createdAt || new Date()).toISOString(),
    changefreq: 'weekly',
    priority: 0.9,
  }));

  const allRoutes = [...staticRoutes, ...categoryRoutes, ...gameRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
    },
  });
}