"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets, blog_data } from "../../assets/QuickBlog-Assets/assets";
import Navbar from "../../components/users/Navbar";
import Footer from "../../components/users/Footer";
import Moment from "moment";
import {
  FaShare,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaCopy,
  FaBookmark,
  FaRegBookmark,
  FaArrowLeft,
  FaClock,
  FaEye,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import DBLoadingSkeleton from "../../components/users/DBLoadingSkeleton";
import BlogCard from "../../components/users/BlogCard";

const DetailsBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [estimatedReadTime, setEstimatedReadTime] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Simulate API delay for better UX demonstration
      await new Promise((resolve) => setTimeout(resolve, 10));
      const blogData = blog_data.find((blog) => blog._id === id);
      setData(blogData);

      // Calculate estimated read time (average 200 words per minute)
      if (blogData?.description) {
        const wordCount = blogData.description
          .replace(/<[^>]*>/g, "")
          .split(" ").length;
        setEstimatedReadTime(Math.ceil(wordCount / 200));
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = data?.title || "Check out this blog post";

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } else {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
    setShowShareMenu(false);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  if (loading) {
    return <DBLoadingSkeleton />;
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Blog post not found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#5044E5] text-white rounded-lg hover:bg-[#4035c5] transition-colors duration-300"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Reading Progress Bar */}
      <Navbar />
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#5044E5] to-[#7C3AED] transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      {/* Background */}
      <div className="relative min-h-screen ">
        <div className="">
          <img
            src={assets.gradientBackground}
            alt="Background gradient"
            className="absolute -top-10 -z-10 w-full opacity-40"
          />
        </div>

        {/* Back Button */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-[#5044E5] transition-colors duration-300 group"
          >
            <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-medium">Back to Blog</span>
          </button>
        </div>

        {/* Article Header */}
        <article className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <header className="text-center space-y-6 sm:space-y-8 mb-12 sm:mb-16">
            {/* Publication Date */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5044E5]/10 text-[#5044E5] rounded-full text-sm font-medium">
              <FaClock className="w-4 h-4" />
              <span>
                Published on {Moment(data.createdAt).format("MMMM DD, YYYY")}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-800 max-w-4xl mx-auto">
              {data.title}
            </h1>

            {/* Subtitle */}
            <h2 className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {data.subTitle}
            </h2>

            {/* Author and Meta Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-6">
              <div className="flex items-center gap-3">
                <img
                  src={
                    assets.logo ||
                    "/placeholder.svg?height=48&width=48&query=author avatar"
                  }
                  alt="Author"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#5044E5]"
                />
                <div className="text-left">
                  <p className="font-semibold text-gray-800">Michael Brown</p>
                  <p className="text-sm text-gray-500">Senior Writer</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <FaClock className="w-4 h-4" />
                  <span>{estimatedReadTime} min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaEye className="w-4 h-4" />
                  <span>1.2k views</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 pt-6">
              <button
                onClick={toggleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  isLiked
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500"
                }`}
              >
                {isLiked ? <FaHeart /> : <FaRegHeart />}
                <span className="text-sm font-medium">42</span>
              </button>

              <button
                onClick={toggleBookmark}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  isBookmarked
                    ? "bg-[#5044E5] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-[#5044E5]/10 hover:text-[#5044E5]"
                }`}
              >
                {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                <span className="text-sm font-medium">Save</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all duration-300"
                >
                  <FaShare />
                  <span className="text-sm font-medium">Share</span>
                </button>

                {showShareMenu && (
                  <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-lg border border-gray-100 p-2 min-w-[200px] z-20">
                    <button
                      onClick={() => handleShare("facebook")}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <FaFacebookF className="text-blue-600" />
                      <span>Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare("twitter")}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <FaTwitter className="text-sky-500" />
                      <span>Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare("linkedin")}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <FaLinkedinIn className="text-blue-700" />
                      <span>LinkedIn</span>
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={() => handleShare("copy")}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <FaCopy className="text-gray-600" />
                      <span>Copy Link</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-12 sm:mb-16">
            <div className="relative group overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
              <img
                src={
                  data.image ||
                  "/placeholder.svg?height=600&width=1200&query=blog featured image"
                }
                alt={data.title}
                className="w-full h-64 sm:h-96 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg sm:prose-xl max-w-none">
            <div
              className="rich-text leading-relaxed text-gray-700"
              dangerouslySetInnerHTML={{ __html: data.description }}
              style={{
                fontSize: "clamp(16px, 2.5vw, 18px)",
                lineHeight: "1.8",
              }}
            />
          </div>

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={
                    assets.logo ||
                    "/placeholder.svg?height=56&width=56&query=author avatar"
                  }
                  alt="Author"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#5044E5]"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">Michael Brown</h3>
                  <p className="text-gray-600">
                    Senior Writer & Content Strategist
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Passionate about technology and digital storytelling
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={toggleLike}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    isLiked
                      ? "bg-red-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500"
                  }`}
                >
                  {isLiked ? <FaHeart /> : <FaRegHeart />}
                  <span>Like this post</span>
                </button>
              </div>
            </div>
          </footer>
        </article>

        {/* Related Articles Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Related Articles
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover more insightful content that might interest you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blog_data.slice(0, 3).map((blog) => (
              <BlogCard key={blog._id} Blog={blog} />
            ))}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default DetailsBlog;
