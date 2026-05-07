// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
  
//   // CRITICAL: Disable React Compiler for MUCH faster dev builds
//   reactCompiler: false,
  
//   // Allow access from network IP
//   allowedDevOrigins: ['192.168.1.118'],
  
//   images: {
//     unoptimized: true,
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: '**',
//       },
//       {
//         protocol: 'https',
//         hostname: '**',
//       },
//     ],
//   },
  
//   // Optimize for faster compilation
//   // experimental: {
//   //   // Optimize package imports to reduce bundle size
//   //   optimizePackageImports: ['lucide-react', '@tanstack/react-query'],
//   // },
  
//   // Skip checks in dev for faster compilation
//   typescript: {
//     ignoreBuildErrors: true,
//   },
  
//   // Allow access from any host
//   async headers() {
//     return [
//       {
//         source: '/:path*',
//         headers: [
//           { key: 'Access-Control-Allow-Origin', value: '*' },
//           { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
//           { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
//         ],
//       },
//     ];
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  allowedDevOrigins: ['192.168.1.118'],

  images: {
    unoptimized: true,
    remotePatterns: [ 
      { protocol: 'http', hostname: '**' },
      { protocol: 'https', hostname: '**' },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
      // ✅ Sitemap fix
      {
        source: '/sitemap.xml',
        headers: [
          { key: 'Content-Type', value: 'text/xml; charset=utf-8' },
        ], 
      },
    ];
  },
};

export default nextConfig;