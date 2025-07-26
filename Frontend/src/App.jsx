import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/users/Home";
import BlogList from "./pages/users/BlogList";
import DetailsBlog from "./pages/users/DetailsBlog";
import WishList from "./pages/users/Wishlist";
import { useSelector } from "react-redux";

import SignUp from "./components/users/SignUp";
import Login from "./components/users/Login";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate(); // hook to navigate programmatically

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login page if not logged in
    }
  }, [isLoggedIn]);
  return (
    <>
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
      </Routes>
    </>
  );
};

export default App;
