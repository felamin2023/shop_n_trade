"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Leaf,
  Recycle,
  Gift,
  Heart,
  X,
  ArrowLeft,
  CheckCircle,
  KeyRound,
  User,
  MapPin,
  Phone,
} from "lucide-react";
import Notification from "@/components/Notification";
import { useAuth } from "@/context/AuthContext";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigatingTo, setNavigatingTo] = useState(""); // "home" or "signup"
  const router = useRouter();
  const { login } = useAuth();

  // Forgot password states
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: enter email, 2: verify identity, 3: enter new password, 4: success
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [userName, setUserName] = useState("");

  // Identity verification states
  const [verifyFullname, setVerifyFullname] = useState("");
  const [verifyAddress, setVerifyAddress] = useState("");
  const [verifyContact, setVerifyContact] = useState("");

  // Forgot password handlers
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotLoading(true);

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserName(data.fullname);
        setForgotStep(2);
      } else {
        setForgotError(data.message || "Email not found");
      }
    } catch (err) {
      setForgotError("An error occurred. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleVerifyIdentity = async (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotLoading(true);

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: forgotEmail,
          verifyDetails: true,
          fullname: verifyFullname,
          address: verifyAddress,
          contact: verifyContact,
        }),
      });

      const data = await response.json();

      if (response.ok && data.verified) {
        setForgotStep(3);
      } else {
        setForgotError(data.message || "Verification failed");
      }
    } catch (err) {
      setForgotError("An error occurred. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setForgotError("");

    if (newPassword.length < 6) {
      setForgotError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setForgotError("Passwords do not match");
      return;
    }

    setForgotLoading(true);

    try {
      const response = await fetch("/api/forgot-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setForgotStep(4);
      } else {
        setForgotError(data.message || "Failed to reset password");
      }
    } catch (err) {
      setForgotError("An error occurred. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  const closeForgotModal = () => {
    setShowForgotModal(false);
    setForgotStep(1);
    setForgotEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setForgotError("");
    setUserName("");
    setVerifyFullname("");
    setVerifyAddress("");
    setVerifyContact("");
  };

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
        login(data.user);
        setNavigatingTo("home");
        setIsNavigating(true);

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
          {/* Animated Logo Container */}
          <div className="relative">
            <div className="w-28 h-28 bg-[#f5f5f0] rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
              <img
                src="/images/signin_upPage/shopNtradelogo.png"
                alt="Shop & Trade"
                className="w-20 h-20"
              />
            </div>
            {/* Floating particles */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-green-500/60 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400/60 rounded-full animate-bounce delay-100"></div>
            <div className="absolute top-1/2 -right-3 w-2 h-2 bg-green-300/60 rounded-full animate-bounce delay-200"></div>
          </div>

          {/* Animated Spinner */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-[#1a3d1a]/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-green-500 rounded-full animate-spin"></div>
            <div
              className="absolute inset-2 border-4 border-transparent border-b-green-400/50 rounded-full animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            ></div>
          </div>

          {/* Dynamic Text */}
          <div className="text-center">
            <p className="text-green-400 text-lg font-semibold mb-1">
              {navigatingTo === "signup"
                ? "Creating your journey..."
                : "Welcome back!"}
            </p>
            <p className="text-green-400/60 text-sm">
              {navigatingTo === "signup"
                ? "Taking you to Sign Up"
                : "Redirecting to your dashboard"}
            </p>
          </div>

          {/* Progress dots */}
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-150"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    );
  }

  // Handler for navigating to sign up
  const handleNavigateToSignup = () => {
    setNavigatingTo("signup");
    setIsNavigating(true);
    setTimeout(() => {
      router.push("/user/signup");
    }, 800);
  };

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
            <p className="text-green-400 text-lg">Recycle. Reward. Repeat.</p>
          </div>

          {/* Features */}
          <div className="space-y-4 mt-12">
            <div className="flex items-center gap-4 bg-[#132d13]/50 rounded-xl px-6 py-4 backdrop-blur-sm border border-[#1a3d1a]">
              <div className="p-2 bg-[#f5f5f0] rounded-lg">
                <Recycle size={20} className="text-[#0d3d0d]" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium">Trade Recyclables</p>
                <p className="text-green-400/60 text-sm">
                  Turn bottles into rewards
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-[#132d13]/50 rounded-xl px-6 py-4 backdrop-blur-sm border border-[#1a3d1a]">
              <div className="p-2 bg-[#f5f5f0] rounded-lg">
                <Gift size={20} className="text-[#0d3d0d]" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium">Earn Rewards</p>
                <p className="text-green-400/60 text-sm">
                  Get amazing products
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-[#132d13]/50 rounded-xl px-6 py-4 backdrop-blur-sm border border-[#1a3d1a]">
              <div className="p-2 bg-[#f5f5f0] rounded-lg">
                <Heart size={20} className="text-[#0d3d0d]" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium">Support Schools</p>
                <p className="text-green-400/60 text-sm">
                  Help charity projects
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
            <p className="text-green-400 text-sm">Recycle. Reward. Repeat.</p>
          </div>

          {/* Login Card */}
          <div className="bg-[#0d2818] rounded-3xl shadow-2xl border border-[#1a3d1a] p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#1a5c1a] to-[#0d3d0d] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Leaf size={32} className="text-white" />
              </div>
              <h2 className="font-noto text-white text-2xl font-bold">
                Welcome Back
              </h2>
              <p className="text-green-400/60 text-sm mt-2">
                Sign in to continue your eco journey
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
                    placeholder="you@example.com"
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
                  onClick={() => setShowForgotModal(true)}
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
                    <Leaf size={20} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 pt-6 border-t border-[#1a3d1a] text-center">
              <p className="text-green-400/60 text-sm">
                Don't have an account?{" "}
                <button
                  onClick={handleNavigateToSignup}
                  className="text-green-400 font-semibold hover:text-green-300 transition-colors"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>

          {/* Bottom Text */}
          <p className="text-center text-green-400/40 text-sm mt-6">
            © 2024 Shop & Trade. Save the planet, one bottle at a time. 🌍
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0d2818] rounded-3xl shadow-2xl border border-[#1a3d1a] w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] p-6">
              <button
                onClick={closeForgotModal}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#f5f5f0] rounded-xl flex items-center justify-center">
                  <KeyRound size={24} className="text-[#0d3d0d]" />
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold">
                    Reset Password
                  </h3>
                  <p className="text-green-200/70 text-sm">
                    {forgotStep === 1 && "Enter your email to continue"}
                    {forgotStep === 2 && `Hi ${userName}, verify your identity`}
                    {forgotStep === 3 && "Create your new password"}
                    {forgotStep === 4 && "Password reset complete"}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Step indicators */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div
                  className={`w-3 h-3 rounded-full transition-colors ${
                    forgotStep >= 1 ? "bg-green-500" : "bg-[#1a3d1a]"
                  }`}
                ></div>
                <div
                  className={`w-6 h-0.5 transition-colors ${
                    forgotStep >= 2 ? "bg-green-500" : "bg-[#1a3d1a]"
                  }`}
                ></div>
                <div
                  className={`w-3 h-3 rounded-full transition-colors ${
                    forgotStep >= 2 ? "bg-green-500" : "bg-[#1a3d1a]"
                  }`}
                ></div>
                <div
                  className={`w-6 h-0.5 transition-colors ${
                    forgotStep >= 3 ? "bg-green-500" : "bg-[#1a3d1a]"
                  }`}
                ></div>
                <div
                  className={`w-3 h-3 rounded-full transition-colors ${
                    forgotStep >= 3 ? "bg-green-500" : "bg-[#1a3d1a]"
                  }`}
                ></div>
                <div
                  className={`w-6 h-0.5 transition-colors ${
                    forgotStep >= 4 ? "bg-green-500" : "bg-[#1a3d1a]"
                  }`}
                ></div>
                <div
                  className={`w-3 h-3 rounded-full transition-colors ${
                    forgotStep >= 4 ? "bg-green-500" : "bg-[#1a3d1a]"
                  }`}
                ></div>
              </div>

              {/* Error Message */}
              {forgotError && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
                  {forgotError}
                </div>
              )}

              {/* Step 1: Enter Email */}
              {forgotStep === 1 && (
                <form onSubmit={handleVerifyEmail} className="space-y-4">
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
                        placeholder="you@example.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        required
                        className="w-full bg-[#0a1f0a] text-white placeholder-green-600/40 
                          pl-12 pr-4 py-3.5 rounded-xl border-2 border-[#1a3d1a] 
                          focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20
                          transition-all duration-300"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full py-3.5 bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] 
                      hover:from-[#1a4d1a] hover:to-[#0d2d0d]
                      disabled:opacity-50 disabled:cursor-not-allowed
                      rounded-xl text-white font-semibold shadow-lg hover:shadow-xl
                      transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {forgotLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Verifying...
                      </>
                    ) : (
                      "Continue"
                    )}
                  </button>
                </form>
              )}

              {/* Step 2: Verify Identity */}
              {forgotStep === 2 && (
                <form onSubmit={handleVerifyIdentity} className="space-y-4">
                  <p className="text-green-400/60 text-sm text-center mb-4">
                    Please enter your account details to verify your identity
                  </p>
                  <div className="space-y-2">
                    <label className="block text-green-400/80 text-sm font-medium">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500/50"
                      />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={verifyFullname}
                        onChange={(e) => setVerifyFullname(e.target.value)}
                        required
                        className="w-full bg-[#0a1f0a] text-white placeholder-green-600/40 
                          pl-12 pr-4 py-3 rounded-xl border-2 border-[#1a3d1a] 
                          focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20
                          transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-green-400/80 text-sm font-medium">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500/50"
                      />
                      <input
                        type="text"
                        placeholder="Enter your address"
                        value={verifyAddress}
                        onChange={(e) => setVerifyAddress(e.target.value)}
                        required
                        className="w-full bg-[#0a1f0a] text-white placeholder-green-600/40 
                          pl-12 pr-4 py-3 rounded-xl border-2 border-[#1a3d1a] 
                          focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20
                          transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-green-400/80 text-sm font-medium">
                      Contact Number
                    </label>
                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500/50"
                      />
                      <input
                        type="text"
                        placeholder="Enter your contact number"
                        value={verifyContact}
                        onChange={(e) => setVerifyContact(e.target.value)}
                        required
                        className="w-full bg-[#0a1f0a] text-white placeholder-green-600/40 
                          pl-12 pr-4 py-3 rounded-xl border-2 border-[#1a3d1a] 
                          focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20
                          transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setForgotStep(1)}
                      className="flex-1 py-3 bg-[#1a3d1a]/50 hover:bg-[#1a3d1a]
                        rounded-xl text-white font-semibold
                        transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ArrowLeft size={18} />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={forgotLoading}
                      className="flex-[2] py-3 bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] 
                        hover:from-[#1a4d1a] hover:to-[#0d2d0d]
                        disabled:opacity-50 disabled:cursor-not-allowed
                        rounded-xl text-white font-semibold shadow-lg hover:shadow-xl
                        transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {forgotLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Verifying...
                        </>
                      ) : (
                        "Verify Identity"
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Enter New Password */}
              {forgotStep === 3 && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-green-400/80 text-sm font-medium">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500/50"
                      />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full bg-[#0a1f0a] text-white placeholder-green-600/40 
                          pl-12 pr-12 py-3.5 rounded-xl border-2 border-[#1a3d1a] 
                          focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20
                          transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500/50 hover:text-green-400 transition-colors"
                      >
                        {showNewPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-green-400/80 text-sm font-medium">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500/50"
                      />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full bg-[#0a1f0a] text-white placeholder-green-600/40 
                          pl-12 pr-12 py-3.5 rounded-xl border-2 border-[#1a3d1a] 
                          focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20
                          transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500/50 hover:text-green-400 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setForgotStep(2)}
                      className="flex-1 py-3.5 bg-[#1a3d1a]/50 hover:bg-[#1a3d1a]
                        rounded-xl text-white font-semibold
                        transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ArrowLeft size={18} />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={forgotLoading}
                      className="flex-[2] py-3.5 bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] 
                        hover:from-[#1a4d1a] hover:to-[#0d2d0d]
                        disabled:opacity-50 disabled:cursor-not-allowed
                        rounded-xl text-white font-semibold shadow-lg hover:shadow-xl
                        transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {forgotLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Resetting...
                        </>
                      ) : (
                        "Reset Password"
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Step 4: Success */}
              {forgotStep === 4 && (
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle size={40} className="text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-bold mb-2">
                      Password Reset Successful!
                    </h4>
                    <p className="text-green-400/60 text-sm">
                      Your password has been changed. You can now sign in with
                      your new password.
                    </p>
                  </div>
                  <button
                    onClick={closeForgotModal}
                    className="w-full py-3.5 bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] 
                      hover:from-[#1a4d1a] hover:to-[#0d2d0d]
                      rounded-xl text-white font-semibold shadow-lg hover:shadow-xl
                      transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Leaf size={18} />
                    Back to Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SigninPage;
