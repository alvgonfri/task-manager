import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  register,
  login,
  logout,
  getProfile,
} from "../controllers/AuthController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authRequired, getProfile);

export default router;
