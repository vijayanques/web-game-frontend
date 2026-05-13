'use client';

import { useEffect } from 'react';
import { usePageSeo } from '@/hooks/usePageSeo';

interface PageSeoHeadProps {
  pageSlug: string;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultImage?: string;
}

export default function PageSeoHead({
  pageSlug,
  defaultTitle,
  defaultDescription,
  defaultImage,
}: PageSeoHeadProps) {
  const { seoMetadata, loading, error } = usePageSeo(pageSlug);

  const pageUrl = `https://game-web-app1.vercel.app${pageSlug}`;
  const title = seoMetadata?.metaTitle || defaultTitle || 'Theplayfree - Free Browser Games';
  const description = seoMetadata?.metaDescription || defaultDescription || 'Play free games online at Theplayfree';
  const canonical = seoMetadata?.canonicalUrl || pageUrl;
  const image = seoMetadata?.ogImage || defaultImage || 'https://game-web-app1.vercel.app/og-image.png';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Update document title
    document.title = title;

    // Helper function to set or update meta tags
    const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
      let element = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    // Set all meta tags
    setMeta('name', 'description', description);
    setMeta('name', 'robots', seoMetadata?.robots || 'index, follow');
    
    if (seoMetadata?.metaKeywords) {
      setMeta('name', 'keywords', seoMetadata.metaKeywords);
    }

    // Open Graph tags
    setMeta('property', 'og:title', seoMetadata?.ogTitle || title);
    setMeta('property', 'og:description', seoMetadata?.ogDescription || description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', pageUrl);
    setMeta('property', 'og:image', image);

    // Twitter Card tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:url', pageUrl);
    setMeta('name', 'twitter:title', seoMetadata?.twitterTitle || seoMetadata?.ogTitle || title);
    setMeta('name', 'twitter:description', seoMetadata?.twitterDescription || seoMetadata?.ogDescription || description);
    setMeta('name', 'twitter:image', seoMetadata?.twitterImage || image);

    // Canonical URL
    let canonicalElement = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', canonical);

    // Structured data (JSON-LD)
    if (seoMetadata?.structuredData) {
      let script = document.head.querySelector('script[data-seo-structured-data]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-structured-data', 'true');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        ...seoMetadata.structuredData,
      });
    }
  }, [title, description, canonical, image, pageUrl, seoMetadata]);

  if (error) {
    console.warn('SEO metadata error:', error);
  }

  return null;
}
