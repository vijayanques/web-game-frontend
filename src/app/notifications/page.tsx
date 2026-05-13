'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNotifications } from '@/contexts/NotificationContext';
import { Bell, Trash2, CheckCheck } from 'lucide-react';

export default function NotificationsPage() {
  const router = useRouter();
  const {
    notifications,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotif,
    fetchNotifications,
  } = useNotifications();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleNotificationClick = async (notification: any) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }
    if (notification.redirectUrl) {
      router.push(notification.redirectUrl);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'game_added':
        return '🎮';
      case 'game_updated':
        return '🔄';
      case 'category_added':
        return '📁';
      case 'featured_game':
        return '⭐';
      case 'maintenance':
        return '🔧';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'game_added':
        return 'border-l-blue-500 bg-blue-50';
      case 'game_updated':
        return 'border-l-green-500 bg-green-50';
      case 'category_added':
        return 'border-l-purple-500 bg-purple-50';
      case 'featured_game':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'maintenance':
        return 'border-l-red-500 bg-red-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-10">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">Notifications</h1>
          </div>
          {notifications.length > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <CheckCheck className="w-4 h-4" />
              Mark all as read
            </button>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            <p className="text-gray-400 mt-4">Loading notifications...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-900/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-50" />
            <p className="text-gray-400 text-lg">No notifications yet</p>
            <p className="text-gray-500 text-sm mt-2">
              You'll see updates about new games, categories, and more here
            </p>
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`border-l-4 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${getNotificationColor(
                notification.type
              )} ${!notification.isRead ? 'ring-2 ring-blue-400' : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {notification.game?.thumbnail || notification.category?.image ? (
                    <img
                      src={notification.game?.thumbnail || notification.category?.image}
                      alt="Thumbnail"
                      className="w-12 h-12 object-cover rounded-md mt-1 shadow-sm"
                    />
                  ) : (
                    <span className="text-2xl mt-1">{getNotificationIcon(notification.type)}</span>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {notification.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                      {notification.body}
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      {formatDate(notification.createdAt)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotif(notification.id);
                  }}
                  className="ml-4 p-2 hover:bg-red-500/20 rounded-lg transition-colors text-gray-600 hover:text-red-500"
                  title="Delete notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {!notification.isRead && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-blue-600 font-medium">Unread</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

