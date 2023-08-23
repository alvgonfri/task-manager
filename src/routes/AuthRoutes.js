import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.js";
import { registerSchema, loginSchema } from "../schemas/AuthSchema.js";
import {
  register,
  login,
  logout,
  verifyToken,
  getProfile,
} from "../controllers/AuthController.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verifyToken", verifyToken);
router.get("/profile", authRequired, getProfile);

export default router;
