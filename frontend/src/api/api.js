import axios from "axios";

export const server = axios.create({
  baseURL: "http://localhost:8000/",
});

// Add an interceptor to include the token in all requests
server.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

