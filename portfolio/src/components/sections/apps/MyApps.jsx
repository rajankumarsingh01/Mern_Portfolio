
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

// ─── Tilt Card (3D perspective on hover) ─────────────────────────────────────
const TiltCard = ({ element, index }) => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotX = useSpring(rotateX, { stiffness: 200, damping: 18 });
  const springRotY = useSpring(rotateY, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 18);
    rotateX.set(-py * 18);
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        rotateX: springRotX,
        rotateY: springRotY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className="relative cursor-pointer group"
    >
      {/* Spotlight follow cursor */}
      {hovered && (
        <div
          className="absolute pointer-events-none rounded-2xl"
          style={{
            inset: 0,
            background: `radial-gradient(120px circle at ${tooltipPos.x}px ${tooltipPos.y}px, rgba(74,222,128,0.1), transparent 70%)`,
            zIndex: 1,
            borderRadius: "16px",
          }}
        />
      )}

      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          opacity: hovered ? 1 : 0,
          boxShadow: hovered
            ? "0 8px 40px rgba(74,222,128,0.12), 0 0 0 1px rgba(74,222,128,0.35)"
            : "0 0 0 1px rgba(255,255,255,0.05)",
        }}
        transition={{ duration: 0.3 }}
        style={{ borderRadius: "16px" }}
      />

      {/* Card */}
      <div
        className="relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(12,12,18,0.9)",
          border: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(24px)",
          transform: "translateZ(0)",
        }}
      >
        {/* Index tag */}
        <div
          className="absolute top-2 right-2 text-[10px] rounded-full px-1.5 py-0.5"
          style={{
            background: "rgba(74,222,128,0.1)",
            color: "rgba(74,222,128,0.5)",
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.05em",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Icon with 3D lift */}
        <motion.div
          animate={{
            y: hovered ? -6 : 0,
            filter: hovered
              ? "drop-shadow(0 8px 16px rgba(74,222,128,0.3))"
              : "drop-shadow(0 0 0 transparent)",
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: "preserve-3d", translateZ: hovered ? 20 : 0 }}
        >
          <img
            src={element.svg?.url}
            alt={element.name}
            className="h-10 md:h-12 w-auto object-contain"
            style={{ maxWidth: "56px" }}
          />
        </motion.div>

        {/* Name */}
        <motion.p
          animate={{ color: hovered ? "rgb(134,239,172)" : "rgb(209,213,219)" }}
          transition={{ duration: 0.2 }}
          className="text-xs font-medium text-center leading-snug"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {element.name}
        </motion.p>

        {/* Bottom progress bar shimmer */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px]"
          initial={{ width: "0%" }}
          animate={{ width: hovered ? "100%" : "0%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #4ade80 50%, transparent 100%)",
          }}
        />
      </div>
    </motion.div>
  );
};

// ─── Bento Feature Card ───────────────────────────────────────────────────────
const BentoStatCard = ({ label, value, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col justify-between p-5 rounded-2xl"
    style={{
      background: "rgba(14,14,20,0.8)",
      border: "1px solid rgba(255,255,255,0.06)",
      backdropFilter: "blur(16px)",
    }}
  >
    <span className="text-2xl">{icon}</span>
    <div>
      <p
        className="text-3xl font-black text-green-400 leading-none"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {value}
      </p>
      <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{label}</p>
    </div>
  </motion.div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const MyApps = () => {
  const [apps, setApps] = useState([]);
  const [activeView, setActiveView] = useState("grid"); // grid | list
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const getMyApps = async () => {
      const { data } = await axios.get(
        "https://mern-portfolio-backend-ke5j.onrender.com/api/v1/softwareapplication/getall",
        { withCredentials: true }
      );
      setApps(data.softwareApplications);
    };
    getMyApps();
  }, []);

  const filtered = apps.filter((a) =>
    a.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="relative w-full max-w-7xl mx-auto py-24 px-6 overflow-hidden">
      {/* ── Background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(74,222,128,0.04) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 50%, black, transparent)",
        }}
      />
      <div
        className="absolute right-0 top-1/4 pointer-events-none"
        style={{
          width: "500px",
          height: "400px",
          background:
            "radial-gradient(ellipse at right, rgba(74,222,128,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Header ── */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
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
              Arsenal
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
            <span className="text-white">Tools &</span>
            <br />
            <span
              style={{
                WebkitTextStroke: "1px rgba(74,222,128,0.8)",
                WebkitTextFillColor: "transparent",
              }}
            >
              Applications
            </span>
          </h2>
        </motion.div>

        {/* Bento stat mini cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-2 gap-3 md:w-56"
        >
          <BentoStatCard label="Apps" value={apps.length} icon="⚡" delay={0.2} />
          <BentoStatCard label="Daily Use" value="12+" icon="🛠" delay={0.25} />
        </motion.div>
      </div>

      {/* ── Search + View Toggle Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex items-center gap-3 mb-10 relative z-10"
      >
        {/* Search input */}
        <div
          className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300"
          style={{
            background: "rgba(14,14,20,0.9)",
            border: isSearchFocused
              ? "1px solid rgba(74,222,128,0.4)"
              : "1px solid rgba(255,255,255,0.07)",
            boxShadow: isSearchFocused
              ? "0 0 0 3px rgba(74,222,128,0.05)"
              : "none",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(74,222,128,0.6)"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="flex-1 bg-transparent text-sm text-gray-300 outline-none placeholder-gray-600"
            style={{ fontFamily: "'DM Mono', monospace" }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-gray-600 hover:text-gray-400 transition-colors text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* View toggle */}
        <div
          className="flex gap-1 p-1 rounded-xl"
          style={{
            background: "rgba(14,14,20,0.9)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {["grid", "list"].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className="px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
              style={{
                background:
                  activeView === view ? "rgba(74,222,128,0.15)" : "transparent",
                color:
                  activeView === view ? "rgb(134,239,172)" : "rgb(107,114,128)",
                border:
                  activeView === view
                    ? "1px solid rgba(74,222,128,0.3)"
                    : "1px solid transparent",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {view === "grid" ? "⊞" : "☰"}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Apps Grid / List ── */}
      <AnimatePresence mode="wait">
        {activeView === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4"
          >
            {filtered?.map((element, index) => (
              <TiltCard key={element._id} element={element} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 flex flex-col gap-2"
          >
            {filtered?.map((element, index) => (
              <motion.div
                key={element._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="flex items-center gap-4 px-5 py-3 rounded-xl group cursor-pointer"
                style={{
                  background: "rgba(12,12,18,0.85)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  backdropFilter: "blur(16px)",
                  transition: "border-color 0.2s",
                }}
                whileHover={{
                  borderColor: "rgba(74,222,128,0.3)",
                  x: 4,
                }}
              >
                <img
                  src={element.svg?.url}
                  alt={element.name}
                  className="h-7 w-7 object-contain"
                />
                <span
                  className="text-sm text-gray-300 group-hover:text-green-400 transition-colors"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {element.name}
                </span>
                <div className="ml-auto flex items-center gap-2">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(74,222,128,0.08)",
                      color: "rgba(74,222,128,0.5)",
                      border: "1px solid rgba(74,222,128,0.15)",
                    }}
                  >
                    Active
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── No results ── */}
      {filtered.length === 0 && searchQuery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 text-gray-600 relative z-10"
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "14px" }}
        >
          No results for "{searchQuery}"
        </motion.div>
      )}

      {/* ── Footer strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-14 flex items-center gap-4 relative z-10"
      >
        <div
          className="flex-1 h-px"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />
        <span
          className="text-xs text-gray-700 uppercase tracking-widest"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          Powered by passion
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />
      </motion.div>
    </section>
  );
};

export default MyApps;