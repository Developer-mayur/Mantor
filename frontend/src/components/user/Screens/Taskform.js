 import React, { useState, useEffect } from "react";
import { fetchTasks, fetchTask, createTask, updateTask } from "../Div/api/Task.api";
import { toast } from "react-toastify";

const TaskForm = ({ mode = "create" }) => {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch tasks when component mounts
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetchTasks();
        if (response.success) {
          setTasks(response.data.data);
        }
      } catch (error) {
        setError("Failed to load tasks");
      }
    };
    
    if (mode === "update") loadTasks();
  }, [mode]);

  // Handle task selection for update mode
  const handleTaskSelect = async (taskId) => {
    try {
      const response = await fetchTask(taskId);
      if (response.success) {
        setSelectedTaskId(taskId);
        setTaskName(response.data.taskName);
      }
    } catch (error) {
      setError("Failed to load task details");
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "create") {
        const response = await createTask({ taskName });
        if (response.success) {
          toast.success("Task created successfully!");
          setTaskName("");
        }
      } else if (mode === "update") {
        const response = await updateTask(selectedTaskId, { taskName });
        if (response.success) {
          toast.success("Task updated successfully!");
        }
      }
    } catch (error) {
      setError(error.message || "Operation failed");
      toast.error("Operation failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form">
      <h2>{mode === "create" ? "Create New Task" : "Edit Task"}</h2>

      {mode === "update" && (
        <div className="task-selector">
          <label>Select Task:</label>
          <select 
            value={selectedTaskId}
            onChange={(e) => handleTaskSelect(e.target.value)}
            disabled={loading}
          >
            <option value="">-- Select a task --</option>
            {tasks.map(task => (
              <option key={task._id} value={task._id}>
                {task.taskName}
              </option>
            ))}
          </select>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : mode === "create" ? "Create Task" : "Update Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;