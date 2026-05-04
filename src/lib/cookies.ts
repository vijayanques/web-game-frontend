// Cookie management utilities for authentication

export const AUTH_COOKIE_NAME = 'auth_token';
export const USER_COOKIE_NAME = 'user_data';

// Cookie options for server-side
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: '/',
};

// Server-side cookie functions (use in Server Components or API Routes only)
export const serverCookies = {
  // Set auth token in cookie (server-side)
  setAuthCookie: async (token: string) => {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, COOKIE_OPTIONS);
  },

  // Set user data in cookie (server-side)
  setUserCookie: async (userData: string) => {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    cookieStore.set(USER_COOKIE_NAME, userData, {
      ...COOKIE_OPTIONS,
      httpOnly: false, // Allow client-side access
    });
  },

  // Get auth token from cookie (server-side)
  getAuthCookie: async () => {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    return cookieStore.get(AUTH_COOKIE_NAME)?.value;
  },

  // Get user data from cookie (server-side)
  getUserCookie: async () => {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    return cookieStore.get(USER_COOKIE_NAME)?.value;
  },

  // Clear auth cookies (server-side)
  clearAuthCookies: async () => {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
    cookieStore.delete(USER_COOKIE_NAME);
  },
};

// Client-side cookie utilities
export const clientCookies = {
  // Set cookie (client-side)
  set: (name: string, value: string, days: number = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  },

  // Get cookie (client-side)
  get: (name: string): string | null => {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },

  // Delete cookie (client-side)
  delete: (name: string) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  },

  // Get user data from cookie
  getUser: () => {
    const userData = clientCookies.get(USER_COOKIE_NAME);
    if (userData) {
      try {
        return JSON.parse(decodeURIComponent(userData));
      } catch {
        return null;
      }
    }
    return null;
  },

  // Set user data in cookie
  setUser: (user: any) => {
    const userData = encodeURIComponent(JSON.stringify(user));
    clientCookies.set(USER_COOKIE_NAME, userData, 7);
  },

  // Get auth token
  getToken: () => {
    return clientCookies.get(AUTH_COOKIE_NAME);
  },

  // Set auth token
  setToken: (token: string) => {
    clientCookies.set(AUTH_COOKIE_NAME, token, 7);
  },
};
