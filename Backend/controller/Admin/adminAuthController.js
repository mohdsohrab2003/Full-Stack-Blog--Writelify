import jwt from "jsonwebtoken";
import Blog from "../../model/blog.js";
import Comment from "../../model/comment.js";

export const adminAuth = (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("Error during admin authentication:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const getAdminAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, blogList: blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllComment = async (req, res) => {
  try {
    const comment = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });
    res.json({ success: true, comment });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(10);
    const blogs = await Blog.countDocuments();
    const comment = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    const dashboardData = {
      blogs,
      comment,
      drafts,
      recentBlogs, // Fixed typo
    };

    res.status(200).json({ success: true, dashboardData });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndDelete();
    res.json({ success: true, message: "Delete successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const approveComment = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndUpdate(id, { isApproved: true });
    res.json({ success: true, message: "Aproved successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
