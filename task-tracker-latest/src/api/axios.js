import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.5:5000', // Change this to your backend URL if hosted
});

export default axiosInstance;
