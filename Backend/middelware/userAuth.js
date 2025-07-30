// middleware/userAuth.js

import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "yoursecretkey"
    );

    // Attach user info to request
    req.user = decoded;

    next(); // Continue to next middleware/controller
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default userAuth;
