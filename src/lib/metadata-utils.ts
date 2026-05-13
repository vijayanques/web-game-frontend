/**
 * Utility functions for handling metadata, especially for social media sharing
 */

/**
 * Ensures an image URL is properly formatted for social media
 * Handles Cloudinary URLs and ensures they have proper dimensions
 */
export function formatImageUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;

  // If it's a Cloudinary URL, ensure it has proper transformation parameters
  if (url.includes('cloudinary.com')) {
    // Check if it already has transformation parameters
    if (url.includes('/c_')) {
      return url;
    }
    // Add transformation for optimal social media size (1200x630)
    // Insert transformation before the filename
    const parts = url.split('/upload/');
    if (parts.length === 2) {
      return `${parts[0]}/upload/c_fill,w_1200,h_630,q_auto/${parts[1]}`;
    }
  }

  return url;
}

/**
 * Validates if a URL is a valid image URL
 */
export function isValidImageUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    new URL(url);
    return url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) !== null || 
           url.includes('cloudinary.com') ||
           url.includes('imgur.com') ||
           url.includes('unsplash.com');
  } catch {
    return false;
  }
}

/**
 * Generates a canonical URL for a game
 */
export function generateCanonicalUrl(slug: string, baseUrl: string = 'https://game-web-app1.vercel.app'): string {
  return `${baseUrl}/game/${slug}`;
}

/**
 * Sanitizes text for use in meta tags
 */
export function sanitizeMetaText(text: string | undefined, maxLength: number = 160): string {
  if (!text) return '';
  return text
    .trim()
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .substring(0, maxLength);
}
