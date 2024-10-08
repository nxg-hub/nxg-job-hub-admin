import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router.jsx";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./Redux/Store.jsx";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);

