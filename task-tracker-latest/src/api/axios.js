import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://mern-tasktracking-backend.onrender.com', // Change this to your backend URL if hosted
  
});

export default axiosInstance;
