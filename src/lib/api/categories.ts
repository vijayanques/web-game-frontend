const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface Category {
  id: number;
  name: string;
  slug?: string;
  description: string;
  icon?: string;
  image?: string;
  isActive: boolean;
  is_active?: boolean;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
}

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/api/categories`);
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.message || 'Failed to fetch categories');
  }
  
  return data.data;
};
