import React from "react";
import { assets } from "../../assets/QuickBlog-Assets/assets";
import SearchBar from "./SearchBar";
const Hero = () => {
  return (
    <>
      <div className="mx-8 sm:mx-16 xl:mx-24 relative">
        <div className="text-center  mt-20 mb-8">
          <div className="inline-flex items-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 rounded-full text-sm text-blue-500 ">
            <p>New : AI Features Integerated</p>
            <img src={assets.star_icon} alt="star icon" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl sm:text-6xl font-bold sm:leading-16 text-gray-700 ">
              Your Own <span className="text-primary">Blogging</span> <br />{" "}
              Platform
            </h1>
            <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500">
              This is your space to think out loud, to share what matters, and
              to write without filters. Whether it's one word or a thousand,
              your story starts right here.
            </p>
            <div className="max-w-[50%] m-auto">
              <SearchBar />
            </div>
          </div>
        </div>
        <img
          src={assets.gradientBackground}
          alt="bg-img"
          className="absolute -top-50 -z-1 opacity-50"
        />
      </div>
    </>
  );
};

export default Hero;
