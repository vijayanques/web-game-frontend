'use client';

import { useEffect, useState } from 'react';

interface MetadataInfo {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  robots: string;
}

export function MetadataViewer() {
  const [metadata, setMetadata] = useState<MetadataInfo | null>(null);

  useEffect(() => {
    // Extract metadata from the page head
    const extractMetadata = () => {
      const info: MetadataInfo = {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
        ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '',
        ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '',
        ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '',
        twitterTitle: document.querySelector('meta[name="twitter:title"]')?.getAttribute('content') || '',
        twitterDescription: document.querySelector('meta[name="twitter:description"]')?.getAttribute('content') || '',
        twitterImage: document.querySelector('meta[name="twitter:image"]')?.getAttribute('content') || '',
        robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') || '',
      };
      setMetadata(info);
    };

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', extractMetadata);
      return () => document.removeEventListener('DOMContentLoaded', extractMetadata);
    } else {
      extractMetadata();
    }
  }, []);

  if (!metadata) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <button
        onClick={() => {
          const el = document.getElementById('metadata-viewer-panel');
          if (el) el.classList.toggle('hidden');
        }}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold mb-2 w-full"
      >
        📊 View Metadata
      </button>
      
      <div
        id="metadata-viewer-panel"
        className="hidden bg-slate-900 border border-slate-700 rounded-lg p-4 text-xs text-slate-300 max-h-96 overflow-y-auto"
      >
        <h3 className="font-bold text-white mb-3">Page Metadata</h3>
        
        <div className="space-y-2">
          <div>
            <p className="text-slate-400">Title:</p>
            <p className="text-green-400 overflow-wrap-break-word">{metadata.title}</p>
          </div>
          
          <div>
            <p className="text-slate-400">Description:</p>
            <p className="text-green-400 overflow-wrap-break-word">{metadata.description || '❌ Not set'}</p>
          </div>
          
          <div>
            <p className="text-slate-400">Canonical URL:</p>
            <p className="text-green-400 overflow-wrap-break-word">{metadata.canonical || '❌ Not set'}</p>
          </div>
          
          <hr className="border-slate-700 my-2" />
          
          <div>
            <p className="text-slate-400 font-semibold">Open Graph:</p>
            <p className="text-slate-500">og:title: {metadata.ogTitle || '❌'}</p>
            <p className="text-slate-500">og:description: {metadata.ogDescription || '❌'}</p>
            <p className="text-slate-500">og:image: {metadata.ogImage ? '✅' : '❌'}</p>
          </div>
          
          <hr className="border-slate-700 my-2" />
          
          <div>
            <p className="text-slate-400 font-semibold">Twitter Card:</p>
            <p className="text-slate-500">twitter:title: {metadata.twitterTitle || '❌'}</p>
            <p className="text-slate-500">twitter:description: {metadata.twitterDescription || '❌'}</p>
            <p className="text-slate-500">twitter:image: {metadata.twitterImage ? '✅' : '❌'}</p>
          </div>
          
          <hr className="border-slate-700 my-2" />
          
          <div>
            <p className="text-slate-400">Robots:</p>
            <p className="text-slate-500">{metadata.robots || 'Not set'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
