import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/QuickBlog-Assets/assets";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/Auth/userAuth";
import { useState } from "react";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const handlelogin = () => {
    if (!isLoggedIn) {
      dispatch(login());
      navigate("/");
    }
  };
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 backdrop-blur-sm">
            {/* Logo and Brand */}
            <Link
              to="/"
              className="flex items-center justify-center mb-8 text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200"
            >
              <img
                className="w-10 h-10 mr-3 rounded-lg shadow-sm"
                src={assets.logo || "/placeholder.svg"}
                alt="Writelify logo"
              />
              Writelify
            </Link>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back
              </h1>
              <p className="text-gray-600">
                Sign in to your account to continue
              </p>
            </div>

            {/* Login Form */}
            <form className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 placeholder-gray-400"
                  // required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 placeholder-gray-400"
                  // required
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={handlelogin}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 shadow-lg hover:shadow-xl"
              >
                Sign in
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017z" />
                  </svg>
                  GitHub
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600 mt-8">
              {"Don't have an account? "}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-200"
              >
                Create account
              </Link>
            </p>
          </div>

          {/* Additional Info */}
          <p className="text-center text-xs text-gray-500 mt-6">
            By signing in, you agree to our{" "}
            <Link to="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;

// import React from "react";
// import { Link } from "react-router-dom";
// import { assets } from "../../assets/QuickBlog-Assets/assets";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// const Login = () => {
//   return (
//     <>
//       <Navbar />
//       <section className="bg-gray-50  relative flex items-center justify-center px-4">
//         <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 absolute top-25">
//           <Link
//             to="/"
//             className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-800"
//           >
//             <img className="w-8 h-8 mr-2" src={assets.logo} alt="logo" />
//             Writelify
//           </Link>

//           <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
//             Login an account
//           </h1>

//           <form className="space-y-5">
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block mb-1 text-sm font-medium text-gray-700"
//               >
//                 Your email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="name@company.com"
//                 className="w-full px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block mb-1 text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="••••••••"
//                 className="w-full px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
//             >
//               Login
//             </button>

//             <p className="text-center text-sm text-gray-600">
//               Create a new account?{" "}
//               <Link to="/signup" className="text-blue-600 hover:underline">
//                 Signup
//               </Link>
//             </p>
//           </form>
//         </div>
//         <Footer />
//       </section>
//     </>
//   );
// };

// export default Login;
