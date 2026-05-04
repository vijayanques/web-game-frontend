# Authentication Quick Start Guide

Get your authentication system up and running in 5 minutes!

## Prerequisites

- Backend server running on `http://192.168.1.118:8000` (or update `.env.local`)
- Node.js and npm installed
- Database configured with users table

## Step 1: Install Dependencies

Dependencies are already installed! TanStack Query is in `package.json`.

## Step 2: Environment Setup

Your `.env.local` is already configured:
```env
NEXT_PUBLIC_API_URL=http://192.168.1.118:8000
```

## Step 3: Start the Application

```bash
cd game_web_app1
npm run dev
```

The app will run on `http://localhost:3000`

## Step 4: Test Authentication

### Create an Account
1. Navigate to `http://localhost:3000/signup`
2. Fill in:
   - Username (3-100 characters)
   - Email (valid format)
   - Password (min 8 characters)
3. Click "Create Account"
4. You'll be redirected to `/profile` automatically

### Login
1. Navigate to `http://localhost:3000/login`
2. Enter your email and password
3. Click "Sign In"
4. You'll be redirected to `/profile`

### View Profile
1. After login, you'll see your profile at `/profile`
2. Shows your:
   - Username
   - Email
   - Score
   - Level
   - Last login time

### Logout
1. Click your avatar in the header (top right)
2. Click "Logout"
3. You'll be redirected to home page

### Forgot Password
1. Navigate to `http://localhost:3000/forgot-password`
2. Enter your email
3. Click "Send Reset Link"
4. Check your email for reset link
5. Click the link to reset password

## Available Routes

| Route | Description | Protected |
|-------|-------------|-----------|
| `/login` | Login page | No |
| `/signup` | Registration page | No |
| `/forgot-password` | Request password reset | No |
| `/reset-password` | Reset password with token | No |
| `/profile` | User profile page | Yes |

## Quick Code Examples

### Check if User is Logged In

```typescript
import { getStoredUser } from '@/hooks/useAuth';

const user = getStoredUser();
if (user) {
  console.log('Logged in:', user.username);
} else {
  console.log('Not logged in');
}
```

### Login Programmatically

```typescript
import { useLogin } from '@/hooks/useAuth';

const { mutate: login } = useLogin();

login({ 
  email: 'user@example.com', 
  password: 'password123' 
});
```

### Logout Programmatically

```typescript
import { useLogout } from '@/hooks/useAuth';

const logout = useLogout();
logout(); // Clears user data and redirects
```

## Header Integration

The header automatically shows:
- **Not logged in**: "Login" button
- **Logged in**: User avatar with dropdown menu
  - Profile link
  - Settings option
  - Logout button

## Testing Checklist

- [ ] Create a new account at `/signup`
- [ ] Login with the new account at `/login`
- [ ] View profile at `/profile`
- [ ] Check header shows user avatar
- [ ] Click avatar to see dropdown menu
- [ ] Click "Profile" in dropdown
- [ ] Click "Logout" in dropdown
- [ ] Verify redirected to home
- [ ] Try accessing `/profile` without login (should redirect to `/login`)
- [ ] Request password reset at `/forgot-password`
- [ ] Check email for reset link
- [ ] Reset password using the link

## Common Issues

### "Failed to fetch" error
- **Solution**: Ensure backend is running on the correct port
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`

### "Email already registered"
- **Solution**: Use a different email or login with existing account

### Profile page redirects to login
- **Solution**: You're not logged in. Login first at `/login`

### Password reset email not received
- **Solution**: Check backend email service configuration
- Verify email service is running
- Check spam folder

## Backend API Endpoints

Your backend should have these endpoints:

```
POST /api/users/login
POST /api/users (signup)
POST /api/users/forgot-password
POST /api/users/reset-password
```

## User Data Structure

After login, user data is stored in localStorage:

```json
{
  "id": 1,
  "username": "vijay",
  "email": "vijay@example.com",
  "score": 100,
  "level": 5,
  "last_login_at": "2024-01-15T10:30:00.000Z"
}
```

## Security Notes

- Passwords are hashed with bcrypt (10 rounds) on backend
- Reset tokens expire after 1 hour
- User can only access their own profile data
- No sensitive data stored in localStorage

## Next Steps

1. Test all authentication flows
2. Customize profile page with more user data
3. Add protected routes for other pages
4. Implement JWT tokens (optional)
5. Add social login (optional)
6. Add email verification (optional)

## Need Help?

Check the full documentation in `AUTH_INTEGRATION.md` for:
- Detailed API documentation
- Architecture overview
- Advanced usage examples
- Troubleshooting guide
- Future enhancements

## Success! 🎉

Your authentication system is now fully integrated with:
- ✅ Login/Signup functionality
- ✅ Password reset flow
- ✅ Protected routes
- ✅ Persistent authentication
- ✅ Header integration
- ✅ TanStack Query for state management

Start building your authenticated features!
