import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Change this to your backend URL if hosted
  
});

export default axiosInstance;
