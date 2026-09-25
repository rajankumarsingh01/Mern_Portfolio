import "./App.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";
import VisitTracker from "./components/VisitTracker";
import SeoManager from "./components/SeoManager";
import SmoothScroll from "./components/SmoothScroll";
import CommandPalette from "./components/CommandPalette";

// Floating widgets first paint ke baad (browser idle hone par) load hote hain
const PortfolioAI = lazy(() => import("./pages/PortfolioAI"));
const Terminal = lazy(() => import("./components/terminal/Terminal"));
const EndlessRunner = lazy(() => import("./components/game/EndlessRunner"));

const useWhenIdle = (timeout = 3000) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const run = () => setReady(true);

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(run, { timeout });
      return () => window.cancelIdleCallback(id);
    }

    const id = setTimeout(run, 1500);
    return () => clearTimeout(id);
  }, [timeout]);

  return ready;
};

function App() {
  const widgetsReady = useWhenIdle();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <SeoManager />
        <VisitTracker />
        <SmoothScroll />
        <CommandPalette />
        <AppRoutes />
        {widgetsReady && (
          <Suspense fallback={null}>
            <PortfolioAI />
            <Terminal />
            <EndlessRunner />
          </Suspense>
        )}
        <ToastContainer position="bottom-right" theme="dark" />
      </Router>
    </ThemeProvider>
  );
}

export default App;