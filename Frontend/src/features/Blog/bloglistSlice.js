import { createSlice } from "@reduxjs/toolkit";
import { blog_data } from "../../assets/QuickBlog-Assets/assets";
import { setCategory } from "./categorySlice";

const initialState = {
  blogs: blog_data,
  filterBlogs: blog_data,
  searchTerm: "", // For blog list page only
  selectedCategory: "All", // Local fallback
};
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      applyFilters(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setCategory, (state, action) => {
      state.selectedCategory = action.payload;
      applyFilters(state);
    });
    // extraReducers: (builder) => {
    //   builder.addCase(setCategory, (state, action) => {
    //     const selected = action.payload;
    //     state.filterBlogs =
    //       selected === "All"
    //         ? state.blogs
    //         : state.blogs.filter((blog) => blog.category === selected);
    //   });
  },
});

// 🧠 Shared filtering logic (search + category)
function applyFilters(state) {
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

export const { setBlogSearchTerm } = blogSlice.actions;

export default blogSlice.reducer;
