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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setNotification({ message: "Login successful!", type: "success" });
        console.log("Login successful:", data.user);
        // Store user data in localStorage or context if needed
        localStorage.setItem("user", JSON.stringify(data.user));

        // Delay redirect slightly to show success message
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
      console.error("Login error:", err);
      setNotification({
        message: "An error occurred. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex justify-around px-32 items-center bg-[radial-gradient(ellipse_800px_800px_at_10%_-20%,_#588027_-10%,_#ffffff_90%)]">
      {loading && <Loading />}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div>
        <img
          height={200}
          width={200}
          src="/images/signin_upPage/shopNtradelogo.png"
          alt="Shop & Trade Logo"
        />
      </div>
      <div className="flex flex-col justify-around items-center border-[1px] border-black h-[53%] w-[40%] rounded-lg">
        <h1 className="text-[30px] font-noto font-bold text-black drop-shadow-[2px_2px_4px_rgba(0,0,0,0.1)]">
          Sign In
        </h1>
        <form
          onSubmit={handleSignIn}
          className="flex flex-col justify-between items-center  h-[60%] w-[85%]"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent w-[100%] placeholder-black py-1 px-5 rounded-md text-black border-[1px] border-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent w-[100%] placeholder-black py-1 px-5 rounded-md text-black border-[1px] border-black"
          />
          <p className="text-black text-[13px]">
            Don't have an account?{" "}
            <a href="/user/signup" className="text-blue-600">
              Sign up
            </a>
          </p>
          <div className="w-full flex flex-col justify-center items-center gap-1">
            <button
              type="submit"
              className="bg-black text-white py-1 w-[50%] rounded-md"
            >
              Sign In
            </button>
            <p className="text-black text-[11px]">Forgot password?</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninPage;
