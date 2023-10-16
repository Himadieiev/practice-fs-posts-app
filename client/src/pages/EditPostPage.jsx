import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import axios from "../utils/axios";
import { updatePost } from "../redux/features/post/postSlice";

const EditPostPage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [newImage, setNewImage] = useState("");
  const dispatch = useDispatch();
  const navige = useNavigate();
  const params = useParams();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setTitle(data.title);
    setText(data.text);
    setOldImage(data.imgUrl);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const submitHandler = () => {
    try {
      const updatedPost = new FormData();
      updatedPost.append("title", title);
      updatedPost.append("text", text);
      updatedPost.append("id", params.id);
      updatedPost.append("image", newImage);

      dispatch(updatePost(updatedPost));
      navige("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  const clearFormHandler = () => {
    setTitle("");
    setText("");
  };

  return (
    <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex justify-center items-center border-2 border-dotted cursor-pointer">
        Attach an image:
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            setNewImage(e.target.files[0]);
            setOldImage("");
          }}
        />
      </label>
      <div className="flex object-cover py-2">
        {oldImage && (
          <img src={`http://localhost:3002/${oldImage}`} alt="Post" />
        )}
        {newImage && <img src={URL.createObjectURL(newImage)} alt="Post" />}
      </div>
      <label className="text-xs text-white opacity-70">
        Post title:
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
          placeholder="Title"
        />
      </label>
      <label className="text-xs text-white opacity-70">
        Post text:
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 resize-none h-40"
          placeholder="Text"
        />
      </label>
      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          onClick={submitHandler}
          className="flex items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
        >
          Edit post
        </button>
        <button
          onClick={clearFormHandler}
          className="flex items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditPostPage;
