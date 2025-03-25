import { Task } from "../model/TaskModel.js"
import { User } from "../model/user.model.js";

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

// ✅ UPDATE TASK
export const updateTaskById = async (req, res) => {
    try {
        const { taskId, userId } = req.params;
        const updateData = req.body;

        // 🚀 Allow only taskName & isDone updates
        const allowedUpdates = ["taskName", "isDone"];
        const isValidUpdate = Object.keys(updateData).every((key) =>
            allowedUpdates.includes(key)
        );

        if (!isValidUpdate) {
            return res.status(400).json({
                success: false,
                message: "Invalid updates! Only taskName and isDone allowed",
            });
        }

        const task = await Task.findOneAndUpdate(
            { _id: taskId, userId },
            updateData,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found or unauthorized",
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task,
        });
    } catch (err) {
        console.error("Update Task Error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to update task",
            error: err.message,
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
