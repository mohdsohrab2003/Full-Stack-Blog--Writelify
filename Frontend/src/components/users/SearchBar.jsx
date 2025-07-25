import React, { useState } from "react";
import { assets } from "../../assets/QuickBlog-Assets/assets";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../features/Blog/wishlist";
const SearchBar = ({ data, mode = "global" }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : " ");
  const dispatch = useDispatch();
  const onSearchHandler = (e) => {
    e.preventDefault();
    if (mode === "wishlist") {
      dispatch(setSearchTerm(input));
    } else {
      navigate("/blog-list/" + input);
    }
  };
  const clearInput = () => {
    setInput(""); // Reset input field when the user clicks the clear button
    if (mode === "wishlist") dispatch(setSearchTerm(""));
  };
  return (
    <>
      <form
        onSubmit={onSearchHandler}
        className="max-w-xl w-[550px] md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded"
      >
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Search for blog"
          className="w-full pl-4  h-full outline-none text-gray-500/80"
        />

        {input.length > 1 ? (
          <div onClick={() => clearInput()} className="md:w-auto w-10 px-3">
            <RxCross2 />
          </div>
        ) : (
          <div className="md:w-auto w-10 px-3">
            <FaSearch />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1"
        >
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBar;
