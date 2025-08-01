import { useState } from "react";
import { FaBars, FaHome, FaUser, FaCog } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { TbLogout } from "react-icons/tb";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [profile, setProfile] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleProfile = () => {
    setProfile(!profile);
  };

  const handleLogout = () => {
    localStorage.removeItem("users");
    navigate("/login", { replace: true });
  };

  // Create breadcrumb from URL path
  const breadcrumb = location.pathname
    .split("/")
    .filter(Boolean)
    .map((segment, i, arr) => ({
      label: segment[0].toUpperCase() + segment.slice(1),
      path: "/" + arr.slice(0, i + 1).join("/"),
    }));

  return (
    <div className="flex h-screen bg-white ">
      {/* Sidebar */}
      <div
        className={`flex flex-col justify-between items-center cursor-pointer bg-gradient-to-r from-indigo-400 to-cyan-400 text-white transition-all duration-800 
          ${isOpen ? "w-40" : "w-16"}`}
      >
        <div className="">
          <div className="flex items-center justify-between px-2 py-2 ">
            <span className={isOpen ? " " : "hidden   "}>
              <img
                className={isOpen ? "h-12 pr-3 " : "h-12    "}
                src="https://www.agbcommunication.com/_next/static/media/AGBLogo.77b5873b.svg"
                alt="Logo"
              />
            </span>
            <button
              onClick={toggleSidebar}
              className={isOpen ? " " : "mt-5 ml-2 mb-4 "}
            >
              {isOpen ? <ImCross /> : <FaBars />}
            </button>
          </div>
          <ul className="mt-4 space-y-2 ">
            <li
              className={`px-4 py-2 flex items-center gap-2 hover:bg-blue-300 ${
                location.pathname === "/dashboard/home"
                  ? "bg-blue-300 font-semibold"
                  : ""
              }`}
            >
              <FaHome />
              {isOpen && <Link to="/dashboard/home">Home</Link>}
            </li>

            <li
              className={`px-4 py-2 flex items-center gap-2 hover:bg-blue-300 ${
                location.pathname === "/dashboard/profile"
                  ? "bg-blue-300 font-semibold"
                  : ""
              }`}
            >
              <FaUser />
              {isOpen && <Link to="/dashboard/profile">New user</Link>}
            </li>

            <li
              className={`px-4 py-2 flex items-center gap-2 hover:bg-blue-300 ${
                location.pathname === "/dashboard/list"
                  ? "bg-blue-300 font-semibold"
                  : ""
              }`}
            >
              <FaUsers />
              {isOpen && <Link to="/dashboard/list">List</Link>}
            </li>

            {/* Logout Button */}
            <li
              className="px-4 py-2 flex items-center gap-2 hover:bg-blue-300 text-red-500 cursor-pointer mt-8"
              onClick={handleLogout}
            >
              <TbLogout />
              {isOpen && <span>Logout</span>}
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ">
        {/* Fixed Navbar */}
        <div className=" w-full  px-4 py-4 flex  shadow-lg  relative ">
          <div className="flex justify-between  w-full  ">
            <div className="text-lg text-gray-500 font-semibold">
              {breadcrumb.map((crumb) => (
                <span key={crumb.path}>
                  <Link className="hover:bg-blue-300 px-2 py-1 rounded">
                    {crumb.label}
                  </Link>
                  {/* {i < breadcrumb.length - 1 &&  " / "} */}
                </span>
              ))}
            </div>

            <div className="relative z-50">
              <button onClick={handleProfile} className="flex mr-3   ">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Profile"
                  className=" h-10 rounded-full border-2 border-white shadow-sm"
                />
              </button>

              {profile && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-md shadow-lg  ">
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setProfile(false)}
                  >
                    View New User 
                  </Link>

                  <div
                    onClick={handleLogout}
                    className=" w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2 cursor-pointer "
                  >
                    <p>Logout</p>
                    <span>
                      <TbLogout />
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Push content below fixed navbar */}
        <div className="flex-1    overflow-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
