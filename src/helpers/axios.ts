import axios from "axios";

const baseURL = process.env.REACT_APP_API_HOST;

const api = axios.create({
  baseURL,
  withCredentials: true
});
api.defaults.baseURL = baseURL;

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
