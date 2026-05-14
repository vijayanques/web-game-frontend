// Authentication API functions
import { clientCookies } from '../cookies';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  score: number;
  level: number;
  last_login_at: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: User;
  token?: string; // JWT token from backend
}

// Login API call
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    credentials: 'include', // Include cookies
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  const data = await response.json();
  
  // Store token and user data in cookies
  if (data.success && data.token) {
    clientCookies.setToken(data.token);
  }
  if (data.success && data.data) {
    clientCookies.setUser(data.data);
  }

  return data;
};

// Google Login API call
export const googleLoginUser = async (googleData: { email: string; username: string; googleId: string }): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/api/users/google-login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(googleData),
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Google login failed');
  }

  const data = await response.json();
  
  if (data.success && data.token) {
    clientCookies.setToken(data.token);
  }
  if (data.success && data.data) {
    clientCookies.setUser(data.data);
  }

  return data;
};

// Signup API call
export const signupUser = async (credentials: SignupCredentials): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include', // Include cookies
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Signup API error:', data);
      throw new Error(data.message || data.error || 'Signup failed');
    }
    
    // Backend doesn't return token on signup, so we'll just return the user data
    // The token will be generated on login
    return {
      success: data.success,
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

// Forgot password API call
export const forgotPassword = async (data: ForgotPasswordData): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/api/users/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to send reset email');
  }

  return response.json();
};

// Reset password API call
export const resetPassword = async (data: ResetPasswordData): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/api/users/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to reset password');
  }

  return response.json();
};
