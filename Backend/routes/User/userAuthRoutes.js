import express from "express";
import { login, register } from "../../controller/user/userAuthController.js"; // ← fix here

const userAuthRoutes = express.Router();

userAuthRoutes.post("/signup", register);
userAuthRoutes.post("/login", login);

export default userAuthRoutes;
