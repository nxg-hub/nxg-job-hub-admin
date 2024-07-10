import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router.jsx";
import "./main.scss";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Redux/Store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);
