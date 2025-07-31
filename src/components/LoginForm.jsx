import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash, FaUserAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiLockPasswordFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import setTokenInCookie from "../utils/helpers/setTokenInCookie";

const emailRegex = new RegExp(/^\S+@\S+$/i);
const formSchema = z.object({
  password: z.string().min(1, {
    message: "Password is required",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required.",
    })
    .regex(emailRegex, "Invlaid email"),
});
const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    await axios
      .post("https://backend-test-gilt-eta.vercel.app/api/users/login", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        const accessToken = res?.data?.accessToken;
        setTokenInCookie("accessToken", accessToken);
        navigate("/dashboard/users", { replace: true });
      })
      .catch((err) => {
        console.log("login error => ", err);
        toast.error(
          err?.response?.data?.message ||
            `Error with status ${err?.response?.status}`
        );
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-400 to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0"></div>
      <div className="bg-white/90 rounded-2xl shadow-2xl max-w-md w-full mx-4 z-10">
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 flex flex-col gap-4"
        >
          <h3 className="text-center text-lg font-semibold text-gray-700 mb-2">
            USER LOGIN
          </h3>
          {/* Email */}
          <div className="relative">
            <FaUserAlt className="absolute left-3 top-3 text-blue-700" />
            <input
              type="text"
              placeholder="Email"
              {...register("email")}
              className="w-full pl-10 pr-3 py-2 rounded-full bg-blue-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          {/* Password */}
          <div className="relative">
            <RiLockPasswordFill className="absolute left-3 top-3 text-blue-700" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
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
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
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
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
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
};

export default LoginForm;
