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
    <div className="h-screen w-full flex justify-around px-32 items-center bg-[radial-gradient(ellipse_800px_800px_at_90%_-20%,_#588027_-10%,_#ffffff_90%)]">
      {loading && <Loading />}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="flex flex-col justify-around items-center border-[1px] border-black h-[80%] w-[40%] rounded-lg">
        <h1 className="text-[30px] font-noto font-bold text-black drop-shadow-md">
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
            className="bg-transparent w-[100%] placeholder-black py-1 px-5 rounded-md text-black border-[1px] border-black"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            required
            className="bg-transparent w-[100%] placeholder-black py-1 px-5 rounded-md text-black border-[1px] border-black"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={userData.address}
            onChange={handleChange}
            required
            className="bg-transparent w-[100%] placeholder-black py-1 px-5 rounded-md text-black border-[1px] border-black"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            required
            className="bg-transparent w-[100%] placeholder-black py-1 px-5 rounded-md text-black border-[1px] border-black"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={userData.contact}
            onChange={handleChange}
            required
            className="bg-transparent w-[100%] placeholder-black py-1 px-5 rounded-md text-black border-[1px] border-black"
          />

          <button
            type="submit"
            className="bg-black text-white py-1 w-[50%] rounded-md"
          >
            Sign Up
          </button>
          <p className="text-black text-[13px]">
            Already have an account?{" "}
            <a href="/user/signin" className="text-blue-600">
              Sign In
            </a>
          </p>
        </form>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[30px] font-noto font-bold text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
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
