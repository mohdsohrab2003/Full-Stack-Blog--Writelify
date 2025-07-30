import React, { useEffect } from "react";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBlogsList } from "../../features/Admin/BlogList";

const ListBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.authAdmin);
  const blogState = useSelector((state) => state.adminBlogList || {});
  const { blogList = [], loading, error } = blogState;
  console.log(blogList);
  useEffect(() => {
    if (!token) {
      navigate("/admin");
    } else {
      dispatch(fetchBlogsList());
    }
  }, [token, navigate, dispatch]);

  return (
    <div className="flex-1 px-5 pt-5 min-h-screen sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1>All Blogs</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide">
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
            {Array.isArray(blogList) && blogList.length > 0
              ? blogList.map((blog, i) => (
                  <BlogTableItem
                    key={blog._id}
                    index={i + 1}
                    blog={blog}
                    fetchBlog={() => dispatch(fetchBlogsList())}
                  />
                ))
              : !loading && (
                  <tr>
                    <td className="px-4 py-2 text-center" colSpan={5}>
                      No blogs found.
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
