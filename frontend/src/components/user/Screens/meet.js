import React, { useState, useEffect, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { fetchTasks, createTask, updateTask } from "../Div/api/Task.api";

 const DynamicNav = lazy(() => import("./Dynamicnav"));
const LobbyScreen = lazy(() => import("../Screens/Lobby"));
const RoomPage = lazy(() => import("../Screens/Room"));
const TaskForm = lazy(() => import("./Taskform"));

const Meet = () => {
  const currentSection = useSelector((state) => state.section.currentSection);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeRoom, setActiveRoom] = useState(null);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const result = await fetchTasks();
      if (result.success) {
        setTaskData(result.data);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error loading tasks: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
          <Suspense fallback={<div>Loading...</div>}>
            <TaskForm 
              onSubmit={async (formData) => {
                await createTask(formData);
                await loadTasks();
              }} 
              buttonText="Create Task" 
              mode="create"
            />
          </Suspense>
        )
      },
      {
        name: "Update Task",
        action: () => setSelectedComponent(
          <Suspense fallback={<div>Loading...</div>}>
            <TaskForm
              initialData={taskData[0]}
              onSubmit={async (formData) => {
                if (taskData[0]?._id) {
                  await updateTask(taskData[0]._id, formData);
                  await loadTasks();
                }
              }}
              buttonText="Update Task"
              mode="update"
            />
          </Suspense>
        ),
        disabled: taskData.length === 0
      }
    ],
    Meet: [
      {
        name: "Lobby",
        action: () => setSelectedComponent(
          <Suspense fallback={<div>Loading...</div>}>
            <LobbyScreen onRoomJoin={handleRoomJoin} />
          </Suspense>
        )
      },
      {
        name: "Active Call",
        action: () => activeRoom && setSelectedComponent(
          <Suspense fallback={<div>Loading...</div>}>
            <RoomPage roomId={activeRoom} />
          </Suspense>
        ),
        disabled: !activeRoom
      }
    ]
  };

  return (
    <div style={{ minHeight: "100vh", overflow: "hidden" }}>
      <Suspense fallback={<div>Loading Navigation...</div>}>
        <DynamicNav 
          navItems={navData[currentSection] || []} 
          onSelect={setSelectedComponent}
        />
      </Suspense>

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
            {currentSection === "Task" && taskData.length > 0 && (
              <div style={{ marginTop: "20px" }}>
                <h4>Your Tasks:</h4>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {taskData.map(task => (
                    <li key={task._id} style={{ 
                      padding: "10px", 
                      margin: "5px 0", 
                      backgroundColor: "#f5f5f5",
                      borderRadius: "4px"
                    }}>
                      {task.taskName} - {task.isDone ? "✅ Completed" : "🟡 Pending"}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Meet;
