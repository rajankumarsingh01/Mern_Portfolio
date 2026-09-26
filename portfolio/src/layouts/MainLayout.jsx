import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar/Navbar";
import ScrollProgress from "../components/ScrollProgress";
import AmbientBackground from "../components/AmbientBackground";

const MainLayout = () => {
  return (
    <>
      <a
        href="#main-content"
        style={{
          position: "absolute",
          left: -9999,
          top: 0,
          zIndex: 10000,
          background: "#16a34a",
          color: "#fff",
          padding: "10px 18px",
          borderRadius: 8,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          textDecoration: "none",
        }}
        onFocus={(e) => {
          e.currentTarget.style.left = "16px";
          e.currentTarget.style.top = "16px";
        }}
        onBlur={(e) => {
          e.currentTarget.style.left = "-9999px";
        }}
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