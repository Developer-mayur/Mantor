import express from "express";
import {createTask,fetchAllTasks,updateTaskById,deleteTaskById} from "../controller/TaskController.js"
const router = express.Router({ mergeParams: true }); 
 

router.post("/", createTask);           // POST /user/:userId/task
router.get("/", fetchAllTasks);         // GET /user/:userId/task
router.put("/:taskId", updateTaskById); // PUT /user/:userId/task/:taskId
router.delete("/:taskId", deleteTaskById); // DELETE /user/:userId/task/:taskId

export default router;