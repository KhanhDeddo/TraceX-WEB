import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_URL_BACKEND,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default axiosClient;
