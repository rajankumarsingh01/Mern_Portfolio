import { API_URL } from "@/config/api";
import { optimizeImage, PLACEHOLDER_IMG } from "@/lib/img";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const FEATURED_COUNT = 4;

const TechTags = ({ raw, max = 3 }) => {
  const tags = (raw || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, max);
  if (tags.length === 0) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {tags.map((t) => (
        <span
          key={t}
          style={{
            fontSize: 10.5,
            padding: "3px 9px",
            borderRadius: 20,
            background: "rgba(74,222,128,0.1)",
            border: "1px solid rgba(74,222,128,0.25)",
            color: "#86efac",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
};

// Big featured tile — title/stack/tags ALWAYS visible (not hover-only, mobile-safe)
const FeaturedCard = ({ project, large }) => (
  <Link to={`/project/${project._id}`} style={{ textDecoration: "none" }}>
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
      style={{ height: large ? 420 : 260 }}
    >
      <img
        src={optimizeImage(project?.projectBanner?.url, 900) || PLACEHOLDER_IMG}
        alt={project?.title || "Project"}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Always-on gradient so text is readable without needing hover */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(2,4,8,0.95) 0%, rgba(2,4,8,0.55) 45%, rgba(2,4,8,0.05) 75%)",
        }}
      />

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: large ? "28px" : "20px" }}>
        {project.stack && (
          <span
            style={{
              display: "inline-block",
              marginBottom: 10,
              padding: "3px 10px",
              borderRadius: 20,
              background: "rgba(74,222,128,0.15)",
              border: "1px solid rgba(74,222,128,0.35)",
              color: "#4ade80",
              fontSize: 11,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {project.stack}
          </span>
        )}
        <h3
          style={{
            fontSize: large ? 24 : 18,
            fontWeight: 700,
            color: "#fff",
            fontFamily: "'Syne', sans-serif",
            marginBottom: 10,
            lineHeight: 1.25,
          }}
        >
          {project?.title}
        </h3>
        <TechTags raw={project?.technologies} max={large ? 4 : 3} />
      </div>

      <div
        className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)" }}
      >
        <ArrowUpRight size={16} color="#fff" />
      </div>
    </motion.div>
  </Link>
);

// Compact row for "More Projects"
const MoreProjectRow = ({ project }) => (
  <Link to={`/project/${project._id}`} style={{ textDecoration: "none" }}>
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "12px 14px",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.015)",
      }}
    >
      <img
        src={optimizeImage(project?.projectBanner?.url, 200) || PLACEHOLDER_IMG}
        alt={project?.title || "Project"}
        loading="lazy"
        style={{ width: 56, height: 56, borderRadius: 10, objectFit: "cover", flexShrink: 0 }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#e2e8f0",
            fontFamily: "'Syne', sans-serif",
            marginBottom: 4,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {project?.title}
        </p>
        <TechTags raw={project?.technologies} max={2} />
      </div>
      <ArrowUpRight size={16} color="rgba(255,255,255,0.35)" style={{ flexShrink: 0 }} />
    </motion.div>
  </Link>
);

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllMore, setShowAllMore] = useState(false);

  useEffect(() => {
    const getMyProjects = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/v1/project/getall`, {
          withCredentials: true,
        });
        setProjects(Array.isArray(data?.projects) ? data.projects : []);
      } catch (error) {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    getMyProjects();
  }, []);

  const safeProjects = Array.isArray(projects) ? projects : [];
  const featured = safeProjects.slice(0, FEATURED_COUNT);
  const rest = safeProjects.slice(FEATURED_COUNT);
  const visibleRest = showAllMore ? rest : rest.slice(0, 6);

  return (
    <section className="w-full max-w-7xl mx-auto py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          Selected <span className="text-green-500">Projects</span>
        </h1>
        <div className="w-20 h-1 bg-green-500 mx-auto mt-4 rounded-full"></div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <h2 className="text-gray-400 text-lg animate-pulse">Loading Projects...</h2>
        </div>
      ) : safeProjects.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <h2 className="text-gray-500 text-lg">No Projects Found</h2>
        </div>
      ) : (
        <>
          {/* ── Featured bento grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {featured[0] && (
              <div className="md:row-span-2">
                <FeaturedCard project={featured[0]} large />
              </div>
            )}
            {featured.slice(1).map((p) => (
              <FeaturedCard key={p._id} project={p} />
            ))}
          </div>

          {/* ── More Projects (compact list) ── */}
          {rest.length > 0 && (
            <div className="mt-14">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="text-xs uppercase tracking-[0.15em]"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.4)" }}
                >
                  More Projects
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {visibleRest.map((p) => (
                  <MoreProjectRow key={p._id} project={p} />
                ))}
              </div>

              {rest.length > 6 && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowAllMore(!showAllMore)}
                    style={{
                      padding: "10px 28px",
                      borderRadius: 100,
                      border: "1px solid rgba(74,222,128,0.35)",
                      background: "rgba(74,222,128,0.08)",
                      color: "#4ade80",
                      fontSize: 13,
                      fontFamily: "'JetBrains Mono', monospace",
                      cursor: "pointer",
                    }}
                  >
                    {showAllMore ? "Show Less" : `Show ${rest.length - 6} More`}
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Portfolio;