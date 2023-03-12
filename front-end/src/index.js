import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {Provider} from "react-redux";
import store, {persistor} from "./store/index.js";

import App from "./App";
import {PersistGate} from "redux-persist/integration/react";
import {Toaster} from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <App />
    </PersistGate>
  </Provider>
);