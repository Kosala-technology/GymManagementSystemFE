import axios from "axios";

// Create Axios instance for Laravel Backend
const api = axios.create({
  baseURL: "http://localhost:8000",

  // Send Laravel session cookies with requests
  withCredentials: true,

  // Automatically send X-XSRF-TOKEN header
  withXSRFToken: true,

  headers: {
    Accept: "application/json",
  },
});

export default api;
