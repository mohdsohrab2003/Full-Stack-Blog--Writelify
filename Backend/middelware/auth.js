import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("Full auth header:", authHeader);

  if (!authHeader) {
    return res.json({ success: false, message: "No token provided" });
  }

  // Extract token from "Bearer <token>" format
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7) // Remove "Bearer " prefix
    : authHeader; // In case it's sent without "Bearer " prefix

  // console.log("Extracted token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.json({ success: false, message: "Invalid Token" });
  }
};

export default auth;
