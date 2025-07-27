// src/redux/slices/blogAdminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addBlog = createAsyncThunk(
  "adminBlog/addBlog",
  async ({ blogData, token }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // 👇 append the entire blog as a JSON string
      formData.append(
        "blog",
        JSON.stringify({
          title: blogData.title,
          subTitle: blogData.subTitle,
          description: blogData.description,
          category: blogData.category,
          isPublished: blogData.isPublished,
        })
      );

      // 👇 append image separately
      formData.append("image", blogData.image); // must be File object

      const res = await axios.post(
        "http://localhost:3000/api/admin/add-blog",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) return res.data;
      else return rejectWithValue(res.data.message || "Failed to add blog");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const blogAdminSlice = createSlice({
  name: "adminBlog",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetAddBlogState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBlog.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addBlog.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetAddBlogState } = blogAdminSlice.actions;
export default blogAdminSlice.reducer;
