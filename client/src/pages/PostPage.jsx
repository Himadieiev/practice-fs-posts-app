import React, { useCallback, useEffect, useState } from "react";
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai";
import Moment from "react-moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import axios from "../utils/axios";
import { removePost } from "../redux/features/post/postSlice";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const params = useParams();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (!post) {
    return (
      <div className="text-xl text-white text-center py-10">Loading...</div>
    );
  }

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id));
      toast("The post has been removed");
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
        <Link className="flex" to={"/"}>
          Back
        </Link>
      </button>
      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                post?.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"
              }
            >
              {post?.imgUrl && (
                <img
                  src={`http://localhost:3002/${post.imgUrl}`}
                  alt="Post"
                  className="object-cover w-full"
                />
              )}
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-white opacity-50">{post.username}</div>
            <div className="text-xs text-white opacity-50">
              <Moment date={post.createdAt} format="D MMM YYYY" />
            </div>
          </div>
          <div className="text-white text-xl">{post.title}</div>
          <p className="text-white text-xs opacity-60 pt-4">{post.text}</p>
          <div className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex gap-3 mt-4">
              <button className="flex justify-center items-center gap-2 text-xs text-white opacity-50">
                <AiFillEye />
                <span>{post.views}</span>
              </button>
              <button className="flex justify-center items-center gap-2 text-xs text-white opacity-50">
                <AiOutlineMessage />
                <span>{post.comments?.length || 0}</span>
              </button>
            </div>
            {user?._id === post.author && (
              <div className="flex gap-3 mt-4">
                <button className="flex justify-center items-center gap-2 text-white opacity-50">
                  <Link to={`/${params.id}/edit`}>
                    <AiTwotoneEdit />
                  </Link>
                </button>
                <button
                  onClick={removePostHandler}
                  className="flex justify-center items-center gap-2 text-white opacity-50"
                >
                  <AiFillDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/3">COMMENTS</div>
      </div>
    </div>
  );
};

export default PostPage;
