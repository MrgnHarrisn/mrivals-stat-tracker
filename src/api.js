import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Point to your backend server
  maxRate: 2,
},
);

export default apiClient;