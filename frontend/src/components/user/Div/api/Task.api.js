import axios from "axios";

const BASE_URL = "http://localhost:8000/user";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getUserId = () => {
  return localStorage.getItem("userId");
};

export const fetchTasks = async () => {
  const userId = getUserId();
  if (!userId) {
    console.error("Error: User ID missing!");
    return { success: false, message: "User ID missing" };
  }

  try {
    const response = await axios.get(`${BASE_URL}/${userId}/task`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error.response?.data || error.message);
    return { success: false, message: error.message };
  }
};

export const createTask = async (taskData) => {
  const userId = getUserId();
  if (!userId) throw new Error("User ID missing!");

  try {
    const response = await axios.post(`${BASE_URL}/${userId}/task`, taskData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating task:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Create task failed");
  }
};

export const updateTask = async (taskId, taskData) => {
  const userId = getUserId();
  if (!userId) throw new Error("User ID missing!");

  try {
    const response = await axios.put(`${BASE_URL}/${userId}/task/${taskId}`, taskData);
    return response.data.data;
  } catch (error) {
    console.error("Error updating task:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Update task failed");
  }
};

export const deleteTask = async (taskId) => {
  const userId = getUserId();
  if (!userId) throw new Error("User ID missing!");

  try {
    await axios.delete(`${BASE_URL}/${userId}/task/${taskId}`);
    return true;
  } catch (error) {
    console.error("Error deleting task:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Delete task failed");
  }
};