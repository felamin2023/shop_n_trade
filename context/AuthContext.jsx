"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext();

// Loading Screen Component
const LoadingScreen = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0a1f0a] via-[#0d2818] to-[#071207]">
    <div className="flex flex-col items-center gap-6">
      {/* Logo */}
      <img
        src="/images/signin_upPage/shopNtradelogo.png"
        alt="Shop & Trade"
        className="w-24 h-24 animate-pulse"
      />
      
      {/* Spinner */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-green-900 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-green-400 border-r-green-400 rounded-full animate-spin"></div>
      </div>
    </div>
  </div>
);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Route protection logic
  useEffect(() => {
    if (loading) return;

    const publicRoutes = ["/user/signin", "/user/signup", "/admin/signin"];
    const userProtectedRoutes = ["/", "/user/project", "/user/profile", "/user/request"];
    const adminProtectedRoutes = ["/admin/home", "/admin/inventory", "/admin/project", "/admin/transaction"];

    let authorized = false;

    // If user is logged in
    if (user) {
      if (user.role === "USER") {
        // Regular users cannot access signin, signup, or admin pages
        if (publicRoutes.includes(pathname) || adminProtectedRoutes.some(route => pathname.startsWith(route))) {
          router.replace("/");
          return;
        }
        authorized = true;
      } else if (user.role === "ADMIN") {
        // Admins cannot access user pages or signin/signup
        if (publicRoutes.includes(pathname) || pathname === "/") {
          router.replace("/admin/home");
          return;
        }
        if (userProtectedRoutes.some(route => route !== "/" && pathname.startsWith(route))) {
          router.replace("/admin/home");
          return;
        }
        authorized = true;
      }
    } else {
      // Not logged in - can only access public routes
      if (publicRoutes.includes(pathname)) {
        authorized = true;
      } else if (userProtectedRoutes.includes(pathname) || userProtectedRoutes.some(route => route !== "/" && pathname.startsWith(route))) {
        router.replace("/user/signin");
        return;
      } else if (adminProtectedRoutes.some(route => pathname.startsWith(route))) {
        router.replace("/admin/signin");
        return;
      } else if (pathname === "/") {
        router.replace("/user/signin");
        return;
      }
    }

    setIsAuthorized(authorized);
  }, [user, pathname, loading, router]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthorized(false);
    localStorage.removeItem("user");
    router.replace("/user/signin");
  };

  // Show loading screen while validating
  if (loading || !isAuthorized) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
