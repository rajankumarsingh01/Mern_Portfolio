import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Hero from "../components/sections/hero/Hero";

// Home ke alawa har page apne alag chunk me hai, jo visit karne par hi load hota hai
const Projects = lazy(() => import("../components/sections/projects/Portfolio"));
const Skills = lazy(() => import("../components/sections/skills/Skills"));
const Contact = lazy(() => import("../components/sections/contact/Contact"));
const About = lazy(() => import("../components/sections/about/About"));
const Timeline = lazy(() => import("../components/sections/timeline/Timeline"));
const Articles = lazy(() => import("../components/sections/articles/Articles"));
const Career = lazy(() => import("../components/sections/career/Career"));
const ProjectView = lazy(() => import("../pages/ProjectView"));
const ArticleView = lazy(() => import("../pages/ArticleView"));
const CareerView = lazy(() => import("../pages/CareerView"));
const NotFound = lazy(() => import("../pages/NotFound"));

const RouteFallback = () => (
  <div style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
    <div className="h-8 w-8 rounded-full border-2 border-green-500/30 border-t-green-500 animate-spin" />
  </div>
);

const Page = ({ children }) => (
  <Suspense fallback={<RouteFallback />}>{children}</Suspense>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Page><Projects /></Page>} />
        <Route path="/skills" element={<Page><Skills /></Page>} />
        <Route path="/contact" element={<Page><Contact /></Page>} />
        <Route path="/about" element={<Page><About /></Page>} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/timeline" element={<Page><Timeline /></Page>} />
        <Route path="/articles" element={<Page><Articles /></Page>} />
        <Route path="/article/:slug" element={<Page><ArticleView /></Page>} />
        <Route path="/project/:id" element={<Page><ProjectView /></Page>} />
        <Route path="/career" element={<Page><Career /></Page>} />
        <Route path="/career/:slug" element={<Page><CareerView /></Page>} />
        <Route path="*" element={<Page><NotFound /></Page>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;