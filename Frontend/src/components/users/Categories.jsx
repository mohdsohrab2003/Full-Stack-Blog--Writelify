import React, { use, useState } from "react";
import { motion } from "framer-motion";
import { blogCategories } from "../../assets/QuickBlog-Assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../features/Blog/categorySlice";
const Categories = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.category);
  return (
    <>
      <div className="flex justify-center gap-4 sm:gap-8 my-10">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => dispatch(setCategory(item))}
              className={`relative z-10 px-4 py-1 rounded-full font-medium transition-all duration-300 ${
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
                  className="absolute inset-0 -z-1 bg-indigo-500 rounded-full"
                />
              )}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
