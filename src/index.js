import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/globals.css";

import { AuthProvider } from "./context/AuthContext";
import { WalletProvider } from "./context/WalletContext";

const rootEl = document.getElementById("root");
const root = createRoot(rootEl);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <WalletProvider>
        <App />
      </WalletProvider>
    </AuthProvider>
  </React.StrictMode>
);

