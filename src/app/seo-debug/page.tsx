'use client';

import { useState } from 'react';
import { usePageSeo } from '@/hooks/usePageSeo';
import Footer from '@/components/Footer';

export default function SeoDebugPage() {
  const [testSlug, setTestSlug] = useState('/privacy-policy');
  const { seoMetadata, loading, error } = usePageSeo(testSlug);

  const handleTest = (slug: string) => {
    setTestSlug(slug);
  };

  const testSlugs = [
    '/privacy-policy',
    '/terms-of-service',
    '/about',
    '/contact',
    '/',
  ];

  return (
    <div className="min-h-screen bg-[#E8E9ED]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">SEO Metadata Debug</h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Test SEO Metadata Fetching</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Test Slug: <code className="bg-gray-100 px-2 py-1 rounded">{testSlug}</code>
            </label>
            <input
              type="text"
              value={testSlug}
              onChange={(e) => setTestSlug(e.target.value)}
              placeholder="/privacy-policy"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Quick Test Links:</h3>
            <div className="flex flex-wrap gap-2">
              {testSlugs.map((slug) => (
                <button
                  key={slug}
                  onClick={() => handleTest(slug)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    testSlug === slug
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  {slug || 'Home'}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Fetch Status:</h3>

            {loading && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-900">
                ⏳ Loading SEO metadata...
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-900">
                ❌ Error: {error}
              </div>
            )}

            {!loading && !error && !seoMetadata && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-900">
                ⚠️ No SEO metadata found for this slug
              </div>
            )}

            {!loading && seoMetadata && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-900 font-semibold mb-4">✅ SEO Metadata Found!</p>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Basic Info</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium text-gray-700">ID:</span>{' '}
                        <code className="bg-gray-100 px-2 py-1 rounded">{seoMetadata.id}</code>
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">Entity Type:</span>{' '}
                        <code className="bg-gray-100 px-2 py-1 rounded">{seoMetadata.entityType}</code>
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">Page Name:</span>{' '}
                        <code className="bg-gray-100 px-2 py-1 rounded">{seoMetadata.pageName}</code>
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">Page Slug:</span>{' '}
                        <code className="bg-gray-100 px-2 py-1 rounded">{seoMetadata.pageSlug}</code>
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Meta Tags</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium text-gray-700">Meta Title:</span>{' '}
                        <span className="text-gray-600">{seoMetadata.metaTitle || '(not set)'}</span>
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">Meta Description:</span>{' '}
                        <span className="text-gray-600">{seoMetadata.metaDescription || '(not set)'}</span>
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">Meta Keywords:</span>{' '}
                        <span className="text-gray-600">{seoMetadata.metaKeywords || '(not set)'}</span>
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">Canonical URL:</span>{' '}
                        <span className="text-gray-600 break-all">{seoMetadata.canonicalUrl || '(not set)'}</span>
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">Robots:</span>{' '}
                        <span className="text-gray-600">{seoMetadata.robots || '(not set)'}</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Open Graph</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium text-gray-700">OG Title:</span>{' '}
                        <span className="text-gray-600">{seoMetadata.ogTitle || '(not set)'}</span>
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">OG Description:</span>{' '}
                        <span className="text-gray-600">{seoMetadata.ogDescription || '(not set)'}</span>
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">OG Image:</span>{' '}
                        <span className="text-gray-600 break-all">{seoMetadata.ogImage || '(not set)'}</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Twitter Card</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium text-gray-700">Twitter Title:</span>{' '}
                        <span className="text-gray-600">{seoMetadata.twitterTitle || '(not set)'}</span>
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">Twitter Description:</span>{' '}
                        <span className="text-gray-600">{seoMetadata.twitterDescription || '(not set)'}</span>
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">Twitter Image:</span>{' '}
                        <span className="text-gray-600 break-all">{seoMetadata.twitterImage || '(not set)'}</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Raw JSON</h4>
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-64">
                      {JSON.stringify(seoMetadata, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">API Endpoints to Test</h2>
          <div className="space-y-3 text-sm">
            <p>
              <span className="font-medium text-gray-700">Get by Slug:</span>
              <br />
              <code className="bg-gray-100 px-2 py-1 rounded block mt-1 break-all">
                {process.env.NEXT_PUBLIC_API_URL || 'https://game-backend-production-3988.up.railway.app'}/api/seo/type/page/slug/privacy-policy
              </code>
            </p>
            <p>
              <span className="font-medium text-gray-700">Get All Pages:</span>
              <br />
              <code className="bg-gray-100 px-2 py-1 rounded block mt-1 break-all">
                {process.env.NEXT_PUBLIC_API_URL || 'https://game-backend-production-3988.up.railway.app'}/api/seo/type/page
              </code>
            </p>
            <p>
              <span className="font-medium text-gray-700">Debug Endpoint:</span>
              <br />
              <code className="bg-gray-100 px-2 py-1 rounded block mt-1 break-all">
                {process.env.NEXT_PUBLIC_API_URL || 'https://game-backend-production-3988.up.railway.app'}/api/debug/page-seo
              </code>
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Use This Debug Page:</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-900 text-sm">
            <li>Add SEO metadata for a page in the admin panel</li>
            <li>Use the quick test buttons or enter a custom slug</li>
            <li>Check if the metadata is being fetched correctly</li>
            <li>If not found, check the API endpoints directly in your browser</li>
            <li>Verify the page slug format matches (should start with /)</li>
          </ol>
        </div>
      </div>

      <Footer />
    </div>
  );
}
