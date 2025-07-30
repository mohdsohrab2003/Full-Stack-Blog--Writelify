// import React, { useEffect, useState } from "react";
// import { assets, dashboard_data } from "../../assets/QuickBlog-Assets/assets";
// import BlogTableItem from "../../components/admin/BlogTableItem";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDashboardData } from "../../features/Admin/dashboard";

// const DashBoard = () => {
//   const dispatch = useDispatch();
//   const { blogs, comments, drafts, recentBlogs, loading } = useSelector(
//     (state) => state.dashboard
//   );
//   useEffect(() => {
//     dispatch(fetchDashboardData());
//   }, [dispatch]);
//   return (
//     <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
//       {/* Blog */}
//       <div className="flex flex-wrap gap-4">
//         <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
//           <img src={assets.dashboard_icon_1} alt="" />
//           <div>
//             <p className="text-xl font-semibold text-gray-600">{blogs}</p>
//             <p className="text-gray-400 font-light">Blogs</p>
//           </div>
//         </div>
//         {/* comment */}
//         <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
//           <img src={assets.dashboard_icon_2} alt="" />
//           <div>
//             <p className="text-xl font-semibold text-gray-600">{comments}</p>
//             <p className="text-gray-400 font-light">Comments</p>
//           </div>
//         </div>
//         {/* Draft */}
//         <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
//           <img src={assets.dashboard_icon_3} alt="" />
//           <div>
//             <p className="text-xl font-semibold text-gray-600">{drafts}</p>
//             <p className="text-gray-400 font-light">Drafts</p>
//           </div>
//         </div>
//       </div>
//       {/* receen blog */}
//       <div>
//         <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
//           <img src={assets.dashboard_icon_4} alt="" />
//           <p>Latest Blogs</p>
//         </div>

//         <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
//           <table className="w-full text-sm text-gray-500">
//             <thead className="text-xs text-gray-600 text-left uppercase">
//               <tr>
//                 <th scope="col" className="px-2 py-4 xl:px-6">
//                   #
//                 </th>
//                 <th scope="col" className="px-2 py-4">
//                   Blog Title
//                 </th>
//                 <th scope="col" className="px-2 py-4 max-sm:hidden">
//                   Date
//                 </th>
//                 <th scope="col" className="px-2 py-4 max-sm:hidden">
//                   Status
//                 </th>
//                 <th scope="col" className="px-2 py-4">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* Table body content goes here */}
//               {Array.isArray(recentBlogs) &&
//                 recentBlogs.map((blog, i) => (
//                   <BlogTableItem
//                     key={blog._id}
//                     index={i + 1}
//                     blog={blog}
//                     fetchBlog={fetchBlog}
//                   />
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashBoard;

import React, { useEffect } from "react";
import { assets } from "../../assets/QuickBlog-Assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useDispatch, useSelector } from "react-redux";
// Fix: Update import path to match your actual slice location

import { useNavigate } from "react-router-dom";
import { clearError, fetchDashboardData } from "../../features/Admin/dashboard";

const DashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, comments, drafts, recentBlogs, loading, error } = useSelector(
    (state) => state.dashboard
  );
  const { token } = useSelector((state) => state.authAdmin);

  useEffect(() => {
    // Check if user is authenticated
    if (!token) {
      console.log("No token found, redirecting to admin login");
      navigate("/admin");
      return;
    }

    console.log("Dispatching fetchDashboardData");
    dispatch(fetchDashboardData());

    return () => {
      dispatch(clearError());
    };
  }, [dispatch, token, navigate]);

  // Handle authentication errors
  useEffect(() => {
    if (
      error &&
      (error.includes("Invalid Token") ||
        error.includes("Authentication failed"))
    ) {
      console.log(
        "Authentication error detected, clearing token and redirecting"
      );
      // Clear token and redirect to login
      localStorage.removeItem("token");
      navigate("/admin");
    }
  }, [error, navigate]);

  const handleRefreshBlogs = () => {
    if (!token) {
      navigate("/admin");
      return;
    }
    console.log("Refreshing dashboard data");
    dispatch(fetchDashboardData());
  };

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-10 bg-blue-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <div className="mt-2 space-x-2">
            <button
              onClick={handleRefreshBlogs}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Retry
            </button>
            {error.includes("Invalid Token") ||
            error.includes("Authentication failed") ? (
              <button
                onClick={() => navigate("/admin")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Login Again
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={handleRefreshBlogs}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img
            src={assets.dashboard_icon_1 || "/placeholder.svg"}
            alt="Blogs icon"
          />
          <div>
            <p className="text-xl font-semibold text-gray-600">{blogs}</p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img
            src={assets.dashboard_icon_2 || "/placeholder.svg"}
            alt="Comments icon"
          />
          <div>
            <p className="text-xl font-semibold text-gray-600">{comments}</p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img
            src={assets.dashboard_icon_3 || "/placeholder.svg"}
            alt="Drafts icon"
          />
          <div>
            <p className="text-xl font-semibold text-gray-600">{drafts}</p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      {/* Recent Blogs Section */}
      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <img
            src={assets.dashboard_icon_4 || "/placeholder.svg"}
            alt="Latest blogs icon"
          />
          <p>
            Latest Blogs ({Array.isArray(recentBlogs) ? recentBlogs.length : 0})
          </p>
        </div>

        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6">
                  #
                </th>
                <th scope="col" className="px-2 py-4">
                  Blog Title
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  Date
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  Status
                </th>
                <th scope="col" className="px-2 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(recentBlogs) && recentBlogs.length > 0 ? (
                recentBlogs.map((blog, i) => (
                  <BlogTableItem
                    key={blog._id || i}
                    index={i + 1}
                    blog={blog}
                    onRefresh={handleRefreshBlogs}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    {loading ? "Loading blogs..." : "No recent blogs found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
