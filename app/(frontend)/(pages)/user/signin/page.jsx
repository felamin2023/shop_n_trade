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
      className="
        h-screen w-full flex items-center justify-center px-10
        bg-[url('/images/signin_upPage/backimage.jpg')]
        bg-cover bg-center bg-no-repeat
      "
    >
      {loading && <Loading />}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="flex w-[85%] max-w-[1300px] items-center justify-center">

        <div
          className="
            flex flex-col justify-center items-center
            bg-white/40 backdrop-blur-md shadow-lg border border-white/50
            w-[45%] max-w-[420px] rounded-2xl px-10 py-8
          "
        >
          <img
            height={250}
            width={250}
            src="/images/signin_upPage/shopNtradelogo.png"
            alt="Shop & Trade Logo"
            className="drop-shadow-xl mb-4"
          />

          <h1 className="text-[32px] font-noto font-bold text-black">
            Sign In
          </h1>

          <form
            onSubmit={handleSignIn}
            className="flex flex-col gap-4 items-center w-full mt-4"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                bg-white/60 w-full placeholder-gray-700 py-2 px-5 rounded-lg
                text-black border border-gray-400 focus:ring-2
                focus:ring-black outline-none
              "
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="
                bg-white/60 w-full placeholder-gray-700 py-2 px-5 rounded-lg
                text-black border border-gray-400 focus:ring-2
                focus:ring-black outline-none
              "
            />

            <p className="text-black text-[14px] -mt-1">
              Don't have an account?{" "}
              <a
                href="/user/signup"
                className="text-blue-700 font-medium hover:underline"
              >
                Sign up
              </a>
            </p>

            <button
              type="submit"
              className="
                bg-black text-white py-2 w-[65%] rounded-lg
                hover:bg-gray-900 transition mt-1
              "
            >
              Sign In
            </button>

            <p className="text-black text-[12px] mt-2 hover:underline cursor-pointer">
              Forgot password?
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
