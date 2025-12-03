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
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[radial-gradient(ellipse_800px_800px_at_10%_-20%,_#588027_-10%,_#ffffff_90%)]">
        <div className="flex flex-col items-center gap-6">
          <img
            src="/images/signin_upPage/shopNtradelogo.png"
            alt="Shop & Trade"
            className="w-24 h-24 animate-pulse"
          />
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-green-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-green-600 border-r-green-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-green-700 text-sm font-medium">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex justify-around px-32 items-center bg-[radial-gradient(ellipse_800px_800px_at_10%_-20%,_#588027_-10%,_#ffffff_90%)]">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="flex flex-col justify-around items-center border-[1px] border-black h-[55%] w-[40%] rounded-lg bg-white/30 backdrop-blur-sm shadow-lg py-8">
        <h1 className="text-[30px] font-noto font-bold text-black drop-shadow-[2px_2px_4px_rgba(0,0,0,0.1)]">
          Admin
        </h1>

        <form
          onSubmit={handleSignIn}
          className="flex flex-col justify-between items-center h-[60%] w-[85%] gap-4"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-transparent w-full placeholder-black/70 py-2 px-5 rounded-md text-black border-[1px] border-black focus:ring-2 focus:ring-green-500 outline-none"
          />

          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-transparent w-full placeholder-black/70 py-2 px-5 pr-10 rounded-md text-black border-[1px] border-black focus:ring-2 focus:ring-green-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black/60 hover:text-black"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="w-full flex flex-col justify-center items-center gap-3 mt-2">
            <p className="text-black text-[11px] cursor-pointer hover:underline">
              Forgot password?
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white py-2 w-[50%] rounded-md hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>

      <div>
        <img
          height={200}
          width={200}
          src="/images/signin_upPage/shopNtradelogo.png"
          alt="Shop & Trade Logo"
        />
      </div>
    </div>
  );
};

export default SigninPage;
