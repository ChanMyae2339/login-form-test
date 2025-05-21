import React, { useState, useEffect } from "react";
import { FaPhone } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("users");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div
      className="relative min-h-screen flex items-center overflow-hidden
     bg-[url('../public/w.svg')] bg-no-repeat  bg-cover h-screen w-full relative"
    >
     
      {/* Profile Card */}
      <div className="  bg-white shadow-xl rounded-2xl overflow-hidden  w-full  max-w-lg ml-10">
        <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 h-30"></div>
        <div className="relative -mt-16 flex justify-center">
          <img
            className="w-32 h-32 rounded-full border-4 border-white shadow-md"
            src="data:image/jpeg;base64,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"
            alt="Profile"
          />
        </div>
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">John Smith</h2>
          <p className="text-sm text-gray-500 mb-4">
            {user?.role || "Frontend Developer"}
          </p>
          <div className="text-gray-700 text-sm space-y-2">
            <p>{user.email}</p>
            <p>www.smith.dev</p>
          </div>
        </div>
        <div className="px-6 pb-6 ">
          <button
            className="w-full bg-gradient-to-r from-indigo-400 to-cyan-400 
          text-white font-semibold py-2 rounded-xl   cursor-pointer"
          >
            Contact <FaPhone className="inline-block ml-2" />
          </button>
        </div>
      </div>
      {/* About Section */}
      <div className="relative    p-6 w-full">
        <h2 className="text-2xl font-bold text-gray-800  text-center">About</h2>
        <p className=" text-lg px-4 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris
        </p>
      </div>
    </div>
  );
};

export default Profile;
