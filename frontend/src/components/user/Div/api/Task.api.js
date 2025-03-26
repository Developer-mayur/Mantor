import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Configure request interceptor
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getUserId = () => localStorage.getItem("userId");

// Task API functions
export const fetchTasks = async () => {
  const userId = getUserId();
  try {
    const response = await axios.get(`${BASE_URL}/${userId}/task`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error, "fetching tasks");
  }
};

export const fetchTask = async (taskId) => {
  const userId = getUserId();
  try {
    const response = await axios.get(`${BASE_URL}/${userId}/task/${taskId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error, "fetching task");
  }
};

export const createTask = async (taskData) => {
  const userId = getUserId();
  try {
    const response = await axios.post(`${BASE_URL}/${userId}/task`, taskData);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error, "creating task");
  }
};

export const updateTask = async (taskId, taskData) => {
  const userId = getUserId();
  try {
    const response = await axios.put(`${BASE_URL}/${userId}/task/${taskId}`, taskData);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error, "updating task");
  }
};

// Helper function for error handling
const handleApiError = (error, operation) => {
  console.error(`Error ${operation}:`, error.response?.data || error.message);
  return {
    success: false,
    message: error.response?.data?.message || `Failed ${operation}`
  };
};