import axios from "axios";

const baseURL = process.env.REACT_APP_API_HOST;

const api = axios.create({
  baseURL,
  withCredentials: true
});
api.defaults.baseURL = baseURL;

export default api;
