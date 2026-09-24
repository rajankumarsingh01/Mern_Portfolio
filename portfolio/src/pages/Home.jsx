import React, { lazy } from "react";
import Hero from "../components/sections/hero/Hero";
import LazySection from "../components/LazySection";

// Hero turant load hota hai (first paint). Baaki sections scroll ke paas aane par load hote hain.
const Timeline = lazy(() => import("../components/sections/timeline/Timeline"));
const About = lazy(() => import("../components/sections/about/About"));
const Skills = lazy(() => import("../components/sections/skills/Skills"));
const Portfolio = lazy(() => import("../components/sections/projects/Portfolio"));
const Career = lazy(() => import("../components/sections/career/Career"));
const Articles = lazy(() => import("../components/sections/articles/Articles"));
const MyApps = lazy(() => import("../components/sections/apps/MyApps"));
const Contact = lazy(() => import("../components/sections/contact/Contact"));

const Home = () => {
  return (
    <article className="px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14">
      <Hero />

      <LazySection id="timeline" minHeight={420}>
        <Timeline />
      </LazySection>

      <LazySection id="about" minHeight={600}>
        <About />
      </LazySection>

      <LazySection id="skills" minHeight={500}>
        <Skills />
      </LazySection>

      <LazySection id="projects" minHeight={600}>
        <Portfolio />
      </LazySection>

      <LazySection id="career" minHeight={400}>
        <Career />
      </LazySection>

      <LazySection minHeight={400}>
        <Articles />
      </LazySection>

      <LazySection id="apps" minHeight={400}>
        <MyApps />
      </LazySection>

      <LazySection id="contact" minHeight={600}>
        <Contact />
      </LazySection>
    </article>
  );
};

export default Home;