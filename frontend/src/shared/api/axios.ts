import axios from "axios";

// Baseurl will be dynamic depending on the envrionment
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  withCredentials: true,
});
