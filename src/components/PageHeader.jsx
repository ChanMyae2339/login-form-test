import React from "react";
import { NavLink } from "react-router-dom";
import { IoIosPersonAdd } from "react-icons/io";

const PageHeader = () => {
  return (
    <div className=" ">
      <div>
        <NavLink to={"create-user"} className="">
          <button className=" ml-3   hover:bg-gray-300 rounded p-2 text-green-500 font-semibold text-xl  ">
           Add user+
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default PageHeader;
