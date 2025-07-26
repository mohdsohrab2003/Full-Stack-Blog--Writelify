import React from "react";
import Navbar from "../../components/users/Navbar";
import SearchBar from "../../components/users/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../../components/users/BlogCard";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { setWishlistSearchTerm } from "../../features/Blog/wishlist";
import Footer from "../../components/users/Footer";
const WishList = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const searchTerm = useSelector((state) => state.wishlist.searchTerm) || "";
  console.log(wishlist);
  const filteredWishlist = wishlist.filter((blog) =>
    searchTerm.trim() === ""
      ? true
      : blog?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSearchTerm = () => {
    dispatch(setWishlistSearchTerm(""));
    navigate("/wish-list");
  };
  // console.log(filteredWishlist);
  return (
    <>
      <Navbar />
      <div className="min-h-screen  ">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className=" p-8 mb-12  max-w-[85%] m-auto ">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center  gap-6">
              <div>
                <h1 className="text-4xl md:text-4xl font-blod text-gray-800">
                  Your Wishlist
                </h1>
                <p className="text-gray-500">
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    Home
                  </span>
                  / <span>Your Wishlist</span>
                </p>
              </div>
              <div className="w-full sm:w-auto">
                <SearchBar mode="wishlist" />
              </div>
            </div>
            {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl md:text-4xl font-blod text-gray-800">
                  Your Wishlist
                </h1>
                <span className="bg-indigo-100 text-indigo-700 font-medium px-3 py-1 rounded-full text-sm">
                  {filteredWishlist.length} items
                </span>
              </div>
              <div className="w-full sm:w-auto">
                <SearchBar mode="wishlist" />
              </div>
            </div> */}
            {searchTerm && (
              <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-500  ">
                <p>{searchTerm}</p>
                <span onClick={handleSearchTerm} className="cursor-pointer">
                  <RxCross1 />
                </span>
              </div>
            )}
          </div>

          {/* Grid Layout */}
          {filteredWishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-[80%] m-auto">
              {filteredWishlist.map((blog) => (
                <div
                  key={blog._id}
                  className="transform hover:-translate-y-1 hover:shadow-lg transition duration-300"
                >
                  <BlogCard Blog={blog} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 ">
              <p className="text-gray-500 text-lg">
                No items in your wishlist yet.
              </p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default WishList;

// bg-white rounded-2xl shadow-md
// border-gray-100
