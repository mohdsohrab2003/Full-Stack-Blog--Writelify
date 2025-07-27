import fs from "fs";
import imagekit from "../../utils/imagekit.js";
import Comment from "../../model/comment.js";
import Blog from "../../model/blog.js";

// export const addBlog = async (req, res) => {
//   try {
//     console.log("Incoming req.body.blog =", req.body.blog);
//     console.log("Incoming image file =", req.file);
//     const { title, subTitle, description, category, isPublished } = JSON.parse(
//       req.body.blog
//     );

//     const imageFile = req.file;
//     if (!title || !description || !category || !imageFile) {
//       return res.json({ success: false, message: "Missing required fields" });
//     }

//     // ✅ Read file buffer
//     const fileBuffer = fs.readFileSync(imageFile.path);
//     // ✅ Upload to ImageKit
//     const response = await imagekit.upload({
//       file: fileBuffer, // actual file buffer
//       fileName: imageFile.originalname,
//       folder: "/blogs",
//     });

//     // ✅ Generate optimized URL
//     const optimizedImageUrl = imagekit.url({
//       path: response.filePath,
//       transformation: [
//         { quality: "auto" },
//         { format: "webp" },
//         { width: "1280" },
//       ],
//     });
//     // ✅ Create blog in DB
//     await Blog.create({
//       title,
//       subTitle,
//       description,
//       category,
//       image: optimizedImageUrl,
//       isPublished,
//     });
//     res.json({ success: true, message: "Blog Added successfully" });
//   } catch (error) {
//     return res.json({ success: false, message: "Missing required fields" });
//   }
// };

export const addBlog = async (req, res) => {
  try {
    console.log("Incoming req.body.blog =", req.body.blog);
    console.log("Incoming image file =", req.file);

    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );

    const imageFile = req.file;
    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl,
      isPublished,
    });

    res.json({ success: true, message: "Blog Added successfully" });
  } catch (error) {
    console.error("Blog creation error:", error);
    return res.json({ success: false, message: "Missing required fields" });
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
    const { id } = req.body;
    console.log(id);
    await Blog.findByIdAndDelete(id);
    await Comment.deleteMany({ blog: id });
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
