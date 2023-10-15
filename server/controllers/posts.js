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

//Get post by id
export const getById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });

    res.json(post);
  } catch (error) {
    res.json({ message: "Something went wrong" });
  }
};

//Remove post
export const removePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.json({ message: "This post does not exist" });
    }

    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    });

    res.json({ message: "The post has been deleted" });
  } catch (error) {
    res.json({ message: "Something went wrong" });
  }
};

//Get my posts
export const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const list = await Promise.all(
      user.posts.map((post) => {
        return Post.findById(post._id);
      })
    );

    res.json(list);
  } catch (error) {
    res.json({ message: "Something went wrong" });
  }
};
