import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { connectDB } from "./utils/db.js";
import adminRoutes from "./routes/Admin/adminRoutes.js";
import addBlogRoutes from "./routes/Admin/addBlogRoutes.js";

const app = express();
dotenv.config();
// Miiddleware to parse URL-encoded data
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/blog", addBlogRoutes);

// Connect to the database
await connectDB();

const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
