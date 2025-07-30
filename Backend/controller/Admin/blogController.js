import fs from "fs";
import imagekit from "../../utils/imagekit.js";
import Comment from "../../model/comment.js";
import Blog from "../../model/blog.js";

export const addBlog = async (req, res) => {
  try {
    // console.log("=== DEBUG INFO ===");
    // console.log("req.body:", req.body);
    // console.log("req.file:", req.file);
    // console.log("req.body.blog:", req.body.blog);
    // console.log("==================");

    // Validate request structure
    if (!req.body.blog) {
      return res.json({ success: false, message: "Blog data is required" });
    }

    const parsedBlog = JSON.parse(req.body.blog);
    console.log("Parsed blog data:", parsedBlog);

    const { title, subTitle, description, category, isPublished } = parsedBlog;

    const imageFile = req.file;

    // Detailed validation with specific error messages
    console.log("Validation check:");
    console.log("- title:", title);
    console.log("- description:", description);
    console.log("- category:", category);
    console.log("- imageFile:", imageFile);

    if (!title || title.trim() === "") {
      return res.json({ success: false, message: "Title is required" });
    }
    if (!description || description.trim() === "") {
      return res.json({ success: false, message: "Description is required" });
    }
    if (!category || category.trim() === "") {
      return res.json({ success: false, message: "Category is required" });
    }
    if (!imageFile) {
      return res.json({ success: false, message: "Image file is required" });
    }

    // Read and upload file
    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // Clean up temporary file
    fs.unlinkSync(imageFile.path);

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    // Create blog in database
    const newBlog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl,
      isPublished: isPublished || false, // Default to false if not provided
    });

    res.json({
      success: true,
      message: "Blog added successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Blog creation error:", error);

    // Clean up temp file if it exists and there's an error
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error("Error cleaning up temp file:", cleanupError);
      }
    }

    return res.json({
      success: false,
      message: error.message || "Failed to create blog",
    });
  }
};

export const getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    // console.log(blogs);
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById({ _id: blogId });
    if (!blog) {
      return res.json({ success: false, message: "Not found blog" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const blogId = req.query.blogId;
    console.log(blogId);
    // Delete the blog
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    await Comment.deleteMany({ blog: blogId });
    res.json({ success: true, message: "Delete successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const togglePublished = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({ success: true, message: "Updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Add a new comment (pending approval)
export const addComment = async (req, res) => {
  try {
    console.log("req.body =", req.body);
    const { blogId, name, content } = req.body;

    await Comment.create({ blogId, name, content });
    res.json({ success: true, message: "Comment added for review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get approved comments for a blog
export const getBlogComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blogId, isApproved: true })
      .populate("blogId")
      .sort({ createdAt: -1 });

    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
