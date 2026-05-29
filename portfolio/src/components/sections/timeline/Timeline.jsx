


import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, Sparkles, ArrowDownRight, Timer } from "lucide-react";

/* ── spring config ─────────────────────────────────────────── */
const SPRING = { type: "spring", stiffness: 260, damping: 28 };
const SOFT   = { type: "spring", stiffness: 120, damping: 20 };

/* ── Animated counter ──────────────────────────────────────── */
const Counter = ({ to }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 40);
    const t = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(t); }
      else setVal(start);
    }, 28);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{val}</span>;
};

/* ── Glitch text ───────────────────────────────────────────── */
const GlitchText = ({ text }) => {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 4000);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {text}
      {glitch && (
        <>
          <span style={{
            position: "absolute", top: 0, left: 0, color: "#22d3ee",
            clipPath: "polygon(0 20%, 100% 20%, 100% 40%, 0 40%)",
            transform: "translateX(-2px)", opacity: 0.8, pointerEvents: "none",
          }}>{text}</span>
          <span style={{
            position: "absolute", top: 0, left: 0, color: "#f97316",
            clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)",
            transform: "translateX(2px)", opacity: 0.8, pointerEvents: "none",
          }}>{text}</span>
        </>
      )}
    </span>
  );
};

/* ── Single card ───────────────────────────────────────────── */
const TimelineCard = ({ item, index, total }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isPresent = !item.timeline.to || item.timeline.to === "Present";
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{ ...SOFT, delay: index * 0.12 }}
      style={{ display: "flex", gap: 0, marginBottom: 0 }}
    >
      {/* ── Spine column ── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 56, flexShrink: 0 }}>

        {/* Dot */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ ...SPRING, delay: index * 0.12 + 0.15 }}
          style={{ position: "relative", zIndex: 2, marginTop: 22 }}
        >
          {/* Outer pulse ring — only for current */}
          {isPresent && (
            <motion.div
              animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              style={{
                position: "absolute", inset: -4,
                borderRadius: "50%",
                border: "1px solid #22d3ee",
                pointerEvents: "none",
              }}
            />
          )}

          <motion.div
            whileHover={{ scale: 1.15 }}
            style={{
              width: 40, height: 40, borderRadius: "50%",
              background: isPresent
                ? "linear-gradient(135deg, #22d3ee 0%, #6366f1 100%)"
                : "#18181b",
              border: `1px solid ${isPresent ? "transparent" : "#3f3f46"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: isPresent ? "0 0 20px rgba(34,211,238,0.4), 0 0 60px rgba(34,211,238,0.1)" : "none",
              cursor: "default",
            }}
          >
            {isPresent
              ? <Briefcase size={16} color="#09090b" strokeWidth={2.5} />
              : <GraduationCap size={15} color="#71717a" strokeWidth={1.8} />
            }
          </motion.div>
        </motion.div>

        {/* Connecting line */}
        {index < total - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.12 + 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 1, flex: 1, minHeight: 32, marginTop: 6,
              background: "linear-gradient(to bottom, #27272a 0%, #1c1c1f 100%)",
              transformOrigin: "top",
            }}
          />
        )}
      </div>

      {/* ── Card ── */}
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        whileHover={{ y: -3 }}
        transition={SOFT}
        style={{
          flex: 1, marginBottom: 20, marginLeft: 4,
          background: "#111113",
          border: `1px solid ${hovered ? (isPresent ? "#22d3ee30" : "#3f3f46") : "#27272a"}`,
          borderRadius: 16,
          padding: "20px 22px",
          position: "relative",
          overflow: "hidden",
          cursor: "default",
          transition: "border-color 0.2s",
          boxShadow: hovered
            ? isPresent
              ? "0 12px 40px rgba(34,211,238,0.08), 0 2px 8px rgba(0,0,0,0.4)"
              : "0 12px 40px rgba(0,0,0,0.3)"
            : "none",
        }}
      >
        {/* Mouse-tracked spotlight */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute",
                pointerEvents: "none",
                width: 300, height: 300,
                borderRadius: "50%",
                background: isPresent
                  ? "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
                left: mousePos.x - 150,
                top: mousePos.y - 150,
                zIndex: 0,
              }}
            />
          )}
        </AnimatePresence>

        {/* Top-left accent bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.12 + 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2,
            background: isPresent
              ? "linear-gradient(90deg, #22d3ee, #6366f1, transparent)"
              : "linear-gradient(90deg, #3f3f46, transparent)",
            transformOrigin: "left",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Date pill + NOW badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.12 + 0.2, duration: 0.4 }}
            style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 10px", borderRadius: 20,
              background: isPresent ? "#22d3ee0d" : "#18181b",
              border: `1px solid ${isPresent ? "#22d3ee20" : "#27272a"}`,
            }}>
              <Calendar size={10} color={isPresent ? "#22d3ee" : "#52525b"} />
              <span style={{
                fontSize: 10, fontWeight: 700,
                color: isPresent ? "#7ae8f7" : "#52525b",
                fontFamily: "'Space Mono', monospace",
                letterSpacing: "0.05em",
              }}>
                {item.timeline.from} → {item.timeline.to || "Present"}
              </span>
            </div>

            {isPresent && (
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  padding: "3px 9px", borderRadius: 20,
                  background: "linear-gradient(135deg, #22d3ee18, #6366f118)",
                  border: "1px solid #22d3ee30",
                }}
              >
                <div style={{
                  width: 5, height: 5, borderRadius: "50%", background: "#22d3ee",
                  boxShadow: "0 0 6px #22d3ee",
                }} />
                <span style={{
                  fontSize: 9, fontWeight: 700, color: "#22d3ee",
                  fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em",
                }}>LIVE</span>
              </motion.div>
            )}
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.12 + 0.28, ...SOFT }}
            style={{
              fontSize: 17, fontWeight: 800, color: "#f4f4f5",
              margin: "0 0 10px", lineHeight: 1.3,
              fontFamily: "'Cabinet Grotesk', sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            {item.title}
          </motion.h3>

          {/* Description */}
          {item.description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.12 + 0.38, duration: 0.5 }}
              style={{
                fontSize: 13.5, color: "#71717a", lineHeight: 1.75,
                margin: 0, fontFamily: "'Cabinet Grotesk', sans-serif",
              }}
            >
              {item.description}
            </motion.p>
          )}

          {/* Footer chip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.12 + 0.5 }}
            style={{
              marginTop: 14, paddingTop: 12,
              borderTop: "1px solid #1c1c1f",
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            <Timer size={10} color={isPresent ? "#22d3ee" : "#3f3f46"} />
            <span style={{
              fontSize: 9, color: isPresent ? "#22d3ee" : "#3f3f46",
              fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em", fontWeight: 700,
            }}>
              {isPresent ? "ONGOING" : `COMPLETED · ${index + 1} OF ${total}`}
            </span>
            <div style={{ flex: 1, height: 1, background: "#1c1c1f" }} />
            <span style={{
              fontSize: 9, color: "#3f3f46",
              fontFamily: "'Space Mono', monospace",
            }}>#{String(total - index).padStart(2, "0")}</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Main ──────────────────────────────────────────────────── */
const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    axios
      .get("https://mern-portfolio-backend-ke5j.onrender.com/api/v1/timeline/getall", { withCredentials: true })
      .then(({ data }) => { setTimeline(data.timelines); setLoaded(true); })
      .catch(console.log);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,600,500,400&display=swap');

        html { scroll-behavior: smooth; }
        *, *::before, *::after { box-sizing: border-box; }
      `}</style>

      <div ref={containerRef} style={{
        background: "#09090b", minHeight: "100vh",
        padding: "44px 28px 60px",
        fontFamily: "'Cabinet Grotesk', sans-serif",
      }}>

        {/* ── Hero header ── */}
        <div style={{ marginBottom: 52, maxWidth: 680 }}>

          {/* Label chip */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "5px 14px", borderRadius: 20, marginBottom: 16,
              background: "#22d3ee0d", border: "1px solid #22d3ee20",
            }}
          >
            <Sparkles size={11} color="#22d3ee" />
            <span style={{
              fontSize: 10, fontWeight: 700, color: "#22d3ee",
              fontFamily: "'Space Mono', monospace", letterSpacing: "0.12em",
            }}>CAREER JOURNEY</span>
          </motion.div>

          {/* Big heading with glitch */}
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 800, color: "#fafafa", margin: "0 0 14px",
              fontFamily: "'Cabinet Grotesk', sans-serif",
              lineHeight: 1.1, letterSpacing: "-0.03em",
            }}
          >
            <GlitchText text="Experience" />
            {" "}
            <span style={{
              background: "linear-gradient(135deg, #22d3ee, #6366f1)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Timeline</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{
              fontSize: 14, color: "#52525b",
              fontFamily: "'Space Mono', monospace", margin: "0 0 24px",
            }}
          >
            Building things, one milestone at a time.
          </motion.p>

          {/* Stats row */}
          {loaded && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
            >
              {[
                { label: "Milestones", value: timeline.length, accent: "#22d3ee" },
                { label: "Years Active", value: 4, accent: "#a78bfa" },
                { label: "Projects", value: 5, accent: "#f97316" },
              ].map(s => (
                <div key={s.label} style={{
                  padding: "10px 18px", borderRadius: 12,
                  background: "#111113", border: "1px solid #27272a",
                  display: "flex", flexDirection: "column", gap: 2, minWidth: 90,
                }}>
                  <span style={{
                    fontSize: 24, fontWeight: 800, color: s.accent,
                    fontFamily: "'Cabinet Grotesk', sans-serif", lineHeight: 1,
                  }}>
                    <Counter to={s.value} />+
                  </span>
                  <span style={{
                    fontSize: 9, color: "#3f3f46",
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                  }}>{s.label}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* ── Timeline body ── */}
        <div style={{ maxWidth: 680, position: "relative" }}>

          {/* Scroll-progress track */}
          <div style={{
            position: "absolute", left: 27, top: 22, bottom: 0,
            width: 1, background: "#1c1c1f", zIndex: 0,
          }} />
          <motion.div style={{
            position: "absolute", left: 27, top: 22,
            width: 1, height: lineHeight,
            background: "linear-gradient(to bottom, #22d3ee, #6366f1)",
            zIndex: 1, boxShadow: "0 0 8px rgba(34,211,238,0.4)",
          }} />

          {/* Cards */}
          <AnimatePresence>
            {timeline.map((item, i) => (
              <TimelineCard key={item._id} item={item} index={i} total={timeline.length} />
            ))}
          </AnimatePresence>

          {/* End marker */}
          {loaded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...SPRING, delay: 0.2 }}
              style={{ display: "flex", alignItems: "center", gap: 14, paddingLeft: 8, marginTop: 8 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "#18181b", border: "1px dashed #3f3f46",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <ArrowDownRight size={15} color="#3f3f46" />
              </motion.div>
              <div>
                <p style={{
                  fontSize: 11, color: "#3f3f46", margin: 0,
                  fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em",
                }}>MORE TO COME</p>
                <p style={{
                  fontSize: 10, color: "#27272a", margin: 0,
                  fontFamily: "'Space Mono', monospace",
                }}>The story isn't over yet.</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Timeline;
