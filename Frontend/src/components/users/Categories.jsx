import React, { use, useState } from "react";
import { motion } from "framer-motion";
import { blogCategories } from "../../assets/QuickBlog-Assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../features/Blog/categorySlice";

const Categories = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.category);

  return (
    <div className="max-w-full overflow-x-auto scrollbar-hide px-4 sm:px-0">
      <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-3 sm:gap-4 md:gap-6 my-6 sm:my-10 min-w-max sm:min-w-0">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => dispatch(setCategory(item))}
              className={`relative z-10 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                category === item
                  ? "text-white"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              <span className="relative z-20">{item}</span>
              {category === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute inset-0 -z-1 bg-indigo-500 rounded-full shadow-md"
                />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
