import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { PlanProvider } from "./context/PlanContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <PlanProvider>
        <App />
      </PlanProvider>
    </AuthProvider>
  </React.StrictMode>
);
