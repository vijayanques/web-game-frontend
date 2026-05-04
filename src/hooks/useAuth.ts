// Authentication hooks using TanStack Query
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { clientCookies } from '@/lib/cookies';
import { 
  loginUser, 
  signupUser, 
  forgotPassword, 
  resetPassword,
  type LoginCredentials,
  type SignupCredentials,
  type ForgotPasswordData,
  type ResetPasswordData,
  type User
} from '@/lib/api/auth';

// Re-export User type for convenience
export type { User } from '@/lib/api/auth';

// Store user in cookies (deprecated - now handled in API layer)
const storeUser = (user: User) => {
  if (typeof window !== 'undefined') {
    // Keep localStorage for backward compatibility
    localStorage.setItem('user', JSON.stringify(user));
    // Also store in cookie
    clientCookies.setUser(user);
    // Dispatch custom event to notify Header component
    window.dispatchEvent(new Event('userLoggedIn'));
  }
};

// Get user from cookies (preferred) or localStorage (fallback)
export const getStoredUser = (): User | null => {
  if (typeof window !== 'undefined') {
    // Try cookie first
    const cookieUser = clientCookies.getUser();
    if (cookieUser) return cookieUser;
    
    // Fallback to localStorage
    const localUser = localStorage.getItem('user');
    return localUser ? JSON.parse(localUser) : null;
  }
  return null;
};

// Remove user from cookies and localStorage
export const clearStoredUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
    clientCookies.delete('user_data');
    clientCookies.delete('auth_token');
    // Dispatch custom event to notify Header component
    window.dispatchEvent(new Event('userLoggedIn'));
  }
};

// Login hook
export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.success && data.data) {
        storeUser(data.data);
        router.push('/'); // Redirect to home page
      }
    },
  });
};

// Signup hook
export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      console.log('Signup successful:', data);
      if (data.success) {
        // Redirect to login page after successful signup
        router.push('/login?signup=success');
      }
    },
    onError: (error) => {
      console.error('Signup error:', error);
    },
  });
};

// Forgot password hook
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

// Reset password hook
export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      if (data.success) {
        router.push('/login');
      }
    },
  });
};

// Logout function
export const useLogout = () => {
  const router = useRouter();

  return () => {
    clearStoredUser();
    router.push('/');
  };
};
