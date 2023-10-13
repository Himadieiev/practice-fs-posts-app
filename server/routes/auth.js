import { Router } from "express";

import { current, login, register } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

//Register
router.post("/register", register);

//Login
router.post("/login", login);

//Current
router.get("/current", checkAuth, current);

export default router;
