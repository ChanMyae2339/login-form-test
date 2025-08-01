import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGlobe, FaUser } from "react-icons/fa";

const CARD_WIDTH = "max-w-md w-full";

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("users");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log("User data loaded from localStorage:", JSON.parse(storedUser));
      console.log("User data:", user);
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-100 via-indigo-100 to-indigo-200 min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full flex flex-col md:flex-row gap-8 items-center md:items-stretch md:justify-center mt-8">
        {/* Wrap both cards in a parent div to fix adjacent JSX error */}
        <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-center ">
          {/* Left: Main Profile Card */}
          <div
            className={`backdrop-blur-md bg-white/70 border border-blue-200 shadow-2xl ${CARD_WIDTH} rounded-3xl flex flex-col items-center p-10 relative`}
          >
            {/* Avatar */}
            <div className="-mt-24 mb-6 z-10">
              <FaUser
                className="w-40 h-40 rounded-full border-8 border-white shadow-lg   bg-gradient-to-br from-blue-100 gradient-to-br from-blue-100 to-indigo-200 p-2"
              
              />
            </div>
            {/* Name */}
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center drop-shadow-md">
              {user?.name?.toUpperCase() || user.fullName || "New User"}
            </h2>
            {/* Email */}
            <p className="text-lg text-gray-500 mb-6 text-center">
              {user.email || "user@email.com"}
            </p>
            {/* About/Description Section */}
            <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl shadow p-6 mt-2 mb-2 border border-blue-100">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2 text-center">
                About
              </h3>
              <p className="text-gray-700 text-base text-center">
                {user.about ||
                  "Passionate about technology and connectivity. Always striving to deliver the best internet experience. Loves to learn, share, and connect with others!"}
              </p>
            </div>
          </div>
          {/* Right: Personal Info & Social Media */}
          <div
            className={`backdrop-blur-md bg-white/70 border border-blue-200 shadow-2xl ${CARD_WIDTH} rounded-3xl flex flex-col justify-center p-10`}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Personal Information
            </h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-600 w-28">
                  Full Name:
                </span>
                <span className="text-gray-800">
                  {user.name || user.fullName || "New User"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-600 w-28">Email:</span>
                <span className="text-gray-800">
                  {user.email || "user@email.com"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-600 w-28">
                  Address:
                </span>
                <span className="text-gray-800">
                  {user.address || "123 Main St, City, Country"}
                </span>
                
              </div>
                <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-600 w-28">
                  Team:
                </span>
                <span className="text-gray-800">
                  {user.team || "Unknown"}
                </span>
                
              </div>
               <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-600 w-28">
                  Status:
                </span>
                <span className="text-gray-800">
  {user.disabled ? "Unactive" : "Active"}
                </span>
                
              </div>
              

              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-600 w-28">Phone:</span>
                <span className="text-gray-800">
                  {user.phone || "+1 234 567 890"}
                </span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Social Media
            </h3>
            <div className="flex justify-center gap-6 mt-2">
              <a
                href={user.facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:text-sky-800 text-3xl transition"
              >
                <FaFacebook />
              </a>
              <a
                href={user.twitter || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-600 text-3xl transition"
              >
                <FaTwitter />
              </a>
              <a
                href={user.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-700 hover:text-sky-900 text-3xl transition"
              >
                <FaLinkedin />
              </a>
              <a
                href={user.website || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 text-3xl transition"
              >
                <FaGlobe />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
