












// import React, { useEffect, useRef, useState, useCallback } from "react";
// import { Link, NavLink, useLocation } from "react-router-dom";
// import {
//   motion,
//   AnimatePresence,
//   useMotionValue,
//   useSpring,
// } from "framer-motion";
// import { ModeToggle } from "../../mode-toggle";

// // ─── Constants ────────────────────────────────────────────────────────────────

// const NAV_LINKS = [
//   { name: "Home",     path: "/",         code: "01" },
//   { name: "Projects", path: "/projects", code: "02" },
//   { name: "Skills",   path: "/skills",   code: "03" },
//   { name: "About",    path: "/about",    code: "04" },
//   { name: "Contact",  path: "/contact",  code: "05" },
//   { name: "Articles",     path: "/articles",     code: "06" },
//   { name: "Career",       path: "/career",       code: "07" },
// ];

// const SOCIALS = [
//   { label: "GitHub",   href: "https://github.com/rajankumarsingh01" },
//   { label: "LinkedIn", href: "#" },
//   { label: "Resume",   href: "#" },
// ];

// const EASING = [0.76, 0, 0.24, 1];

// // ─── Hooks ────────────────────────────────────────────────────────────────────

// function useISTClock() {
//   const [time, setTime] = useState("");
//   useEffect(() => {
//     const fmt = () =>
//       new Date().toLocaleTimeString("en-IN", {
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//         hour12: false,
//         timeZone: "Asia/Kolkata",
//       });
//     setTime(fmt());
//     const id = setInterval(() => setTime(fmt()), 1000);
//     return () => clearInterval(id);
//   }, []);
//   return time;
// }

// function useScrolled(threshold = 16) {
//   const [scrolled, setScrolled] = useState(false);
//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > threshold);
//     window.addEventListener("scroll", fn, { passive: true });
//     return () => window.removeEventListener("scroll", fn);
//   }, [threshold]);
//   return scrolled;
// }

// // ─── Magnetic ─────────────────────────────────────────────────────────────────

// function Magnetic({ children, strength = 0.28 }) {
//   const ref = useRef(null);
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const sx = useSpring(x, { stiffness: 200, damping: 24 });
//   const sy = useSpring(y, { stiffness: 200, damping: 24 });

//   const onMove = useCallback((e) => {
//     const el = ref.current;
//     if (!el) return;
//     const r = el.getBoundingClientRect();
//     x.set((e.clientX - r.left - r.width / 2) * strength);
//     y.set((e.clientY - r.top - r.height / 2) * strength);
//   }, [strength, x, y]);

//   const onLeave = useCallback(() => {
//     x.set(0);
//     y.set(0);
//   }, [x, y]);

//   return (
//     <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave}>
//       {children}
//     </motion.div>
//   );
// }

// // ─── Desktop Link ─────────────────────────────────────────────────────────────

// function DesktopLink({ item }) {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <NavLink
//       to={item.path}
//       end={item.path === "/"}
//       className={({ isActive }) => ["dnl", isActive ? "dnl--active" : ""].join(" ").trim()}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <span className="dnl-code">{item.code}</span>
//       <span className="dnl-name">{item.name}</span>
//       <motion.span
//         className="dnl-bar"
//         initial={false}
//         animate={{ scaleX: hovered ? 1 : 0 }}
//         transition={{ duration: 0.26, ease: EASING }}
//       />
//     </NavLink>
//   );
// }

// // ─── Status Pill ──────────────────────────────────────────────────────────────

// function StatusPill({ time }) {
//   return (
//     <div className="spill" aria-label={`Current time: ${time} IST`}>
//       <span className="spill-dot" />
//       <span className="spill-txt">{time}&nbsp;IST</span>
//     </div>
//   );
// }

// // ─── Hamburger ────────────────────────────────────────────────────────────────

// function HamburgerButton({ open, onClick }) {
//   return (
//     <Magnetic strength={0.18}>
//       <button
//         onClick={onClick}
//         className={["hbtn", open ? "is-open" : ""].join(" ").trim()}
//         aria-label={open ? "Close navigation menu" : "Open navigation menu"}
//         aria-expanded={open}
//         aria-controls="overlay-menu"
//       >
//         <span
//           className="hline"
//           style={{
//             width: "52%",
//             transform: open ? "translateY(6.5px) rotate(45deg)" : "none",
//           }}
//         />
//         <span
//           className="hline"
//           style={{
//             width: open ? "38%" : "66%",
//             opacity: open ? 0 : 1,
//           }}
//         />
//         <span
//           className="hline"
//           style={{
//             width: "52%",
//             transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none",
//           }}
//         />
//       </button>
//     </Magnetic>
//   );
// }

// // ─── Overlay Menu ─────────────────────────────────────────────────────────────

// function OverlayMenu({ open, onClose, time }) {
//   // Close on backdrop click
//   const handleBackdrop = useCallback(
//     (e) => { if (e.currentTarget === e.target) onClose(); },
//     [onClose]
//   );

//   // Close on ESC
//   useEffect(() => {
//     if (!open) return;
//     const fn = (e) => { if (e.key === "Escape") onClose(); };
//     document.addEventListener("keydown", fn);
//     return () => document.removeEventListener("keydown", fn);
//   }, [open, onClose]);

//   // Lock body scroll
//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [open]);

//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           id="overlay-menu"
//           role="dialog"
//           aria-modal="true"
//           aria-label="Navigation menu"
//           key="overlay"
//           initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
//           animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
//           exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
//           transition={{ duration: 0.54, ease: EASING }}
//           className="ovl-backdrop overlay-scroll"
//           onClick={handleBackdrop}
//         >
//           {/* decorative grid + scanline */}
//           <div className="grid-bg" aria-hidden="true" />
//           <div className="scanline" aria-hidden="true" />

//           {/* glow orbs */}
//           <div aria-hidden="true" className="gorb gorb--tr" />
//           <div aria-hidden="true" className="gorb gorb--bl" />

//           {/* corner dots */}
//           {["tl", "tr", "bl", "br"].map((p) => (
//             <div key={p} aria-hidden="true" className={`cdot cdot--${p}`} />
//           ))}

//           {/* close button */}
//           <button className="ovl-close" onClick={onClose} aria-label="Close navigation menu">
//             <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
//               <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
//             </svg>
//           </button>

//           {/* content */}
//           <div className="ovl-inner">
//             {/* label */}
//             <motion.div
//               className="ovl-label"
//               initial={{ opacity: 0, y: -6 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.18, duration: 0.32 }}
//             >
//               <span className="ovl-label-line" aria-hidden="true" />
//               <span>Navigation</span>
//               <span className="ovl-label-line" aria-hidden="true" />
//             </motion.div>

//             {/* links */}
//             <nav className="ovl-links" aria-label="Main navigation">
//               {NAV_LINKS.map((item, i) => (
//                 <motion.div
//                   key={item.path}
//                   initial={{ opacity: 0, x: -52 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -24 }}
//                   transition={{
//                     delay: i * 0.055 + 0.18,
//                     duration: 0.44,
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                 >
//                   <NavLink
//                     to={item.path}
//                     end={item.path === "/"}
//                     onClick={onClose}
//                     className={({ isActive }) =>
//                       ["ovl-link", isActive ? "ovl-link--active" : ""].join(" ").trim()
//                     }
//                   >
//                     <span>{item.name}</span>
//                     <span className="ovl-link-tag" aria-hidden="true">
//                       <span>{item.code}</span>
//                       <span className="ovl-tag-bar" />
//                       <span>↗</span>
//                     </span>
//                   </NavLink>
//                 </motion.div>
//               ))}
//             </nav>

//             {/* footer */}
//             <motion.footer
//               className="ovl-footer"
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.52, duration: 0.38 }}
//             >
//               <div>
//                 <div className="ovl-status">
//                   <motion.span
//                     className="ovl-status-dot"
//                     animate={{ opacity: [1, 0.2, 1] }}
//                     transition={{ duration: 1.8, repeat: Infinity }}
//                     aria-hidden="true"
//                   />
//                   <span>Open to Work</span>
//                 </div>
//                 <a href="mailto:rajankrsingh200@gmail.com" className="ovl-email">
//                  rajankrsingh200@gmail.com
//                 </a>
//               </div>

//               <div className="ovl-footer-right">
//                 <div className="ovl-socials">
//                   {SOCIALS.map((s) => (
//                     <a
//                       key={s.label}
//                       href={s.href}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="ovl-social"
//                     >
//                       {s.label}&nbsp;↗
//                     </a>
//                   ))}
//                 </div>
//                 <span className="ovl-time">{time}&nbsp;<span className="ovl-time-accent">IST</span></span>
//               </div>
//             </motion.footer>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// // ─── Navbar ───────────────────────────────────────────────────────────────────

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const time = useISTClock();
//   const isScrolled = useScrolled();
//   const location = useLocation();
//   const isHome = location.pathname === "/";

//   const openMenu = useCallback(() => setMenuOpen(true), []);
//   const closeMenu = useCallback(() => setMenuOpen(false), []);

//   // Close on route change
//   useEffect(() => { setMenuOpen(false); }, [location.pathname]);

//   const currentLink = NAV_LINKS.find((l) =>
//     l.path === "/" ? location.pathname === "/" : location.pathname.startsWith(l.path)
//   );

//   return (
//     <>
//       <style>{CSS}</style>

//       {/* ── Header ── */}
//       <motion.header
//         initial={{ y: -72, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
//         className={["nav-header", isScrolled ? "nav-header--scrolled" : ""].join(" ").trim()}
//       >
//         {/* top accent line */}
//         <div className="nav-accent-line" aria-hidden="true" />

//         <div className="nav-container">
//           <div className="nav-inner">

//             {/* Logo */}
//             <Link to="/" className="nav-logo" aria-label="Rajan.dev — Home">
//               <Magnetic strength={0.22}>
//                 <div className="logo-wrap">
//                   <span className="logo-brace" aria-hidden="true">{"{"}</span>
//                   <div className="logo-text">
//                     <span className="logo-name">
//                       Rajan<span className="logo-dot">.</span>dev
//                     </span>
//                     <span className="logo-sub" aria-hidden="true">
//                       {currentLink?.code ?? "00"}&nbsp;/&nbsp;{currentLink?.name ?? "Home"}
//                     </span>
//                   </div>
//                   <span className="logo-brace" aria-hidden="true">{"}"}</span>
//                 </div>
//               </Magnetic>
//             </Link>

//             {/* Desktop nav */}
//             <nav className="desk-nav" aria-label="Primary navigation">

//               <AnimatePresence>
//                 {!isHome && (
//                   <motion.div
//                     key="back-btn"
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -10 }}
//                     transition={{ duration: 0.26 }}
//                   >
//                     <Magnetic strength={0.18}>
//                       <Link to="/" className="back-btn" aria-label="Back to Home">
//                         <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
//                           <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//                         </svg>
//                         <span>Home</span>
//                       </Link>
//                     </Magnetic>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {!isHome && <div className="nav-sep" aria-hidden="true" />}

//               {NAV_LINKS.filter((l) => l.path !== "/").map((item) => (
//                 <DesktopLink key={item.path} item={item} />
//               ))}

//               <div className="nav-sep" aria-hidden="true" />
//               <StatusPill time={time} />
//               <ModeToggle />
//               <HamburgerButton open={menuOpen} onClick={openMenu} />
//             </nav>

//             {/* Mobile buttons */}
//             <div className="mob-nav" aria-label="Mobile navigation controls">
//               <AnimatePresence>
//                 {!isHome && (
//                   <motion.div
//                     key="mob-back"
//                     initial={{ opacity: 0, x: -8 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -8 }}
//                     transition={{ duration: 0.22 }}
//                   >
//                     <Link to="/" className="mob-back-btn" aria-label="Back to Home">
//                       <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
//                         <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
//                       </svg>
//                     </Link>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//               <ModeToggle />
//               <HamburgerButton open={menuOpen} onClick={menuOpen ? closeMenu : openMenu} />
//             </div>

//           </div>
//         </div>

//         {/* Page progress indicator */}
//         <AnimatePresence>
//           {isScrolled && !isHome && (
//             <motion.div
//               key="progress"
//               className="page-indicator"
//               initial={{ scaleX: 0, opacity: 0 }}
//               animate={{ scaleX: 1, opacity: 1 }}
//               exit={{ scaleX: 0, opacity: 0 }}
//               transition={{ duration: 0.48 }}
//               aria-hidden="true"
//             />
//           )}
//         </AnimatePresence>
//       </motion.header>

//       {/* Overlay menu */}
//       <OverlayMenu open={menuOpen} onClose={closeMenu} time={time} />
//     </>
//   );
// }

// // ─── Styles ───────────────────────────────────────────────────────────────────

// const CSS = `
// @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Syne:wght@700;800&display=swap');

// :root {
//   --g:       #39ff84;
//   --g05:     rgba(57,255,132,0.05);
//   --g10:     rgba(57,255,132,0.10);
//   --g20:     rgba(57,255,132,0.20);
//   --g40:     rgba(57,255,132,0.40);
//   --g60:     rgba(57,255,132,0.60);
//   --w:       #efefea;
//   --w06:     rgba(255,255,255,0.06);
//   --w10:     rgba(255,255,255,0.10);
//   --w25:     rgba(255,255,255,0.25);
//   --w40:     rgba(255,255,255,0.40);
//   --w70:     rgba(255,255,255,0.70);
//   --bg:      #020408;
//   --mono:    'JetBrains Mono', monospace;
//   --disp:    'Syne', sans-serif;
//   --nav-h:   64px;
//   --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
// }

// /* ── Header ── */
// .nav-header {
//   position: fixed;
//   top: 0; left: 0;
//   width: 100%;
//   z-index: 9999;
//   background: transparent;
//   border-bottom: 1px solid transparent;
//   transition: background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
// }
// .nav-header--scrolled {
//   background: rgba(2,4,8,0.88);
//   border-bottom-color: rgba(57,255,132,0.08);
//   backdrop-filter: blur(28px) saturate(160%);
//   -webkit-backdrop-filter: blur(28px) saturate(160%);
// }
// .nav-accent-line {
//   height: 1px;
//   background: linear-gradient(90deg, transparent, rgba(57,255,132,0.5) 38%, rgba(57,255,132,0.5) 62%, transparent);
// }
// .nav-container {
//   max-width: 1340px;
//   margin: 0 auto;
//   padding: 0 20px;
// }
// @media (min-width: 1025px) { .nav-container { padding: 0 40px; } }
// .nav-inner {
//   height: var(--nav-h);
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// }

// /* ── Logo ── */
// .nav-logo { position: relative; z-index: 50; text-decoration: none; }
// .logo-wrap { display: flex; align-items: center; gap: 9px; }
// .logo-brace {
//   font-family: var(--mono);
//   font-size: 15px;
//   color: rgba(57,255,132,0.32);
//   line-height: 1;
//   user-select: none;
// }
// .logo-text { display: flex; flex-direction: column; gap: 3px; line-height: 1; }
// .logo-name {
//   font-family: var(--disp);
//   font-size: 15px;
//   font-weight: 800;
//   letter-spacing: -0.025em;
//   color: var(--w);
// }
// .logo-dot { color: var(--g); }
// .logo-sub {
//   font-family: var(--mono);
//   font-size: 7px;
//   letter-spacing: 0.22em;
//   color: rgba(255,255,255,0.18);
//   text-transform: uppercase;
// }

// /* ── Desktop nav ── */
// .desk-nav {
//   display: none;
//   align-items: center;
//   gap: 18px;
// }
// @media (min-width: 1025px) { .desk-nav { display: flex; } }

// .nav-sep {
//   width: 1px; height: 22px;
//   background: var(--w10);
//   flex-shrink: 0;
// }

// /* ── Desktop link ── */
// .dnl {
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   gap: 2px;
//   padding: 6px 2px 7px;
//   text-decoration: none;
//   overflow: hidden;
// }
// .dnl-code {
//   font-family: var(--mono);
//   font-size: 7px;
//   letter-spacing: 0.22em;
//   color: var(--w25);
//   transition: color 0.22s;
//   line-height: 1;
// }
// .dnl-name {
//   font-family: var(--mono);
//   font-size: 10px;
//   letter-spacing: 0.1em;
//   text-transform: uppercase;
//   color: var(--w40);
//   font-weight: 500;
//   line-height: 1;
//   transition: color 0.22s;
// }
// .dnl-bar {
//   display: block;
//   position: absolute;
//   bottom: 0; left: 0;
//   width: 100%; height: 1.5px;
//   background: var(--g);
//   transform-origin: left;
// }
// .dnl:hover .dnl-code,
// .dnl:hover .dnl-name  { color: var(--w70); }
// .dnl--active .dnl-name { color: var(--g); }
// .dnl--active .dnl-code { color: var(--g40); }
// .dnl--active .dnl-bar  { transform: scaleX(1) !important; }

// /* ── Back button ── */
// .back-btn {
//   display: inline-flex;
//   align-items: center;
//   gap: 6px;
//   padding: 5px 12px 5px 9px;
//   border-radius: 6px;
//   border: 1px solid var(--w10);
//   background: var(--w06);
//   font-family: var(--mono);
//   font-size: 9px;
//   letter-spacing: 0.12em;
//   text-transform: uppercase;
//   color: var(--w40);
//   text-decoration: none;
//   transition: border-color 0.22s, background 0.22s, color 0.22s, transform 0.22s;
// }
// .back-btn:hover {
//   border-color: var(--g40);
//   background: var(--g10);
//   color: var(--g);
//   transform: translateX(-2px);
// }

// /* ── Status pill ── */
// .spill {
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   padding: 4px 10px;
//   border-radius: 100px;
//   border: 1px solid var(--g20);
//   background: var(--g05);
//   flex-shrink: 0;
// }
// .spill-dot {
//   width: 5px; height: 5px;
//   border-radius: 50%;
//   background: var(--g);
//   animation: blink 2s ease-in-out infinite;
// }
// @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
// .spill-txt {
//   font-family: var(--mono);
//   font-size: 9px;
//   letter-spacing: 0.14em;
//   color: var(--w25);
//   white-space: nowrap;
// }

// /* ── Hamburger ── */
// .hbtn {
//   width: 40px; height: 40px;
//   border-radius: 8px;
//   border: 1px solid var(--w10);
//   background: var(--w06);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   gap: 5px;
//   cursor: pointer;
//   color: var(--w40);
//   transition: border-color 0.25s, background 0.25s, color 0.25s;
//   flex-shrink: 0;
// }
// .hbtn:hover  { border-color: var(--g20); background: var(--g10); color: var(--w70); }
// .hbtn.is-open { border-color: var(--g40); background: var(--g10); color: var(--g); }
// .hline {
//   display: block;
//   height: 1.5px;
//   background: currentColor;
//   transform-origin: center;
//   transition: transform 0.36s cubic-bezier(0.23,1,0.32,1), opacity 0.22s, width 0.32s;
// }

// /* ── Mobile nav ── */
// .mob-nav {
//   display: flex;
//   align-items: center;
//   gap: 8px;
// }
// @media (min-width: 1025px) { .mob-nav { display: none; } }

// .mob-back-btn {
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   width: 36px; height: 36px;
//   border-radius: 8px;
//   border: 1px solid var(--w10);
//   background: var(--w06);
//   color: var(--w40);
//   text-decoration: none;
//   transition: border-color 0.22s, background 0.22s, color 0.22s;
// }
// .mob-back-btn:hover { border-color: var(--g40); color: var(--g); background: var(--g10); }

// /* ── Page indicator ── */
// .page-indicator {
//   height: 2px;
//   background: linear-gradient(90deg, var(--g) 0%, var(--g40) 60%, transparent 100%);
//   transform-origin: left;
// }

// /* ── Overlay backdrop ── */
// .ovl-backdrop {
//   position: fixed;
//   inset: 0;
//   z-index: 9998;
//   background: rgba(2,4,8,0.97);
//   backdrop-filter: blur(32px);
//   -webkit-backdrop-filter: blur(32px);
//   overflow-y: auto;
// }
// .overlay-scroll::-webkit-scrollbar { width: 4px; }
// .overlay-scroll::-webkit-scrollbar-track { background: transparent; }
// .overlay-scroll::-webkit-scrollbar-thumb { background: var(--g20); border-radius: 2px; }

// /* ── Overlay decorative ── */
// .grid-bg {
//   position: absolute; inset: 0; pointer-events: none;
//   background-image:
//     linear-gradient(rgba(57,255,132,0.016) 1px, transparent 1px),
//     linear-gradient(90deg, rgba(57,255,132,0.016) 1px, transparent 1px);
//   background-size: 68px 68px;
// }
// @keyframes scan { from { top: -2px } to { top: 100% } }
// .scanline {
//   position: absolute; left: 0; right: 0; height: 1px; pointer-events: none;
//   background: linear-gradient(90deg, transparent, rgba(57,255,132,0.065), transparent);
//   animation: scan 12s linear infinite;
// }
// .gorb { position: absolute; border-radius: 50%; pointer-events: none; }
// .gorb--tr { top: 10%; right: 7%; width: 300px; height: 300px; background: radial-gradient(circle, rgba(57,255,132,0.055) 0%, transparent 70%); }
// .gorb--bl { bottom: 16%; left: 4%; width: 220px; height: 220px; background: radial-gradient(circle, rgba(57,255,132,0.038) 0%, transparent 70%); }
// .cdot { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: var(--g); opacity: 0.7; }
// .cdot--tl { top: 20px; left: 20px; }
// .cdot--tr { top: 20px; right: 20px; }
// .cdot--bl { bottom: 20px; left: 20px; }
// .cdot--br { bottom: 20px; right: 20px; }

// /* ── Overlay close button ── */
// .ovl-close {
//   position: absolute;
//   top: 18px; right: 18px;
//   width: 40px; height: 40px;
//   border-radius: 8px;
//   border: 1px solid var(--g20);
//   background: var(--g05);
//   display: flex; align-items: center; justify-content: center;
//   cursor: pointer;
//   color: var(--g);
//   transition: background 0.22s, border-color 0.22s;
//   z-index: 20;
// }
// .ovl-close:hover { background: var(--g10); border-color: var(--g40); }

// /* ── Overlay inner ── */
// .ovl-inner {
//   position: relative;
//   z-index: 10;
//   min-height: 100%;
//   display: flex;
//   flex-direction: column;
//   padding: 88px 28px 40px;
//   max-width: 960px;
//   margin: 0 auto;
// }
// @media (min-width: 768px) { .ovl-inner { padding-left: 56px; padding-right: 56px; } }

// .ovl-label {
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   margin-bottom: 28px;
//   font-family: var(--mono);
//   font-size: 8px;
//   letter-spacing: 0.26em;
//   text-transform: uppercase;
//   color: rgba(57,255,132,0.42);
// }
// .ovl-label-line { display: inline-block; width: 22px; height: 1px; background: rgba(57,255,132,0.32); }

// /* ── Overlay links ── */
// .ovl-links { flex: 1; display: flex; flex-direction: column; justify-content: center; }
// .ovl-link {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   font-family: var(--disp);
//   font-weight: 800;
//   font-size: clamp(34px, 7vw, 84px);
//   letter-spacing: -0.03em;
//   line-height: 1;
//   text-transform: uppercase;
//   color: rgba(255,255,255,0.058);
//   text-decoration: none;
//   padding: 13px 0;
//   border-bottom: 1px solid rgba(255,255,255,0.045);
//   transition: color 0.24s ease, padding-left 0.26s ease;
// }
// .ovl-link:hover { color: var(--w); padding-left: 16px; }
// .ovl-link--active { color: var(--g); }
// .ovl-link-tag {
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   font-family: var(--mono);
//   font-size: 10px;
//   font-weight: 400;
//   letter-spacing: 0.12em;
//   color: rgba(255,255,255,0.14);
//   transition: color 0.22s;
//   flex-shrink: 0;
// }
// .ovl-link:hover .ovl-link-tag,
// .ovl-link--active .ovl-link-tag { color: var(--g); }
// .ovl-tag-bar { display: inline-block; width: 18px; height: 1px; background: currentColor; }

// /* ── Overlay footer ── */
// .ovl-footer {
//   margin-top: 32px;
//   padding-top: 22px;
//   border-top: 1px solid rgba(255,255,255,0.07);
//   display: flex;
//   flex-wrap: wrap;
//   align-items: flex-end;
//   justify-content: space-between;
//   gap: 18px;
// }
// .ovl-status {
//   display: flex;
//   align-items: center;
//   gap: 7px;
//   margin-bottom: 7px;
// }
// .ovl-status-dot {
//   width: 5px; height: 5px;
//   border-radius: 50%;
//   background: var(--g);
//   flex-shrink: 0;
// }
// .ovl-status span {
//   font-family: var(--mono);
//   font-size: 8px;
//   letter-spacing: 0.2em;
//   text-transform: uppercase;
//   color: rgba(255,255,255,0.2);
// }
// .ovl-email {
//   font-family: var(--disp);
//   font-size: clamp(13px, 2vw, 15px);
//   font-weight: 700;
//   color: var(--g);
//   text-decoration: none;
//   letter-spacing: -0.01em;
//   transition: color 0.2s;
// }
// .ovl-email:hover { color: #80ffb0; }
// .ovl-footer-right {
//   display: flex;
//   flex-direction: column;
//   align-items: flex-end;
//   gap: 9px;
// }
// .ovl-socials { display: flex; gap: 18px; }
// .ovl-social {
//   font-family: var(--mono);
//   font-size: 9px;
//   letter-spacing: 0.14em;
//   text-transform: uppercase;
//   color: rgba(255,255,255,0.22);
//   text-decoration: none;
//   transition: color 0.2s;
// }
// .ovl-social:hover { color: var(--g); }
// .ovl-time {
//   font-family: var(--mono);
//   font-size: 9px;
//   letter-spacing: 0.14em;
//   color: rgba(255,255,255,0.14);
// }
// .ovl-time-accent { color: rgba(57,255,132,0.4); }
// `;























import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ModeToggle } from "../../mode-toggle";

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { name: "Home",     path: "/",         code: "01" },
  { name: "Projects", path: "/projects", code: "02" },
  { name: "Skills",   path: "/skills",   code: "03" },
  { name: "About",    path: "/about",    code: "04" },
  { name: "Contact",  path: "/contact",  code: "05" },
  { name: "Articles", path: "/articles", code: "06" },
  { name: "Career",   path: "/career",   code: "07" },
];

const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/rajankumarsingh01" },
  { label: "LinkedIn", href: "#" },
  { label: "Resume",   href: "#" },
];

const EASE_OUT = [0.22, 1, 0.36, 1];
const EASE_IN_OUT = [0.76, 0, 0.24, 1];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useISTClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useScrolled(threshold = 16) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

// ─── Magnetic Button ──────────────────────────────────────────────────────────

function Magnetic({ children, strength = 0.28 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26 });
  const sy = useSpring(y, { stiffness: 220, damping: 26 });

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  }, [strength, x, y]);

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

// ─── Desktop Nav Link ─────────────────────────────────────────────────────────

function DesktopLink({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <NavLink
      to={item.path}
      end={item.path === "/"}
      className={({ isActive }) =>
        ["dnl", isActive ? "dnl--active" : ""].join(" ").trim()
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="dnl-code">{item.code}</span>
      <span className="dnl-name">{item.name}</span>
      <motion.span
        className="dnl-bar"
        initial={false}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.24, ease: EASE_IN_OUT }}
      />
    </NavLink>
  );
}

// ─── Status Pill ──────────────────────────────────────────────────────────────

function StatusPill({ time }) {
  return (
    <div className="spill" aria-label={`Current IST time: ${time}`}>
      <motion.span
        className="spill-dot"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="spill-txt">{time}&nbsp;IST</span>
    </div>
  );
}

// ─── Hamburger Button (FIXED) ─────────────────────────────────────────────────

function HamburgerButton({ open, onClick }) {
  return (
    <Magnetic strength={0.18}>
      <button
        type="button"
        onClick={onClick}
        className={["hbtn", open ? "is-open" : ""].join(" ").trim()}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="overlay-menu"
      >
        <span className="hlines-wrap" aria-hidden="true">
          <motion.span
            className="hline"
            animate={open
              ? { y: 6.5, rotate: 45, width: "100%" }
              : { y: 0,   rotate: 0,  width: "52%" }
            }
            transition={{ duration: 0.32, ease: EASE_OUT }}
          />
          <motion.span
            className="hline"
            style={{ alignSelf: "flex-end" }}
            animate={open
              ? { opacity: 0, scaleX: 0 }
              : { opacity: 1, scaleX: 1, width: "68%" }
            }
            transition={{ duration: 0.2, ease: EASE_OUT }}
          />
          <motion.span
            className="hline"
            animate={open
              ? { y: -6.5, rotate: -45, width: "100%" }
              : { y: 0,    rotate: 0,   width: "52%" }
            }
            transition={{ duration: 0.32, ease: EASE_OUT }}
          />
        </span>
      </button>
    </Magnetic>
  );
}

// ─── Overlay Menu ─────────────────────────────────────────────────────────────

function OverlayMenu({ open, onClose, time }) {
  const handleBackdrop = useCallback(
    (e) => { if (e.currentTarget === e.target) onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          id="overlay-menu"
          key="ovl"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="ovl-backdrop overlay-scroll"
          initial={{ clipPath: "inset(0 0 100% 0 round 0px)", opacity: 0 }}
          animate={{ clipPath: "inset(0 0 0%   0 round 0px)", opacity: 1 }}
          exit={{   clipPath: "inset(0 0 100% 0 round 0px)", opacity: 0 }}
          transition={{ duration: 0.52, ease: EASE_IN_OUT }}
          onClick={handleBackdrop}
        >
          {/* Decorative bg */}
          <div className="ovl-grid"      aria-hidden="true" />
          <div className="ovl-scanline"  aria-hidden="true" />
          <div className="ovl-orb ovl-orb--tr" aria-hidden="true" />
          <div className="ovl-orb ovl-orb--bl" aria-hidden="true" />
          {["tl","tr","bl","br"].map(p => (
            <div key={p} className={`cdot cdot--${p}`} aria-hidden="true" />
          ))}

          {/* Close button */}
          <button
            type="button"
            className="ovl-close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="ovl-inner">

            {/* Header label */}
            <motion.div
              className="ovl-label"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.3, ease: EASE_OUT }}
            >
              <span className="ovl-label-bar" aria-hidden="true" />
              <span>Navigation</span>
              <span className="ovl-label-bar" aria-hidden="true" />
            </motion.div>

            {/* Nav links */}
            <nav className="ovl-links" aria-label="Main navigation">
              {NAV_LINKS.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -48 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{   opacity: 0, x: -24 }}
                  transition={{
                    delay: i * 0.048 + 0.16,
                    duration: 0.4,
                    ease: EASE_OUT,
                  }}
                >
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    onClick={onClose}
                    className={({ isActive }) =>
                      ["ovl-link", isActive ? "ovl-link--active" : ""].join(" ").trim()
                    }
                  >
                    <span className="ovl-link-name">{item.name}</span>
                    <span className="ovl-link-meta" aria-hidden="true">
                      <span className="ovl-link-code">{item.code}</span>
                      <span className="ovl-link-bar" />
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M2 9L9 2M9 2H3.5M9 2V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <motion.footer
              className="ovl-footer"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.36, ease: EASE_OUT }}
            >
              <div className="ovl-footer-left">
                <div className="ovl-avail">
                  <motion.span
                    className="ovl-avail-dot"
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    aria-hidden="true"
                  />
                  <span>Open to Work</span>
                </div>
                <a href="mailto:rajankrsingh200@gmail.com" className="ovl-email">
                  rajankrsingh200@gmail.com
                </a>
              </div>

              <div className="ovl-footer-right">
                <div className="ovl-socials">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="ovl-social-link"
                    >
                      {s.label}
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                        <path d="M1 7L7 1M7 1H2.5M7 1V5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  ))}
                </div>
                <span className="ovl-clock">
                  {time}&nbsp;<span className="ovl-clock-accent">IST</span>
                </span>
              </div>
            </motion.footer>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const time = useISTClock();
  const isScrolled = useScrolled();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const openMenu  = useCallback(() => setMenuOpen(true),  []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen(v => !v), []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const currentLink = NAV_LINKS.find((l) =>
    l.path === "/" ? location.pathname === "/" : location.pathname.startsWith(l.path)
  );

  return (
    <>
      <style>{CSS}</style>

      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.64, ease: EASE_OUT }}
        className={["nav-header", isScrolled ? "nav-header--scrolled" : ""].join(" ").trim()}
      >
        {/* Top accent gradient line */}
        <div className="nav-accent" aria-hidden="true" />

        <div className="nav-container">
          <div className="nav-inner">

            {/* ── Logo ── */}
            <Link to="/" className="nav-logo" aria-label="Rajan.dev – Home">
              <Magnetic strength={0.2}>
                <div className="logo-wrap">
                  <span className="logo-brace" aria-hidden="true">{"{"}</span>
                  <div className="logo-text">
                    <span className="logo-name">
                      Rajan<span className="logo-dot">.</span>dev
                    </span>
                    <span className="logo-crumb" aria-hidden="true">
                      {currentLink?.code ?? "00"}&nbsp;/&nbsp;{currentLink?.name ?? "Home"}
                    </span>
                  </div>
                  <span className="logo-brace" aria-hidden="true">{"}"}</span>
                </div>
              </Magnetic>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="desk-nav" aria-label="Primary navigation">
              <AnimatePresence>
                {!isHome && (
                  <motion.div
                    key="back"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1,  x: 0 }}
                    exit={{   opacity: 0,   x: -10 }}
                    transition={{ duration: 0.24 }}
                  >
                    <Magnetic strength={0.16}>
                      <Link to="/" className="back-btn" aria-label="Back to Home">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M8 2L3 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Home
                      </Link>
                    </Magnetic>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isHome && <div className="nav-sep" aria-hidden="true" />}

              {NAV_LINKS.filter((l) => l.path !== "/").map((item) => (
                <DesktopLink key={item.path} item={item} />
              ))}

              <div className="nav-sep" aria-hidden="true" />
              <StatusPill time={time} />
              <ModeToggle />
              <HamburgerButton open={menuOpen} onClick={openMenu} />
            </nav>

            {/* ── Mobile Controls ── */}
            <div className="mob-nav" aria-label="Mobile navigation">
              <AnimatePresence>
                {!isHome && (
                  <motion.div
                    key="mob-back"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1,  x: 0 }}
                    exit={{   opacity: 0,   x: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to="/" className="mob-back" aria-label="Back to Home">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M8 2L3 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
              <ModeToggle />
              {/* Mobile hamburger uses toggleMenu so it opens AND closes */}
              <HamburgerButton open={menuOpen} onClick={toggleMenu} />
            </div>

          </div>
        </div>

        {/* Scrolled page progress indicator */}
        <AnimatePresence>
          {isScrolled && !isHome && (
            <motion.div
              key="progress"
              className="nav-progress"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{   scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.44 }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Overlay ── */}
      <OverlayMenu open={menuOpen} onClose={closeMenu} time={time} />
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Syne:wght@700;800&display=swap');

/* ── Tokens ── */
:root {
  --g:    #39ff84;
  --g05:  rgba(57,255,132,0.05);
  --g10:  rgba(57,255,132,0.10);
  --g18:  rgba(57,255,132,0.18);
  --g30:  rgba(57,255,132,0.30);
  --g50:  rgba(57,255,132,0.50);
  --g80:  rgba(57,255,132,0.80);
  --w:    #efefea;
  --w06:  rgba(255,255,255,0.06);
  --w10:  rgba(255,255,255,0.10);
  --w20:  rgba(255,255,255,0.20);
  --w40:  rgba(255,255,255,0.40);
  --w60:  rgba(255,255,255,0.60);
  --w80:  rgba(255,255,255,0.80);
  --bg:   #060a0f;
  --mono: 'JetBrains Mono', monospace;
  --disp: 'Syne', sans-serif;
  --h:    64px;
  --ease: cubic-bezier(0.22,1,0.36,1);
}

*,*::before,*::after { box-sizing: border-box; }

/* ── Header ── */
.nav-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 9999;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition:
    background 0.35s ease,
    border-color 0.35s ease,
    backdrop-filter 0.35s ease;
}
.nav-header--scrolled {
  background: rgba(6,10,15,0.90);
  border-bottom-color: var(--g18);
  backdrop-filter: blur(32px) saturate(180%);
  -webkit-backdrop-filter: blur(32px) saturate(180%);
}

/* Top accent */
.nav-accent {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--g50) 30%,
    var(--g80) 50%,
    var(--g50) 70%,
    transparent 100%
  );
}

.nav-container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 20px;
}
@media (min-width: 1025px) {
  .nav-container { padding: 0 44px; }
}

.nav-inner {
  height: var(--h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

/* ── Logo ── */
.nav-logo {
  position: relative;
  z-index: 50;
  text-decoration: none;
  flex-shrink: 0;
}
.logo-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}
.logo-brace {
  font-family: var(--mono);
  font-size: 16px;
  color: var(--g30);
  user-select: none;
  line-height: 1;
}
.logo-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
  line-height: 1;
}
.logo-name {
  font-family: var(--disp);
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--w);
}
.logo-dot { color: var(--g); }
.logo-crumb {
  font-family: var(--mono);
  font-size: 7px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--w20);
}

/* ── Separator ── */
.nav-sep {
  width: 1px;
  height: 20px;
  background: var(--w10);
  flex-shrink: 0;
}

/* ── Desktop nav ── */
.desk-nav {
  display: none;
  align-items: center;
  gap: 16px;
}
@media (min-width: 1025px) {
  .desk-nav { display: flex; }
}

/* ── Desktop link ── */
.dnl {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px 3px 8px;
  text-decoration: none;
  overflow: hidden;
  transition: none;
}
.dnl-code {
  font-family: var(--mono);
  font-size: 7px;
  letter-spacing: 0.22em;
  color: var(--w20);
  line-height: 1;
  transition: color 0.22s;
}
.dnl-name {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--w40);
  line-height: 1;
  transition: color 0.22s;
}
.dnl-bar {
  position: absolute;
  bottom: 0; left: 0;
  display: block;
  width: 100%;
  height: 1.5px;
  background: var(--g);
  transform-origin: left;
  border-radius: 999px;
}
.dnl:hover .dnl-code,
.dnl:hover .dnl-name { color: var(--w80); }
.dnl--active .dnl-code { color: var(--g50); }
.dnl--active .dnl-name { color: var(--g); }
.dnl--active .dnl-bar  { transform: scaleX(1) !important; }

/* ── Back button ── */
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 13px 5px 10px;
  border-radius: 7px;
  border: 1px solid var(--w10);
  background: var(--w06);
  font-family: var(--mono);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--w40);
  text-decoration: none;
  white-space: nowrap;
  transition: border-color 0.22s, background 0.22s, color 0.22s, transform 0.22s;
}
.back-btn:hover {
  border-color: var(--g50);
  background: var(--g10);
  color: var(--g);
  transform: translateX(-2px);
}

/* ── Status pill ── */
.spill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 11px;
  border-radius: 100px;
  border: 1px solid var(--g18);
  background: var(--g05);
  flex-shrink: 0;
}
.spill-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--g);
  flex-shrink: 0;
}
.spill-txt {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  color: var(--w40);
  white-space: nowrap;
}

/* ── Hamburger ── */
.hbtn {
  position: relative;
  width: 42px;
  height: 42px;
  border-radius: 9px;
  border: 1px solid var(--w10);
  background: var(--w06);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: border-color 0.25s, background 0.25s;
}
.hbtn:hover {
  border-color: var(--g30);
  background: var(--g10);
}
.hbtn.is-open {
  border-color: var(--g50);
  background: var(--g10);
}
.hlines-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  width: 22px;
}
.hline {
  display: block;
  height: 1.5px;
  background: var(--w60);
  border-radius: 999px;
  transform-origin: center;
}
.hbtn.is-open .hline { background: var(--g); }

/* ── Mobile nav ── */
.mob-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}
@media (min-width: 1025px) {
  .mob-nav { display: none; }
}

.mob-back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  border: 1px solid var(--w10);
  background: var(--w06);
  color: var(--w40);
  text-decoration: none;
  transition: border-color 0.22s, background 0.22s, color 0.22s;
}
.mob-back:hover {
  border-color: var(--g50);
  background: var(--g10);
  color: var(--g);
}

/* ── Page progress ── */
.nav-progress {
  height: 2px;
  background: linear-gradient(90deg, var(--g) 0%, var(--g50) 55%, transparent 100%);
  transform-origin: left;
}

/* ── Overlay ── */
.ovl-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: rgba(4,7,12,0.97);
  backdrop-filter: blur(36px) saturate(140%);
  -webkit-backdrop-filter: blur(36px) saturate(140%);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.overlay-scroll::-webkit-scrollbar { width: 3px; }
.overlay-scroll::-webkit-scrollbar-track { background: transparent; }
.overlay-scroll::-webkit-scrollbar-thumb { background: var(--g18); border-radius: 2px; }

/* Decorative grid */
.ovl-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(57,255,132,0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(57,255,132,0.018) 1px, transparent 1px);
  background-size: 72px 72px;
}

/* Scanline */
@keyframes scan { from { top: -2px } to { top: 100% } }
.ovl-scanline {
  position: absolute;
  left: 0; right: 0;
  height: 1px;
  pointer-events: none;
  background: linear-gradient(90deg, transparent, rgba(57,255,132,0.07), transparent);
  animation: scan 14s linear infinite;
}

/* Glow orbs */
.ovl-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.ovl-orb--tr {
  top: 8%; right: 5%;
  width: 340px; height: 340px;
  background: radial-gradient(circle, rgba(57,255,132,0.06) 0%, transparent 68%);
}
.ovl-orb--bl {
  bottom: 14%; left: 3%;
  width: 240px; height: 240px;
  background: radial-gradient(circle, rgba(57,255,132,0.04) 0%, transparent 68%);
}

/* Corner dots */
.cdot {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--g);
  opacity: 0.6;
}
.cdot--tl { top: 18px; left: 18px; }
.cdot--tr { top: 18px; right: 18px; }
.cdot--bl { bottom: 18px; left: 18px; }
.cdot--br { bottom: 18px; right: 18px; }

/* Close button */
.ovl-close {
  position: sticky;
  top: 18px;
  float: right;
  margin: 18px 18px 0 0;
  width: 42px;
  height: 42px;
  border-radius: 9px;
  border: 1px solid var(--g18);
  background: var(--g05);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--g);
  z-index: 20;
  flex-shrink: 0;
  transition: background 0.22s, border-color 0.22s;
}
.ovl-close:hover {
  background: var(--g10);
  border-color: var(--g50);
}

/* Inner layout */
.ovl-inner {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 80px 28px 40px;
  max-width: 980px;
  margin: 0 auto;
}
@media (min-width: 640px) {
  .ovl-inner { padding: 88px 52px 48px; }
}
@media (min-width: 1025px) {
  .ovl-inner { padding: 88px 68px 52px; }
}

/* Label */
.ovl-label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--g50);
}
.ovl-label-bar {
  display: inline-block;
  width: 20px;
  height: 1px;
  background: var(--g30);
  flex-shrink: 0;
}

/* Nav links */
.ovl-links {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 8px;
}

.ovl-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  padding: 14px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  font-family: var(--disp);
  font-weight: 800;
  font-size: clamp(32px, 6.5vw, 80px);
  letter-spacing: -0.035em;
  line-height: 1.05;
  text-transform: uppercase;
  color: rgba(255,255,255,0.055);
  transition: color 0.22s ease, padding-left 0.26s ease, border-color 0.22s;
}
.ovl-link:hover {
  color: var(--w);
  padding-left: 18px;
  border-bottom-color: rgba(255,255,255,0.1);
}
.ovl-link--active {
  color: var(--g);
}
.ovl-link--active .ovl-link-meta { color: var(--g50); }

.ovl-link-name { flex: 1; }

.ovl-link-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.12em;
  color: rgba(255,255,255,0.12);
  transition: color 0.22s;
  flex-shrink: 0;
  margin-left: 16px;
}
.ovl-link:hover .ovl-link-meta { color: var(--g); }

.ovl-link-code { font-size: 9px; }
.ovl-link-bar {
  display: inline-block;
  width: 16px;
  height: 1px;
  background: currentColor;
  flex-shrink: 0;
}

/* Footer */
.ovl-footer {
  margin-top: 36px;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.ovl-footer-left { display: flex; flex-direction: column; gap: 7px; }
.ovl-footer-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.ovl-avail {
  display: flex;
  align-items: center;
  gap: 7px;
}
.ovl-avail-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--g);
  flex-shrink: 0;
}
.ovl-avail span {
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--w20);
}

.ovl-email {
  font-family: var(--disp);
  font-size: clamp(12px, 2vw, 15px);
  font-weight: 700;
  color: var(--g);
  text-decoration: none;
  letter-spacing: -0.01em;
  word-break: break-all;
  transition: color 0.2s;
}
.ovl-email:hover { color: #80ffb0; }

.ovl-socials {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.ovl-social-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--w20);
  text-decoration: none;
  transition: color 0.2s;
}
.ovl-social-link:hover { color: var(--g); }

.ovl-clock {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  color: var(--w20);
}
.ovl-clock-accent { color: var(--g50); }

/* ── Mobile responsiveness ── */
@media (max-width: 480px) {
  .ovl-inner { padding: 72px 20px 32px; }
  .ovl-link { padding: 11px 0; }
  .ovl-footer { flex-direction: column; align-items: flex-start; }
  .ovl-footer-right { align-items: flex-start; }
  .ovl-socials { justify-content: flex-start; }
  .spill { display: none; }
}
`;