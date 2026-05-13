'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';

export default function NotificationBell() {
  const { unreadCount, requestPermission } = useNotifications();
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if notifications are supported and permission is not granted
    if ('Notification' in window && Notification.permission === 'default') {
      setShowPermissionPrompt(true);
    }
  }, []);

  const handleEnableNotifications = async () => {
    await requestPermission();
    setShowPermissionPrompt(false);
  };

  return (
    <div className="relative">
      {/* Permission Prompt */}
      {showPermissionPrompt && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3 z-50 w-64 border border-gray-200 dark:border-slate-700">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Enable notifications to stay updated about new games and updates
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleEnableNotifications}
              className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
            >
              Enable
            </button>
            <button
              onClick={() => setShowPermissionPrompt(false)}
              className="flex-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-200 text-sm rounded transition-colors"
            >
              Later
            </button>
          </div>
        </div>
      )}

      {/* Notification Bell */}
      <Link href="/notifications">
        <button
          className="relative p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          title="Notifications"
        >
          <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />

          {/* Unread Badge */}
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      </Link>
    </div>
  );
}


