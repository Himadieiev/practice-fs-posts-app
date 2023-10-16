import { Router } from "express";

import { checkAuth } from "../utils/checkAuth.js";
import {
  createPost,
  getAll,
  getById,
  getMyPosts,
  removePost,
  updatePost,
} from "../controllers/posts.js";

const router = new Router();

//Create post
router.post("/", checkAuth, createPost);

//Get all post
router.get("/", getAll);

//Get post by id
router.get("/:id", getById);

//Update post
router.put("/:id", checkAuth, updatePost);

//Remove post
router.delete("/:id", checkAuth, removePost);

//Get my posts
router.get("/user/me", checkAuth, getMyPosts);

export default router;
