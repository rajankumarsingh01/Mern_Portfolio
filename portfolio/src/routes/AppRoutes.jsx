// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import MainLayout from "../layouts/MainLayout";

// import Home from "../pages/Home";
// import ProjectView from "../pages/ProjectView";

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route element={<MainLayout />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/project/:id" element={<ProjectView />} />
//       </Route>
//     </Routes>
//   );
// };

// export default AppRoutes;





















import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home        from "../pages/Home";
import ProjectView from "../pages/ProjectView";

// ⚠️ Component names MUST be PascalCase — lowercase names render as HTML tags, not components
import Projects from "../components/sections/projects/Portfolio";
import Skills   from "../components/sections/skills/Skills";
import Contact  from "../components/sections/contact/Contact";
import About    from "../components/sections/about/About";       // was: about (lowercase = broken)
import Hero     from "../components/sections/hero/Hero";         // was: hero  (lowercase = broken)
import Timeline from "../components/sections/timeline/Timeline";
import ArticleView from "../pages/ArticleView";

// Uncomment when Articles component is ready:
import Articles from "../components/sections/articles/Articles";



import Career from "../components/sections/career/Career";
import CareerView from "../pages/CareerView";


const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/"         element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills"   element={<Skills />} />
        <Route path="/contact"  element={<Contact />} />
        <Route path="/about"    element={<About />} />
        <Route path="/hero"     element={<Hero />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/article/:slug" element={<ArticleView />} />

        {/* Uncomment when ready: */}
        <Route path="/articles" element={<Articles />} />

        <Route path="/project/:id" element={<ProjectView />} />


<Route path="/career" element={<Career />} />
<Route path="/career/:slug" element={<CareerView />} />

      </Route>
    </Routes>
  );
};

export default AppRoutes;