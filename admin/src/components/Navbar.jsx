import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import {DoctorContext } from "../context/DoctorContext";
const Navbar = () => {
  //taking aToken state and setAToken function from AdminContext
  const { aToken, setAToken } = useContext(AdminContext);

  const {dToken,setDToken} = useContext(DoctorContext);
  //naivgatge from useNavigate hook from react-router-dom
  const navigate = useNavigate();

  //logout function for logout from the admin page
  const logout = function () {
    //navigate to home page
    navigate("/");
    // if we have aToken then we call setAToken and set it with empty string
    aToken && setAToken("");
    //remove aToken from localStorage
    aToken && localStorage.removeItem("aToken");

    dToken && setDToken('');
    dToken && localStorage.removeItem('dToken');
  };
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-cener gap-2 text-xs">
        <img className="w-24 sm:w-24 cursor-pointer" src={assets.admin_logo} />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-600 flex items-center">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;