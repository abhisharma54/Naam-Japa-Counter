import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NaamProvider } from "./context/NaamProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NaamProvider>
      <App />
    </NaamProvider>
  </StrictMode>
);
