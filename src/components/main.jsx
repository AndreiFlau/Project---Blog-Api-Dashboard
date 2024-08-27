import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./router.jsx";
import "../styles/index.css";
import { AdminProvider } from "../hooks/AdminProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminProvider>
      <Routes />
    </AdminProvider>
  </React.StrictMode>
);
