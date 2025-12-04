"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  MapPin,
  Phone,
  Leaf,
  Recycle,
  Gift,
  UserPlus,
} from "lucide-react";
import Loading from "@/components/Loading";
import Notification from "@/components/Notification";

const SignupPage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    address: "",
    password: "",
    contact: "",
    img: "hehe",
    role: "USER",
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigatingTo, setNavigatingTo] = useState(""); // "signin" after signup success or manual click
  const [notification, setNotification] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateFullName = (name) => {
    if (!name.trim()) return "Full name is required";
    if (name.trim().length < 2)
      return "Full name must be at least 2 characters";
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) return "Full name must contain only letters";
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validateAddress = (address) => {
    if (!address.trim()) return "Address is required";
    if (address.trim().length < 5) return "Please enter a complete address";
    return "";
  };

  const validateContact = (contact) => {
    if (!contact) return "Contact number is required";
    if (contact.length !== 11) return "Contact must be exactly 11 digits";
    if (!contact.startsWith("09")) return "Contact must start with 09";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number";
    return "";
  };

  // Get password strength
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2)
      return { strength: 1, label: "Weak", color: "bg-red-500" };
    if (strength <= 4)
      return { strength: 2, label: "Medium", color: "bg-yellow-500" };
    return { strength: 3, label: "Strong", color: "bg-green-500" };
  };

  // Function to handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Validate fullname - only letters and spaces
    if (name === "fullname") {
      const error = validateFullName(value);
      if (value && error && error !== "Full name is required") {
        setErrors((prev) => ({ ...prev, fullname: error }));
      }
    }

    // Validate email
    if (name === "email") {
      const error = validateEmail(value);
      if (value && error && error !== "Email is required") {
        setErrors((prev) => ({ ...prev, email: error }));
      }
    }

    // Validate address
    if (name === "address") {
      const error = validateAddress(value);
      if (value && error && error !== "Address is required") {
        setErrors((prev) => ({ ...prev, address: error }));
      }
    }

    // Validate contact - only numbers, max 11 digits
    if (name === "contact") {
      // Only allow numbers
      const numericValue = value.replace(/\D/g, "").slice(0, 11);
      setUserData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
      const error = validateContact(numericValue);
      if (numericValue && error && error !== "Contact number is required") {
        setErrors((prev) => ({ ...prev, contact: error }));
      }
      return;
    }

    // Validate password
    if (name === "password") {
      const error = validatePassword(value);
      if (value && error && error !== "Password is required") {
        setErrors((prev) => ({ ...prev, password: error }));
      }
      // Check if confirm password matches when password changes
      if (confirmPassword && value !== confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else if (confirmPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      }
    }

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle confirm password change
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setErrors((prev) => ({ ...prev, confirmPassword: "" }));

    if (value && value !== userData.password) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
    }
  };

  async function registerUser(e) {
    e.preventDefault();

    // Final validation before submit
    const newErrors = {};

    const fullnameError = validateFullName(userData.fullname);
    if (fullnameError) newErrors.fullname = fullnameError;

    const emailError = validateEmail(userData.email);
    if (emailError) newErrors.email = emailError;

    const addressError = validateAddress(userData.address);
    if (addressError) newErrors.address = addressError;

    const contactError = validateContact(userData.contact);
    if (contactError) newErrors.contact = contactError;

    const passwordError = validatePassword(userData.password);
    if (passwordError) newErrors.password = passwordError;

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== userData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setNotification({
        message: "Please fix the errors in the form",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    const startTime = Date.now();

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: userData.fullname,
          email: userData.email,
          address: userData.address,
          password: userData.password,
          contact: userData.contact,
          img: userData.img,
          role: userData.role,
        }),
      });

      const data = await res.json();

      // Ensure at least 3 seconds of loading
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(3000 - elapsedTime, 0);
      await new Promise((resolve) => setTimeout(resolve, remainingTime));

      if (res.ok) {
        setUserData({
          fullname: "",
          email: "",
          address: "",
          password: "",
          contact: "",
          img: "hehe",
          role: "USER",
        });
        setConfirmPassword("");
        setNotification({
          message: "Account created successfully! Redirecting to sign in...",
          type: "success",
        });

        // Redirect to sign in after 1.5 seconds with loading screen
        setTimeout(() => {
          setNavigatingTo("signin-success");
          setIsNavigating(true);
          setTimeout(() => {
            router.push("/user/signin");
          }, 800);
        }, 1000);
      } else {
        setNotification({
          message: data.message || "Failed to create account.",
          type: "error",
        });
      }
    } catch (error) {
      console.log(error);
      setNotification({ message: "An error occurred.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Handler for navigating to sign in
  const handleNavigateToSignin = () => {
    setNavigatingTo("signin");
    setIsNavigating(true);
    setTimeout(() => {
      router.push("/user/signin");
    }, 800);
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
              {navigatingTo === "signin-success"
                ? "Account Created! 🎉"
                : "Taking you to Sign In..."}
            </p>
            <p className="text-green-400/60 text-sm">
              {navigatingTo === "signin-success"
                ? "Redirecting to Sign In"
                : "Welcome back!"}
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

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-[#0a1f0a] via-[#0d2818] to-[#071207]">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Left Side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6">
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
            <p className="text-green-400 text-sm">Join the eco revolution</p>
          </div>

          {/* Sign Up Card */}
          <div className="bg-[#0d2818] rounded-3xl shadow-2xl border border-[#1a3d1a] p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#1a5c1a] to-[#0d3d0d] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <UserPlus size={32} className="text-white" />
              </div>
              <h2 className="font-noto text-white text-2xl font-bold">
                Create Account
              </h2>
              <p className="text-green-400/60 text-sm mt-2">
                Join us and start making a difference
              </p>
            </div>

            {/* Form */}
            <form onSubmit={registerUser} className="space-y-4">
              {/* Full Name Input */}
              <div className="space-y-1">
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
                    name="fullname"
                    placeholder="John Doe"
                    value={userData.fullname}
                    onChange={handleChange}
                    required
                    className={`w-full bg-[#0a1f0a] text-white placeholder-green-600/40 
                      pl-12 pr-4 py-3 rounded-xl border-2 
                      ${errors.fullname ? "border-red-500" : "border-[#1a3d1a]"}
                      focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20
                      transition-all duration-300`}
                  />
                </div>
                {errors.fullname && (
                  <p className="text-red-400 text-xs mt-1">{errors.fullname}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="space-y-1">
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
                    name="email"
                    placeholder="you@example.com"
                    value={userData.email}
                    onChange={handleChange}
                    required
                    className={`w-full bg-[#0a1f0a] text-white placeholder-green-600/40 
                      pl-12 pr-4 py-3 rounded-xl border-2 
                      ${errors.email ? "border-red-500" : "border-[#1a3d1a]"}
                      focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20
                      transition-all duration-300`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Address Input */}
              <div className="space-y-1">
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
                    name="address"
                    placeholder="Your address"
                    value={userData.address}
                    onChange={handleChange}
                    required
                    className={`w-full bg-[#0a1f0a] text-white placeholder-green-600/40 
                      pl-12 pr-4 py-3 rounded-xl border-2 
                      ${errors.address ? "border-red-500" : "border-[#1a3d1a]"}
                      focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20
                      transition-all duration-300`}
                  />
                </div>
                {errors.address && (
                  <p className="text-red-400 text-xs mt-1">{errors.address}</p>
                )}
              </div>

              {/* Contact Input */}
              <div className="space-y-1">
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
                    name="contact"
                    placeholder="09123456789"
                    value={userData.contact}
                    onChange={handleChange}
                    required
                    className={`w-full bg-[#0a1f0a] text-white placeholder-green-600/40 
                      pl-12 pr-4 py-3 rounded-xl border-2 
                      ${errors.contact ? "border-red-500" : "border-[#1a3d1a]"}
                      focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20
                      transition-all duration-300`}
                  />
                </div>
                {errors.contact && (
                  <p className="text-red-400 text-xs mt-1">{errors.contact}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-1">
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
                    name="password"
                    placeholder="••••••••"
                    value={userData.password}
                    onChange={handleChange}
                    required
                    className={`w-full bg-[#0a1f0a] text-white placeholder-green-600/40 
                      pl-12 pr-12 py-3 rounded-xl border-2 
                      ${errors.password ? "border-red-500" : "border-[#1a3d1a]"}
                      focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20
                      transition-all duration-300`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500/50 hover:text-green-400 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {/* Password Strength Indicator */}
                {userData.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            getPasswordStrength(userData.password).strength >=
                            level
                              ? getPasswordStrength(userData.password).color
                              : "bg-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p
                      className={`text-xs ${
                        getPasswordStrength(userData.password).strength === 1
                          ? "text-red-400"
                          : getPasswordStrength(userData.password).strength ===
                            2
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      Password strength:{" "}
                      {getPasswordStrength(userData.password).label}
                    </p>
                  </div>
                )}
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-1">
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
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                    className={`w-full bg-[#0a1f0a] text-white placeholder-green-600/40 
                      pl-12 pr-12 py-3 rounded-xl border-2 
                      ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : confirmPassword &&
                            confirmPassword === userData.password
                          ? "border-green-500"
                          : "border-[#1a3d1a]"
                      }
                      focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20
                      transition-all duration-300`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500/50 hover:text-green-400 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {confirmPassword && confirmPassword === userData.password && (
                  <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
                    ✓ Passwords match
                  </p>
                )}
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] 
                  hover:from-[#1a4d1a] hover:to-[#0d2d0d]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl
                  transition-all duration-300 flex items-center justify-center gap-2 mt-6"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <Leaf size={20} />
                    Sign Up
                  </>
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 pt-6 border-t border-[#1a3d1a] text-center">
              <p className="text-green-400/60 text-sm">
                Already have an account?{" "}
                <button
                  onClick={handleNavigateToSignin}
                  className="text-green-400 font-semibold hover:text-green-300 transition-colors"
                >
                  Sign In
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

      {/* Right Side - Branding */}
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
              Welcome to
            </h1>
            <h2 className="font-noto text-green-400 text-3xl font-bold">
              Shop & Trade
            </h2>
            <p className="text-green-400/60 text-lg mt-2">
              Join the eco revolution today!
            </p>
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
                <Leaf size={20} className="text-[#0d3d0d]" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium">Save the Planet</p>
                <p className="text-green-400/60 text-sm">
                  Make an environmental impact
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
