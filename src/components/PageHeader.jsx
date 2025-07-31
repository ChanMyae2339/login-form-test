import React from "react";
import { NavLink } from "react-router-dom";
import { IoIosPersonAdd } from "react-icons/io";

const PageHeader = () => {
  return (
    <div className=" ">
      <div>
        <NavLink to={"create-user"} className="">
          <button className=" ml-3   hover:bg-blue-300">
           Add user+
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default PageHeader;
