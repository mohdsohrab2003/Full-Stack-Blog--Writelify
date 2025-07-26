import React, { useState } from "react";
import { assets } from "../../assets/QuickBlog-Assets/assets";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { setWishlistSearchTerm } from "../../features/Blog/wishlist";
import { setBlogSearchTerm } from "../../features/Blog/bloglistSlice";

const SearchBar = ({ data, mode = "global" }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");
  const dispatch = useDispatch();

  const onSearchHandler = (e) => {
    e.preventDefault();
    if (input.length > 1) {
      if (mode === "wishlist") {
        dispatch(setWishlistSearchTerm(input));
      } else {
        dispatch(setBlogSearchTerm(input));
        navigate(`/blog-list?search=${input}`);
      }
    }
  };

  const clearInput = () => {
    setInput("");
    if (mode === "wishlist") {
      dispatch(setWishlistSearchTerm(""));
    } else {
      dispatch(setBlogSearchTerm(""));
    }
  };

  return (
    <form
      onSubmit={onSearchHandler}
      className="flex items-center w-full max-w-3xl mx-auto h-12 sm:h-14 border border-gray-300 bg-white rounded-md overflow-hidden"
    >
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Search for blog"
        className="flex-grow px-4 text-sm sm:text-base text-gray-700 h-full outline-none"
      />

      {input.length > 1 ? (
        <button
          type="button"
          onClick={clearInput}
          className="text-gray-400 hover:text-red-500 px-3"
        >
          <RxCross2 size={18} />
        </button>
      ) : (
        <div className="text-gray-400 px-3">
          <FaSearch size={16} />
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base px-5 sm:px-8 py-2 sm:py-3 h-full"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
