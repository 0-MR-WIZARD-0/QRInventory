import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./app";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

axios.defaults.baseURL = process.env.REACT_APP_ENVIRONMENT !== "production" ? process.env.REACT_API_DEV_HOST : process.env.REACT_API_HOST;
axios.interceptors.request.use(
  request => {
    console.log(request);
    return request;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    console.log(response);
    return response;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
