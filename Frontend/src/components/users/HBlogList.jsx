import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BlogCard from "./BlogCard";
import { FaArrowRightLong } from "react-icons/fa6";
import { fetchBlogs } from "../../features/Blog/bloglistSlice";

const HBlogList = () => {
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blog.filterBlogs);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const topBlog = blogs.slice(0, 8);
  const dispatch = useDispatch();
  const handelViewAll = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate(`/blog-list`);
    }
  };
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col items-center py-10 px-4">
        <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40 ">
          {topBlog.map((blog) => (
            <BlogCard key={blog._id} Blog={blog} />
          ))}
        </div>
        <div>
          <button
            onClick={handelViewAll}
            className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all duration-300"
          >
            <span>View All</span>
            <FaArrowRightLong className="mt-[2px]" />
          </button>
        </div>
      </div>
    </>
  );
};

export default HBlogList;
