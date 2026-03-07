import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { aToken, setAtoken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    aToken && setAtoken("");
    aToken && localStorage.removeItem("aToken");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  };

  return (
    <div className="flex sm:flex-row flex-col items-center justify-between py-3 sm:px-10 w-full border-b bg-white ">
      <div className="flex items-center gap-2 text-sm">
        <img src={assets.admin_logo} className="w-36 sm:w-40 cursor-pointer" />
        <p className="border rounded-full px-3 py-1px border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="mt-2 w-55 sm:w-auto sm:mt-0 bg-primary text-white text-sm rounded-full py-2 px-10 "
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
