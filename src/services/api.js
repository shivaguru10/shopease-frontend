import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token automatically
api.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    req.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
  }
  return req;
});

export default api;
