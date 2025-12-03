"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
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
    role: "USER", // Default role can be set here
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateFullName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
  };

  const validateContact = (contact) => {
    const contactRegex = /^\d{11}$/;
    return contactRegex.test(contact);
  };

  // Function to handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Validate fullname - only letters and spaces
    if (name === "fullname") {
      if (value && !validateFullName(value)) {
        setErrors((prev) => ({ ...prev, fullname: "Full name must contain only letters" }));
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
      if (numericValue && numericValue.length !== 11) {
        setErrors((prev) => ({ ...prev, contact: "Contact must be exactly 11 digits" }));
      }
      return;
    }

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function registerUser(e) {
    e.preventDefault();
    
    // Final validation before submit
    const newErrors = {};
    
    if (!validateFullName(userData.fullname)) {
      newErrors.fullname = "Full name must contain only letters";
    }
    
    if (!validateContact(userData.contact)) {
      newErrors.contact = "Contact must be exactly 11 digits";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
      await new Promise(resolve => setTimeout(resolve, remainingTime));

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
        setNotification({
          message: "Account created successfully! Redirecting to sign in...",
          type: "success",
        });
        
        // Redirect to sign in after 1.5 seconds
        setTimeout(() => {
          router.push("/user/signin");
        }, 1500);
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

  return (
    <div className="h-screen w-full flex justify-around px-32 items-center bg-gradient-to-br from-[#0a1f0a] via-[#0d2818] to-[#071207]">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="flex flex-col justify-around items-center border border-[#1a3d1a] bg-[#0d2818]/80 backdrop-blur-md h-[80%] w-[40%] rounded-lg">
        <h1 className="text-[30px] font-noto font-bold text-white drop-shadow-md">
          Sign Up
        </h1>
        <form
          onSubmit={registerUser}
          className="flex flex-col justify-between items-center h-[75%] w-[85%]"
        >
          <div className="w-full">
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={userData.fullname}
              onChange={handleChange}
              required
              className={`bg-[#0a1f0a] w-[100%] placeholder-[#f5f5f0]/70 py-1 px-5 rounded-md text-white border ${errors.fullname ? 'border-red-500' : 'border-[#1a3d1a]'} focus:ring-2 focus:ring-green-500 outline-none`}
            />
            {errors.fullname && <p className="text-red-400 text-xs mt-1">{errors.fullname}</p>}
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            required
            className="bg-[#0a1f0a] w-[100%] placeholder-[#f5f5f0]/70 py-1 px-5 rounded-md text-white border border-[#1a3d1a] focus:ring-2 focus:ring-green-500 outline-none"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={userData.address}
            onChange={handleChange}
            required
            className="bg-[#0a1f0a] w-[100%] placeholder-[#f5f5f0]/70 py-1 px-5 rounded-md text-white border border-[#1a3d1a] focus:ring-2 focus:ring-green-500 outline-none"
          />
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
              required
              className="bg-[#0a1f0a] w-[100%] placeholder-[#f5f5f0]/70 py-1 px-5 pr-10 rounded-md text-white border border-[#1a3d1a] focus:ring-2 focus:ring-green-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1a5c1a] hover:text-[#2a7c2a]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="w-full">
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={userData.contact}
              onChange={handleChange}
              required
              className={`bg-[#0a1f0a] w-[100%] placeholder-[#f5f5f0]/70 py-1 px-5 rounded-md text-white border ${errors.contact ? 'border-red-500' : 'border-[#1a3d1a]'} focus:ring-2 focus:ring-green-500 outline-none`}
            />
            {errors.contact && <p className="text-red-400 text-xs mt-1">{errors.contact}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] text-white py-2 w-[50%] rounded-md hover:from-[#1a4d1a] hover:to-[#0d2d0d] transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
                <span>Signing Up...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </button>
          <p className="text-[#f5f5f0]/80 text-[13px]">
            Already have an account?{" "}
            <a href="/user/signin" className="text-[#f5f5f0] font-medium hover:underline hover:text-white">
              Sign In
            </a>
          </p>
        </form>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[30px] font-noto font-bold text-green-300 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
          Welcome to
        </h1>

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
export default SignupPage;
