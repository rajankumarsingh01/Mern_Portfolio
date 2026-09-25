import { API_URL } from "@/config/api";


// import {
//   ExternalLink,
//   Facebook,
//   Github,
//   Instagram,
//   Linkedin,
//   Twitter,
//   Youtube,
// } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { Typewriter } from "react-simple-typewriter";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { motion } from "framer-motion";

// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.25,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0 },
// };

// const Hero = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const getMyProfile = async () => {
//       try {
//         const { data } = await axios.get(
//           `${API_URL}/api/v1/user/portfolio/me`,
//           { withCredentials: true }
//         );
//         if (data?.user) setUser(data.user);
//       } catch (error) {
//         console.log("Profile fetch error:", error);
//       }
//     };
//     getMyProfile();
//   }, []);

//   if (!user) {
//     return <div className="text-xl">Loading...</div>;
//   }

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="w-full"
//     >
//       {/* Availability */}
//       <motion.div
//         variants={itemVariants}
//         className="flex items-center gap-2 mb-2"
//       >
//         <span className="bg-green-400 rounded-full h-2 w-2 animate-pulse"></span>
//         <p className="text-green-400 font-semibold">
//           Available for Work
//         </p>
//       </motion.div>

//       {/* Name */}
//       <motion.h1
//         variants={itemVariants}
//         className="overflow-x-hidden text-[1.3rem] sm:text-[1.75rem] 
//         md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4"
//       >
//         Hey, I'm Rajan Kumar Singh
//       </motion.h1>

//       {/* Typewriter */}
//       <motion.h2
//         variants={itemVariants}
//         className="text-tubeLight-effect overflow-x-hidden text-[1.3rem] 
//         sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px]"
//       >
//         {/* down code work properly */}
//         {/* <Typewriter
//           words={[
//             "ASPIRING FULLSTACK DEVELOPER",
//             "MERN STACK ENTHUSIAST",
//             "PROBLEM SOLVER",
//           ]}
//           loop
//           cursor
//           typeSpeed={70}
//           deleteSpeed={50}
//           delaySpeed={1000}
//         /> */}
//         <div className="h-[60px] md:h-[80px] flex items-center">
//   <h2 className="text-xl md:text-3xl font-bold text-green-500">
//     <Typewriter
//       words={[
//         "FULL STACK DEVELOPER",
//         "MERN STACK ENGINEER",
//         "AI & WEB TECHNOLOGY EXPLORER",
//         "BUILDING PRODUCTION-READY APPLICATIONS",
//       ]}
//       loop
//       cursor
//       cursorStyle="|"
//       typeSpeed={70}
//       deleteSpeed={50}
//       delaySpeed={1000}
//     />
//   </h2>
// </div>

//       </motion.h2>

//       {/* Social Icons */}
//       <motion.div
//         variants={itemVariants}
//         className="w-fit px-5 py-2 bg-slate-50 rounded-[20px] 
//         flex gap-5 items-center mt-4 md:mt-8 lg:mt-10"
//       >
//         <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
//           <motion.div whileHover={{ scale: 1.3 }}>
//             <Youtube className="text-red-500 w-7 h-7" />
//           </motion.div>
//         </a>

//         {user?.instagramURL && (
//           <a href={user.instagramURL} target="_blank" rel="noreferrer">
//             <motion.div whileHover={{ scale: 1.3 }}>
//               <Instagram className="text-pink-500 w-7 h-7" />
//             </motion.div>
//           </a>
//         )}

//         {user?.facebookURL && (
//           <a href={user.facebookURL} target="_blank" rel="noreferrer">
//             <motion.div whileHover={{ scale: 1.3 }}>
//               <Facebook className="text-blue-800 w-7 h-7" />
//             </motion.div>
//           </a>
//         )}

//         {user?.linkedInURL && (
//           <a href={user.linkedInURL} target="_blank" rel="noreferrer">
//             <motion.div whileHover={{ scale: 1.3 }}>
//               <Linkedin className="text-sky-500 w-7 h-7" />
//             </motion.div>
//           </a>
//         )}

//         {user?.twitterURL && (
//           <a href={user.twitterURL} target="_blank" rel="noreferrer">
//             <motion.div whileHover={{ scale: 1.3 }}>
//               <Twitter className="text-blue-800 w-7 h-7" />
//             </motion.div>
//           </a>
//         )}
//       </motion.div>

//       {/* Buttons */}
//       <motion.div
//         variants={itemVariants}
//         className="mt-4 md:mt-8 lg:mt-10 flex gap-3"
//       >
//         {user?.githubURL && (
//           <a href={user.githubURL} target="_blank" rel="noreferrer">
//             <motion.div whileHover={{ scale: 1.1 }}>
//               <Button className="rounded-[30px] flex items-center gap-2">
//                 <Github />
//                 <span>Github</span>
//               </Button>
//             </motion.div>
//           </a>
//         )}

//         {user?.resume?.url && (
//           <a href={user.resume.url} target="_blank" rel="noreferrer">
//             <motion.div whileHover={{ scale: 1.1 }}>
//               <Button className="rounded-[30px] flex items-center gap-2">
//                 <ExternalLink />
//                 <span>Resume</span>
//               </Button>
//             </motion.div>
//           </a>
//         )}

//         <a href="mailto:rajankrsingh200@gmail.com">
//           <motion.div whileHover={{ scale: 1.1 }}>
//             <Button className="rounded-[30px] flex items-center gap-2 bg-green-500 hover:bg-green-600">
//               Hire Me
//             </Button>
//           </motion.div>
//         </a>
//       </motion.div>

//       {/* About */}
//       {user?.aboutMe && (
//         <motion.p
//           variants={itemVariants}
//           className="mt-8 text-xl tracking-[2px]"
//         >
//           {user.aboutMe}
//         </motion.p>
//       )}

//       <hr className="my-8 md:my-10" />
//     </motion.div>
//   );
// };

// export default Hero;




import { Github, Linkedin, Youtube, Mail, ArrowDown } from "lucide-react";
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import HeroSkeleton from "./HeroSkeleton";
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

const Hero = () => {
  const { profile: user, failed } = useProfile();

  // Backend cold-start ya error me bhi page skeleton pe atka na rahe
  if (!user && !failed) return <HeroSkeleton />;

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: "grid",
        gridTemplateColumns: "1.2fr 0.8fr",
        gap: 40,
        alignItems: "center",
      }}
      className="hero-grid"
    >
      <style>{`
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-photo-col { order: -1; max-width: 220px; margin: 0 auto 8px; }
        }
      `}</style>

      {/* LEFT: content */}
      <div>
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
          <span className="bg-green-400 rounded-full h-2 w-2 animate-pulse" />
          <p className="text-green-400 font-semibold text-sm tracking-wide">
            Available for Work
          </p>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          style={{
            fontFamily: "'Clash Display','Syne',sans-serif",
            fontWeight: 700,
            fontSize: "clamp(30px, 5vw, 56px)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            marginBottom: 10,
          }}
        >
          Hey, I'm {user?.fullName || "Rajan Kumar Singh"}
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(14px, 2vw, 20px)",
            color: "#4ade80",
            marginBottom: 20,
            minHeight: 30,
          }}
        >
          <Typewriter
            words={["Full Stack MERN Developer", "AI-Integrated Web Apps", "Building for Production"]}
            loop
            cursor
            cursorStyle="_"
            typeSpeed={55}
            deleteSpeed={35}
            delaySpeed={1600}
          />
        </motion.h2>

        <motion.p
          variants={itemVariants}
          style={{
            maxWidth: 480,
            fontSize: 14.5,
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.55)",
            fontFamily: "'JetBrains Mono', monospace",
            marginBottom: 24,
          }}
        >
          {user?.aboutMe ||
            "Full-stack developer building scalable web apps with clean architecture and AI integrations."}
        </motion.p>

        {/* Stack chips */}
        <motion.div variants={itemVariants} style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 26 }}>
          {STACK.map((s) => (
            <span
              key={s}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11.5,
                padding: "6px 12px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              {s}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div variants={itemVariants} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          <button
            onClick={scrollToProjects}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "12px 22px", borderRadius: 100,
              background: "linear-gradient(135deg,#16a34a,#22c55e)",
              color: "#fff", fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer",
            }}
          >
            View Projects <ArrowDown size={15} />
          </button>
          {user?.resume?.url && (
            
             <a href={user.resume.url}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "12px 22px", borderRadius: 100,
                border: "1px solid rgba(255,255,255,0.18)",
                color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none",
              }}
            >
              Resume
            </a>
          )}
          
          <a  href="#contact"
            style={{
              padding: "12px 22px", borderRadius: 100,
              border: "1px solid rgba(255,255,255,0.18)",
              color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none",
            }}
          >
            Contact
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div variants={itemVariants} style={{ display: "flex", gap: 14, alignItems: "center" }}>
          {(user?.githubURL || SITE.github) && (
            <a href={user?.githubURL || SITE.github} target="_blank" rel="noreferrer">
              <Github size={19} color="rgba(255,255,255,0.6)" />
            </a>
          )}
          {(user?.linkedInURL || SITE.linkedin) && (
            <a href={user?.linkedInURL || SITE.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={19} color="rgba(255,255,255,0.6)" />
            </a>
          )}
          {SITE.youtube && (
            <a href={SITE.youtube} target="_blank" rel="noreferrer">
              <Youtube size={19} color="rgba(255,255,255,0.6)" />
            </a>
          )}
          <a href={`mailto:${SITE.email}`}>
            <Mail size={19} color="rgba(255,255,255,0.6)" />
          </a>
        </motion.div>
      </div>

      {/* RIGHT: photo */}
      <motion.div
        variants={itemVariants}
        className="hero-photo-col"
        style={{ position: "relative", aspectRatio: "1 / 1", maxWidth: 340, marginLeft: "auto" }}
      >
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
      </motion.div>
    </motion.div>
  );
};

export default Hero;