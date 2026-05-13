'use client';

import React, { useEffect, useState } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';

/**
 * Debug component to check notification setup
 * Add this to your page to debug Socket.io initialization
 */
export const NotificationDebugPanel = () => {
  const [status, setStatus] = useState<{
    permission: string;
    authToken: string;
    socket: string;
  }>({
    permission: 'checking...',
    authToken: 'checking...',
    socket: 'checking...',
  });

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Check permission
        const permission = Notification.permission;
        const permissionStatus =
          permission === 'granted'
            ? '✅ Permission granted'
            : permission === 'denied'
              ? '❌ Permission denied'
              : '⚠️ Permission not requested';

        // Check auth token
        const authToken = localStorage.getItem('authToken');
        const authStatus = authToken
          ? '✅ Auth token found'
          : '❌ No auth token';

        setStatus({
          permission: permissionStatus,
          authToken: authStatus,
          socket: '✅ Socket initialized via Context',
        });
      } catch (error) {
        console.error('Debug error:', error);
      }
    };

    checkStatus();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-xs z-50 font-mono">
      <h3 className="font-bold mb-2">🔔 Notification Debug</h3>
      <div className="space-y-1">
        <div>{status.authToken}</div>
        <div>{status.permission}</div>
        <div>{status.socket}</div>
      </div>
    </div>
  );
};

export default NotificationDebugPanel;
