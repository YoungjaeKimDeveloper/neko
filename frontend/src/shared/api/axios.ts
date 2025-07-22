import axios from "axios";

// Baseurl will be dynamic depending on the envrionment
export const axiosInstance = axios.create({
  // my-postge-store.com
  baseURL:
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_APP_URL
      : "/api",
  withCredentials: true,
});
