import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/create/:id", auth, createTask);
router.get("/get/:id", auth, getTasks);

router.put("/update/:id", auth, updateTask);
router.delete("/delete/:id", auth, deleteTask);

export default router;
