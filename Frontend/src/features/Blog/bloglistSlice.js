import { createSlice } from "@reduxjs/toolkit";
import { blog_data } from "../../assets/QuickBlog-Assets/assets";
import { setCategory } from "./categorySlice";

const initialState = {
  blogs: blog_data,
  filterBlogs: blog_data,
};
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setCategory, (state, action) => {
      const selected = action.payload;
      state.filterBlogs =
        selected === "All"
          ? state.blogs
          : state.blogs.filter((blog) => blog.category === selected);
    });
  },
});

export default blogSlice.reducer;
