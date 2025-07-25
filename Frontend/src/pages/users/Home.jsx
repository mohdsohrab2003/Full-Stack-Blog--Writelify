import React from "react";
import Navbar from "../../components/users/Navbar";
import Hero from "../../components/users/Hero";
import Categories from "../../components/users/Categories";
import HBlogList from "../../components/users/HBlogList";
import Newsletter from "../../components/users/NewsLetter";

const Home = () => {
  return (
    <>
      <Navbar />
      <div>
        <Hero />
        <Categories />
        <HBlogList />
        <Newsletter />
      </div>
    </>
  );
};

export default Home;
