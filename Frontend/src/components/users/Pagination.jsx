// components/users/PaginationComponent.jsx
import React from "react";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../features/Blog/bloglistSlice";

const PaginationComponent = () => {
  const dispatch = useDispatch();
  const { filterBlogs, blogsPerPage, currentPage } = useSelector(
    (state) => state.blog
  );
  const totalPages = Math.ceil(filterBlogs.length / blogsPerPage);

  const handleChange = (_, value) => {
    dispatch(setCurrentPage(value));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-10">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
      />
    </div>
  );
};

export default PaginationComponent;
