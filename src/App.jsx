import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";


function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    // You can now send this data to a backend API
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form
        onSubmit={handleLogin}
        className=" p-8 rounded-2xl shadow-md w-full max-w-sm container bg-white"
      >
        <h1 className="text-2xl font-bold mb-1">AGB</h1>
        <p className="text-gray-600 mb-6">Internet Service Provider</p>

        {/* Username */}
        <div className="relative" >
          <FaUserAlt className="absolute left-2 top-9 "/>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full  my-6 px-10 py-2 shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Password with toggle */}
        <div className="relative">
          <RiLockPasswordFill className="absolute left-2 top-3 " />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-10 mb-4 px-4 py-2 shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-6 top-6 transform -translate-y-3 text-black p-1 rounded focus:outline-none "
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>

        {/* Submit */}
        <input
          type="submit"
          value="Login"
          className="w-full bg-sky-500 hover:bg-sky-700 text-white font-semibold py-2 px-4 mt-6 rounded transition duration-200"
        />

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-sky-500 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default App;
