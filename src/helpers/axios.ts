import axios from "axios";

const api = axios.create({
  baseURL: process.env.NODE_ENV !== "production" ? process.env.REACT_APP_API_DEV_HOST : process.env.REACT_APP_API_HOST
});

export default api;
