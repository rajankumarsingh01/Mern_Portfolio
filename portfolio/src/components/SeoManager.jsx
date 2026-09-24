import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://rajankumarsingh.me";
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const NAME = "Rajan Kumar Singh";

const PAGES = {
  "/": {
    title: `${NAME} — Full Stack MERN Developer`,
    description:
      "Portfolio of Rajan Kumar Singh: full-stack MERN developer building scalable web apps with AI integrations. Explore projects, skills and get in touch.",
  },
  "/projects": {
    title: `Projects — ${NAME}`,
    description:
      "Full-stack MERN and AI projects built by Rajan Kumar Singh, with live demos and source code.",
  },
  "/skills": {
    title: `Skills — ${NAME}`,
    description:
      "Tech stack of Rajan Kumar Singh: React, Node.js, Express, MongoDB, TypeScript, Tailwind CSS and AI API integrations.",
  },
  "/about": {
    title: `About — ${NAME}`,
    description:
      "About Rajan Kumar Singh, a computer science student and full-stack developer who builds modern, scalable web applications.",
  },
  "/contact": {
    title: `Contact — ${NAME}`,
    description:
      "Get in touch with Rajan Kumar Singh for internships, full-time roles, collaborations and freelance projects.",
  },
  "/articles": {
    title: `Articles — ${NAME}`,
    description:
      "Articles and write-ups by Rajan Kumar Singh on full-stack development, system design and AI.",
  },
  "/career": {
    title: `Career & Opportunities — ${NAME}`,
    description:
      "Career journey, internships and opportunities of Rajan Kumar Singh.",
  },
};

// Dynamic pages (Phase 5 me har page ka apna title/description aayega)
const DYNAMIC = [
  {
    prefix: "/project/",
    title: `Project — ${NAME}`,
    description:
      "Project by Rajan Kumar Singh: features, tech stack, live demo and source code.",
  },
  {
    prefix: "/article/",
    title: `Article — ${NAME}`,
    description: "Article by Rajan Kumar Singh on full-stack development and AI.",
  },
  {
    prefix: "/career/",
    title: `Opportunity — ${NAME}`,
    description: "Career opportunity details shared by Rajan Kumar Singh.",
  },
];

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const SeoManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.replace(/\/+$/, "") || "/";
    const page = PAGES[path] || DYNAMIC.find((d) => path.startsWith(d.prefix));
    const known = Boolean(page);
    const meta = page || {
      title: `Page not found — ${NAME}`,
      description: PAGES["/"].description,
    };
    const url = `${SITE_URL}${path === "/" ? "/" : path}`;

    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta("name", "robots", known ? "index, follow" : "noindex, nofollow");

    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", OG_IMAGE);

    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    setMeta("name", "twitter:image", OG_IMAGE);

    setCanonical(url);
  }, [pathname]);

  return null;
};

export default SeoManager;