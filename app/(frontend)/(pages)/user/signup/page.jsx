"use client";
import { useState } from "react";
import Loading from "@/components/Loading";
import Notification from "@/components/Notification";

const SignupPage = () => {
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
  const [notification, setNotification] = useState(null);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function registerUser(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: userData.fullname,
          email: userData.email,
          address: userData.address,
          password: userData.password,
          contact: parseInt(userData.contact),
          img: userData.img,
          role: userData.role,
        }),
      });

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
          message: "Account created successfully!",
          type: "success",
        });
      } else {
        setNotification({
          message: "Failed to create account.",
          type: "error",
        });
      }
    } catch (error) {
      console.log(error);
      setNotification({ message: "An error occurred.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-full flex justify-around px-32 items-center bg-gradient-to-br from-[#0a1f0a] via-[#0d2818] to-[#071207]">
      {loading && <Loading />}
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
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={userData.fullname}
            onChange={handleChange}
            required
            className="bg-[#0a1f0a] w-[100%] placeholder-green-500/50 py-1 px-5 rounded-md text-white border border-[#1a3d1a] focus:ring-2 focus:ring-green-500 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            required
            className="bg-[#0a1f0a] w-[100%] placeholder-green-500/50 py-1 px-5 rounded-md text-white border border-[#1a3d1a] focus:ring-2 focus:ring-green-500 outline-none"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={userData.address}
            onChange={handleChange}
            required
            className="bg-[#0a1f0a] w-[100%] placeholder-green-500/50 py-1 px-5 rounded-md text-white border border-[#1a3d1a] focus:ring-2 focus:ring-green-500 outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            required
            className="bg-[#0a1f0a] w-[100%] placeholder-green-500/50 py-1 px-5 rounded-md text-white border border-[#1a3d1a] focus:ring-2 focus:ring-green-500 outline-none"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={userData.contact}
            onChange={handleChange}
            required
            className="bg-[#0a1f0a] w-[100%] placeholder-green-500/50 py-1 px-5 rounded-md text-white border border-[#1a3d1a] focus:ring-2 focus:ring-green-500 outline-none"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] text-white py-1 w-[50%] rounded-md hover:from-[#1a4d1a] hover:to-[#0d2d0d] transition"
          >
            Sign Up
          </button>
          <p className="text-green-300/80 text-[13px]">
            Already have an account?{" "}
            <a href="/user/signin" className="text-green-400 hover:underline">
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
