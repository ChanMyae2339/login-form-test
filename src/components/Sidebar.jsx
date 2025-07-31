
import { NavLink } from "react-router";
import { FaList, FaHome, FaUser, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { RiContactsBook3Line } from "react-icons/ri";
import { useNavigate } from "react-router";
import { axiosPrivate } from "../../api/axiosPrivate";
import Cookies from 'universal-cookie';
const Sidebar = ({ collapsed, toggleSidebar }) => {

  const cookie = new Cookies();
  const userEmail = localStorage.getItem("user");

  const menuItems = [
    {
      label: "Home",
      to: "/",
      icon: <FaHome />,
    },

    {
      label: "Contact",
      to: "/contact",
      icon: <RiContactsBook3Line />,
    },
    {
      label: "List",
      to: "/list",
      icon: <FaList />,
    },
  ];
  const navigate = useNavigate();


  //logout

  const logout = async () => {
    await axiosPrivate
      .post("https://backend-test-gilt-eta.vercel.app/api/users/logout")
      .then((res) => {
        cookie.remove("accessToken");
        navigate("/login");
      })
      .catch((err) => {
        console.log('err', err)
      });
  };
  return (
    <div
      className={` bg-blue-900 text-white  justify-between flex flex-col h-screen   transition-all duration-300 ${collapsed ? "w-16 items-center" : "w-60"
        }`}
    >
      <div className="flex flex-col">

        <div className={`flex items-center justify-between px-4 pt-4`}>
          {!collapsed && (
            <h1 className="text-xl font-bold">AGB</h1>
          )}
          <span className="ml-2.5 cursor-pointer text-white text-lg">
            {collapsed ? (
              <FaTimes onClick={toggleSidebar} />
            ) : (
              <FaBars onClick={toggleSidebar} />
            )}
          </span>
        </div>


        <nav className="space-y-4 px-4 mt-6">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 
     ${isActive
                  ? "bg-gradient-to-r from-white/20 to-white/10 text-yellow-300 font-bold shadow-inner"
                  : "text-white hover:text-yellow-200 hover:bg-white/10"}`
              }

            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex flex-col space-y-4 px-4 mt-6">
        {/* User Info */}
        <div
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
               text-white hover:text-yellow-200 hover:bg-white/10"
        >
          <FaUser />
          {!collapsed && <span>{userEmail}</span>}
        </div>

        {/* Logout Button */}
        <button
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 
               text-white hover:text-yellow-200 hover:bg-white/10"
          onClick={logout}
        >
          <FaSignOutAlt />
          {!collapsed && <span>LogOut</span>}
        </button>
      </div>


    </div>
  );
};

export default Sidebar;
