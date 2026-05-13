// Hook for fetching SEO metadata on the client side

import { useEffect, useState } from 'react';
import { SeoMetadata, fetchSeoMetadataBySlug } from '@/lib/seoUtils';

export function useSeoMetadata(slug: string) {
  const [metadata, setMetadata] = useState<SeoMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        setLoading(true);
        const data = await fetchSeoMetadataBySlug(slug);
        setMetadata(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch metadata'));
      } finally {
        setLoading(false);
      }
    };

    loadMetadata();
  }, [slug]);

  return { metadata, loading, error };
}
