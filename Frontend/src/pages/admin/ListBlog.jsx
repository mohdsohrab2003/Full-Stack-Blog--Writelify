import React, { useEffect, useState } from "react";
import { blog_data } from "../../assets/QuickBlog-Assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";

const ListBlog = () => {
  const [blog, setBlog] = useState([]);

  const fetchBlog = async () => {
    setBlog(blog_data);
  };
  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <div className="flex-1 px-5 pt-5 min-h-screen  sm:pt-12 sm:pl-16 bg-blue-50/50 ">
      <h1>All Blogs</h1>
      <div className=" relative max-w-4xl  overflow-x-auto shadow rounded-lg scrollbar-hide ">
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
            {/* Table body content goes here */}
            {blog.map((blog, i) => (
              <BlogTableItem
                key={blog._id}
                index={i + 1}
                blog={blog}
                fetchBlog={fetchBlog}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
