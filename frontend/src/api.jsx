import axios from "axios";

const api = axios.create({
  baseURL: "https://lead-management-system-kh2o.onrender.com",
  withCredentials: true,
});

export default api;
