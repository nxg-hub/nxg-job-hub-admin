import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router.jsx";
import "./index.scss";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/Store.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          icon={false}
        />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
