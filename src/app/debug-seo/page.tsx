'use client';

import { useEffect, useState } from 'react';

interface DebugInfo {
  backendUrl: string;
  pageSlug: string;
  allRecords: any[];
  slugLookup: any;
  loading: boolean;
  error: string | null;
}

export default function DebugSeoPage() {
  const [debug, setDebug] = useState<DebugInfo>({
    backendUrl: '',
    pageSlug: '/terms-of-service',
    allRecords: [],
    slugLookup: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const runDiagnostics = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          'https://game-backend-production-3988.up.railway.app/api';
        const cleanedUrl = apiUrl.replace(/\/+$/, '');
        const apiPrefix = cleanedUrl.endsWith('/api')
          ? cleanedUrl
          : `${cleanedUrl}/api`;

        setDebug((prev) => ({ ...prev, backendUrl: apiPrefix, loading: true }));

        // Fetch all page SEO records
        const allRecordsRes = await fetch(`${apiPrefix}/debug/page-seo`);
        const allRecordsData = await allRecordsRes.json();

        // Fetch slug-specific record
        const slugLookupRes = await fetch(
          `${apiPrefix}/debug/page-seo/slug/terms-of-service`
        );
        const slugLookupData = await slugLookupRes.json();

        setDebug((prev) => ({
          ...prev,
          allRecords: allRecordsData.records || [],
          slugLookup: slugLookupData,
          loading: false,
        }));
      } catch (error: any) {
        setDebug((prev) => ({
          ...prev,
          error: error.message,
          loading: false,
        }));
      }
    };

    runDiagnostics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">SEO Metadata Debug</h1>

        {debug.loading ? (
          <div className="text-center py-12">
            <p className="text-xl">Loading diagnostics...</p>
          </div>
        ) : debug.error ? (
          <div className="bg-red-900 border border-red-600 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p>{debug.error}</p>
          </div>
        ) : (
          <>
            {/* Backend Info */}
            <div className="bg-slate-800 rounded-lg p-6 mb-8 border border-slate-700">
              <h2 className="text-xl font-bold mb-4">Backend Connection</h2>
              <p className="text-sm text-gray-400">
                <strong>API URL:</strong> {debug.backendUrl}
              </p>
            </div>

            {/* All Records */}
            <div className="bg-slate-800 rounded-lg p-6 mb-8 border border-slate-700">
              <h2 className="text-xl font-bold mb-4">
                All Page SEO Records ({debug.allRecords.length})
              </h2>
              {debug.allRecords.length === 0 ? (
                <p className="text-red-400">
                  ❌ No page SEO records found in database!
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-left py-2">ID</th>
                        <th className="text-left py-2">Page Slug</th>
                        <th className="text-left py-2">Page Name</th>
                        <th className="text-left py-2">Meta Title</th>
                        <th className="text-left py-2">Has Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {debug.allRecords.map((record) => (
                        <tr
                          key={record.id}
                          className="border-b border-slate-700 hover:bg-slate-700/30"
                        >
                          <td className="py-3">{record.id}</td>
                          <td className="py-3 font-mono text-yellow-400">
                            {record.pageSlug}
                          </td>
                          <td className="py-3">{record.pageName}</td>
                          <td className="py-3 text-xs">
                            {record.metaTitle ? (
                              <span className="bg-green-900 px-2 py-1 rounded">
                                ✓ {record.metaTitle.substring(0, 30)}...
                              </span>
                            ) : (
                              <span className="text-gray-500">—</span>
                            )}
                          </td>
                          <td className="py-3">
                            {record.metaDescription ? (
                              <span className="text-green-400">✓</span>
                            ) : (
                              <span className="text-red-400">✗</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Slug Lookup */}
            <div className="bg-slate-800 rounded-lg p-6 mb-8 border border-slate-700">
              <h2 className="text-xl font-bold mb-4">
                Slug Lookup: /terms-of-service
              </h2>
              {debug.slugLookup?.record?.id ? (
                <div>
                  <p className="text-green-400 mb-4">✅ Record found!</p>
                  <div className="bg-slate-900 rounded p-4 font-mono text-xs overflow-auto max-h-96">
                    <pre>
                      {JSON.stringify(debug.slugLookup.record, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-red-400 mb-4">❌ Record not found</p>
                  <div className="bg-slate-900 rounded p-4 font-mono text-xs">
                    <p>Searched with:</p>
                    <pre>
                      {JSON.stringify(
                        {
                          slug: debug.slugLookup?.searchedSlug,
                          normalized: debug.slugLookup?.normalizedSlug,
                          queries: debug.slugLookup?.queries,
                        },
                        null,
                        2
                      )}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Next Steps */}
            <div className="bg-blue-900 border border-blue-600 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">What to check:</h2>
              <ul className="space-y-2 text-sm">
                {debug.allRecords.length === 0 && (
                  <li className="text-red-300">
                    🔴 <strong>No records:</strong> Go to admin and add page SEO
                    for terms-of-service
                  </li>
                )}
                {debug.allRecords.length > 0 && !debug.slugLookup?.record?.id && (
                  <li className="text-red-300">
                    🔴 <strong>Slug mismatch:</strong> Check the exact slug format
                    in the table above
                  </li>
                )}
                {debug.slugLookup?.record?.id && !debug.slugLookup?.record?.metaTitle && (
                  <li className="text-yellow-300">
                    🟡 <strong>Empty metadata:</strong> The record exists but has
                    no meta data. Fill in the admin form.
                  </li>
                )}
                {debug.slugLookup?.record?.id && debug.slugLookup?.record?.metaTitle && (
                  <li className="text-green-300">
                    🟢 <strong>Looks good!</strong> Record has metadata. Check
                    browser console for fetch errors.
                  </li>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
