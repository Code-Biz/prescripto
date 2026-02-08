import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [showProfileDropDown, setshowProfileDropDown] = useState(false);
  const [token, setToken] = useState(true);

  useEffect(() => {
    console.log(showProfileDropDown);
  }, [showProfileDropDown]);

  return (
    <div className="flex items-center justify-between mb-5 py-4 text-sm border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="w-44 cursor-pointer"
      />
      <ul className="hidden md:flex items-start gap-5 font-medium ">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="hidden border-none outline-none h-0.5 bg-primary w-3/5 m-auto" />
        </NavLink>

        <NavLink to="/doctors">
          <li className="py-1">All Doctors</li>
          <hr className="hidden border-none outline-none h-0.5 bg-primary w-3/5 m-auto" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1 ">About</li>
          <hr className="hidden border-none outline-none h-0.5 bg-primary w-3/5 m-auto" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact Us</li>
          <hr className="hidden border-none outline-none h-0.5 bg-primary w-3/5 m-auto" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div
            className="flex items-center gap-2 cursor-pointer group relative"
            onClick={() => setshowProfileDropDown(!showProfileDropDown)}
          >
            <img
              className="rounded-full w-10"
              src={assets.profile_pic}
              alt="profile-pic"
            />
            <img
              className="w-3"
              src={assets.dropdown_icon}
              alt="dropdown-icon"
            />

            <div
              className={`${
                showProfileDropDown ? "block" : "hidden"
              }  group-hover:block absolute top-0 right-0 bottom-0 text-base text-gray-600 z-1  mt-14 font-medium`}
            >
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => {
                    navigate("/my-profile");
                  }}
                  className="hover:text-black hover:font-bold cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black  hover:font-bold cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="hover:text-black hover:font-bold cursor-pointer"
                >
                  Log Out
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="bg-primary hover:cursor-pointer text-white px-8 py-3 font-light rounded-full hidden md:block"
          >
            Create Account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          src={assets.menu_icon}
          alt=""
          className="w-6 lg:hidden"
        />
        {/* ---------- MOBILE MENU ---------- */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } fixed lg:hidden top-0 bottom-0 right-0  bg-white  z-20 overflow-hidden transition-all duration-300`}
        >
          <div className="flex items-center justify-between mb-5 py-6 px-5 hover:scale-10">
            <img src={assets.logo} className="w-36" />
            <img
              src={assets.cross_icon}
              className="w-7"
              onClick={() => setShowMenu(false)}
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">CONTACT</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// NavLink: For simple navigation
// useNavigate: for conditional navigation e.g: after the logic of a handleSubmit eventHandler function. Bcz in such a logic based navigation NavLink can't be described
