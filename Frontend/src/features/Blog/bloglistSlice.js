import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { blog_data } from "../../assets/QuickBlog-Assets/assets";
import { setCategory } from "./categorySlice";
import axiosInstance from "../../utils/axiosInstance";
// import axios from "axios";

export const fetchBlogs = createAsyncThunk(
  "blog/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/api/blog/all");
      return res.data.blogs;
    } catch (error) {
      // You get full control here
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message); // Return the message cleanly
    }
  }
);

const initialState = {
  blogs: [],
  filterBlogs: [],
  searchTerm: "", // For blog list page only
  selectedCategory: "All", // Local fallback
  currentPage: 1,
  blogsPerPage: 6,
  loading: false,
  error: null,
};
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      applyFilters(state);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
        applyFilters(state);
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(setCategory, (state, action) => {
        state.selectedCategory = action.payload;
        applyFilters(state);
      });
  },
});

// 🧠 Shared filtering logic (search + category)
function applyFilters(state) {
  if (!Array.isArray(state.blogs)) {
    console.error("🚨 blogs is not an array:", state.blogs);
    state.filterBlogs = [];
    return;
  }

  state.filterBlogs = state.blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(state.searchTerm.toLowerCase());
    const matchesCategory =
      state.selectedCategory === "All" ||
      blog.category === state.selectedCategory;

    return matchesSearch && matchesCategory;
  });
}

export const selectPaginatedBlogs = (state) => {
  const { filterBlogs, currentPage, blogsPerPage } = state.blog;
  const start = (currentPage - 1) * blogsPerPage;
  const end = start + blogsPerPage;
  return filterBlogs.slice(start, end);
};

export const { setBlogSearchTerm, setCurrentPage } = blogSlice.actions;

export default blogSlice.reducer;
