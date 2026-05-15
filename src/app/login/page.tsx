import type { Metadata } from 'next';
import LoginClient from './LoginClient';
import { generateMetadataFromSeo } from '@/lib/seoMetadataFetcher';

export async function generateMetadata(): Promise<Metadata> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://game-backend-production-3988.up.railway.app/api';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://theplayfree.com';

  try {
    const response = await fetch(`${apiUrl}/seo/type/page/slug/%2Flogin`, { 
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
      const result = await response.json();
      const seoData = result.record || result.data || result;
      
      if (seoData && seoData.metaTitle) {
        return generateMetadataFromSeo(seoData, {
          title: 'Login - Theplayfree',
          description: 'Sign in to your Theplayfree account',
          url: `${baseUrl}/login`,
        });
      }
    }
  } catch (error) {
    console.error('Error fetching login page metadata:', error);
  }

  return {
    title: 'Login - Theplayfree',
    description: 'Sign in to your Theplayfree account to continue your gaming journey and access exclusive features.',
    alternates: {
      canonical: `${baseUrl}/login`,
    },
  };
}

export default function LoginPage() {
  return <LoginClient />;
}
