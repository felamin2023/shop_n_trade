"use client";
import { useState, useEffect } from "react";
const ProfilePage = () => {
  const [updateClick, setUpdateClick] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);

  useEffect(() => {
    if (profileUpdated) {
      const timer = setTimeout(() => {
        setProfileUpdated(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [profileUpdated]);

  return (
    <div className="h-screen w-full flex justify-center items-center gap-[5%]">
      <div className="flex flex-col justify-between h-[65%] items-center w-[30%]">
        <div className=" h-[87%] w-full flex flex-col justify-between items-center gap-[5%]">
          <input
            type="text"
            placeholder="Username"
            className="border-[1px] border-black bg-transparent rounded-[5px] p-2 placeholder-gray-500 w-full"
          />
          <input
            type="text"
            placeholder="Full name"
            className="border-[1px] border-black bg-transparent rounded-[5px] p-2 placeholder-gray-500 w-full"
          />
          <input
            type="email"
            placeholder="Email"
            className="border-[1px] border-black bg-transparent rounded-[5px] p-2 placeholder-gray-500 w-full"
          />
          <input
            type="text"
            placeholder="Address"
            className="border-[1px] border-black bg-transparent rounded-[5px] p-2 placeholder-gray-500 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            className="border-[1px] border-black bg-transparent rounded-[5px] p-2 placeholder-gray-500 w-full"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border-[1px] border-black bg-transparent rounded-[5px] p-2 placeholder-gray-500 w-full"
          />
        </div>
        {!updateClick && (
          <button
            onClick={() => setUpdateClick(true)}
            className="bg-blue-900 text-white w-[50%] py-1 rounded-[5px] font-bold"
          >
            UPDATE
          </button>
        )}
      </div>
      <div className="h-[65%] flex flex-col justify-between items-center gap-4 w-[25%] bg-[rgba(0,0,0,0.1)]  backdrop-blur-md rounded-[10px]">
        <div className="flex flex-col items-center justify-center h-[75%]">
          <h1 className="text-black text-[35px] font-noto">Profile</h1>
          <img
            src="/images/profilePage/profilepic.jpg"
            alt="Profile Picture"
            className="rounded-full w-40 h-40 object-cover"
          />
        </div>
        {updateClick && (
          <div className=" h-[20%] w-[70%] flex justify-around items-center  ">
            <button
              onClick={() => setUpdateClick(false)}
              className="bg-[#FF0000] text-white w-[30%] py-1 rounded-[5px] font-bold"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setProfileUpdated(true); // Show the confirmation div
                setUpdateClick(false);
              }}
              className="bg-[#588027] text-white w-[30%] py-1 rounded-[5px] font-bold"
            >
              Save
            </button>
          </div>
        )}
      </div>
      {profileUpdated && (
        <div className="absolute  z-10 top-[5px] bg-white rounded-md py-1 px-10 ">
          <h1 className="text-black">Profile updated!</h1>
        </div>
      )}
    </div>
  );
};
export default ProfilePage;
