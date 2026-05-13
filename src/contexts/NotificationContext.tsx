'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import { showToast } from '@/lib/toast';
import {
  getUserNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from '@/services/notificationService';

interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'game_added' | 'game_updated' | 'category_added' | 'featured_game' | 'maintenance';
  redirectUrl: string;
  isRead: boolean;
  createdAt: string;
  game?: {
    thumbnail?: string;
  };
  category?: {
    image?: string;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotif: (notificationId: string) => Promise<void>;
  requestPermission: () => Promise<void>;
  refreshUnreadCount: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Get auth token from localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setAuthToken(token);
  }, []);

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    if (!authToken) return;

    try {
      setIsLoading(true);
      setError(null);
      const data = await getUserNotifications(authToken, 50, 0);
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to fetch notifications');
    } finally {
      setIsLoading(false);
    }
  }, [authToken]);

  // Refresh unread count
  const refreshUnreadCount = useCallback(async () => {
    if (!authToken) return;

    try {
      const data = await getUnreadCount(authToken);
      setUnreadCount(data.unreadCount || 0);
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  }, [authToken]);

  // Mark notification as read
  const markAsRead = useCallback(
    async (notificationId: string) => {
      if (!authToken) return;

      try {
        await markNotificationAsRead(notificationId, authToken);
        setNotifications((prev) =>
          prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
        );
        await refreshUnreadCount();
      } catch (err) {
        console.error('Error marking notification as read:', err);
      }
    },
    [authToken, refreshUnreadCount]
  );

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    if (!authToken) return;

    try {
      await markAllNotificationsAsRead(authToken);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  }, [authToken]);

  // Delete notification
  const deleteNotif = useCallback(
    async (notificationId: string) => {
      if (!authToken) return;

      try {
        await deleteNotification(notificationId, authToken);
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
        await refreshUnreadCount();
      } catch (err) {
        console.error('Error deleting notification:', err);
      }
    },
    [authToken, refreshUnreadCount]
  );

  // Request notification permission (browser native only)
  const requestPermission = useCallback(async () => {
    try {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
          await Notification.requestPermission();
        }
      }
    } catch (err) {
      console.error('Error requesting notification permission:', err);
    }
  }, []);

  // Initialize Socket.io connection
  useEffect(() => {
    // We only need to connect to socket if we are in the browser
    if (typeof window === 'undefined') return;

    // Use environment variable or default
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    // Extract base URL for socket connection
    const SOCKET_URL = API_URL.replace('/api', '');

    console.log('Connecting to socket at:', SOCKET_URL);

    const newSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 10,
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('✅ Connected to notification socket', newSocket.id);
      // If we have user info, we could join a specific room here
      // But for now, we'll rely on the global events or the backend handling the auth
    });

    newSocket.on('new_notification', (payload) => {
      console.log('🔔 New notification received via socket:', payload);

      const notification = payload.notification;
      const imageUrl = payload.data?.imageUrl || '/Images/The Play free-01.png';

      // Trigger native browser notification if permitted
      let nativeNotificationShown = false;
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        try {
          const nativeNotif = new window.Notification(notification.title || 'New Notification', {
            body: notification.body,
            icon: imageUrl,
            image: imageUrl, // Show big image on supported platforms
          });

          nativeNotif.onclick = function () {
            window.focus();
            if (payload.data?.redirectUrl) {
              router.push(payload.data.redirectUrl);
            }
          };
          nativeNotificationShown = true;
        } catch (e) {
          console.error('Error showing native notification', e);
        }
      }

      // Show toast popup ONLY if native notification wasn't shown
      if (notification && !nativeNotificationShown) {
        const ToastContent = () => (
          <div className="flex items-start gap-3">
            {imageUrl !== '/Images/The Play free-01.png' && (
              <img src={imageUrl} alt="Notification" className="w-10 h-10 object-cover rounded-md mt-0.5" />
            )}
            <div className="flex-1">
              <h4 className="font-bold text-sm text-gray-900">{notification.title}</h4>
              <p className="text-sm text-gray-600 mt-0.5">{notification.body}</p>
            </div>
          </div>
        );

        showToast.info(<ToastContent />, {
          onClick: () => {
            if (payload.data?.redirectUrl) {
              router.push(payload.data.redirectUrl);
            }
          }
        });
      }

      // Dispatch custom event for in-app banners
      if (notification) {
        const event = new CustomEvent('notification', {
          detail: {
            title: notification.title,
            body: notification.body,
            data: payload.data,
          },
        });
        window.dispatchEvent(event);
      }

      // Refresh list and count
      fetchNotifications();
      refreshUnreadCount();
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from notification socket');
    });

    return () => {
      if (newSocket) {
        newSocket.off('new_notification');
        newSocket.off('connect');
        newSocket.off('disconnect');
        newSocket.disconnect();
      }
    };
  }, [fetchNotifications, refreshUnreadCount, router]);

  // Fetch notifications and unread count on mount
  useEffect(() => {
    if (!authToken) return;

    fetchNotifications();
    refreshUnreadCount();

    // Refresh every 30 seconds
    const interval = setInterval(() => {
      refreshUnreadCount();
    }, 30000);

    return () => clearInterval(interval);
  }, [authToken, fetchNotifications, refreshUnreadCount]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isLoading,
        error,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotif,
        requestPermission,
        refreshUnreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};
