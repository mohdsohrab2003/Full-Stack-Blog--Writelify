import React, { useState } from "react";
import { assets } from "../../assets/QuickBlog-Assets/assets";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../features/Auth/userAuth";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const wishlistCount = useSelector((state) => state.wishlist.wishlist.length);
  const navigate = useNavigate();
  console.log("isLoggedIn?", isLoggedIn);

  return (
    <>
      <nav className="max-w-full m-auto sticky top-0 z-50 bg-white/80 backdrop-blur-md mt-5">
        <div className="py-4 px-4 flex justify-between items-center max-w-[90%] m-auto">
          {/* Logo section */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <img
              src={assets.logo}
              alt="Logo"
              className="w-[40px] md:w-[50px]"
            />
            <h1 className="text-2xl md:text-3xl font-bold">Writelyfy</h1>
          </div>

          {/* Desktop Menu */}
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-5">
              <button
                onClick={() => navigate("/wish-list")}
                className="relative p-3 text-xl text-gray-700 hover:text-[#5044E5] transition-all duration-300"
              >
                <FaRegHeart />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <div className="relative group">
                <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-all duration-300">
                  <img
                    src={assets.logo}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#5044E5]"
                  />
                  <span className="text-gray-700 font-medium">John Doe</span>
                </button>
              </div>

              <button
                className="py-2 px-6 bg-[#5044E5] rounded-full text-[16px] text-white font-semibold hover:bg-[#4035c5] transition-all duration-300 ease-in-out shadow-lg hover:shadow-[#5044E5]/50 transform hover:-translate-y-0.5"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <button
                className="py-2 px-6 text-[#5044E5] rounded-full text-[16px] font-semibold hover:bg-[#5044E5]/10 transition-all duration-300"
                onClick={() => dispatch(login())}
              >
                Login
              </button>
              <button className="py-2 px-6 bg-[#5044E5] rounded-full text-[16px] text-white font-semibold hover:bg-[#4035c5] transition-all duration-300 ease-in-out shadow-lg hover:shadow-[#5044E5]/50 transform hover:-translate-y-0.5">
                Signup
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden px-4 py-4 space-y-3 border-t">
            <button className="w-full py-2 px-6 text-[#5044E5] rounded-full text-[16px] font-semibold hover:bg-[#5044E5]/10 transition-all duration-300">
              Login
            </button>
            <button className="w-full py-2 px-6 bg-[#5044E5] rounded-full text-[16px] text-white font-semibold hover:bg-[#4035c5] transition-all duration-300 ease-in-out shadow-lg">
              Signup
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
