import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ 1. DELETE BLOG THUNK (must be above createSlice)
export const deleteBlog = createAsyncThunk(
  "admin/deleteBlog",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().authAdmin.token;
      const response = await axios.delete(
        `http://localhost:3000/api/blog/delete?blogId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        return id;
      } else {
        return rejectWithValue(
          response.data.message || "Failed to delete blog"
        );
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ 2. FETCH BLOGS THUNK
export const fetchBlogsList = createAsyncThunk(
  "admin/bloglist",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().authAdmin.token;

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await axios.get(
        "http://localhost:3000/api/admin/blogs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        return response.data.blogList; // ✅ Fix here
      } else {
        return rejectWithValue(
          response.data.message || "Failed to fetch blogs"
        );
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ 3. ADMIN BLOG SLICE
const adminBlogList = createSlice({
  name: "adminBlogList",
  initialState: {
    blogList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogsList.fulfilled, (state, action) => {
        state.loading = false;
        state.blogList = action.payload;
      })
      .addCase(fetchBlogsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogList = state.blogList.filter(
          (blog) => blog._id !== action.payload
        );
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete blog";
      });
  },
});

export default adminBlogList.reducer;
