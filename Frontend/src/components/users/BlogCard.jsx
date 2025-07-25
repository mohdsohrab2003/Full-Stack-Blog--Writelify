import React from "react";
import { useNavigate } from "react-router-dom";
import htmlTruncate from "html-truncate";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../features/Blog/wishlist";
import { useDispatch, useSelector } from "react-redux";
const BlogCard = ({ Blog }) => {
  const { title, description, category, image, _id } = Blog;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const isInWishlist = wishlist.some((item) => item._id === Blog._id);

  const truncatedHTML = htmlTruncate(description, 80);
  const handleWishListToggle = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      alert("Please login to add to wishlist.");
      return;
    }
    if (isInWishlist) {
      dispatch(removeFromWishlist(Blog));
    } else {
      dispatch(addToWishlist(Blog));
    }
  };
  return (
    <>
      <div
        onClick={() => navigate(`/blog-list/${Blog._id}`)}
        className="relative w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer"
      >
        {/* Heart Icon Top Right */}
        <div
          onClick={handleWishListToggle}
          className="absolute top-3 right-3 z-20 bg-white p-2 rounded-full shadow-md hover:text-red-500 transition-colors"
        >
          {/* <FaRegHeart size={18} /> */}
          {isInWishlist ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
        </div>

        <img
          src={image}
          alt="blog-img"
          className="aspect-video w-full object-cover"
        />

        <span className="ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-sm">
          {category}
        </span>

        <div className="p-5">
          <h5 className="mb-2 font-medium text-gray-900">{title}</h5>
          <p
            className="text-xs mb-3 text-gray-600"
            dangerouslySetInnerHTML={{ __html: truncatedHTML }}
          ></p>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
