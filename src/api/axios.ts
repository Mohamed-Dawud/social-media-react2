import axios from "axios";

export const api = axios.create({
  baseURL: "https://route-posts.routemisr.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.token = token;
  return config;
});