import React from "react";
import { Link } from "react-router-dom";

const PopularPosts = ({ post }) => {
  return (
    <div className="bg-gray-600 my-1">
      <Link
        to={`/${post._id}`}
        className="p-2 flex text-gray-300 text-xs hover:bg-gray-800 hover:text-white"
      >
        {post.title}
      </Link>
    </div>
  );
};

export default PopularPosts;
