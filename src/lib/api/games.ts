const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Game {
  id: number;
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  videoUrl?: string;
  genre?: string;
  rating?: number;
  plays?: number;
  isActive?: boolean;
  is_active?: boolean;
  categoryId?: number;
  category_id?: number;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  createdAt?: string;
  created_at?: string;
}

export const fetchGames = async (categoryId?: number | string): Promise<Game[]> => {
  let url = `${API_BASE_URL}/api/games`;
  
  if (categoryId && categoryId !== 'all') {
    url += `?category_id=${categoryId}`;
  }
  
  const response = await fetch(url, {
    cache: 'no-store', // Disable caching to ensure fresh data
  });
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.message || 'Failed to fetch games');
  }
  
  return data.data;
};

export const fetchGamesByCategory = async (categoryId: number): Promise<Game[]> => {
  const response = await fetch(`${API_BASE_URL}/api/games?categoryId=${categoryId}`);
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.message || 'Failed to fetch games');
  }
  
  return data.data;
};
