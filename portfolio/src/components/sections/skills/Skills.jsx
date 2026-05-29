



// import axios from "axios";
// import React, { useEffect, useState, useRef } from "react";
// import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

// // ─── Magnetic Card Hook ───────────────────────────────────────────────────────
// const useMagnetic = (strength = 0.3) => {
//   const ref = useRef(null);
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const springX = useSpring(x, { stiffness: 300, damping: 20 });
//   const springY = useSpring(y, { stiffness: 300, damping: 20 });

//   const handleMouseMove = (e) => {
//     if (!ref.current) return;
//     const rect = ref.current.getBoundingClientRect();
//     const cx = rect.left + rect.width / 2;
//     const cy = rect.top + rect.height / 2;
//     x.set((e.clientX - cx) * strength);
//     y.set((e.clientY - cy) * strength);
//   };

//   const handleMouseLeave = () => {
//     x.set(0);
//     y.set(0);
//   };

//   return { ref, springX, springY, handleMouseMove, handleMouseLeave };
// };

// // ─── Individual Skill Card ────────────────────────────────────────────────────
// const SkillCard = ({ element, index }) => {
//   const { ref, springX, springY, handleMouseMove, handleMouseLeave } =
//     useMagnetic(0.25);
//   const [hovered, setHovered] = useState(false);

//   return (
//     <motion.div
//       ref={ref}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={() => {
//         handleMouseLeave();
//         setHovered(false);
//       }}
//       onMouseEnter={() => setHovered(true)}
//       style={{ x: springX, y: springY }}
//       initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
//       whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
//       className="relative group cursor-pointer"
//     >
//       {/* Glow ring on hover */}
//       <motion.div
//         className="absolute inset-0 rounded-2xl"
//         animate={{
//           boxShadow: hovered
//             ? "0 0 0 1.5px rgba(74,222,128,0.6), 0 0 30px rgba(74,222,128,0.15)"
//             : "0 0 0 1px rgba(255,255,255,0.06)",
//         }}
//         transition={{ duration: 0.25 }}
//         style={{ borderRadius: "16px" }}
//       />

//       {/* Card body */}
//       <div
//         className="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl overflow-hidden"
//         style={{
//           background: hovered
//             ? "linear-gradient(135deg, rgba(20,20,28,0.98) 0%, rgba(18,25,18,0.98) 100%)"
//             : "rgba(14,14,20,0.85)",
//           backdropFilter: "blur(20px)",
//           border: "1px solid rgba(255,255,255,0.05)",
//           transition: "background 0.3s",
//         }}
//       >
//         {/* Corner accent */}
//         <motion.div
//           className="absolute top-0 right-0 w-12 h-12"
//           animate={{ opacity: hovered ? 1 : 0 }}
//           transition={{ duration: 0.25 }}
//           style={{
//             background:
//               "radial-gradient(circle at top right, rgba(74,222,128,0.18) 0%, transparent 70%)",
//             borderRadius: "0 16px 0 0",
//           }}
//         />

//         {/* Floating number */}
//         <span
//           className="absolute top-2 left-3 font-mono text-xs select-none"
//           style={{ color: "rgba(74,222,128,0.25)", letterSpacing: "0.05em" }}
//         >
//           {String(index + 1).padStart(2, "0")}
//         </span>

//         {/* Icon */}
//         <motion.div
//           animate={{
//             y: hovered ? -4 : 0,
//             filter: hovered
//               ? "drop-shadow(0 0 12px rgba(74,222,128,0.4))"
//               : "drop-shadow(0 0 0px transparent)",
//           }}
//           transition={{ duration: 0.3 }}
//           className="relative z-10"
//         >
//           <img
//             src={element.svg?.url}
//             alt={element.title}
//             className="h-10 md:h-12 w-auto object-contain"
//           />
//         </motion.div>

//         {/* Name */}
//         <motion.p
//           animate={{ color: hovered ? "rgb(134,239,172)" : "rgb(209,213,219)" }}
//           transition={{ duration: 0.25 }}
//           className="text-xs md:text-sm font-medium text-center leading-tight z-10"
//           style={{ fontFamily: "'DM Mono', monospace" }}
//         >
//           {element.title}
//         </motion.p>

//         {/* Bottom shimmer line */}
//         <motion.div
//           className="absolute bottom-0 left-0 h-[2px] rounded-full"
//           animate={{ width: hovered ? "100%" : "0%" }}
//           transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
//           style={{ background: "linear-gradient(90deg, transparent, #4ade80, transparent)" }}
//         />
//       </div>
//     </motion.div>
//   );
// };

// // ─── Category Badge ───────────────────────────────────────────────────────────
// const categories = ["All", "Frontend", "Backend", "Database", "DevOps", "Tools"];

// // ─── Main Section ─────────────────────────────────────────────────────────────
// const Skills = () => {
//   const [skills, setSkills] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [count, setCount] = useState(0);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const getMySkills = async () => {
//       const { data } = await axios.get(
//         "https://mern-portfolio-backend-ke5j.onrender.com/api/v1/skill/getall",
//         { withCredentials: true }
//       );
//       setSkills(data.skills);
//     };
//     getMySkills();
//   }, []);

//   // Animated counter
//   useEffect(() => {
//     if (skills.length === 0) return;
//     let start = 0;
//     const step = Math.ceil(skills.length / 20);
//     const timer = setInterval(() => {
//       start += step;
//       if (start >= skills.length) {
//         setCount(skills.length);
//         clearInterval(timer);
//       } else {
//         setCount(start);
//       }
//     }, 40);
//     return () => clearInterval(timer);
//   }, [skills.length]);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative w-full max-w-7xl mx-auto py-24 px-6 overflow-hidden"
//     >
//       {/* ── Background grid pattern ── */}
//       <div
//         className="absolute inset-0 pointer-events-none"
//         style={{
//           backgroundImage: `
//             linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px)
//           `,
//           backgroundSize: "48px 48px",
//           maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)",
//         }}
//       />

//       {/* ── Ambient orb ── */}
//       <div
//         className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
//         style={{
//           width: "600px",
//           height: "200px",
//           background: "radial-gradient(ellipse, rgba(74,222,128,0.07) 0%, transparent 70%)",
//           filter: "blur(40px)",
//         }}
//       />

//       {/* ── Header ── */}
//       <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//         >
//           {/* Eyebrow */}
//           <div className="flex items-center gap-2 mb-3">
//             <div className="h-px w-8 bg-green-500" />
//             <span
//               className="text-xs uppercase tracking-[0.2em] text-green-400"
//               style={{ fontFamily: "'DM Mono', monospace" }}
//             >
//               Tech Stack
//             </span>
//           </div>

//           <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
//             <span className="text-white">My</span>{" "}
//             <span
//               style={{
//                 WebkitTextStroke: "1px rgba(74,222,128,0.8)",
//                 WebkitTextFillColor: "transparent",
//               }}
//             >
//               Skills
//             </span>
//           </h2>
//         </motion.div>

//         {/* Skill counter */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="flex items-center gap-3 px-5 py-3 rounded-full"
//           style={{
//             background: "rgba(74,222,128,0.08)",
//             border: "1px solid rgba(74,222,128,0.2)",
//           }}
//         >
//           <span className="text-3xl font-black text-green-400" style={{ fontFamily: "'DM Mono', monospace" }}>
//             {count}+
//           </span>
//           <span className="text-sm text-gray-400">Technologies</span>
//         </motion.div>
//       </div>

//       {/* ── Category Filter Pills ── */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.5, delay: 0.1 }}
//         className="flex flex-wrap gap-2 mb-10 relative z-10"
//       >
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setActiveCategory(cat)}
//             className="relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300"
//             style={{
//               fontFamily: "'DM Mono', monospace",
//               fontSize: "12px",
//               background:
//                 activeCategory === cat
//                   ? "rgba(74,222,128,0.15)"
//                   : "rgba(255,255,255,0.04)",
//               border:
//                 activeCategory === cat
//                   ? "1px solid rgba(74,222,128,0.5)"
//                   : "1px solid rgba(255,255,255,0.08)",
//               color: activeCategory === cat ? "rgb(134,239,172)" : "rgb(156,163,175)",
//             }}
//           >
//             {cat}
//             {activeCategory === cat && (
//               <motion.div
//                 layoutId="activeFilterBg"
//                 className="absolute inset-0 rounded-full"
//                 style={{ background: "rgba(74,222,128,0.08)" }}
//                 transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
//               />
//             )}
//           </button>
//         ))}
//       </motion.div>

//       {/* ── Skills Grid ── */}
//       <div className="relative z-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
//         {skills?.map((element, index) => (
//           <SkillCard key={element._id} element={element} index={index} />
//         ))}
//       </div>

//       {/* ── Bottom CTA Strip ── */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.5, delay: 0.3 }}
//         className="mt-14 flex items-center gap-4 relative z-10"
//       >
//         <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
//         <span
//           className="text-xs text-gray-600 uppercase tracking-widest"
//           style={{ fontFamily: "'DM Mono', monospace" }}
//         >
//           Always learning
//         </span>
//         <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
//       </motion.div>
//     </section>
//   );
// };

// export default Skills;







import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ─── Magnetic Card Hook ───────────────────────────────────────────────────────
const useMagnetic = (strength = 0.3) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 300,
    damping: 20,
  });

  const springY = useSpring(y, {
    stiffness: 300,
    damping: 20,
  });

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

  return {
    ref,
    springX,
    springY,
    handleMouseMove,
    handleMouseLeave,
  };
};

// ─── Skill Categories ─────────────────────────────────────────────────────────
const categories = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Tools",
];

// ─── Individual Skill Card ────────────────────────────────────────────────────
const SkillCard = ({ element, index }) => {
  const {
    ref,
    springX,
    springY,
    handleMouseMove,
    handleMouseLeave,
  } = useMagnetic(0.25);

  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave();
        setHovered(false);
      }}
      onMouseEnter={() => setHovered(true)}
      style={{
        x: springX,
        y: springY,
      }}
      initial={{
        opacity: 0,
        y: 40,
        filter: "blur(8px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative group cursor-pointer"
    >
      {/* Glow ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: hovered
            ? "0 0 0 1.5px rgba(74,222,128,0.6), 0 0 30px rgba(74,222,128,0.15)"
            : "0 0 0 1px rgba(255,255,255,0.06)",
        }}
        transition={{ duration: 0.25 }}
        style={{
          borderRadius: "16px",
        }}
      />

      {/* Card */}
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
        {/* Corner Accent */}
        <motion.div
          className="absolute top-0 right-0 w-12 h-12"
          animate={{
            opacity: hovered ? 1 : 0,
          }}
          transition={{
            duration: 0.25,
          }}
          style={{
            background:
              "radial-gradient(circle at top right, rgba(74,222,128,0.18) 0%, transparent 70%)",

            borderRadius: "0 16px 0 0",
          }}
        />

        {/* Floating Number */}
        <span
          className="absolute top-2 left-3 font-mono text-xs select-none"
          style={{
            color: "rgba(74,222,128,0.25)",
            letterSpacing: "0.05em",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Skill Category Badge */}
        {element.category && (
          <div
            className="absolute top-2 right-2 px-2 py-1 rounded-full text-[10px] uppercase tracking-wider"
            style={{
              background: "rgba(74,222,128,0.1)",
              border: "1px solid rgba(74,222,128,0.2)",
              color: "rgb(134,239,172)",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {element.category}
          </div>
        )}

        {/* Icon */}
        <motion.div
          animate={{
            y: hovered ? -4 : 0,

            filter: hovered
              ? "drop-shadow(0 0 12px rgba(74,222,128,0.4))"
              : "drop-shadow(0 0 0px transparent)",
          }}
          transition={{
            duration: 0.3,
          }}
          className="relative z-10"
        >
          <img
            src={element.svg?.url}
            alt={element.title}
            className="h-10 md:h-12 w-auto object-contain"
          />
        </motion.div>

        {/* Title */}
        <motion.p
          animate={{
            color: hovered
              ? "rgb(134,239,172)"
              : "rgb(209,213,219)",
          }}
          transition={{
            duration: 0.25,
          }}
          className="text-xs md:text-sm font-medium text-center leading-tight z-10"
          style={{
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {element.title}
        </motion.p>

        {/* Proficiency */}
        <div className="w-full mt-1 relative z-10">
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-[10px]"
              style={{
                color: "rgba(255,255,255,0.4)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Level
            </span>

            <span
              className="text-[10px]"
              style={{
                color: "rgb(134,239,172)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {element.proficiency}%
            </span>
          </div>

          <div
            className="h-[4px] rounded-full overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.06)",
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{
                width: `${element.proficiency}%`,
              }}
              transition={{
                duration: 1,
                delay: index * 0.05,
              }}
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #4ade80, #22c55e)",
              }}
            />
          </div>
        </div>

        {/* Bottom Line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] rounded-full"
          animate={{
            width: hovered ? "100%" : "0%",
          }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            background:
              "linear-gradient(90deg, transparent, #4ade80, transparent)",
          }}
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

  // ─── Fetch Skills ──────────────────────────────────────────────────────────
  useEffect(() => {
    const getMySkills = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          "https://mern-portfolio-backend-ke5j.onrender.com/api/v1/skill/getall",
          {
            withCredentials: true,
          }
        );

        setSkills(data.skills);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getMySkills();
  }, []);

  // ─── Animated Counter ─────────────────────────────────────────────────────
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

  // ─── Filter Skills ────────────────────────────────────────────────────────
  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter(
          (skill) => skill.category === activeCategory
        );

  return (
    <section
      ref={sectionRef}
      className="relative w-full max-w-7xl mx-auto py-24 px-6 overflow-hidden"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px)
          `,

          backgroundSize: "48px 48px",

          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)",
        }}
      />

      {/* Ambient Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "600px",
          height: "200px",

          background:
            "radial-gradient(ellipse, rgba(74,222,128,0.07) 0%, transparent 70%)",

          filter: "blur(40px)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
        <motion.div
          initial={{
            opacity: 0,
            x: -30,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-green-500" />

            <span
              className="text-xs uppercase tracking-[0.2em] text-green-400"
              style={{
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Tech Stack
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
            <span className="text-white">My</span>{" "}

            <span
              style={{
                WebkitTextStroke:
                  "1px rgba(74,222,128,0.8)",

                WebkitTextFillColor: "transparent",
              }}
            >
              Skills
            </span>
          </h2>
        </motion.div>

        {/* Counter */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="flex items-center gap-3 px-5 py-3 rounded-full"
          style={{
            background: "rgba(74,222,128,0.08)",

            border:
              "1px solid rgba(74,222,128,0.2)",
          }}
        >
          <span
            className="text-3xl font-black text-green-400"
            style={{
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {count}+
          </span>

          <span className="text-sm text-gray-400">
            Technologies
          </span>
        </motion.div>
      </div>

      {/* Category Filters */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: 0.1,
        }}
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

              background:
                activeCategory === cat
                  ? "rgba(74,222,128,0.15)"
                  : "rgba(255,255,255,0.04)",

              border:
                activeCategory === cat
                  ? "1px solid rgba(74,222,128,0.5)"
                  : "1px solid rgba(255,255,255,0.08)",

              color:
                activeCategory === cat
                  ? "rgb(134,239,172)"
                  : "rgb(156,163,175)",
            }}
          >
            {cat}

            {activeCategory === cat && (
              <motion.div
                layoutId="activeFilterBg"
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "rgba(74,222,128,0.08)",
                }}
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.4,
                }}
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {loading ? (
          [...Array(8)].map((_, index) => (
            <div
              key={index}
              className="h-36 rounded-2xl animate-pulse"
              style={{
                background:
                  "rgba(255,255,255,0.04)",
                border:
                  "1px solid rgba(255,255,255,0.04)",
              }}
            />
          ))
        ) : filteredSkills?.length > 0 ? (
          filteredSkills.map((element, index) => (
            <SkillCard
              key={element._id}
              element={element}
              index={index}
            />
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center py-20">
            <div
              className="px-8 py-6 rounded-2xl text-center"
              style={{
                background:
                  "rgba(255,255,255,0.03)",

                border:
                  "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                No Skills Found
              </h3>

              <p className="text-gray-500 text-sm">
                No technologies available in this category.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Strip */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: 0.3,
        }}
        className="mt-14 flex items-center gap-4 relative z-10"
      >
        <div
          className="flex-1 h-px"
          style={{
            background:
              "rgba(255,255,255,0.06)",
          }}
        />

        <span
          className="text-xs text-gray-600 uppercase tracking-widest"
          style={{
            fontFamily: "'DM Mono', monospace",
          }}
        >
          Always learning
        </span>

        <div
          className="flex-1 h-px"
          style={{
            background:
              "rgba(255,255,255,0.06)",
          }}
        />
      </motion.div>
    </section>
  );
};

export default Skills;