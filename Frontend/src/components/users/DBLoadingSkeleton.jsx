import React from "react";
import Navbar from "./Navbar";

const DBLoadingSkeleton = () => {
  return (
    <>
      <div className="animate-pulse">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-6">
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-8 bg-gray-200 rounded w-32 mx-auto"></div>
          </div>
          <div className="mt-12">
            <div className="h-64 sm:h-96 bg-gray-200 rounded-3xl"></div>
            <div className="mt-8 space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DBLoadingSkeleton;
