import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance"; // assumed to add Authorization header internally

const API_URL = "/api/wishlist"; // baseURL set in axiosInstance, so use relative URL here

// Fetch Wishlist Thunk
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`${API_URL}/all`);
      return res.data.wishlist;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Add to Wishlist Thunk
export const addToWishlistAsync = createAsyncThunk(
  "wishlist/addToWishlistAsync",
  async (blog, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`${API_URL}/add`, { blogId: blog._id });
      return blog;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Remove from Wishlist Thunk
export const removeFromWishlistAsync = createAsyncThunk(
  "wishlist/removeFromWishlistAsync",
  async (blog, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${API_URL}/delete`, {
        data: { blogId: blog._id },
      });
      return blog;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const initialState = {
  wishlist: [],
  searchTerm: "",
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlist: (state) => {
      state.wishlist = [];
      state.error = null;
      state.loading = false;
      state.searchTerm = "";
    },
    setWishlistSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToWishlistAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        // Avoid duplicates using a Set for performance if wishlist is large
        const exists = state.wishlist.find(
          (item) => item._id === action.payload._id
        );
        if (!exists) {
          state.wishlist.push(action.payload);
        }
      })
      .addCase(addToWishlistAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFromWishlistAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
        state.wishlist = state.wishlist.filter(
          (blog) => blog._id !== action.payload._id
        );
      })
      .addCase(removeFromWishlistAsync.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearWishlist, setWishlistSearchTerm } = wishlistSlice.actions;
export default wishlistSlice.reducer;
