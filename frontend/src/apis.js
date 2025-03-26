const BASE_URL = process.env.REACT_APP_BASE_URL;

 export default {
  // यूजर रिलेटेड
  SIGN_UP: `${BASE_URL}/sign-up`,
  SIGN_IN: `${BASE_URL}/sign-in`,

   getTasks: (userId) => `${BASE_URL}/${userId}/task`,
  createTask: (userId) => `${BASE_URL}/${userId}/task`,
  updateTask: (userId, taskId) => `${BASE_URL}/${userId}/task/${taskId}`,
};