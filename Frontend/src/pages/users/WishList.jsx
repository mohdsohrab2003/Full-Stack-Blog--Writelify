
import React, { useEffect } from "react";
import Navbar from "../../components/users/Navbar";
import SearchBar from "../../components/users/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../../components/users/BlogCard";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { setWishlistSearchTerm } from "../../features/Blog/wishlist";
import { fetchWishlist } from "../../features/Blog/wishlist"; // Import the thunk
import Footer from "../../components/users/Footer";

const WishList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const searchTerm = useSelector((state) => state.wishlist.searchTerm) || "";
  const loading = useSelector((state) => state.wishlist.loading);
  const error = useSelector((state) => state.wishlist.error);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Fetch on mount if logged in
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, isLoggedIn]);

  // Filtered items
  const filteredWishlist = wishlist.filter((blog) =>
    searchTerm.trim() === ""
      ? true
      : blog?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchTerm = () => {
    dispatch(setWishlistSearchTerm(""));
    navigate("/wish-list");
  };

  // UI
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="p-8 mb-12 max-w-[85%] m-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <h1 className="text-4xl md:text-4xl font-bold text-gray-800">
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
            {searchTerm && (
              <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-500">
                <p>{searchTerm}</p>
                <span onClick={handleSearchTerm} className="cursor-pointer">
                  <RxCross1 />
                </span>
              </div>
            )}
          </div>

          {/* Status messages */}
          {loading && (
            <div className="text-center py-16">
              <span className="text-gray-400">Loading wishlist...</span>
            </div>
          )}
          {!loading && error && (
            <div className="text-center py-16 text-red-600">
              <span>{error}</span>
            </div>
          )}
          {/* Grid Layout */}
          {!loading && !error && (
            <>
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
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default WishList;
