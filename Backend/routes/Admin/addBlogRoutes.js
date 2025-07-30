import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  getAllBlog,
  getBlogById,
  getBlogComment,
  togglePublished,
} from "../../controller/Admin/blogController.js";
import auth from "../../middelware/auth.js";
import upload from "../../middelware/multer.js";

const addBlogRoutes = express.Router();

addBlogRoutes.post("/add", upload.single("image"), auth, addBlog);
addBlogRoutes.get("/all", getAllBlog);
addBlogRoutes.get("/:blogId", getBlogById);
addBlogRoutes.delete("/delete", auth, deleteBlogById);
addBlogRoutes.post("/toggel-publish", auth, togglePublished);
addBlogRoutes.post("/add-comment", addComment);
addBlogRoutes.get("/comment/:blogId", getBlogComment);

export default addBlogRoutes;
