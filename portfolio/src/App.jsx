import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PortfolioAI from "./pages/PortfolioAI";
import AppRoutes from "./routes/AppRoutes";
import EndlessRunner from "./components/game/EndlessRunner";
import Terminal from "./components/terminal/Terminal";
import VisitTracker from "./components/VisitTracker";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <VisitTracker />
        <PortfolioAI />
        <Terminal />
        <EndlessRunner />
        <AppRoutes />
        <ToastContainer position="bottom-right" theme="dark" />
      </Router>
    </ThemeProvider>
  );
}

export default App;