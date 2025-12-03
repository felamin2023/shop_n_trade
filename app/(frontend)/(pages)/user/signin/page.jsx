"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Notification from "@/components/Notification";
import { useAuth } from "@/context/AuthContext";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setNotification(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setNotification({ message: "Login successful!", type: "success" });
        login(data.user); // Use auth context login
        setIsNavigating(true); // Show loading screen

        setTimeout(() => {
          if (data.user.role === "ADMIN") {
            router.push("/admin/home");
          } else {
            router.push("/");
          }
        }, 1000);
      } else {
        setNotification({
          message: data.message || "Login failed",
          type: "error",
        });
      }
    } catch (err) {
      setNotification({
        message: "An error occurred. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading screen for navigation
  if (isNavigating) {
    return (
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
          
          <p className="text-green-400 text-sm">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-screen w-full flex justify-center items-center px-8     
      bg-gradient-to-br from-[#0a1f0a] via-[#0d2818] to-[#071207]"
    >
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="flex w-[80%] max-w-[1200px] justify-between items-center gap-10">

        <div className="flex flex-col justify-center items-center">
          <img
            height={350}
            width={350}
            src="/images/signin_upPage/shopNtradelogo.png"
            alt="Shop & Trade Logo"
            className="drop-shadow-xl"
          />
        </div>

        <div className="flex flex-col justify-between items-center 
            bg-[#0d2818]/80 backdrop-blur-md shadow-lg border border-[#1a3d1a]
            h-[65%] w-[45%] min-w-[380px] rounded-2xl px-10 py-6">

          <h1 className="text-[32px] font-noto font-bold text-white drop-shadow-sm">
            Sign In
          </h1>

          <form
            onSubmit={handleSignIn}
            className="flex flex-col justify-center gap-4 items-center w-full mt-4"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#0a1f0a] w-full placeholder-[#f5f5f0]/70 py-2 px-5 rounded-lg 
              text-white border border-[#1a3d1a] focus:ring-2 focus:ring-green-500 outline-none"
            />

            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#0a1f0a] w-full placeholder-[#f5f5f0]/70 py-2 px-5 pr-10 rounded-lg 
                text-white border border-[#1a3d1a] focus:ring-2 focus:ring-green-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1a5c1a] hover:text-[#2a7c2a]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className="text-[#f5f5f0]/80 text-[14px]">
              Don't have an account?{" "}
              <a href="/user/signup" className="text-[#f5f5f0] font-medium hover:underline hover:text-white">
                Sign up
              </a>
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] text-white py-2 w-[60%] rounded-lg hover:from-[#1a4d1a] hover:to-[#0d2d0d] transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Signing In...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <p className="text-[#f5f5f0]/70 text-[12px] mt-2 hover:underline cursor-pointer hover:text-white">
              Forgot password?
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
