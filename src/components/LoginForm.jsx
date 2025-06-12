import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash, FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const validEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validEmail(email)) {
      toast.error(" Invalid email format");
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:5000/users?email=${email}&password=${password}&role=${role}`
      );
      const data = await response.json();

      if (data.length > 0) {
        localStorage.setItem("users", JSON.stringify(data[0]));
        toast.success(" Login successful!");
        setTimeout(() => navigate("/dashboard/users"), 1500);
      } else {
        toast.error(" Useremail or password incorrect");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(" Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-400 to-blue-900 relative overflow-hidden">
      {/* Stars background (optional, for effect) */}
      <div className="absolute inset-0 pointer-events-none z-0"></div>
      <div className="bg-white/90 rounded-2xl shadow-2xl max-w-md w-full mx-4 z-10">
        {/* Scenic Illustration */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-t-2xl p-6 flex flex-col items-center relative">
          <img
            src="https://www.agbcommunication.com/_next/static/media/AGBLogo.77b5873b.svg"
            alt="Scenic"
            className="rounded-t-2xl mb-4"
          />
          <h2 className="text-2xl font-bold text-white mb-2 text-center">
            Welcome to the website
          </h2>
          <p className="text-white text-center text-sm">
            This is the login form testing page
          </p>
        </div>
        {/* Login Form */}
        <form onSubmit={handleLogin} className="p-8 flex flex-col gap-4">
          <h3 className="text-center text-lg font-semibold text-gray-700 mb-2">
            USER LOGIN
          </h3>
          {/* Username */}
          <div className="relative">
            <FaUserAlt className="absolute left-3 top-3 text-blue-700" />
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-full bg-blue-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          {/* Password */}
          <div className="relative">
            <RiLockPasswordFill className="absolute left-3 top-3 text-blue-700" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 rounded-full bg-blue-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-blue-700"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
        
          {/* Remember & Forgot Password */}
          <div className="flex justify-between items-center text-sm text-blue-900 mt-2">
            <label className="flex items-center gap-1">
              <input type="checkbox" className="accent-blue-500" />
              Remember
            </label>
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-900 text-white font-semibold py-2 rounded-full mt-4 transition"
          >
            Login
          </button>
          <ToastContainer />
        </form>
        <div className="text-center text-xs text-gray-500 py-2">
          designed by{" "}
          <a
            href="https://www.freepik.com"
            className="text-blue-700 hover:underline"
          >
            agbcommunication
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
