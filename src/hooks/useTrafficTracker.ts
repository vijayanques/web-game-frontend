'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { getStoredUser } from '@/hooks/useAuth';

export function useTrafficTracker() {
  const pathname = usePathname();
  const trackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Only track once per path change
    if (trackedPath.current === pathname) return;
    trackedPath.current = pathname;

    const trackTraffic = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        
        // Detect device
        const ua = navigator.userAgent;
        let device = 'desktop';
        if (/mobile/i.test(ua)) device = 'mobile';
        else if (/tablet/i.test(ua)) device = 'tablet';

        // Detect browser
        let browser = 'other';
        if (/chrome|crios/i.test(ua) && !/edge|edg|opr|brave/i.test(ua)) browser = 'chrome';
        else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) browser = 'safari';
        else if (/firefox|fxios/i.test(ua)) browser = 'firefox';
        else if (/edg/i.test(ua)) browser = 'edge';

        // Get username
        const user = getStoredUser();
        const username = user?.username || user?.name || 'Guest';

        await fetch(`${apiUrl}/api/traffic/track`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            page: pathname || 'homepage',
            device,
            browser,
            action: 'page_view',
            sessionTime: '0s', // Basic session tracking could be expanded
          })
        });
      } catch (err) {
        console.error('Failed to track traffic:', err);
      }
    };

    trackTraffic();
  }, [pathname]);
}
