import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AuthContextProvider from "./contexts/AuthContext.tsx";
import Initializer from "./pages/login/Initializer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Initializer>
          <App />
        </Initializer>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
