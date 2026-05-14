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
        className={`promo-ad-container overflow-hidden rounded-2xl shadow-sm border border-gray-200/60 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-orange-200/80 group ${layoutClasses} ${className}`}
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
            <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-linear-to-br from-orange-50/50 via-white to-orange-100/30 border-2 border-dashed border-orange-200/50 rounded-2xl">
              <div className="w-10 h-10 mb-2 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-orange-500 font-bold text-lg font-[poppins]">A</span>
              </div>
              <p className="text-orange-500 font-semibold text-center text-[10px] uppercase tracking-widest font-[poppins]">Advertisement</p>
            </div>
          )}
        </a>
      </div>
    );
  }

  // Handle Google AdSense (Future Ready)
  return (
    <div
      className={`adsense-container w-full overflow-hidden bg-gray-50/30 border border-gray-200/50 transition-all duration-300 hover:border-orange-200/50 ${layoutClasses} ${className}`}
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
