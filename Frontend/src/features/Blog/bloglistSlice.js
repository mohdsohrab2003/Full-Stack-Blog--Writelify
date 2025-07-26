import { createSlice } from "@reduxjs/toolkit";
import { blog_data } from "../../assets/QuickBlog-Assets/assets";
import { setCategory } from "./categorySlice";

const initialState = {
  blogs: blog_data,
  filterBlogs: blog_data,
  searchTerm: "", // For blog list page only
  selectedCategory: "All", // Local fallback
  currentPage: 1,
  blogsPerPage: 6,
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
    builder.addCase(setCategory, (state, action) => {
      state.selectedCategory = action.payload;
      applyFilters(state);
    });
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

export const selectPaginatedBlogs = (state) => {
  const { filterBlogs, currentPage, blogsPerPage } = state.blog;
  const start = (currentPage - 1) * blogsPerPage;
  const end = start + blogsPerPage;
  return filterBlogs.slice(start, end);
};

export const { setBlogSearchTerm, setCurrentPage } = blogSlice.actions;

export default blogSlice.reducer;
