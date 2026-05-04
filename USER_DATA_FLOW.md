# User-Specific Data Flow

## How Each User Gets Their Own Data

### Step-by-Step Flow:

```
┌─────────────────────────────────────────────────────────────┐
│ User 1: vijay@example.com                                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 1. Login with email: vijay@example.com                      │
│    Password: ********                                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Backend Validates                                        │
│    - Finds user by email                                    │
│    - Checks password hash                                   │
│    - Returns ONLY Vijay's data                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Backend Response (Vijay's Data Only)                     │
│    {                                                        │
│      "success": true,                                       │
│      "data": {                                              │
│        "id": 1,                                             │
│        "username": "vijay",                                 │
│        "email": "vijay@example.com",                        │
│        "score": 100,                                        │
│        "level": 5,                                          │
│        "last_login_at": "2024-01-15T10:30:00.000Z"         │
│      }                                                      │
│    }                                                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Frontend Stores in localStorage                          │
│    localStorage.setItem('user', JSON.stringify(data))       │
│                                                             │
│    Stored Data:                                             │
│    {                                                        │
│      "id": 1,                                               │
│      "username": "vijay",                                   │
│      "email": "vijay@example.com",                          │
│      "score": 100,                                          │
│      "level": 5                                             │
│    }                                                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. Profile Page Displays                                    │
│    - Username: vijay                                        │
│    - Email: vijay@example.com                               │
│    - Score: 100                                             │
│    - Level: 5                                               │
│                                                             │
│    ✅ Shows ONLY Vijay's data                               │
│    ❌ Cannot see other users' data                          │
└─────────────────────────────────────────────────────────────┘
```

---

```
┌─────────────────────────────────────────────────────────────┐
│ User 2: rahul@example.com (Different User)                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 1. Login with email: rahul@example.com                      │
│    Password: ********                                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Backend Validates                                        │
│    - Finds user by email                                    │
│    - Checks password hash                                   │
│    - Returns ONLY Rahul's data                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Backend Response (Rahul's Data Only)                     │
│    {                                                        │
│      "success": true,                                       │
│      "data": {                                              │
│        "id": 2,                                             │
│        "username": "rahul",                                 │
│        "email": "rahul@example.com",                        │
│        "score": 50,                                         │
│        "level": 3,                                          │
│        "last_login_at": "2024-01-15T11:00:00.000Z"         │
│      }                                                      │
│    }                                                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Frontend Stores in localStorage                          │
│    localStorage.setItem('user', JSON.stringify(data))       │
│                                                             │
│    Stored Data:                                             │
│    {                                                        │
│      "id": 2,                                               │
│      "username": "rahul",                                   │
│      "email": "rahul@example.com",                          │
│      "score": 50,                                           │
│      "level": 3                                             │
│    }                                                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. Profile Page Displays                                    │
│    - Username: rahul                                        │
│    - Email: rahul@example.com                               │
│    - Score: 50                                              │
│    - Level: 3                                               │
│                                                             │
│    ✅ Shows ONLY Rahul's data                               │
│    ❌ Cannot see Vijay's data                               │
└─────────────────────────────────────────────────────────────┘
```

## Code Implementation

### 1. Backend Returns User-Specific Data

```javascript
// backend: userController.js - loginUser()
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  // Find THIS user by email
  const user = await User.findOne({ where: { email } });
  
  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  // Return ONLY this user's data
  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      id: user.id,              // THIS user's ID
      username: user.username,  // THIS user's username
      email: user.email,        // THIS user's email
      score: user.score,        // THIS user's score
      level: user.level,        // THIS user's level
      last_login_at: user.lastLoginAt
    }
  });
};
```

### 2. Frontend Stores User-Specific Data

```typescript
// frontend: useAuth.ts
const storeUser = (user: User) => {
  if (typeof window !== 'undefined') {
    // Stores ONLY the logged-in user's data
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.success && data.data) {
        // Store THIS user's data
        storeUser(data.data);
        router.push('/');
      }
    },
  });
};
```

### 3. Profile Page Shows User-Specific Data

```typescript
// frontend: profile/page.tsx
export default function ProfilePage() {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    // Get ONLY the logged-in user's data
    const storedUser = getStoredUser();
    if (!storedUser) {
      router.push('/login'); // Not logged in
    } else {
      setUser(storedUser); // Set THIS user's data
    }
  }, [router]);

  return (
    <div>
      {/* Display THIS user's data only */}
      <h1>{user.username}</h1>
      <p>{user.email}</p>
      <p>Score: {user.score}</p>
      <p>Level: {user.level}</p>
    </div>
  );
}
```

## Security Features

### 1. Backend Security
✅ **Email-based lookup**: Backend finds user by email
✅ **Password validation**: Checks bcrypt hash
✅ **Returns only matched user**: Cannot get other users' data
✅ **No user ID in request**: User cannot request other IDs

### 2. Frontend Security
✅ **localStorage isolation**: Each browser stores only logged-in user
✅ **No cross-user access**: User A cannot see User B's localStorage
✅ **Protected routes**: Profile redirects if not logged in
✅ **Logout clears data**: Removes user data from localStorage

## Example Scenarios

### Scenario 1: Two Users on Same Computer

**User 1 (Vijay) logs in:**
- Browser stores: `{ id: 1, username: "vijay", ... }`
- Profile shows: Vijay's data

**User 1 logs out:**
- localStorage cleared

**User 2 (Rahul) logs in:**
- Browser stores: `{ id: 2, username: "rahul", ... }`
- Profile shows: Rahul's data
- ❌ Cannot see Vijay's data

### Scenario 2: Two Users on Different Browsers

**User 1 in Chrome:**
- Logs in as vijay@example.com
- Chrome localStorage: Vijay's data
- Profile shows: Vijay's data

**User 2 in Firefox:**
- Logs in as rahul@example.com
- Firefox localStorage: Rahul's data
- Profile shows: Rahul's data
- ❌ Cannot access Chrome's localStorage

### Scenario 3: User Tries to Access Another User's Data

**User 1 logged in:**
- localStorage: `{ id: 1, username: "vijay", ... }`
- Tries to manually change ID in localStorage to 2
- Profile still shows: Vijay's data (from localStorage)
- ❌ Cannot fetch User 2's data from backend without credentials

## Testing User-Specific Data

### Test 1: Create Two Accounts
```bash
1. Register User 1:
   - Username: vijay
   - Email: vijay@example.com
   - Password: password123

2. Logout

3. Register User 2:
   - Username: rahul
   - Email: rahul@example.com
   - Password: password456
```

### Test 2: Verify Data Isolation
```bash
1. Login as User 1 (vijay@example.com)
   - Check profile: Shows vijay's data
   - Check localStorage: { id: 1, username: "vijay", ... }

2. Logout

3. Login as User 2 (rahul@example.com)
   - Check profile: Shows rahul's data
   - Check localStorage: { id: 2, username: "rahul", ... }
   - ✅ User 1's data is gone
```

### Test 3: Browser DevTools Check
```bash
1. Login as User 1
2. Open DevTools → Application → Local Storage
3. See: Only User 1's data
4. Logout
5. Login as User 2
6. Check Local Storage again
7. See: Only User 2's data (User 1's data replaced)
```

## Summary

✅ **Each user gets ONLY their own data**
✅ **Backend validates and returns user-specific data**
✅ **Frontend stores only logged-in user's data**
✅ **Profile page shows only current user's data**
✅ **No cross-user data access possible**
✅ **Logout clears user data**
✅ **Login replaces previous user's data**

**This is already implemented and working!** 🎉
