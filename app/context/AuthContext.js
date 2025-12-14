
import { useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';
import { GetUser, LoginUser, Logout as LogoutService } from '../Store/authStore';

const AuthContext = createContext({});

// This hook can be used to access the user info.
export function useAuth() {
  return useContext(AuthContext);
}

// This hook will protect the routes access based on user authentication.
function useProtectedRoute(user, loading) {
  const segments = useSegments();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (loading) return; 
    const navigationKey = rootNavigationState?.key; 
    if (!navigationKey) return;

    const inAuthGroup = segments[0] === '(auth)'; // logical group if exists, or just check route names
    
    // If the user is not signed in and the initial segment is not anything in the auth group.
    // In this specific app structure, the login page is 'Login', register is 'RegisterPage'.
    // Tabs are 'tabs'.
    
    // Let's refine based on the user's current file structure:
    // Login -> /Login
    // Register -> /RegisterPage
    // Tabs -> /tabs
    
    const inLogin = segments[0] === 'Login';
    
    if (!user) {
        // If not logged in, redirect to login if not already there
        // allow access to Login page
        if (segments[0] !== 'Login') {
             router.replace('/Login');
        }
    } else {
        // User is logged in
        // The user object matches the structure returned by login: { user: { ... }, token: "..." }
        const isAllInfo = user?.user?.isAllInfo;
        
        if (!isAllInfo) {
            // If info not complete, redirect to RegisterPage
            if (segments[0] !== 'RegisterPage') {
                router.replace('/RegisterPage');
            }
        } else {
             // If info complete, go to tabs
             // prevent going back to Login or RegisterPage
             if (segments[0] === 'Login' || segments[0] === 'RegisterPage') {
                 router.replace('/tabs');
             }
        }
    }
  }, [user, segments, loading, rootNavigationState]);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await GetUser();
        setUser(userData);
      } catch (e) {
        console.error("Failed to load user", e);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  useProtectedRoute(user, loading);

  const login = async (userData) => {
    setUser(userData);
    await LoginUser(userData);
  };

  const logout = async () => {
    setUser(null);
    await LogoutService();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
