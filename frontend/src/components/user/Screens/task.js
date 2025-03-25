import React, { useState } from "react";
import Building from "../new.js"; // Importing new component

const Task = () => {
  const [showBuilding, setShowBuilding] = useState(false);

  return (
    <div style={{ width: "100%" }}> {/* Single wrapper div */}
      <div style={styles.container}>
        <div style={styles.item}>
          <img src="https://i.ibb.co/qdgf3TJ/envelope.png" alt="Messages" style={styles.icon} />
          <span>Task Creation</span>
        </div>
        <div style={styles.item}>
          <img src="https://i.ibb.co/qdgf3TJ/envelope.png" alt="Messages" style={styles.icon} />
          <span>Subtasks</span>
        </div>
        <div style={styles.item}>
          <img src="https://i.ibb.co/qdgf3TJ/envelope.png" alt="Messages" style={styles.icon} />
          <span>Due Dates</span>
        </div>
        <div style={styles.item}>
          <img src="https://i.ibb.co/qdgf3TJ/envelope.png" alt="Messages" style={styles.icon} />
          <span>Reminders</span>
        </div>
        <div style={styles.item}>
          <img src="https://i.ibb.co/qdgf3TJ/envelope.png" alt="Messages" style={styles.icon} />
          <span>Priority</span>
        </div>
        <div style={styles.item}>
          <img src="https://i.ibb.co/qdgf3TJ/envelope.png" alt="Messages" style={styles.icon} />
          <button style={{ background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}>
            Task
          </button>
        </div>
      </div>
    </div>
  );
};

// Define styles outside to keep code clean
const styles = {
  container: {
    width: "80%",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    background: "#f5f5f5",
    borderBottom: "1px solid #ddd",
    padding: "10px 0",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: 1000,
  },
  item: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: "10px 15px",
    borderRadius: "5px",
    background: "#fff",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  },
  icon: {
    width: "25px",
    marginRight: "10px",
  },
};

export default Task;
