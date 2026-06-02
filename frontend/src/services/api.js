import axios from "axios";

const api = axios.create({
  baseURL: "https://inventory-management-system-bp4u.onrender.com",
});

export default api;
