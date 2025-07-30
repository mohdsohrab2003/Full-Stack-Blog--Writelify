import express from "express";
import {
  addWishlist,
  getWishlist,
  removeWishlist,
} from "../../controller/user/wishlistController.js";
import userAuth from "../../middelware/userAuth.js";

const wishlistRoutes = express.Router();
// ✅ Protect all routes
wishlistRoutes.get("/all", userAuth, getWishlist);
wishlistRoutes.post("/add", userAuth, addWishlist);
wishlistRoutes.delete("/delete", userAuth, removeWishlist);

export default wishlistRoutes;
