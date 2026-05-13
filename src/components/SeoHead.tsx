'use client';

import { useEffect } from 'react';
import { SeoMetadata } from '@/lib/seoUtils';

interface SeoHeadProps {
  metadata: SeoMetadata | null;
  defaultTitle?: string;
  defaultDescription?: string;
}

/**
 * Client-side component to apply SEO metadata to the document head
 * This complements server-side metadata and ensures dynamic updates
 */
export default function SeoHead({
  metadata,
  defaultTitle,
  defaultDescription,
}: SeoHeadProps) {
  useEffect(() => {
    if (!metadata) return;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://game-web-app1.vercel.app';

    // Update title
    if (metadata.metaTitle) {
      document.title = metadata.metaTitle;
    }

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!tag) {
        tag = document.createElement('meta');
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    const updatePropertyTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Meta description
    if (metadata.metaDescription) {
      updateMetaTag('description', metadata.metaDescription);
    }

    // Meta keywords
    if (metadata.metaKeywords) {
      updateMetaTag('keywords', metadata.metaKeywords);
    }

    // Robots
    if (metadata.robots) {
      updateMetaTag('robots', metadata.robots);
    }

    // Canonical URL
    if (metadata.canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = metadata.canonicalUrl;
    }

    // Open Graph tags
    if (metadata.ogTitle) {
      updatePropertyTag('og:title', metadata.ogTitle);
    }
    if (metadata.ogDescription) {
      updatePropertyTag('og:description', metadata.ogDescription);
    }
    if (metadata.ogImage) {
      updatePropertyTag('og:image', metadata.ogImage);
    }
    updatePropertyTag('og:url', metadata.canonicalUrl || `${baseUrl}${metadata.pageSlug}`);
    updatePropertyTag('og:type', 'website');

    // Twitter Card tags
    if (metadata.twitterTitle) {
      updateMetaTag('twitter:title', metadata.twitterTitle);
    }
    if (metadata.twitterDescription) {
      updateMetaTag('twitter:description', metadata.twitterDescription);
    }
    if (metadata.twitterImage) {
      updateMetaTag('twitter:image', metadata.twitterImage);
    }
    updateMetaTag('twitter:card', 'summary_large_image');

    // Structured data (JSON-LD)
    if (metadata.structuredData) {
      let script = document.querySelector('script[data-seo-structured-data]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-structured-data', 'true');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        ...metadata.structuredData,
      });
    }
  }, [metadata]);

  return null;
}
