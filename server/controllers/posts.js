import path, { dirname } from "path";
import { fileURLToPath } from "url";

import Post from "../models/Post.js";
import User from "../models/User.js";

//Create post
export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const user = await User.findById(req.userId);

    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, "..", "uploads", fileName));

      const newPostWithImg = new Post({
        username: user.username,
        title,
        text,
        imgUrl: fileName,
        author: req.userId,
      });

      await newPostWithImg.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: { posts: newPostWithImg },
      });

      return res.join(newPostWithImg);
    }

    const newPostWithoutImg = new Post({
      username: user.username,
      title,
      text,
      imgUrl: "",
      author: req.userId,
    });

    await newPostWithoutImg.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: newPostWithoutImg },
    });

    res.json(newPostWithoutImg);
  } catch (error) {
    res.json({ message: "Something went wrong" });
  }
};

//Get all posts
export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort("-createdAt");
    const popularPosts = await Post.find().limit(5).sort("views");

    if (!posts) {
      return res.json({ message: "There are no posts" });
    }

    res.json({ posts, popularPosts });
  } catch (error) {
    res.json({ message: "Something went wrong" });
  }
};
