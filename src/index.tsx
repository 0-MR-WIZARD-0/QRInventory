import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.scss";
import App from "./app";
import Modal from "react-modal";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
Modal.setAppElement("#root");

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
