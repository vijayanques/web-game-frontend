// import type { Metadata } from "next";
// import { Plus_Jakarta_Sans, Poppins } from 'next/font/google';
// // import ConditionalLayout from "@/components/ConditionalLayout";
// import QueryProvider from "@/providers/QueryProvider";
// import { CategoryProvider } from "@/contexts/CategoryContext";
// import Header from "@/components/Header";
// import CategoriesHeader from "@/components/Home/CategoriesHeader";

// import "./globals.css";

// const jakarta = Plus_Jakarta_Sans({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'],
//   variable: '--font-jakarta',
//   display: 'block',
// });

// const poppins = Poppins({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'],
//   variable: '--font-poppins',
//   display: 'block',
// });

// export const metadata: Metadata = {
//   title: "Theplayfree - Free Browser Games",
//   description: "ThePlayFree is your destination for quick, free, and entertaining browser games.",
//   keywords: ["free games", "browser games", "online games", "play free"],
//   authors: [{ name: "Theplayfree" }],
//   openGraph: {
//     title: "Theplayfree - Free Browser Games",
//     description: "ThePlayFree is your destination for quick, free, and entertaining browser games.",
//     type: "website",
//     images: [
//       {
//         url: "/Images/favicon.png",
//         width: 1200,
//         height: 630,
//         alt: "Theplayfree - Free Browser Games",
//       },
//     ],
//   },
//   robots: {
//     index: true,
//     follow: true,
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html
//       lang="en"
//       className={`${jakarta.variable} ${poppins.variable} h-full antialiased`}
//     >
//       <body className="min-h-full flex flex-col">
//         <QueryProvider>
//           <CategoryProvider>
//             <Header />
//             <CategoriesHeader />
//             {/* <ConditionalLayout> */}
//             {children}
//             {/* </ConditionalLayout> */}
//           </CategoryProvider>
//         </QueryProvider>
//       </body>
//     </html>
//   );
// }



import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins } from 'next/font/google';
import QueryProvider from "@/providers/QueryProvider";
import { CategoryProvider } from "@/contexts/CategoryContext";
import Header from "@/components/Header";
import CategoriesHeader from "@/components/Home/CategoriesHeader";
import CustomCursor from "@/components/CustomCursor";

import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'block',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'block',
});

export const metadata: Metadata = {
  title: "Theplayfree - Free Browser Games",
  description: "ThePlayFree is your destination for quick, free, and entertaining browser games.",
  keywords: ["free games", "browser games", "online games", "play free"],
  authors: [{ name: "Theplayfree" }],

  icons: {
    // icon: "/Images/favicon.png",
  },

  verification: {
    google: '6johWO9GkPOVjyaDvImIDpORJb_RVDiuVLKdsNDOb1k',
  },

  openGraph: {
    title: "Theplayfree - Free Browser Games",
    description: "ThePlayFree is your destination for quick, free, and entertaining browser games.",
    type: "website",
    images: [
      {
        url: "/Images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Theplayfree - Free Browser Games",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ThePlayFree',
    description: 'ThePlayFree is your destination for quick, free, and entertaining browser games.',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://theplayfree.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://theplayfree.com'}?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <QueryProvider>
          <CategoryProvider>
            <Header />
            <CategoriesHeader />
            {children}
          </CategoryProvider>
        </QueryProvider>
      </body>
    </html>
  );
}