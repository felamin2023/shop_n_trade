"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import Notification from "@/components/Notification";
import { motion } from "framer-motion";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setNotification(null);
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setNotification({ message: "Login successful!", type: "success" });
        localStorage.setItem("user", JSON.stringify(data.user));

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
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center font-poppins bg-[#f0fdf4] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div 
        className="absolute inset-0 opacity-60 animate-bg-pan"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20c0-11.046 8.954-20 20-20v20H20zm0 0c0 11.046-8.954 20-20 20V20h20z' fill='%23588027' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}
      ></div>
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      {/* Bottom Dark Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#1a2e05]/10 to-transparent pointer-events-none"></div>

      {loading && <Loading />}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      
      {/* Main Card */}
      <div className="w-full max-w-[1000px] h-[85vh] flex bg-white rounded-[30px] shadow-2xl overflow-hidden m-4 z-10">
        
        {/* Left Side - Video/Illustration (Mirrored) */}
        <motion.div 
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="hidden md:flex w-1/2 h-full flex-col justify-center items-center bg-gradient-to-b from-[#86efac] to-[#052e16] relative p-8 transform-gpu"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-[90%] h-auto rounded-2xl mix-blend-multiply mb-8"
          >
            <source src="/images/signin_upPage/login illustration animation.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="text-center px-4 z-10">
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Shop N Trade</h2>
            <p className="text-white text-opacity-90 text-lg font-light italic">
              "Empowering a sustainable future through eco-friendly commerce. Trade responsibly, live sustainably."
            </p>
          </div>
        </motion.div>

        {/* Right Side - Form (Mirrored) */}
        <motion.div 
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="w-full md:w-1/2 h-full flex flex-col justify-center items-center p-8 md:p-12 overflow-y-auto scrollbar-hide transform-gpu"
        >
          <div className="flex flex-col items-center w-full max-w-sm gap-4">
            <img
              height={150}
              width={150}
              src="/images/signin_upPage/shopNtradelogo.png"
              alt="Shop & Trade Logo"
              className="mb-1"
            />
            <div className="text-center w-full mb-2">
              <h1 className="text-[28px] font-bold text-gray-800">
                Sign In
              </h1>
              <p className="text-gray-500 text-sm">Welcome back! Please enter your details</p>
            </div>
            
            <form onSubmit={handleSignIn} className="flex flex-col w-full gap-4">
              {/* Email */}
              <div className="relative w-full">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer block w-full appearance-none border border-gray-300 rounded-xl bg-transparent px-4 py-2.5 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-2.5 z-10 origin-[0] -translate-y-5 scale-75 transform bg-white px-1 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-green-600"
                >
                  Email
                </label>
              </div>

              {/* Password */}
              <div className="relative w-full">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer block w-full appearance-none border border-gray-300 rounded-xl bg-transparent px-4 py-2.5 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 top-2.5 z-10 origin-[0] -translate-y-5 scale-75 transform bg-white px-1 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-green-600"
                >
                  Password
                </label>
              </div>

              <div className="flex justify-end w-full">
                <a href="#" className="text-xs text-green-600 hover:underline">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition-all duration-300 font-semibold mt-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Sign In
              </button>
              
              <p className="text-gray-600 text-[13px] text-center mt-2">
                Don't have an account?{" "}
                <a href="/user/signup" className="text-green-600 font-semibold hover:underline">
                  Sign Up
                </a>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SigninPage;
