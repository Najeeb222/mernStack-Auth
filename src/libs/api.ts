// src/libs/api.ts
import axios from "axios";
import { useAuth } from "context";


const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true, 
});


api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refreshToken } = useAuth(); 
      await refreshToken();
      originalRequest.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
      return api(originalRequest);
    }
    return Promise.reject(err);
  }
);

export default api;
