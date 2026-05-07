import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://theplayfree.com';

export const defaultMetadata: Metadata = {
  title: 'ThePlayFree - Play Free Games Online',
  description: 'Discover and play thousands of free games online. Action, adventure, puzzle, sports, and strategy games all in one place.',
  keywords: ['free games', 'online games', 'play games', 'gaming', 'tournaments'],
  authors: [{ name: 'ThePlayFree' }],
  creator: 'ThePlayFree',
  publisher: 'ThePlayFree',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'ThePlayFree',
    title: 'ThePlayFree - Play Free Games Online',
    description: 'Discover and play thousands of free games online. Action, adventure, puzzle, sports, and strategy games all in one place.',
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'ThePlayFree',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ThePlayFree - Play Free Games Online',
    description: 'Discover and play thousands of free games online.',
    images: [`${baseUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const getPageMetadata = (
  title: string,
  description: string,
  path: string,
  image?: string
): Metadata => {
  const url = `${baseUrl}${path}`;
  const imageUrl = image || `${baseUrl}/og-image.png`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
};
