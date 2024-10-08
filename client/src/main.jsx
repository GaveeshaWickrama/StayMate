import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { StoreProvider } from "./context/StoreContext.jsx";
import "./index.css"; // Import Tailwind CSS
import App from "./App.jsx";
import { ModeratorContextProvider } from "./context/ModeratorContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <StoreProvider>
          <ModeratorContextProvider>
            <SocketContextProvider>
              <App />
            </SocketContextProvider>
          </ModeratorContextProvider>           
        </StoreProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
