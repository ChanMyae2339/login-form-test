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
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validEmail(email)) {
      setError(" Invalid email format");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/users?email=${email}&password=${password}`
      );
      const data = await response.json();

      if (data.length > 0) {
        localStorage.setItem("users", JSON.stringify(data[0]));

        toast.success(" Login successful!");
        setTimeout(() => navigate("/dashboard/users"), 1500);
      } else {
        toast.error(" Username or password incorrect");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(" Server error");
    }
  };

  return (
    <div className=" flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-400 to-cyan-400">
      <form
        onSubmit={handleLogin}
        className="p-8 rounded-2xl shadow-md w-full max-w-sm  bg-white flex flex-col  "
      >
        <img
          src="https://www.agbcommunication.com/_next/static/media/AGBLogo.77b5873b.svg"
          className="mb-10 mx-auto  w-30"
          alt=""
        />

        {/* Email */}
        <div className="relative mt-9 mb-6">
          <FaUserAlt className="absolute left-2 top-3" />
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full  px-10 py-2 shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>

        {/* Password */}
        <div className="relative">
          <RiLockPasswordFill className="absolute left-2 top-3" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-10 mb-4 py-2 shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
          <button
            type="button"
            onClick={() => {
              setShowPassword(!showPassword);
              {
                showPassword
                  ? toast.info(" Password Show")
                  : toast.info(" Password Hide");
              }
            }}
            className="absolute right-6 top-6 transform -translate-y-3 text-black p-1 rounded focus:outline-none"
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>

        <input
          type="submit"
          value="Login"
          className="w-full bg-sky-500 hover:bg-sky-700 text-white font-semibold py-2 px-4 mt-6 rounded transition duration-200"
        />
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-sky-500 hover:underline ">
            Sign up
          </a>
        </p>
        <ToastContainer />
      </form>
    </div>
  );
}

export default LoginForm;
