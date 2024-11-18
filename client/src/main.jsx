import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./components/theme/theme-provider.jsx";
import { Toaster } from "./components/ui/toaster.jsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster />
        <App />
      </ThemeProvider>
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
