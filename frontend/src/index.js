import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";   
import store from "../src/redux-config/Store"; 
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SocketProvider } from "./components/user/context/SocketProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* ✅ Wrap your app in Provider */}
    <BrowserRouter basename="/">   {/* ✅ Added `basename` */}
    <SocketProvider>
          <App />
        </SocketProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
