import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar/Navbar";
import ScrollProgress from "../components/ScrollProgress";
import AmbientBackground from "../components/AmbientBackground";

const MainLayout = () => {
  return (
    <>
      
       <a href="#main-content"
        style={{
          position: "fixed",
          left: 16,
          top: -60,
          zIndex: 10000,
          background: "#0a0f0d",
          color: "#4ade80",
          padding: "10px 18px",
          borderRadius: 8,
          border: "1px solid rgba(74,222,128,0.4)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          textDecoration: "none",
          transition: "top 0.2s ease",
        }}
        onFocus={(e) => { e.currentTarget.style.top = "16px"; }}
        onBlur={(e) => { e.currentTarget.style.top = "-60px"; }}
      >
        Skip to main content
      </a>

      <AmbientBackground />
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;