import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosPrivate } from "../../api/axiosPrivate";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

const emailRegex = new RegExp(/^\S+@\S+$/i);
const formSchema = z.object({
  password: z.string().optional(),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .regex(emailRegex, "Invlaid email"),
  name: z.string().min(1, { message: "Name is required" }),
  team: z.string(),
  position: z.string(),
  phone: z.string(),
  disabled: z.boolean(),
});

const CreateUser = ({ data }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: data?._id || "",
      password: "",
      email: data?.email || "",
      name: data?.name || "",
      phone: data?.phone || "",
      position: data?.position || "",
      team: data?.team || "",
      disabled: data?.disabled || false,
    },
  });

  const onSubmit = async (formData) => {
    setIsLoading(true);
    if (data) {
      await axiosPrivate
        .put(`https://backend-test-gilt-eta.vercel.app/api/users`, {
          ...formData,
          _id: data?._id,
        })
        .then((response) => {
          toast.success(response.data?.message || "Successfully updated");
          navigate(-1);
        })
        .catch((error) =>
          toast.error(error?.response.data?.message || "Something went wrong")
        )
        .finally(() => setIsLoading(false));
    } else {
      await axiosPrivate
        .post(`https://backend-test-gilt-eta.vercel.app/api/users`, formData)
        .then((response) => {
          toast.success(response.data?.message || "Successfully created");
          reset();
        })
        .catch((error) =>
          toast.error(error?.response.data?.message || "Something went wrong")
        )
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white  overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0"></div>
      <div className="bg-white/90 rounded-2xl shadow-2xl max-w-md w-full mx-4 z-10">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-t-2xl p-6 flex flex-col items-center relative">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">
            {data ? "Update User" : "Create User"}
          </h2>
          <p className="text-white text-center text-sm">
            {data
              ? "Edit user details below"
              : "Fill in the details to add a new user"}
          </p>
        </div>
        <form
          className="p-8 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit, (formErrors) => {
            console.error("Validation Errors:", formErrors);
          })}
        >
          {/* Name Field */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-blue-700" />
            <input
              type="text"
              placeholder="Name"
              className="w-full pl-10 pr-3 py-2 rounded-full bg-blue-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("name")}
              required
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
          {/* Email Field */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-blue-700" />
            <input
              type="text"
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 rounded-full bg-blue-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("email")}
              required
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          {/* Password Field */}
          <div className="relative">
            <RiLockPasswordFill className="absolute left-3 top-3 text-blue-700" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 rounded-full bg-blue-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-blue-700"
            >
              {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </button>
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>
          {/* Phone Field */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-blue-700" />
            <input
              type="text"
              placeholder="Phone"
              className="w-full pl-10 pr-3 py-2 rounded-full bg-blue-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("phone")}
            />
            {errors.phone && (
              <span className="text-red-500 text-xs">
                {errors.phone.message}
              </span>
            )}
          </div>
          {/* Team Field */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-blue-700" />
            <input
              type="text"
              placeholder="Team"
              className="w-full pl-10 pr-3 py-2 rounded-full bg-blue-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("team")}
            />
            {errors.team && (
              <span className="text-red-500 text-xs">
                {errors.team.message}
              </span>
            )}
          </div>
          {/* Position Field */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-blue-700" />
            <input
              type="text"
              placeholder="Position"
              className="w-full pl-10 pr-3 py-2 rounded-full bg-blue-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("position")}
            />
            {errors.position && (
              <span className="text-red-500 text-xs">
                {errors.position.message}
              </span>
            )}
          </div>
          {/* Status Switch */}
          <div className="flex items-center gap-4 mt-2">
            <label className="font-semibold text-blue-900">Status</label>
            <Controller
              name="disabled"
              control={control}
              render={({ field }) => (
                <button
                  type="button"
                  role="switch"
                  aria-checked={field.value}
                  onClick={() => field.onChange(!field.value)}
                  className={`w-14 h-7 rounded-full flex items-center px-1 transition ${
                    field.value ? "bg-gray-300" : "bg-blue-500"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                      field.value ? "translate-x-0" : "translate-x-7"
                    }`}
                  />
                </button>
              )}
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-900 text-white font-semibold py-2 rounded-full mt-4 transition"
            disabled={isLoading}
          >
            {isLoading
              ? data
                ? "Updating..."
                : "Adding..."
              : data
              ? "Update"
              : "Add"}
          </button>
        </form>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default CreateUser;
