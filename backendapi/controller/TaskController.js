import { Task } from "../model/TaskModel.js"
import { User } from "../model/user.model.js";
import mongoose from "mongoose";
// ✅ CREATE TASK
export const createTask = async (req, res) => {
    try {
        const { taskName, isDone } = req.body;
        const { userId } = req.params; // Ensure userId is being sent in the request params

        // 🚀 Validate user existence
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // ✅ Validate input
        if (!taskName) {
            return res.status(400).json({
                success: false,
                message: "Task Name is required",
            });
        }

        const task = new Task({
            taskName,
            isDone: isDone || false,
            userId,
        });

        await task.save();

        // 🔹 Add task ID to user's task list
        user.tasks.push(task._id);
        await user.save();

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task,
        });
    } catch (err) {
        console.error("Create Task Error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to create task",
            error: err.message,
        });
    }
};

// ✅ FETCH ALL TASKS
export const fetchAllTasks = async (req, res) => {
    try {
        const { userId } = req.params;

        const tasks = await Task.find({ userId })
            .populate("userId", "name email -_id")
            .lean();

        res.status(200).json({
            success: true,
            message: tasks.length ? "Tasks fetched successfully" : "No tasks found",
            data: tasks,
        });
    } catch (err) {
        console.error("Fetch Tasks Error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to get tasks",
            error: err.message,
        });
    }
};

 


export const updateTaskById = async (req, res) => {
    try {
        const { taskId, userId } = req.params;
        const updateData = req.body;

        // Debug logging
        console.log('Update request received:', {
            taskId,
            userId,
            updateData
        });

        // Validate ObjectIDs
        if (!mongoose.isValidObjectId(taskId) || !mongoose.isValidObjectId(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format",
                receivedIds: { taskId, userId }
            });
        }

        // Perform update
        const task = await Task.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(taskId), userId: new mongoose.Types.ObjectId(userId) },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        // Debug logging
        console.log('Update result:', task);

        if (!task) {
            // Check if user exists
            const userExists = await User.exists({ _id: userId });
            if (!userExists) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            // Check if task exists
            const taskExists = await Task.exists({ _id: taskId });
            return res.status(taskExists ? 403 : 404).json({
                success: false,
                message: taskExists 
                    ? "Task exists but doesn't belong to this user" 
                    : "Task not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task
        });

    } catch (err) {
        console.error("Update error:", err);
        return res.status(500).json({
            success: false,
            message: "Server error during update",
            error: err.message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        });
    }
};

// ✅ DELETE TASK
export const deleteTaskById = async (req, res) => {
    try {
        const { taskId, userId } = req.params;

        const task = await Task.findOneAndDelete({ _id: taskId, userId });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found or unauthorized",
            });
        }

        // 🔹 Remove task from user's list
        await User.findByIdAndUpdate(userId, {
            $pull: { tasks: taskId },
        });

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            deletedTask: task,
        });
    } catch (err) {
        console.error("Delete Task Error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to delete task",
            error: err.message,
        });
    }
};
