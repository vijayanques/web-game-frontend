# Authentication System - Testing Checklist

Use this checklist to verify all authentication features are working correctly.

## Pre-Testing Setup

- [ ] Backend server is running on `http://192.168.1.118:8000`
- [ ] Frontend server is running on `http://localhost:3000`
- [ ] Database is accessible and has users table
- [ ] Email service is configured (for password reset)
- [ ] `.env.local` has correct `NEXT_PUBLIC_API_URL`

## 1. User Registration (Signup)

### Happy Path
- [ ] Navigate to `/signup`
- [ ] Enter valid username (3-100 characters)
- [ ] Enter valid email address
- [ ] Enter password (min 8 characters)
- [ ] Confirm password matches
- [ ] Check "I agree to terms" checkbox
- [ ] Click "Create Account"
- [ ] Verify loading spinner appears
- [ ] Verify redirected to `/profile`
- [ ] Verify profile shows correct user data
- [ ] Verify header shows user avatar

### Error Cases
- [ ] Try signup with existing email → Shows "Email already registered"
- [ ] Try signup with existing username → Shows "Username already taken"
- [ ] Try signup with short password → Shows "Password must be at least 8 characters"
- [ ] Try signup with mismatched passwords → Shows "Passwords do not match"
- [ ] Try signup without agreeing to terms → Shows "Please agree to terms"
- [ ] Try signup with invalid email format → Shows "Invalid email format"

## 2. User Login

### Happy Path
- [ ] Navigate to `/login`
- [ ] Enter registered email
- [ ] Enter correct password
- [ ] Click "Sign In"
- [ ] Verify loading spinner appears
- [ ] Verify redirected to `/profile`
- [ ] Verify profile shows correct user data
- [ ] Verify header shows user avatar with correct initials

### Error Cases
- [ ] Try login with wrong password → Shows "Invalid email or password"
- [ ] Try login with non-existent email → Shows "Invalid email or password"
- [ ] Try login with empty fields → Shows "Email and password are required"

### Additional Features
- [ ] Test "Remember me" checkbox (visual only, not functional yet)
- [ ] Test password visibility toggle (eye icon)
- [ ] Click "Forgot password?" link → Redirects to `/forgot-password`
- [ ] Click "Sign up" link → Redirects to `/signup`

## 3. Profile Page

### When Logged In
- [ ] Navigate to `/profile`
- [ ] Verify user avatar shows correct initials
- [ ] Verify username is displayed
- [ ] Verify email is displayed
- [ ] Verify score is displayed
- [ ] Verify level is displayed
- [ ] Verify last login time is displayed
- [ ] Verify user ID is shown
- [ ] Verify "Member Since" date is shown
- [ ] Click "Logout" button → Redirects to home

### When Not Logged In
- [ ] Clear localStorage (browser DevTools)
- [ ] Navigate to `/profile`
- [ ] Verify redirected to `/login`

## 4. Forgot Password

### Happy Path
- [ ] Navigate to `/forgot-password`
- [ ] Enter registered email
- [ ] Click "Send Reset Link"
- [ ] Verify loading spinner appears
- [ ] Verify success message appears
- [ ] Verify email address is shown in success message
- [ ] Check email inbox for reset link
- [ ] Verify email contains reset link with token

### Error Cases
- [ ] Try with non-existent email → Still shows success (security feature)
- [ ] Try with empty email → Shows "Email is required"
- [ ] Try with invalid email format → Browser validation error

### Additional Features
- [ ] Click "try again" in success message → Returns to form
- [ ] Click "Back to login" → Redirects to `/login`
- [ ] Click "Contact support" → Redirects to `/support`

## 5. Reset Password

### Happy Path
- [ ] Click reset link from email
- [ ] Verify redirected to `/reset-password?token=xxx&email=xxx`
- [ ] Enter new password (min 8 characters)
- [ ] Confirm new password matches
- [ ] Click "Reset Password"
- [ ] Verify loading spinner appears
- [ ] Verify success screen appears
- [ ] Click "Go to Login" → Redirects to `/login`
- [ ] Login with new password → Success

### Error Cases
- [ ] Try with mismatched passwords → Shows "Passwords do not match"
- [ ] Try with short password → Shows "Password must be at least 8 characters"
- [ ] Try with expired token → Shows "Invalid or expired reset token"
- [ ] Try with invalid token → Shows "Invalid or expired reset token"
- [ ] Navigate to `/reset-password` without token → Shows "Invalid reset link"

### Additional Features
- [ ] Test password visibility toggle for both fields
- [ ] Click "Back to login" → Redirects to `/login`

## 6. Header Integration

### When Not Logged In
- [ ] Verify "Login" button is visible
- [ ] Click "Login" button → Redirects to `/login`
- [ ] Verify no user avatar is shown

### When Logged In
- [ ] Verify user avatar is visible with correct initials
- [ ] Click avatar → Dropdown menu appears
- [ ] Verify username is shown in dropdown
- [ ] Verify level is shown in dropdown
- [ ] Click "Profile" → Redirects to `/profile`
- [ ] Click "Settings" → (Not implemented yet)
- [ ] Click "Logout" → Logs out and redirects to home
- [ ] Verify header updates to show "Login" button after logout

### Dropdown Behavior
- [ ] Click avatar → Dropdown opens
- [ ] Click outside dropdown → Dropdown closes
- [ ] Click avatar again → Dropdown closes

## 7. Logout Functionality

### From Header
- [ ] Login first
- [ ] Click user avatar in header
- [ ] Click "Logout" in dropdown
- [ ] Verify redirected to home page
- [ ] Verify header shows "Login" button
- [ ] Try accessing `/profile` → Redirected to `/login`

### From Profile Page
- [ ] Login first
- [ ] Navigate to `/profile`
- [ ] Click "Logout" button
- [ ] Verify redirected to home page
- [ ] Verify header shows "Login" button

## 8. Persistent Authentication

### Page Refresh
- [ ] Login to account
- [ ] Refresh the page (F5)
- [ ] Verify still logged in
- [ ] Verify header still shows user avatar
- [ ] Navigate to `/profile` → Shows profile data

### New Tab
- [ ] Login in one tab
- [ ] Open new tab with same site
- [ ] Verify logged in in new tab
- [ ] Verify header shows user avatar

### Browser Restart
- [ ] Login to account
- [ ] Close browser completely
- [ ] Reopen browser and navigate to site
- [ ] Verify still logged in (localStorage persists)

## 9. Error Handling

### Network Errors
- [ ] Stop backend server
- [ ] Try to login → Shows error message
- [ ] Try to signup → Shows error message
- [ ] Try forgot password → Shows error message

### Invalid Responses
- [ ] Verify all error messages are user-friendly
- [ ] Verify no technical errors shown to user
- [ ] Check browser console for any errors

## 10. Loading States

### All Forms
- [ ] Verify loading spinner appears during API calls
- [ ] Verify button is disabled during loading
- [ ] Verify button text changes during loading:
  - Login: "Signing in..."
  - Signup: "Creating account..."
  - Forgot: "Sending..."
  - Reset: "Resetting..."

## 11. Validation

### Client-Side Validation
- [ ] Email format validation works
- [ ] Password length validation works
- [ ] Password match validation works
- [ ] Required field validation works
- [ ] Username length validation works

### Server-Side Validation
- [ ] Duplicate email check works
- [ ] Duplicate username check works
- [ ] Invalid credentials check works
- [ ] Token validation works

## 12. Security

### Password Security
- [ ] Passwords are not visible by default
- [ ] Password toggle works correctly
- [ ] Passwords are not stored in localStorage
- [ ] Password reset requires valid token

### Data Access
- [ ] User can only see their own profile
- [ ] Cannot access other users' data
- [ ] Protected routes redirect if not authenticated

## 13. Responsive Design

### Mobile View
- [ ] Test all pages on mobile screen size
- [ ] Verify forms are usable on mobile
- [ ] Verify buttons are tappable
- [ ] Verify text is readable

### Tablet View
- [ ] Test all pages on tablet screen size
- [ ] Verify layout adapts correctly

### Desktop View
- [ ] Test all pages on desktop screen size
- [ ] Verify optimal layout

## 14. Browser Compatibility

- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge

## 15. Performance

### Load Times
- [ ] Login page loads quickly
- [ ] Signup page loads quickly
- [ ] Profile page loads quickly
- [ ] API calls complete in reasonable time

### User Experience
- [ ] No unnecessary re-renders
- [ ] Smooth transitions between pages
- [ ] No flickering or layout shifts

## Test Results Summary

### Passed: _____ / _____
### Failed: _____ / _____

## Issues Found

| Issue | Severity | Page | Description |
|-------|----------|------|-------------|
|       |          |      |             |
|       |          |      |             |
|       |          |      |             |

## Notes

```
Add any additional notes or observations here:




```

## Sign-off

- [ ] All critical features tested and working
- [ ] All error cases handled properly
- [ ] All security features verified
- [ ] Ready for production deployment

**Tested By**: ___________________
**Date**: ___________________
**Version**: 1.0.0
