import React, { useEffect } from "react";
import Navbar from "../../components/users/Navbar";
import SearchBar from "../../components/users/SearchBar";
import Categories from "../../components/users/Categories";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../../components/users/BlogCard";
import Footer from "../../components/users/Footer";
import {
  setBlogSearchTerm,
  setCurrentPage,
} from "../../features/Blog/bloglistSlice";
import { RxCross1 } from "react-icons/rx";
import { selectPaginatedBlogs } from "../../features/Blog/bloglistSlice";
import PaginationComponent from "../../components/users/Pagination";
const BlogList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const input = searchParams.get("search") || "";

  const dispatch = useDispatch();

  // const blogData = useSelector((state) => state.blog.filterBlogs);
  const blogData = useSelector(selectPaginatedBlogs);
  useEffect(() => {
    if (input) {
      dispatch(setBlogSearchTerm(input));
    } else {
      dispatch(setBlogSearchTerm("")); // Clear search if no input
    }
  }, [input, dispatch]);
  return (
    <>
      <Navbar />
      <div className="relative md:px-36 px-6 pt-15 pb-8 bg-gradient-to-b from-white via-gray-50 to-white min-h-[40vh]">
        {/* Top Section */}
        <div className="flex md:flex-row flex-col justify-between items-start md:items-center max-w-[95%] mx-auto w-full gap-6">
          {/* Heading Section */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-700 tracking-tight leading-tight">
              Blog List
            </h1>
            <p className="text-gray-600 text-base font-medium">
              <span
                className="text-blue-600 hover:underline cursor-pointer transition-all duration-200"
                onClick={() => navigate("/")}
              >
                Home
              </span>{" "}
              / <span className="text-gray-500">Course List</span>
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-auto">
            <SearchBar data={input} />
          </div>
        </div>
        {input && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-500  ">
            <p>{input}</p>
            <span
              onClick={() => navigate("/blog-list")}
              className="cursor-pointer"
            >
              <RxCross1 />
            </span>
          </div>
        )}

        {/* Category */}
        <Categories />

        {/* Blog List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[74.5rem] mx-auto w-full">
          {blogData.map((blog) => (
            <BlogCard key={blog._id} Blog={blog} />
          ))}
        </div>
        <PaginationComponent />
      </div>

      <Footer />
    </>
  );
};

export default BlogList;
