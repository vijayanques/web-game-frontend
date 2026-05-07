export const SEO_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://theplayfree.com',
  siteName: 'ThePlayFree',
  title: 'ThePlayFree - Play Free Games Online',
  description: 'Discover and play thousands of free games online. Action, adventure, puzzle, sports, and strategy games all in one place.',
  keywords: [
    'free games',
    'online games',
    'play games',
    'gaming',
    'tournaments',
    'browser games',
    'casual games',
  ],
  author: 'ThePlayFree',
  ogImage: '/Images/og-image.png',
  twitterHandle: '@theplayfree',
  locale: 'en_US',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  ABOUT: '/about-us',
  PRIVACY: '/privacy-policy',
  TERMS: '/terms-of-service',
  PROFILE: '/profile',
  FORGOT_PASSWORD: '/forgot-password',
  CATEGORY: '/category',
  GAME: '/game',
};

export const CATEGORIES = [
  { slug: 'action', name: 'Action' },
  { slug: 'adventure', name: 'Adventure' },
  { slug: 'puzzle', name: 'Puzzle' },
  { slug: 'sports', name: 'Sports' },
  { slug: 'strategy', name: 'Strategy' },
];
