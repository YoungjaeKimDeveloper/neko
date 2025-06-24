import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8011/api",
  withCredentials: true,
});
