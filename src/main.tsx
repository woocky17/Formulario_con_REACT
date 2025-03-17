import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { I18nextProvider } from 'react-i18next';
import i18n from "./components/multiidioma.tsx";

createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    <I18nextProvider i18n={i18n}>
    <App />
    </I18nextProvider>
  </MantineProvider>
);
