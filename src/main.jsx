import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router.jsx";
import "./index.scss";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/Store.jsx";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
        <ToastContainer />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
