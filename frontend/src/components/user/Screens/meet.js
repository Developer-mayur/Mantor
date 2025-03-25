import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DynamicNav from "./Dynamicnav";
import LobbyScreen from "../Screens/Lobby";
import RoomPage from "../Screens/Room";
import TaskComponent from "../Div/TaskComponent";
import TaskForm from "./Taskform";
import { fetchTasks, createTask, updateTask, deleteTask } from "../Div/api/Task.api";

const Meet = () => {
  const currentSection = useSelector((state) => state.section.currentSection);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeRoom, setActiveRoom] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const tasks = await fetchTasks();
        setTaskData(Array.isArray(tasks) ? tasks : []);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const handleRoomJoin = (roomId) => {
    setActiveRoom(roomId);
    setSelectedComponent(<RoomPage roomId={roomId} />);
  };

  const navData = {
    Task: [
      { 
        name: "Create Task", 
        action: () => setSelectedComponent(
          <TaskForm 
            onSubmit={async (formData) => {
              await createTask(formData);
              const tasks = await fetchTasks();
              setTaskData(tasks);
            }} 
            buttonText="Create Task" 
            mode="create"
          />
        )
      },{ 
        name: "Task", 
        action: () => setSelectedComponent(
          <TaskForm 
            onSubmit={async (formData) => {
              await fetchTasks();
              const tasks = await fetchTasks();
              setTaskData(tasks);
            }} 
            buttonText="Create Task" 
            mode="See"
          />
        )
      },
      { 
        name: "Update Task", 
        action: () => setSelectedComponent(
          <TaskForm
            initialData={taskData[0]} // Pass actual task data
            onSubmit={async (taskId, formData) => {
              await updateTask(taskId, formData);
              const tasks = await fetchTasks();
              setTaskData(tasks);
            }}
            buttonText="Update Task"
            mode="update"
          />
        )
      },
      { 
        name: "Delete Task", 
        action: () => setSelectedComponent(
          <TaskComponent 
            items={taskData} 
            onDelete={async (taskId) => {
              await deleteTask(taskId);
              const tasks = await fetchTasks();
              setTaskData(tasks);
            }}
          />
        )
      },
    ],
    Meet: [
      { 
        name: "Lobby", 
        action: () => setSelectedComponent(
          <LobbyScreen onRoomJoin={handleRoomJoin} />
        )
      },
      { 
        name: "Active Call", 
        action: () => activeRoom && setSelectedComponent(
          <RoomPage roomId={activeRoom} />
        ),
        disabled: !activeRoom
      }
    ]
  };

  return (
    <div style={{ minHeight: "100vh", overflow: "hidden" }}>
      <DynamicNav 
        navItems={navData[currentSection] || []} 
        onSelect={setSelectedComponent}
      />
      <div style={{ 
        marginTop: "30px", 
        padding: "20px", 
        border: "1px solid #ccc", 
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)", 
        borderRadius: "8px", 
        minHeight: "300px",
        backgroundColor: "#fff"
      }}>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : selectedComponent || (
          <div className="text-muted text-center py-5">
            <h2>Select a section to begin</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Meet;