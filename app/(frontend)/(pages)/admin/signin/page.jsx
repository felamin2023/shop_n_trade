"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Shield, Mail, Lock, Leaf, Recycle } from "lucide-react";
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
        // Check if the user is an admin
        if (data.user.role !== "ADMIN") {
          setNotification({
            message: "Access denied. Admin privileges required.",
            type: "error",
          });
          setIsSubmitting(false);
          return;
        }

        setNotification({ message: "Login successful!", type: "success" });
        login(data.user);
        setIsNavigating(true);

        setTimeout(() => {
          router.push("/admin/home");
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
          <div className="relative">
            <div className="w-24 h-24 bg-[#f5f5f0] rounded-2xl flex items-center justify-center shadow-2xl">
              <img
                src="/images/signin_upPage/shopNtradelogo.png"
                alt="Shop & Trade"
                className="w-16 h-16 animate-pulse"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
          </div>
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-[#1a3d1a] rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-green-500 border-r-green-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-green-400 text-sm font-medium">
            Accessing Admin Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-[#0a1f0a] via-[#0d2818] to-[#071207]">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-green-500 rounded-full"></div>
          <div className="absolute top-40 right-32 w-48 h-48 border border-green-500 rounded-full"></div>
          <div className="absolute bottom-32 left-32 w-24 h-24 border border-green-500 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 border border-green-500 rounded-full"></div>
        </div>

        <div className="relative z-10 text-center">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-[#f5f5f0] rounded-3xl flex items-center justify-center shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
              <img
                src="/images/signin_upPage/shopNtradelogo.png"
                alt="Shop & Trade Logo"
                className="w-24 h-24"
              />
            </div>
            <h1 className="font-noto text-white text-4xl font-bold mb-2">
              Shop & Trade
            </h1>
            <p className="text-green-400 text-lg">Admin Control Center</p>
          </div>

          {/* Features */}
          <div className="space-y-4 mt-12">
            <div className="flex items-center gap-4 bg-[#132d13]/50 rounded-xl px-6 py-4 backdrop-blur-sm border border-[#1a3d1a]">
              <div className="p-2 bg-[#f5f5f0] rounded-lg">
                <Shield size={20} className="text-[#0d3d0d]" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium">Secure Access</p>
                <p className="text-green-400/60 text-sm">
                  Admin-only dashboard
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-[#132d13]/50 rounded-xl px-6 py-4 backdrop-blur-sm border border-[#1a3d1a]">
              <div className="p-2 bg-[#f5f5f0] rounded-lg">
                <Recycle size={20} className="text-[#0d3d0d]" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium">Manage Eco-Trades</p>
                <p className="text-green-400/60 text-sm">
                  Products & transactions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-[#132d13]/50 rounded-xl px-6 py-4 backdrop-blur-sm border border-[#1a3d1a]">
              <div className="p-2 bg-[#f5f5f0] rounded-lg">
                <Leaf size={20} className="text-[#0d3d0d]" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium">Track Impact</p>
                <p className="text-green-400/60 text-sm">
                  Monitor environmental goals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-20 h-20 mx-auto bg-[#f5f5f0] rounded-2xl flex items-center justify-center shadow-xl mb-4">
              <img
                src="/images/signin_upPage/shopNtradelogo.png"
                alt="Shop & Trade Logo"
                className="w-14 h-14"
              />
            </div>
            <h1 className="font-noto text-white text-2xl font-bold">
              Shop & Trade
            </h1>
            <p className="text-green-400 text-sm">Admin Portal</p>
          </div>

          {/* Login Card */}
          <div className="bg-[#0d2818] rounded-3xl shadow-2xl border border-[#1a3d1a] p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#1a5c1a] to-[#0d3d0d] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Shield size={32} className="text-white" />
              </div>
              <h2 className="font-noto text-white text-2xl font-bold">
                Admin Sign In
              </h2>
              <p className="text-green-400/60 text-sm mt-2">
                Enter your credentials to access the dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignIn} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-green-400/80 text-sm font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500/50"
                  />
                  <input
                    type="email"
                    placeholder="admin@shopntrade.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#0a1f0a] text-white placeholder-green-600/40 
                      pl-12 pr-4 py-3.5 rounded-xl border-2 border-[#1a3d1a] 
                      focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20
                      transition-all duration-300"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="block text-green-400/80 text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500/50"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-[#0a1f0a] text-white placeholder-green-600/40 
                      pl-12 pr-12 py-3.5 rounded-xl border-2 border-[#1a3d1a] 
                      focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20
                      transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500/50 hover:text-green-400 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-green-400/60 text-sm hover:text-green-400 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] 
                  hover:from-[#1a4d1a] hover:to-[#0d2d0d]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl
                  transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <Shield size={20} />
                    Sign In to Dashboard
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-[#1a3d1a] text-center">
              <p className="text-green-400/40 text-xs">
                Protected area. Unauthorized access is prohibited.
              </p>
            </div>
          </div>

          {/* Bottom Text */}
          <p className="text-center text-green-400/40 text-sm mt-6">
            © 2024 Shop & Trade. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
