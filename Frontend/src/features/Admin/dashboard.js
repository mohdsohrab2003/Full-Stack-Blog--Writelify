import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

// Async thunk to fetch dashboard data
export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.authAdmin.token;

      // Check if token exists
      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await axiosInstance.get("/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", response.data);

      // Check if the response is successful
      if (response.data.success) {
        console.log("Dashboard Data:", response.data.dashboardData);
        return response.data.dashboardData;
      } else {
        // If success is false, reject with the error message
        return rejectWithValue(
          response.data.message || "Failed to fetch dashboard data"
        );
      }
    } catch (error) {
      console.error("Dashboard API Error:", error);
      // Handle different types of errors
      if (error.response?.status === 401) {
        return rejectWithValue("Authentication failed. Please login again.");
      }
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetDashboard: (state) => {
      state.blogs = 0;
      state.comments = 0;
      state.drafts = 0;
      state.recentBlogs = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Payload received:", action.payload);

        // Safely access payload properties with fallbacks
        if (action.payload) {
          state.blogs = action.payload.blogs || 0;
          // Fix: Check for both 'comment' and 'comments' properties
          state.comments =
            action.payload.comments || action.payload.comment || 0;
          state.drafts = action.payload.drafts || 0;
          // Fix: Check for both 'recentBlogs' and 'recentBLogs' (with capital L)
          state.recentBlogs =
            action.payload.recentBlogs || action.payload.recentBLogs || [];
        }

        console.log("State updated:", {
          blogs: state.blogs,
          comments: state.comments,
          drafts: state.drafts,
          recentBlogs: state.recentBlogs,
        });
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
        console.error("Dashboard fetch rejected:", action.payload);
        // Reset data on error
        state.blogs = 0;
        state.comments = 0;
        state.drafts = 0;
        state.recentBlogs = [];
      });
  },
});

export const { clearError, resetDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
