import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js"; // ✅ Ensure it is EXACTLY "App.jsx"
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
