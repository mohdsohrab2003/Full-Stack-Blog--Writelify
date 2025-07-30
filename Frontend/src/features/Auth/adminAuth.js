// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/admin/login", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("adminToken", token);
      return token;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialToken = localStorage.getItem("adminToken");

const authSlice = createSlice({
  name: "authAdmin",
  initialState: {
    token: initialToken,
    isAuthenticated: !!initialToken,
    loading: false,
    error: null,
  },
  reducers: {
    logoutAdmin: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("adminToken");
    },
    checkAuth: (state) => {
      const token = localStorage.getItem("adminToken");
      state.token = token;
      state.isAuthenticated = !!token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutAdmin, checkAuth } = authSlice.actions;
export default authSlice.reducer;
