# Authentication Integration Guide

This document explains the complete authentication system integrated with TanStack Query.

## Overview

The authentication system provides:
- User login with email/password
- User registration (signup)
- Forgot password functionality
- Password reset with token verification
- Protected routes (profile page)
- Persistent authentication using localStorage
- Automatic redirection after login/logout

## Architecture

### Backend API Endpoints

The backend provides these authentication endpoints:

```
POST /api/users/login          - Login user
POST /api/users                - Create new user (signup)
POST /api/users/forgot-password - Request password reset
POST /api/users/reset-password  - Reset password with token
```

### Frontend Structure

```
src/
├── lib/
│   └── api/
│       └── auth.ts              # API functions for authentication
├── hooks/
│   └── useAuth.ts               # TanStack Query hooks
├── providers/
│   └── QueryProvider.tsx        # TanStack Query provider
└── app/
    ├── login/
    │   └── page.tsx             # Login page
    ├── signup/
    │   └── page.tsx             # Signup page
    ├── forgot-password/
    │   └── page.tsx             # Forgot password page
    ├── reset-password/
    │   └── page.tsx             # Reset password page
    └── profile/
        └── page.tsx             # Protected profile page
```

## API Functions (`src/lib/api/auth.ts`)

### Types

```typescript
interface User {
  id: number;
  username: string;
  email: string;
  score: number;
  level: number;
  last_login_at: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  username: string;
  email: string;
  password: string;
}
```

### Functions

- `loginUser(credentials)` - Authenticate user
- `signupUser(credentials)` - Register new user
- `forgotPassword({ email })` - Request password reset
- `resetPassword({ email, token, newPassword })` - Reset password

## Authentication Hooks (`src/hooks/useAuth.ts`)

### useLogin()

Login hook with automatic redirection to profile page.

```typescript
const { mutate: login, isPending, error } = useLogin();

login({ email, password });
```

### useSignup()

Signup hook with automatic redirection to profile page.

```typescript
const { mutate: signup, isPending, error } = useSignup();

signup({ username, email, password });
```

### useForgotPassword()

Request password reset email.

```typescript
const { mutate: forgotPassword, isPending, error } = useForgotPassword();

forgotPassword({ email });
```

### useResetPassword()

Reset password with token.

```typescript
const { mutate: resetPassword, isPending, error, isSuccess } = useResetPassword();

resetPassword({ email, token, newPassword });
```

### useLogout()

Logout function that clears user data and redirects to home.

```typescript
const logout = useLogout();

logout(); // Call to logout
```

### Helper Functions

- `getStoredUser()` - Get current user from localStorage
- `clearStoredUser()` - Remove user from localStorage

## Authentication Flow

### 1. Login Flow

```
User enters credentials
  ↓
useLogin() mutation called
  ↓
API: POST /api/users/login
  ↓
Success: User data stored in localStorage
  ↓
Redirect to /profile
```

### 2. Signup Flow

```
User enters details
  ↓
useSignup() mutation called
  ↓
API: POST /api/users
  ↓
Success: User data stored in localStorage
  ↓
Redirect to /profile
```

### 3. Forgot Password Flow

```
User enters email
  ↓
useForgotPassword() mutation called
  ↓
API: POST /api/users/forgot-password
  ↓
Success: Email sent with reset link
  ↓
Show success message
```

### 4. Reset Password Flow

```
User clicks email link with token
  ↓
Redirected to /reset-password?token=xxx&email=xxx
  ↓
User enters new password
  ↓
useResetPassword() mutation called
  ↓
API: POST /api/users/reset-password
  ↓
Success: Password updated
  ↓
Redirect to /login
```

## Protected Routes

The profile page checks for authentication on mount:

```typescript
useEffect(() => {
  const storedUser = getStoredUser();
  if (!storedUser) {
    router.push('/login');
  } else {
    setUser(storedUser);
  }
}, [router]);
```

## Header Integration

The Header component shows:
- Login button when user is not authenticated
- User avatar with dropdown when authenticated
- Profile link and logout option in dropdown

```typescript
const [user, setUser] = useState<User | null>(null);

useEffect(() => {
  const storedUser = getStoredUser();
  setUser(storedUser);
}, []);
```

## Security Features

1. **Password Hashing**: Backend uses bcrypt with 10 salt rounds
2. **Token-based Reset**: Password reset requires valid token
3. **Token Expiry**: Reset tokens expire after 1 hour
4. **Client-side Validation**: Password length, email format, etc.
5. **Protected Routes**: Profile page redirects if not authenticated
6. **Secure Storage**: User data stored in localStorage (client-side only)

## User Data Access Control

- Users can only access their own profile data
- Backend validates user identity for protected endpoints
- Frontend stores only necessary user information
- No sensitive data (passwords) stored in localStorage

## Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://192.168.1.118:8000
```

## Usage Examples

### Login Page

```typescript
const { mutate: login, isPending, error } = useLogin();

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  login({ email, password });
};
```

### Check Authentication Status

```typescript
import { getStoredUser } from '@/hooks/useAuth';

const user = getStoredUser();
if (user) {
  console.log('Logged in as:', user.username);
}
```

### Logout

```typescript
import { useLogout } from '@/hooks/useAuth';

const logout = useLogout();

<button onClick={logout}>Logout</button>
```

## Error Handling

All mutations return error objects:

```typescript
const { mutate, error } = useLogin();

{error && (
  <div className="error">
    {error.message}
  </div>
)}
```

## Testing the Integration

1. **Start Backend**: Ensure backend is running on port 8000
2. **Start Frontend**: Run `npm run dev`
3. **Test Signup**: Create a new account at `/signup`
4. **Test Login**: Login at `/login`
5. **Test Profile**: Access `/profile` (should show user data)
6. **Test Logout**: Click logout in header dropdown
7. **Test Forgot Password**: Request reset at `/forgot-password`
8. **Test Reset**: Use token from email to reset password

## Backend Requirements

The backend must return responses in this format:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": 1,
    "username": "john",
    "email": "john@example.com",
    "score": 0,
    "level": 1,
    "last_login_at": "2024-01-01T00:00:00.000Z"
  }
}
```

## Future Enhancements

- [ ] JWT token-based authentication
- [ ] Refresh token mechanism
- [ ] Social login (Google, Facebook)
- [ ] Two-factor authentication
- [ ] Session management
- [ ] Remember me functionality
- [ ] Email verification on signup
- [ ] Password strength indicator
- [ ] Account settings page
- [ ] User profile editing

## Troubleshooting

### Login not working
- Check API URL in `.env.local`
- Verify backend is running
- Check browser console for errors
- Verify credentials are correct

### User not persisting after refresh
- Check localStorage in browser DevTools
- Ensure `getStoredUser()` is called on mount
- Verify user data is being stored correctly

### Password reset email not received
- Check backend email service configuration
- Verify email service is running
- Check spam folder
- Check backend logs for errors

## API Response Examples

### Successful Login
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": 1,
    "username": "vijay",
    "email": "vijay@example.com",
    "score": 100,
    "level": 5,
    "last_login_at": "2024-01-15T10:30:00.000Z"
  }
}
```

### Failed Login
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### Successful Signup
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 2,
    "username": "newuser",
    "email": "newuser@example.com",
    "last_login_at": "2024-01-15T10:35:00.000Z"
  }
}
```

## Notes

- User data is stored in localStorage for persistence
- No JWT tokens are currently implemented (future enhancement)
- Password reset tokens are generated by backend
- All API calls use fetch with proper error handling
- TanStack Query handles loading states and caching
