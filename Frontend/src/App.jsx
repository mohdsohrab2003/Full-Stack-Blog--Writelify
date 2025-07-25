import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/users/Home";
import BlogList from "./pages/users/BlogList";
import DetailsBlog from "./pages/users/DetailsBlog";
import WishList from "./pages/users/Wishlist";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog-list" element={<BlogList />} />
        <Route path="/wish-list" element={<WishList />} />
        <Route path="/blog-list/:id" element={<DetailsBlog />} />
      </Routes>
    </>
  );
};

export default App;
