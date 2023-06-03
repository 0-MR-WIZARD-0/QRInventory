import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.scss";
import App from "./app";
import Modal from "react-modal";
import { Provider } from "react-redux";
import store from "redux/store";
import ErrorsPopupWrapper from "components/Basic/ErrorsPopups";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
Modal.setAppElement("#root");

root.render(
  <Provider store={store}>
    <ErrorsPopupWrapper />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
