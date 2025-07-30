import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/QuickBlog-Assets/assets";
import Quill from "quill";
import { addBlog, resetAddBlogState } from "../../features/Admin/addBlog";
import { useDispatch, useSelector } from "react-redux";

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const dispatch = useDispatch();

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const { loading, success, error } = useSelector((state) => state.adminBlog);
  const token = useSelector((state) => state.authAdmin.token);

  const generateContent = async () => {
    // Optional AI content generation logic here
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const description = quillRef.current?.root.innerHTML;
    if (!description || description === "<p><br></p>") {
      alert("Please write some content.");
      return;
    }

    // ✅ Create a regular JavaScript object instead of FormData
    const blogData = {
      title: title,
      subTitle: subTitle,
      description: description,
      category: category,
      isPublished: isPublished,
      image: image, // This should be the File object from the input
    };

    // console.log("=== FORM SUBMIT DEBUG ===");
    // console.log("blogData being sent:", blogData);
    // console.log("title specifically:", blogData.title);
    // console.log("image file:", blogData.image);
    // console.log("========================");

    dispatch(addBlog({ blogData, token }));
  };

  useEffect(() => {
    if (success) {
      alert("✅ Blog added successfully!");
      setTitle("");
      setSubTitle("");
      setCategory("");
      setIsPublished(false);
      setImage(false);
      if (quillRef.current) {
        quillRef.current.root.innerHTML = "";
      }
      dispatch(resetAddBlogState());
    }
    if (error) {
      alert(`❌ ${error}`);
      dispatch(resetAddBlogState());
    }
  }, [success, error, dispatch]);

  useEffect(() => {
    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your blog content here...",
      });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="upload preview"
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>

        <p className="mt-4">Blog title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <p className="mt-4">Sub title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setSubTitle(e.target.value)}
          value={subTitle}
        />

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 sm:pb-10 pt-2 relative">
          <div ref={editorRef} className="h-64" />
          <button
            type="button"
            onClick={generateContent}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            Generate with AI
          </button>
        </div>

        <p className="mt-4">Blog category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          name="category"
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">Select category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        <button
          type="submit"
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
        >
          {loading ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
