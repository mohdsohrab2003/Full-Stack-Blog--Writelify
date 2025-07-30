import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addBlog = createAsyncThunk(
  "adminBlog/addBlog",
  async ({ blogData, token }, { rejectWithValue }) => {
    try {
      console.log("=== REDUX DEBUG ===");
      console.log("Original blogData:", blogData);
      console.log("blogData.title:", blogData.title);
      console.log("typeof blogData.title:", typeof blogData.title);
      console.log("blogData.title length:", blogData.title?.length);
      console.log("==================");

      const formData = new FormData();

      // Debug the JSON being created
      const blogJson = {
        title: blogData.title,
        subTitle: blogData.subTitle,
        description: blogData.description,
        category: blogData.category,
        isPublished: blogData.isPublished,
      };

      console.log("Blog JSON being sent:", blogJson);
      console.log("Blog JSON stringified:", JSON.stringify(blogJson));

      // 👇 append the entire blog as a JSON string
      formData.append("blog", JSON.stringify(blogJson));

      // 👇 append image separately
      formData.append("image", blogData.image); // must be File object

      // Debug FormData
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
        if (key === "blog") {
          console.log("Parsed blog:", JSON.parse(value));
        }
      }

      const res = await axios.post(
        "http://localhost:3000/api/blog/add",
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
