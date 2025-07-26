import React from "react";
import { assets } from "../../assets/QuickBlog-Assets/assets";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../../components/admin/SideBar";
const Layout = () => {
  const nagigate = useNavigate();

  return (
    <>
      {/* Navbar  */}
      <div class="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200">
        <div
          onClick={() => nagigate("/")}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
        >
          <div className="relative">
            <img
              src={assets.logo || "/placeholder.svg"}
              alt="Writelify Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#5044E5] opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300"></div>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Writelify
          </h1>
        </div>

        <button
          onclick="logout()"
          className="text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer"
        >
          Logout
        </button>
      </div>
      {/* Side bar  */}
      <div className=" flex h-[calc(100vh-70px)]">
        <div>
          <SideBar />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
