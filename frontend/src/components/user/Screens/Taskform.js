import React, { useState, useEffect } from "react";

const TaskForm = ({ 
  onSubmit, 
  buttonText, 
  initialData = {}, 
  mode = "create", 
  onDelete 
}) => {
  const [taskName, setTaskName] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [taskId, setTaskId] = useState("");

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setTaskName(initialData.taskName || "");
      setIsDone(initialData.isDone || false);
      setTaskId(initialData.taskid || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { taskName, isDone };

    if (mode === "create") {
      onSubmit(formData); // ✅ Only pass formData
    } else if (mode === "update") {
      onSubmit(taskId, formData); // ✅ Pass taskId + formData
    }

    setTaskName("");
    setIsDone(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (onDelete && taskId) {
      onDelete(taskId); // ✅ Only pass taskId
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>{mode === "create" ? "Create Task" : "Update Task"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Name:</label>
          <input 
            type="text" 
            value={taskName} 
            onChange={(e) => setTaskName(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label>Status:</label>
          <select
            value={isDone ? "true" : "false"}
            onChange={(e) => setIsDone(e.target.value === "true")}
            required
          >
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>
        </div>

        <button type="submit">{buttonText}</button>

        {mode === "update" && (
          <button type="button" onClick={handleDelete} style={{ marginLeft: "10px" }}>Delete</button>
        )}
      </form>
    </div>
  );
};

export default TaskForm;