import { useRootNavigationState, useRouter, useSegments } from "expo-router";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  GetUser,
  LoginUser,
  Logout as LogoutService,
} from "../Store/authStore";

const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

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

    if (!user) {
      // If not logged in, redirect to login if not already there
      if (segments[0] !== "Login") {
        router.replace("/Login");
      }
    } else {
      // User is logged in
      const isAllInfo = user?.user?.isAllInfo;

      if (!isAllInfo) {
        // If info not complete, redirect to RegisterPage
        if (segments[0] !== "RegisterPage") {
          router.replace("/RegisterPage");
        }
      } else {
        // If info complete, go to tabs
        // prevent going back to Login or RegisterPage
        if (segments[0] === "Login" || segments[0] === "RegisterPage") {
          router.replace("/tabs");
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
    console.log(userData);
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