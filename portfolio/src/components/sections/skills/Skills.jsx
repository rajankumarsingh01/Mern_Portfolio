import { API_URL } from "@/config/api";

import axios from "axios";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ─── Magnetic Card Hook ───────────────────────────────────────────────────────
const useMagnetic = (strength = 0.3) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, springX, springY, handleMouseMove, handleMouseLeave };
};

// ─── Skill Categories ─────────────────────────────────────────────────────────
const categories = ["All", "Frontend", "Backend", "Database", "DevOps", "Tools"];

// ─── Proficiency (0-100, dashboard slider) → Level label ─────────────────────
// Raw numbers ("29%", "48%") look weak. DB still stores the number (dashboard
// slider unchanged) — frontend just shows a level word + dot strip instead.
const getLevel = (proficiency = 0) => {
  if (proficiency >= 80) return { label: "Daily Use", dots: 4 };
  if (proficiency >= 55) return { label: "Comfortable", dots: 3 };
  if (proficiency >= 30) return { label: "Familiar", dots: 2 };
  return { label: "Learning", dots: 1 };
};

const LevelDots = ({ filled }) => (
  <div className="flex items-center gap-1">
    {[0, 1, 2, 3].map((i) => (
      <span
        key={i}
        className="rounded-full"
        style={{
          width: 5,
          height: 5,
          background: i < filled ? "#4ade80" : "rgba(255,255,255,0.12)",
          boxShadow: i < filled ? "0 0 6px rgba(74,222,128,0.6)" : "none",
        }}
      />
    ))}
  </div>
);

// ─── Individual Skill Card ────────────────────────────────────────────────────
const SkillCard = ({ element, index }) => {
  const { ref, springX, springY, handleMouseMove, handleMouseLeave } = useMagnetic(0.25);
  const [hovered, setHovered] = useState(false);
  const level = getLevel(element.proficiency);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave();
        setHovered(false);
      }}
      onMouseEnter={() => setHovered(true)}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="relative group cursor-pointer"
    >
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: hovered
            ? "0 0 0 1.5px rgba(74,222,128,0.6), 0 0 30px rgba(74,222,128,0.15)"
            : "0 0 0 1px rgba(255,255,255,0.06)",
        }}
        transition={{ duration: 0.25 }}
        style={{ borderRadius: "16px" }}
      />

      <div
        className="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl overflow-hidden"
        style={{
          background: hovered
            ? "linear-gradient(135deg, rgba(20,20,28,0.98) 0%, rgba(18,25,18,0.98) 100%)"
            : "rgba(14,14,20,0.85)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.05)",
          transition: "background 0.3s",
        }}
      >
        <motion.div
          className="absolute top-0 right-0 w-12 h-12"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            background:
              "radial-gradient(circle at top right, rgba(74,222,128,0.18) 0%, transparent 70%)",
            borderRadius: "0 16px 0 0",
          }}
        />

        <span
          className="absolute top-2 left-3 font-mono text-xs select-none"
          style={{ color: "rgba(74,222,128,0.25)", letterSpacing: "0.05em" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <motion.div
          animate={{
            y: hovered ? -4 : 0,
            filter: hovered
              ? "drop-shadow(0 0 12px rgba(74,222,128,0.4))"
              : "drop-shadow(0 0 0px transparent)",
          }}
          transition={{ duration: 0.3 }}
          className="relative z-10 mt-2"
        >
          <img
            src={element.svg?.url}
            alt={element.title}
            className="h-10 md:h-12 w-auto object-contain"
          />
        </motion.div>

        <motion.p
          animate={{ color: hovered ? "rgb(134,239,172)" : "rgb(209,213,219)" }}
          transition={{ duration: 0.25 }}
          className="text-xs md:text-sm font-medium text-center leading-tight z-10"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {element.title}
        </motion.p>

        {/* Level (replaces the raw % bar) */}
        <div className="w-full mt-1 relative z-10 flex items-center justify-between">
          <span
            className="text-[10px]"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Mono', monospace" }}
          >
            {level.label}
          </span>
          <LevelDots filled={level.dots} />
        </div>

        <motion.div
          className="absolute bottom-0 left-0 h-[2px] rounded-full"
          animate={{ width: hovered ? "100%" : "0%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: "linear-gradient(90deg, transparent, #4ade80, transparent)" }}
        />
      </div>
    </motion.div>
  );
};

// ─── Main Skills Section ──────────────────────────────────────────────────────
const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const getMySkills = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/api/v1/skill/getall`, {
          withCredentials: true,
        });
        setSkills(data.skills);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getMySkills();
  }, []);

  useEffect(() => {
    if (skills.length === 0) return;
    let start = 0;
    const step = Math.ceil(skills.length / 20);
    const timer = setInterval(() => {
      start += step;
      if (start >= skills.length) {
        setCount(skills.length);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 40);
    return () => clearInterval(timer);
  }, [skills.length]);

  const filteredSkills =
    activeCategory === "All" ? skills : skills.filter((skill) => skill.category === activeCategory);

  // Group by category (only when "All" is selected)
  const groupedSkills = useMemo(() => {
    if (activeCategory !== "All") {
      return [{ category: activeCategory, items: filteredSkills }];
    }
    const knownCats = categories.filter((c) => c !== "All");
    const groups = knownCats
      .map((cat) => ({ category: cat, items: skills.filter((s) => s.category === cat) }))
      .filter((g) => g.items.length > 0);

    const known = new Set(knownCats);
    const other = skills.filter((s) => !known.has(s.category));
    if (other.length > 0) groups.push({ category: "Other", items: other });

    return groups;
  }, [activeCategory, skills, filteredSkills]);

  return (
    <section ref={sectionRef} className="relative w-full max-w-7xl mx-auto py-24 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)",
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "600px",
          height: "200px",
          background: "radial-gradient(ellipse, rgba(74,222,128,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-green-500" />
            <span
              className="text-xs uppercase tracking-[0.2em] text-green-400"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Tech Stack
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
            <span className="text-white">My</span>{" "}
            <span
              style={{ WebkitTextStroke: "1px rgba(74,222,128,0.8)", WebkitTextFillColor: "transparent" }}
            >
              Skills
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-3 px-5 py-3 rounded-full"
          style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" }}
        >
          <span className="text-3xl font-black text-green-400" style={{ fontFamily: "'DM Mono', monospace" }}>
            {count}+
          </span>
          <span className="text-sm text-gray-400">Technologies</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap gap-2 mb-10 relative z-10"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "12px",
              background: activeCategory === cat ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.04)",
              border:
                activeCategory === cat ? "1px solid rgba(74,222,128,0.5)" : "1px solid rgba(255,255,255,0.08)",
              color: activeCategory === cat ? "rgb(134,239,172)" : "rgb(156,163,175)",
            }}
          >
            {cat}
            {activeCategory === cat && (
              <motion.div
                layoutId="activeFilterBg"
                className="absolute inset-0 rounded-full"
                style={{ background: "rgba(74,222,128,0.08)" }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
          </button>
        ))}
      </motion.div>

      <div className="relative z-10">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="h-32 rounded-2xl animate-pulse"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.04)" }}
              />
            ))}
          </div>
        ) : groupedSkills.length > 0 ? (
          groupedSkills.map((group, gIndex) => (
            <div key={group.category} className={gIndex > 0 ? "mt-12" : ""}>
              {activeCategory === "All" && (
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="text-xs uppercase tracking-[0.15em]"
                    style={{ fontFamily: "'DM Mono', monospace", color: "rgba(255,255,255,0.4)" }}
                  >
                    {group.category}
                  </span>
                  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                  <span
                    className="text-[10px]"
                    style={{ fontFamily: "'DM Mono', monospace", color: "rgba(255,255,255,0.25)" }}
                  >
                    {group.items.length}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {group.items.map((element, index) => (
                  <SkillCard key={element._id} element={element} index={index} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center py-20">
            <div
              className="px-8 py-6 rounded-2xl text-center"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <h3 className="text-xl font-semibold text-white mb-2">No Skills Found</h3>
              <p className="text-gray-500 text-sm">No technologies available in this category.</p>
            </div>
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-14 flex items-center gap-4 relative z-10"
      >
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
        <span
          className="text-xs text-gray-600 uppercase tracking-widest"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          Always learning
        </span>
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
      </motion.div>
    </section>
  );
};

export default Skills;