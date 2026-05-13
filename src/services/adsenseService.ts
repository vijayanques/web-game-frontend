const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface AdConfig {
  slot: string;
  adClient?: string;
  adSlot?: string;
  adType: 'adsense' | 'static' | 'promotional';
  responsive: boolean;
  imageUrl?: string;
  targetUrl?: string;
}

export const getAdConfigs = async (): Promise<AdConfig[]> => {
  try {
    const response = await fetch(`${API_URL}/api/adsense/config`);
    if (!response.ok) throw new Error('Failed to fetch ad configs');
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching ad configurations:', error);
    return [];
  }
};
