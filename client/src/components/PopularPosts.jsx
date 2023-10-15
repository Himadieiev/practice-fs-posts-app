import React from "react";

const PopularPosts = ({ post }) => {
  return (
    <div className="bg-gray-600 my-1">
      <div className="p-2 flex text-gray-300 text-xs hover:bg-gray-800 hover:text-white">
        {post.title}
      </div>
    </div>
  );
};

export default PopularPosts;
