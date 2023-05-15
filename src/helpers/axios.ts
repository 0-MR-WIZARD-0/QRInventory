import axios from "axios";
import { NodeENV } from "types/App";

const baseURL = process.env.NODE_ENV !== NodeENV.prod ? process.env.REACT_APP_API_DEV_HOST : process.env.REACT_APP_API_HOST;

const api = axios.create({
  baseURL,
  withCredentials: true
});
api.defaults.baseURL = process.env.NODE_ENV !== NodeENV.prod ? process.env.REACT_API_DEV_HOST : process.env.REACT_API_HOST;

// if (process.env.NODE_ENV) {
//   api.interceptors.request.use(request => {
//     console.group("Request data");
//     console.log(request);
//     console.groupEnd();
//     return request;
//   });

//   api.interceptors.response.use(response => {
//     console.group("Response data");
//     console.log(response);
//     console.groupEnd();
//     return response;
//   });
// }

export default api;
