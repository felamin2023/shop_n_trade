"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import Notification from "@/components/Notification";

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
    <div
      className="h-screen w-full flex justify-center items-center px-8     
      bg-gradient-to-br from-[#0a1f0a] via-[#0d2818] to-[#071207]"
    >
      {loading && <Loading />}
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
              className="bg-[#0a1f0a] w-full placeholder-green-500/50 py-2 px-5 rounded-lg 
              text-white border border-[#1a3d1a] focus:ring-2 focus:ring-green-500 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#0a1f0a] w-full placeholder-green-500/50 py-2 px-5 rounded-lg 
              text-white border border-[#1a3d1a] focus:ring-2 focus:ring-green-500 outline-none"
            />

            <p className="text-green-300/80 text-[14px]">
              Don't have an account?{" "}
              <a href="/user/signup" className="text-green-400 font-medium hover:underline">
                Sign up
              </a>
            </p>

            <button
              type="submit"
              className="bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] text-white py-2 w-[60%] rounded-lg hover:from-[#1a4d1a] hover:to-[#0d2d0d] transition"
            >
              Sign In
            </button>

            <p className="text-green-400/60 text-[12px] mt-2 hover:underline cursor-pointer hover:text-green-400">
              Forgot password?
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
