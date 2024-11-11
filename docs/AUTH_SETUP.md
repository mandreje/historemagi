# Authentication and Backend Setup Guide

## 1. PocketBase Setup

### Installation & Configuration
1. Download PocketBase from [pocketbase.io](https://pocketbase.io)
2. Create a new project directory
3. Start PocketBase server:
```bash
./pocketbase serve
```

### Collection Schema Setup
Create a `users` collection with the following schema:

```json
{
  "name": "users",
  "type": "auth",
  "system": false,
  "schema": [
    {
      "id": "users_name",
      "name": "name",
      "type": "text",
      "system": false,
      "required": false
    },
    {
      "id": "users_avatar",
      "name": "avatar",
      "type": "file",
      "system": false,
      "required": false,
      "options": {
        "maxSelect": 1,
        "maxSize": 5242880,
        "mimeTypes": ["image/jpeg", "image/png"],
        "thumbs": ["100x100"]
      }
    }
  ],
  "listRule": "",
  "viewRule": "",
  "createRule": "",
  "updateRule": "id = @request.auth.id",
  "deleteRule": "id = @request.auth.id",
  "options": {
    "allowEmailAuth": true,
    "allowOAuth2Auth": false,
    "allowUsernameAuth": false,
    "exceptEmailDomains": null,
    "manageRule": null,
    "minPasswordLength": 8,
    "requireEmail": true
  }
}
```

## 2. Environment Setup

Create `.env` file in project root:

```env
VITE_API_URL=http://127.0.0.1:8090
```

## 3. Authentication Service Implementation

Update `src/services/auth.ts`:

```typescript
import { pb } from './pocketbase';

export interface AuthResponse {
  success: boolean;
  user?: any;
  error?: string;
}

export async function signUp(email: string, password: string): Promise<AuthResponse> {
  try {
    const data = {
      email,
      password,
      passwordConfirm: password,
      emailVisibility: true,
    };

    const record = await pb.collection('users').create(data);
    
    if (record) {
      // Auto-login after successful registration
      await pb.collection('users').authWithPassword(email, password);
      return { 
        success: true, 
        user: record 
      };
    }
    
    return { 
      success: false, 
      error: 'Kunne ikke opprette bruker' 
    };
  } catch (error: any) {
    console.error('SignUp Error:', error);
    let errorMessage = 'En feil oppstod under registrering';
    
    if (error.data?.data) {
      const errors = error.data.data;
      if (errors.email) {
        errorMessage = 'E-postadressen er allerede i bruk';
      } else if (errors.password) {
        errorMessage = 'Passordet må være minst 8 tegn';
      }
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
}
```

## 4. PocketBase Client Setup

Update `src/services/pocketbase.ts`:

```typescript
import PocketBase from 'pocketbase';

export const pb = new PocketBase(import.meta.env.VITE_API_URL);

// Subscribe to authStore changes
pb.authStore.onChange((auth) => {
  console.log('Auth state changed:', auth);
});

// Export helper functions
export const isAuthenticated = () => pb.authStore.isValid;
export const getCurrentUser = () => pb.authStore.model;
export const getToken = () => pb.authStore.token;
```

## 5. Authentication State Management

Create `src/contexts/AuthContext.tsx`:

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { pb } from '../services/pocketbase';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(pb.authStore.model);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to auth state changes
    pb.authStore.onChange((auth) => {
      setUser(auth?.model ?? null);
      setLoading(false);
    });

    setLoading(false);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
```

## 6. Protected Routes Setup

Create `src/navigation/ProtectedRoute.tsx`:

```typescript
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
```

## 7. Error Handling

Update error handling in components:

```typescript
try {
  // Attempt authentication
  const response = await signUp(email, password);
  
  if (!response.success) {
    throw new Error(response.error);
  }
  
  // Handle success
} catch (error: any) {
  // Log error for debugging
  console.error('Authentication Error:', error);
  
  // Show user-friendly error message
  Alert.alert(
    'Feil',
    error.message || 'En feil oppstod under registrering'
  );
}
```

## 8. Security Considerations

1. Enable HTTPS in production
2. Set appropriate CORS policies in PocketBase
3. Implement rate limiting
4. Add request validation
5. Secure password requirements

## 9. Testing Authentication

1. Start PocketBase server
2. Ensure environment variables are set
3. Test registration flow:
   - Valid email/password
   - Invalid email format
   - Weak password
   - Duplicate email
4. Test login flow
5. Test token persistence
6. Test protected routes

## Troubleshooting

Common issues and solutions:

1. CORS errors:
   - Ensure PocketBase CORS settings allow your frontend domain
   - Check API URL configuration

2. Authentication failures:
   - Verify PocketBase is running
   - Check network requests in browser dev tools
   - Validate email/password format
   - Check console for detailed error messages

3. Token persistence issues:
   - Clear browser storage
   - Check PocketBase session settings
   - Verify auth state management implementation