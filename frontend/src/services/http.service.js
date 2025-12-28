// src/services/http.service.js
import axios from "axios";

// Create a base axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const http = {
  get: (url, params) => api.get(url, { params }).then((res) => res.data),
  post: (url, data, config = {}) => api.post(url, data, config).then((res) => res.data),
  put: (url, data) => api.put(url, data).then((res) => res.data),
  delete: (url) => api.delete(url).then((res) => res.data),
  postForm: (url, data) =>
    api
      .post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),
  putForm: (url, data) =>
    api
      .put(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data),
};

export default http;
