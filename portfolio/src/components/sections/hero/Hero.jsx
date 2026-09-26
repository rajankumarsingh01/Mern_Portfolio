// import { Github, Linkedin, Youtube, Mail, ArrowDown, Download } from "lucide-react";
// import React, { useRef } from "react";
// import { Typewriter } from "react-simple-typewriter";
// import { motion, useMotionValue, useSpring } from "framer-motion";
// import HeroSkeleton from "./HeroSkeleton";
// import { useProfile } from "@/hooks/useProfile";
// import { SITE } from "@/config/site";

// const STACK = ["React", "Node.js", "Express", "MongoDB", "TypeScript", "Tailwind"];

// const containerVariants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.12 } },
// };
// const itemVariants = {
//   hidden: { opacity: 0, y: 24 },
//   visible: { opacity: 1, y: 0 },
// };

// // Word-by-word reveal for the headline — each word fades/slides in with a
// // small stagger instead of the whole line appearing at once.
// const wordContainer = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
// };
// const wordItem = {
//   hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
//   visible: {
//     opacity: 1,
//     y: 0,
//     filter: "blur(0px)",
//     transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
//   },
// };

// const RevealHeadline = ({ text }) => (
//   <motion.span
//     variants={wordContainer}
//     initial="hidden"
//     animate="visible"
//     style={{ display: "inline" }}
//   >
//     {text.split(" ").map((word, i) => (
//       <motion.span
//         key={`${word}-${i}`}
//         variants={wordItem}
//         style={{ display: "inline-block", marginRight: "0.28em" }}
//       >
//         {word}
//       </motion.span>
//     ))}
//   </motion.span>
// );

// const Hero = () => {
//   const { profile: user, failed } = useProfile();
//   const heroRef = useRef(null);

//   // Cursor-following spotlight behind the headline (spring-smoothed, desktop only —
//   // harmless no-op on touch devices since mousemove just never fires there).
//   const glowX = useMotionValue(0);
//   const glowY = useMotionValue(0);
//   const springX = useSpring(glowX, { stiffness: 120, damping: 22 });
//   const springY = useSpring(glowY, { stiffness: 120, damping: 22 });

//   const handleMouseMove = (e) => {
//     if (!heroRef.current) return;
//     const rect = heroRef.current.getBoundingClientRect();
//     glowX.set(e.clientX - rect.left);
//     glowY.set(e.clientY - rect.top);
//   };

//   // Backend cold-start ya error me bhi page skeleton pe atka na rahe
//   if (!user && !failed) return <HeroSkeleton />;

//   const scrollToProjects = () => {
//     document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
//   };

//   const scrollToContact = () => {
//     document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
//   };

//   const displayName = user?.fullName || "Rajan Kumar Singh";

//   return (
//     <motion.div
//       ref={heroRef}
//       onMouseMove={handleMouseMove}
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       style={{
//         display: "grid",
//         gridTemplateColumns: "1.2fr 0.8fr",
//         gap: 40,
//         alignItems: "center",
//         position: "relative",
//       }}
//       className="hero-grid"
//     >
//       <style>{`
//         @media (max-width: 860px) {
//           .hero-grid { grid-template-columns: 1fr !important; }
//           .hero-photo-col { order: -1; max-width: 220px; margin: 0 auto 8px; }
//         }
//       `}</style>

//       {/* Cursor-following spotlight — sits behind the left content */}
//       <motion.div
//         aria-hidden="true"
//         style={{
//           position: "absolute",
//           left: springX,
//           top: springY,
//           width: 420,
//           height: 420,
//           marginLeft: -210,
//           marginTop: -210,
//           borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(74,222,128,0.10) 0%, transparent 70%)",
//           pointerEvents: "none",
//           zIndex: 0,
//         }}
//       />

//       {/* LEFT: content */}
//       <div style={{ position: "relative", zIndex: 1 }}>
//         <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
//           <span className="bg-green-400 rounded-full h-2 w-2 animate-pulse" />
//           <p className="text-green-400 font-semibold text-sm tracking-wide">
//             Available for Work
//           </p>
//         </motion.div>

//         <motion.h1
//           variants={itemVariants}
//           style={{
//             fontFamily: "'Clash Display','Syne',sans-serif",
//             fontWeight: 700,
//             fontSize: "clamp(30px, 5vw, 56px)",
//             lineHeight: 1.08,
//             letterSpacing: "-0.02em",
//             marginBottom: 10,
//           }}
//         >
//           <RevealHeadline text={`Hey, I'm ${displayName}`} />
//         </motion.h1>

//         <motion.h2
//           variants={itemVariants}
//           style={{
//             fontFamily: "'JetBrains Mono', monospace",
//             fontSize: "clamp(14px, 2vw, 20px)",
//             color: "#4ade80",
//             marginBottom: 20,
//             minHeight: 30,
//           }}
//         >
//           <Typewriter
//             words={[
//               "MERN Stack + Agentic AI Developer",
//               "Full Stack MERN Developer",
//               "AI-Integrated Web Apps",
//               "Building for Production",
//             ]}
//             loop
//             cursor
//             cursorStyle="_"
//             typeSpeed={55}
//             deleteSpeed={35}
//             delaySpeed={1600}
//           />
//         </motion.h2>

//         <motion.p
//           variants={itemVariants}
//           style={{
//             maxWidth: 480,
//             fontSize: 14.5,
//             lineHeight: 1.8,
//             color: "rgba(255,255,255,0.55)",
//             fontFamily: "'JetBrains Mono', monospace",
//             marginBottom: 24,
//           }}
//         >
//           {user?.aboutMe ||
//             "Full-stack developer building scalable web apps with clean architecture and AI integrations."}
//         </motion.p>

//         {/* Stack chips */}
//         <motion.div variants={itemVariants} style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 26 }}>
//           {STACK.map((s) => (
//             <span
//               key={s}
//               style={{
//                 fontFamily: "'JetBrains Mono', monospace",
//                 fontSize: 11.5,
//                 padding: "6px 12px",
//                 borderRadius: 8,
//                 background: "rgba(255,255,255,0.04)",
//                 border: "1px solid rgba(255,255,255,0.1)",
//                 color: "rgba(255,255,255,0.7)",
//               }}
//             >
//               {s}
//             </span>
//           ))}
//         </motion.div>

//         {/* CTAs — View Projects / Download Resume / Hire Me */}
//         <motion.div variants={itemVariants} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
//           <button
//             onClick={scrollToProjects}
//             style={{
//               display: "flex", alignItems: "center", gap: 8,
//               padding: "12px 22px", borderRadius: 100,
//               background: "linear-gradient(135deg,#16a34a,#22c55e)",
//               color: "#fff", fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer",
//             }}
//           >
//             View Projects <ArrowDown size={15} />
//           </button>

//           {user?.resume?.url && (
            
//             <a  href={user.resume.url}
//               target="_blank"
//               rel="noreferrer"
//               download
//               style={{
//                 display: "flex", alignItems: "center", gap: 8,
//                 padding: "12px 22px", borderRadius: 100,
//                 border: "1px solid rgba(255,255,255,0.18)",
//                 color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none",
//               }}
//             >
//               <Download size={15} /> Download Resume
//             </a>
//           )}

//           <button
//             onClick={scrollToContact}
//             style={{
//               padding: "12px 22px", borderRadius: 100,
//               border: "1px solid rgba(255,255,255,0.18)",
//               color: "#fff", fontWeight: 600, fontSize: 14,
//               background: "transparent", cursor: "pointer",
//             }}
//           >
//             Hire Me
//           </button>
//         </motion.div>

//         {/* Socials */}
//         <motion.div variants={itemVariants} style={{ display: "flex", gap: 14, alignItems: "center" }}>
//           {(user?.githubURL || SITE.github) && (
//             <a href={user?.githubURL || SITE.github} target="_blank" rel="noreferrer">
//               <Github size={19} color="rgba(255,255,255,0.6)" />
//             </a>
//           )}
//           {(user?.linkedInURL || SITE.linkedin) && (
//             <a href={user?.linkedInURL || SITE.linkedin} target="_blank" rel="noreferrer">
//               <Linkedin size={19} color="rgba(255,255,255,0.6)" />
//             </a>
//           )}
//           {SITE.youtube && (
//             <a href={SITE.youtube} target="_blank" rel="noreferrer">
//               <Youtube size={19} color="rgba(255,255,255,0.6)" />
//             </a>
//           )}
//           <a href={`mailto:${SITE.email}`}>
//             <Mail size={19} color="rgba(255,255,255,0.6)" />
//           </a>
//         </motion.div>
//       </div>

//       {/* RIGHT: photo */}
//       <motion.div
//         variants={itemVariants}
//         className="hero-photo-col"
//         style={{ position: "relative", zIndex: 1, aspectRatio: "1 / 1", maxWidth: 340, marginLeft: "auto" }}
//       >
//         <div
//           style={{
//             position: "absolute", inset: -6, borderRadius: "50%",
//             background: "conic-gradient(from 200deg, #22c55e, #38bdf8, #22c55e)",
//             filter: "blur(2px)", opacity: 0.85,
//           }}
//         />
//         {user?.avatar?.url ? (
//           <img
//             src={user.avatar.url}
//             alt={user?.fullName || "Profile photo"}
//             style={{
//               position: "relative", width: "100%", height: "100%",
//               borderRadius: "50%", objectFit: "cover",
//               border: "6px solid #000814", display: "block",
//             }}
//           />
//         ) : (
//           <div
//             style={{
//               position: "relative", width: "100%", height: "100%",
//               borderRadius: "50%", border: "6px solid #000814",
//               background: "rgba(255,255,255,0.04)",
//             }}
//           />
//         )}
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Hero;



import { Github, Linkedin, Youtube, Mail, ArrowDown, Download } from "lucide-react";
import React, { useRef } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion, useMotionValue, useSpring } from "framer-motion";
import HeroSkeleton from "./HeroSkeleton";
import HeroCanvas from "@/components/hero3d/HeroCanvas";
import { useProfile } from "@/hooks/useProfile";
import { SITE } from "@/config/site";

const STACK = ["React", "Node.js", "Express", "MongoDB", "TypeScript", "Tailwind"];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const wordContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};
const wordItem = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const RevealHeadline = ({ text }) => (
  <motion.span variants={wordContainer} initial="hidden" animate="visible" style={{ display: "inline" }}>
    {text.split(" ").map((word, i) => (
      <motion.span key={`${word}-${i}`} variants={wordItem} style={{ display: "inline-block", marginRight: "0.28em" }}>
        {word}
      </motion.span>
    ))}
  </motion.span>
);

// Photo fallback — used both as the "no-3D" render AND as the Canvas fallback
// while the model loads (so first paint is always instant, 3D upgrades in later).
const PhotoFallback = ({ user }) => (
  <div style={{ position: "relative", width: "100%", height: "100%" }}>
    <div
      style={{
        position: "absolute", inset: -6, borderRadius: "50%",
        background: "conic-gradient(from 200deg, #22c55e, #38bdf8, #22c55e)",
        filter: "blur(2px)", opacity: 0.85,
      }}
    />
    {user?.avatar?.url ? (
      <img
        src={user.avatar.url}
        alt={user?.fullName || "Profile photo"}
        style={{
          position: "relative", width: "100%", height: "100%",
          borderRadius: "50%", objectFit: "cover",
          border: "6px solid #000814", display: "block",
        }}
      />
    ) : (
      <div
        style={{
          position: "relative", width: "100%", height: "100%",
          borderRadius: "50%", border: "6px solid #000814",
          background: "rgba(255,255,255,0.04)",
        }}
      />
    )}
  </div>
);

const Hero = () => {
  const { profile: user, failed } = useProfile();
  const heroRef = useRef(null);

  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const springX = useSpring(glowX, { stiffness: 120, damping: 22 });
  const springY = useSpring(glowY, { stiffness: 120, damping: 22 });

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  if (!user && !failed) return <HeroSkeleton />;

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const displayName = user?.fullName || "Rajan Kumar Singh";

  return (
    <motion.div
      ref={heroRef}
      onMouseMove={handleMouseMove}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 40, alignItems: "center", position: "relative" }}
      className="hero-grid"
    >
      <style>{`
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-photo-col { order: -1; max-width: 220px; margin: 0 auto 8px; }
        }
      `}</style>

      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute", left: springX, top: springY,
          width: 420, height: 420, marginLeft: -210, marginTop: -210,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(74,222,128,0.10) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }}
      />

      {/* LEFT: content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
          <span className="bg-green-400 rounded-full h-2 w-2 animate-pulse" />
          <p className="text-green-400 font-semibold text-sm tracking-wide">Available for Work</p>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          style={{
            fontFamily: "'Clash Display','Syne',sans-serif", fontWeight: 700,
            fontSize: "clamp(30px, 5vw, 56px)", lineHeight: 1.08,
            letterSpacing: "-0.02em", marginBottom: 10,
          }}
        >
          <RevealHeadline text={`Hey, I'm ${displayName}`} />
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(14px, 2vw, 20px)",
            color: "#4ade80", marginBottom: 20, minHeight: 30,
          }}
        >
          <Typewriter
            words={[
              "MERN Stack + Agentic AI Developer",
              "Full Stack MERN Developer",
              "AI-Integrated Web Apps",
              "Building for Production",
            ]}
            loop cursor cursorStyle="_" typeSpeed={55} deleteSpeed={35} delaySpeed={1600}
          />
        </motion.h2>

        <motion.p
          variants={itemVariants}
          style={{ maxWidth: 480, fontSize: 14.5, lineHeight: 1.8, color: "rgba(255,255,255,0.55)", fontFamily: "'JetBrains Mono', monospace", marginBottom: 24 }}
        >
          {user?.aboutMe || "Full-stack developer building scalable web apps with clean architecture and AI integrations."}
        </motion.p>

        <motion.div variants={itemVariants} style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 26 }}>
          {STACK.map((s) => (
            <span key={s} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, padding: "6px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
              {s}
            </span>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          <button
            onClick={scrollToProjects}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 22px", borderRadius: 100, background: "linear-gradient(135deg,#16a34a,#22c55e)", color: "#fff", fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer" }}
          >
            View Projects <ArrowDown size={15} />
          </button>

          {user?.resume?.url && (
            <a href={user.resume.url} target="_blank" rel="noreferrer" download
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 22px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.18)", color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none" }}
            >
              <Download size={15} /> Download Resume
            </a>
          )}

          <button
            onClick={scrollToContact}
            style={{ padding: "12px 22px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.18)", color: "#fff", fontWeight: 600, fontSize: 14, background: "transparent", cursor: "pointer" }}
          >
            Hire Me
          </button>
        </motion.div>

        <motion.div variants={itemVariants} style={{ display: "flex", gap: 14, alignItems: "center" }}>
          {(user?.githubURL || SITE.github) && (
            <a href={user?.githubURL || SITE.github} target="_blank" rel="noreferrer"><Github size={19} color="rgba(255,255,255,0.6)" /></a>
          )}
          {(user?.linkedInURL || SITE.linkedin) && (
            <a href={user?.linkedInURL || SITE.linkedin} target="_blank" rel="noreferrer"><Linkedin size={19} color="rgba(255,255,255,0.6)" /></a>
          )}
          {SITE.youtube && (
            <a href={SITE.youtube} target="_blank" rel="noreferrer"><Youtube size={19} color="rgba(255,255,255,0.6)" /></a>
          )}
          <a href={`mailto:${SITE.email}`}><Mail size={19} color="rgba(255,255,255,0.6)" /></a>
        </motion.div>
      </div>

      {/* RIGHT: 3D laptop (falls back to photo instantly, upgrades when ready) */}
      <motion.div
        variants={itemVariants}
        className="hero-photo-col"
        style={{ position: "relative", zIndex: 1, aspectRatio: "1 / 1", maxWidth: 340, marginLeft: "auto" }}
      >
        <HeroCanvas fallback={<PhotoFallback user={user} />} />
      </motion.div>
    </motion.div>
  );
};

export default Hero;