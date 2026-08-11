// import "./App.css";
// import { ThemeProvider } from "@/components/theme-provider";
// import { ModeToggle } from "./components/mode-toggle";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import ProjectView from "./pages/ProjectView";
// import Footer from "./components/layout/Footer";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import PortfolioAI from "./pages/PortfolioAI";


// function App() {
//   return (
//     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//       <Router>
//         <PortfolioAI />
//         {/* <ModeToggle /> */}
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/project/:id" element={<ProjectView />} />
//         </Routes>
//         <Footer />
//         <ToastContainer position="bottom-right" theme="dark" />
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;






import "./App.css";

import { ThemeProvider } from "@/components/theme-provider";

import { BrowserRouter as Router } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import PortfolioAI from "./pages/PortfolioAI";

import AppRoutes from "./routes/AppRoutes";


import Terminal from "./components/terminal/Terminal";


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <PortfolioAI />

        <Terminal />

        <AppRoutes />

        <ToastContainer position="bottom-right" theme="dark" />
      </Router>
    </ThemeProvider>
  );
}

export default App;