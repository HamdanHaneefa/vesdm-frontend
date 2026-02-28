import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  withCredentials: true,
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("vesdm_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only logout on true auth failure (expired/invalid token)
      console.warn("Authentication error:", error.response.data);
      localStorage.removeItem("vesdm_token");
      window.location.href = "/login";
    }
    // 403 = Forbidden (business rule, e.g. exam date not reached) — do NOT logout
    return Promise.reject(error);
  },
);

export default apiClient;
