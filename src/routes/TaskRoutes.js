import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.js";
import { createOrUpdateTaskSchema } from "../schemas/TaskSchema.js";
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
router.post(
  "",
  authRequired,
  validateSchema(createOrUpdateTaskSchema),
  createTask
);
router.put(
  "/:id",
  authRequired,
  validateSchema(createOrUpdateTaskSchema),
  updateTask
);
router.delete("/:id", authRequired, deleteTask);

export default router;
