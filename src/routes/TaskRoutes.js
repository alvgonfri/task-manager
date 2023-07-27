import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/TaskController.js";

const router = Router();

router.get("", authRequired, getTasks);
router.get("/:id", authRequired, getTask);
router.post("", authRequired, createTask);
router.put("/:id", authRequired, updateTask);
router.delete("/:id", authRequired, deleteTask);

export default router;
