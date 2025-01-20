import express from "express";
import {
  getTasks,
  postTask,
  updateTasks,
  deleteTask,
} from "../controllers/tasks";

const taskRouter = express.Router();

taskRouter.get("/", getTasks);
taskRouter.post("/create", postTask);
taskRouter.put("/edit/:id", updateTasks);
taskRouter.delete("/:id", deleteTask);

export default taskRouter;
