import express from "express";
import {
  adminAuth,
  approveComment,
  deleteCommentById,
  getAdminAllBlog,
  getAllComment,
  getDashboard,
} from "../../controller/Admin/adminAuthController.js";
import auth from "../../middelware/auth.js";
const adminRoutes = express.Router();

// Admin authentication route
adminRoutes.post("/login", adminAuth);
adminRoutes.get("/blogs", auth, getAdminAllBlog);
adminRoutes.get("/comments", auth, getAllComment);
adminRoutes.post("/delete-comments", auth, deleteCommentById);
adminRoutes.post("/approve-comments", auth, approveComment);
adminRoutes.get("/dashboard", auth, getDashboard);

export default adminRoutes;
