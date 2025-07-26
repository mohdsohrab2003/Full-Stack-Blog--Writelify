// src/features/wishlist/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
  searchTerm: "",
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const exists = state.wishlist.find((blog) => blog._id === item._id);
      if (!exists) {
        state.wishlist.push(item);
      }
    },
    removeFromWishlist: (state, action) => {
      const Blog = action.payload;
      state.wishlist = state.wishlist.filter((blog) => blog._id !== Blog._id);
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
    setWishlistSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  setWishlistSearchTerm,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
