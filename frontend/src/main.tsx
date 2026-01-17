import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./index.css";
import "./globals.css";
import { ThemeProvider } from "./components/theme_provider";
import NavBar from "./components/navbar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <div className="p-8">
        <NavBar />
        <App />
      </div>
    </ThemeProvider>
  </StrictMode>,
);
