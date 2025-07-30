import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/users/Home";
import BlogList from "./pages/users/BlogList";
import DetailsBlog from "./pages/users/DetailsBlog";
import WishList from "./pages/users/WishList";
import { useSelector } from "react-redux";

import SignUp from "./components/users/SignUp";
import Login from "./components/users/Login";
import Layout from "./pages/admin/Layout";
import DashBoard from "./pages/admin/DashBoard";
import AddBlog from "./pages/admin/AddBlog";
import ListBlog from "./pages/admin/ListBlog";
import Comment from "./pages/admin/Comment";
import AdminLogin from "./components/admin/AdminLogin";
import "quill/dist/quill.snow.css";
import Toster from "react-hot-toast";
const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const isAuthenticated = useSelector(
    (state) => state.authAdmin.isAuthenticated
  );
  const navigate = useNavigate();

  useEffect(() => {
    const publicPaths = ["/", "/login", "/signup", "/admin"];
    const currentPath = window.location.pathname;

    const isPublicRoute = publicPaths.includes(currentPath);

    if (!isLoggedIn && !isAuthenticated && !isPublicRoute) {
      navigate("/");
    }
  }, [isLoggedIn, isAuthenticated, navigate]);

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          {!isLoggedIn ? (
            <>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </>
          ) : (
            <>
              <Route path="/blog-list" element={<BlogList />} />
              <Route path="/wish-list" element={<WishList />} />
              <Route path="/blog-list/:id" element={<DetailsBlog />} />
            </>
          )}
          <Route
            path="/admin"
            element={isAuthenticated ? <Layout /> : <AdminLogin />}
          >
            <Route index element={<DashBoard />} />
            <Route path="add-blog" element={<AddBlog />} />
            <Route path="list-blog" element={<ListBlog />} />
            <Route path="comment" element={<Comment />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
