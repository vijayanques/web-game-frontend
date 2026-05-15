'use client';

import { useEffect, useState } from 'react';
import { messaging, getToken, onMessage } from '@/config/firebase';
import { getStoredUser } from './useAuth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const useFirebaseMessaging = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if (typeof window === 'undefined' || !messaging) return;

    const requestPermission = async () => {
      try {
        const currentPermission = Notification.permission;
        setPermission(currentPermission);

        if (currentPermission === 'granted') {
          await fetchToken();
        } else if (currentPermission === 'default') {
          const status = await Notification.requestPermission();
          setPermission(status);
          if (status === 'granted') {
            await fetchToken();
          }
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    };

    const fetchToken = async () => {
      try {
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });

        if (token) {
          setFcmToken(token);
          await saveTokenToBackend(token);
        } else {
          console.warn('No registration token available. Request permission to generate one.');
        }
      } catch (error) {
        console.error('Error fetching FCM token:', error);
      }
    };

    const saveTokenToBackend = async (token: string) => {
      try {
        const user = getStoredUser();
        const response = await fetch(`${API_URL}/api/firebase-tokens/save`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            userId: user?.id || null,
            deviceInfo: {
              userAgent: navigator.userAgent,
              platform: navigator.platform,
              language: navigator.language,
            },
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to save token to backend');
        }

        console.log('✅ Firebase token saved to backend');
      } catch (error) {
        console.error('Error saving Firebase token to backend:', error);
      }
    };

    requestPermission();

    // Listen for foreground messages
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // You can show a custom toast or notification here
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { fcmToken, permission };
};
