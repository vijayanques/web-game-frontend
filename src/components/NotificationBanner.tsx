'use client';

import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
/**
 * Notification Permission Banner
 * Prompts users to enable notifications
 */
export const NotificationBanner = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const { requestPermission } = useNotifications();

  // Get auth token from localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setAuthToken(token);
    
    // Show banner only if:
    // 1. User is logged in
    // 2. Notifications not already granted
    // 3. Notifications not permanently denied
    if (token && Notification.permission === 'default') {
      console.log('🔔 Showing notification permission banner (permission: prompt)');
      setVisible(true);
    } else if (Notification.permission === 'granted') {
      console.log('✅ Notifications already granted - no banner needed');
    } else if (Notification.permission === 'denied') {
      console.log('❌ Notifications denied - show settings hint');
    }
  }, []);

  const handleEnableNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📢 User clicked "Enable Notifications"');
      
      await requestPermission();
      
      if (Notification.permission === 'granted') {
        setVisible(false);
      } else {
        setError('Permission denied. Please check browser settings.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('❌ Error enabling notifications:', errorMessage);
      setError(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    console.log('❌ User dismissed notification banner');
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg shadow-lg">
        <div className="flex gap-3">
          <Bell className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
          
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-1">
              Enable Notifications?
            </h3>
            <p className="text-sm text-blue-800 mb-3">
              Get notified when new games are added to your favorite categories.
            </p>
            
            {error && (
              <p className="text-xs text-red-600 mb-3 bg-red-50 p-2 rounded">
                ⚠️ {error}
              </p>
            )}
            
            <div className="flex gap-2">
              <button
                onClick={handleEnableNotifications}
                disabled={loading}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded transition-colors"
              >
                {loading ? 'Enabling...' : 'Enable'}
              </button>
              <button
                onClick={handleDismiss}
                disabled={loading}
                className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 text-sm font-medium rounded transition-colors"
              >
                Not Now
              </button>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 mt-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationBanner;
