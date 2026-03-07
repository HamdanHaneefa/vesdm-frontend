import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 60000, // 60s to allow Render free tier cold start (~30-50s)
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
    // 401 handling is managed by AuthContext — do NOT redirect here
    // to avoid logging out on page refresh before auth state is restored.
    // 403 = Forbidden (business rule, e.g. exam date not reached) — do NOT logout
    return Promise.reject(error);
  },
);

export default apiClient;
