import axios from "axios";

// Example: baseURL can be dynamically set using env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  timeout: 10000,
});

// Add a request interceptor for token injection
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Or any auth source
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401, log out, global error toast, etc.
    if (error.response?.status === 401) {
      console.warn("Unauthorized – redirect to login?");
    }
    return Promise.reject(error);
  }
);

export default api;
