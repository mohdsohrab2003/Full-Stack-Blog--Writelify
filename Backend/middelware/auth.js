import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Optional: store decoded payload
    next();
  } catch (error) {
    return res.json({ success: false, message: "Invalid Token" });
  }
};

export default auth;
