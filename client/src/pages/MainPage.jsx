import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PostItem from "../components/PostItem";
import PopularPosts from "../components/PopularPosts";
import { getAllPosts } from "../redux/features/post/postSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const { posts, popularPosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (!posts.length) {
    return <div className="text-xl text-white text-center py-10">No posts</div>;
  }

  return (
    <div className="m-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {posts?.map((post, i) => (
            <PostItem key={i} post={post} />
          ))}
        </div>
        <div className="basis-1/5">
          <div className="text-xs uppercase text-white">Popular posts:</div>
          {popularPosts?.map((post, i) => (
            <PopularPosts key={i} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
