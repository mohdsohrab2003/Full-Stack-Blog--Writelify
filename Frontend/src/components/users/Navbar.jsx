"use client";

import { useState, useEffect, useRef } from "react";
import { assets } from "../../assets/QuickBlog-Assets/assets";
import {
  FaRegHeart,
  FaBars,
  FaTimes,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../features/Auth/userAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const wishlistCount = useSelector((state) => state.wishlist.wishlist.length);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProfileOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100"
            : "bg-white/80 backdrop-blur-md mt-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo Section */}
            <div
              onClick={() => handleNavigation("/")}
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

            {/* Desktop User Actions */}
            {isLoggedIn ? (
              <div className="hidden md:flex items-center space-x-4">
                {/* Wishlist Button */}
                <button
                  onClick={() => handleNavigation("/wish-list")}
                  className="relative p-3 text-gray-700 hover:text-[#5044E5] hover:bg-gray-50 rounded-full transition-all duration-300 group"
                  aria-label="Wishlist"
                >
                  <FaRegHeart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold animate-pulse">
                      {wishlistCount > 99 ? "99+" : wishlistCount}
                    </span>
                  )}
                </button>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={toggleProfileMenu}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-50 transition-all duration-300 group"
                  >
                    <div className="relative">
                      <img
                        src={assets.logo || "/placeholder.svg"}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border-2 border-[#5044E5] transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700 font-medium hidden xl:block">
                      John Doe
                    </span>
                    <FaChevronDown
                      className={`w-3 h-3 text-gray-500 transition-transform duration-300 ${
                        isProfileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          John Doe
                        </p>
                        <p className="text-sm text-gray-500">
                          john.doe@example.com
                        </p>
                      </div>
                      <button
                        onClick={() => handleNavigation("/profile")}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <FaUser className="w-4 h-4 mr-3" />
                        Profile
                      </button>
                      <button
                        onClick={() => handleNavigation("/settings")}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <FaCog className="w-4 h-4 mr-3" />
                        Settings
                      </button>
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <FaSignOutAlt className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-2 bg-gradient-to-r from-[#5044E5] to-[#4035c5] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#5044E5]/30 transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-6 py-2 bg-gradient-to-r from-[#5044E5] to-[#4035c5] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#5044E5]/30 transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Wishlist (when logged in) */}
              {isLoggedIn && (
                <button
                  onClick={() => handleNavigation("/wish-list")}
                  className="relative p-2 text-gray-700 hover:text-[#5044E5] rounded-full transition-all duration-300"
                  aria-label="Wishlist"
                >
                  <FaRegHeart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                      {wishlistCount > 9 ? "9+" : wishlistCount}
                    </span>
                  )}
                </button>
              )}

              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-700 hover:text-[#5044E5] hover:bg-gray-50 rounded-full transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 animate-in slide-in-from-top-2 duration-200"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Navigation Links */}

              <hr className="border-gray-200" />

              {/* User Actions */}
              {isLoggedIn ? (
                <div className="space-y-3">
                  <div className="flex items-center px-4 py-3 bg-gray-50 rounded-lg">
                    <img
                      src={assets.logo || "/placeholder.svg"}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#5044E5]"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        John Doe
                      </p>
                      <p className="text-xs text-gray-500">
                        john.doe@example.com
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleNavigation("/profile")}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-300"
                  >
                    <FaUser className="inline w-4 h-4 mr-3" />
                    Profile
                  </button>
                  <button
                    onClick={() => handleNavigation("/settings")}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-300"
                  >
                    <FaCog className="inline w-4 h-4 mr-3" />
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                  >
                    <FaSignOutAlt className="inline w-4 h-4 mr-3" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full py-3 px-4 bg-gradient-to-r from-[#5044E5] to-[#4035c5] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="w-full py-3 px-4 bg-gradient-to-r from-[#5044E5] to-[#4035c5] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div
        className={`${
          isScrolled ? "h-16 sm:h-20" : "h-20 sm:h-24"
        } transition-all duration-300`}
      ></div>
    </>
  );
};

export default Navbar;
