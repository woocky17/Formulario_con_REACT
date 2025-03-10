import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
//import { MantineProvider } from "@mantine/core";
//import "@mantine/core/styles.css";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
