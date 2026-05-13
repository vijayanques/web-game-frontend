"use client";

import React, { useEffect } from 'react';
import { useAdSense } from '@/providers/AdSenseProvider';
import { usePathname } from 'next/navigation';

interface ResponsiveAdProps {
  slot: string;
  className?: string;
  style?: React.CSSProperties;
  layout?: 'banner' | 'card' | 'vertical';
}

const ResponsiveAd: React.FC<ResponsiveAdProps> = ({ slot, className = '', style = {}, layout = 'banner' }) => {
  const { getAdConfigBySlot, isLoading } = useAdSense();
  const config = getAdConfigBySlot(slot);
  const pathname = usePathname();

  useEffect(() => {
    if (config?.adType === 'adsense' && config.adClient && config.adSlot && typeof window !== 'undefined') {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense push error:', e);
      }
    }
  }, [config]);

  if (isLoading) return null;
  if (!config) return null;

  // Active Status Check
  if (config.status === false) return null;

  // Page-wise Ad Management Check
  // If no target pages are selected, we show on all pages by default (as noted in Admin UI)
  if (config.allowedPages && config.allowedPages.length > 0) {
    // Ensure allowedPages is an array (in case it comes as a string from API)
    const allowedList = (Array.isArray(config.allowedPages) 
      ? config.allowedPages 
      : (config.allowedPages as string).split(',')).map(s => s.trim().toLowerCase());

    // Handle "all" keyword if present
    if (!allowedList.includes('all')) {
      const path = pathname.toLowerCase();
      const currentPage = path === '/' ? 'home' : 
                          (path === '/game' || path.startsWith('/game/')) ? 'game' : 
                          (path === '/category' || path.startsWith('/category/')) ? 'category' : 
                          'other';
      
      // Check if the current page type OR the actual pathname is in the allowed list
      const isAllowed = allowedList.includes(currentPage) || 
                        allowedList.includes(path);
                        
      if (!isAllowed) return null;
    }
  }

  // Modern Responsive Classes based on layout
  const layoutClasses = {
    banner: "w-full aspect-[4/1] md:aspect-[12/1] rounded-xl sm:rounded-2xl",
    card: "w-full h-full aspect-square rounded-2xl",
    vertical: "w-full h-full min-h-[460px] rounded-2xl"
  }[layout];

  // Handle Static/Promotional Ads
  if (config.adType === 'static' || config.adType === 'promotional' || (!config.adClient && config.imageUrl)) {
    return (
      <div
        className={`promo-ad-container overflow-hidden shadow-sm border border-gray-200/50 bg-white transition-all hover:shadow-md group ${layoutClasses} ${className}`}
        style={{ ...style }}
      >
        <a
          href={config.targetUrl || '#'}
          target={config.targetUrl ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="block w-full h-full"
        >
          {config.imageUrl ? (
            <img
              src={config.imageUrl}
              alt="Promotional Advertisement"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-linear-to-r from-purple-50 to-indigo-50 border-2 border-dashed border-purple-200 rounded-xl">
              <p className="text-purple-600 font-bold text-center text-xs sm:text-sm font-[poppins]">Ads Space</p>
            </div>
          )}
        </a>
      </div>
    );
  }

  // Handle Google AdSense (Future Ready)
  return (
    <div
      className={`adsense-container w-full overflow-hidden ${layoutClasses} ${className}`}
      style={{ ...style }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', height: '100%', width: '100%' }}
        data-ad-client={config.adClient}
        data-ad-slot={config.adSlot}
        data-ad-format={config.responsive ? 'auto' : undefined}
        data-full-width-responsive={config.responsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default ResponsiveAd;
