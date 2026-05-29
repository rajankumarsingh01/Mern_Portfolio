// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import {
//   MapPin,
//   Clock,
//   Briefcase,
//   ExternalLink,
//   Calendar,
//   ArrowLeft,
//   Loader2,
//   CheckCircle2,
// } from "lucide-react";

// const CareerView = () => {
//   const { slug } = useParams();
//   const [career, setCareer] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const { data } = await axios.get(
//           `http://localhost:4000/api/v1/career/slug/${slug}`
//         );
//         setCareer(data.career);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetch();
//   }, [slug]);

//   if (loading)
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           background: "#09090b",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Loader2
//           size={40}
//           color="#22d3ee"
//           style={{ animation: "spin 1s linear infinite" }}
//         />
//         <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//       </div>
//     );

//   if (!career)
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           background: "#09090b",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           color: "#fff",
//           flexDirection: "column",
//           gap: "16px",
//         }}
//       >
//         <p style={{ fontSize: "20px" }}>Career not found.</p>
//         <Link to="/career" style={{ color: "#22d3ee" }}>
//           ← Back to Careers
//         </Link>
//       </div>
//     );

//   const isExpired = career.deadline
//     ? new Date(career.deadline) < new Date()
//     : false;

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#09090b",
//         color: "#fff",
//         padding: "60px 20px",
//       }}
//     >
//       <div style={{ maxWidth: "860px", margin: "0 auto" }}>
//         {/* BACK */}
//         <Link
//           to="/career"
//           style={{
//             display: "inline-flex",
//             alignItems: "center",
//             gap: "8px",
//             color: "#71717a",
//             textDecoration: "none",
//             fontSize: "14px",
//             marginBottom: "32px",
//           }}
//         >
//           <ArrowLeft size={16} /> Back to Careers
//         </Link>

//         {/* IMAGE */}
//         {career?.careerImg?.url && (
//           <img
//             src={career.careerImg.url}
//             alt={career.title}
//             style={{
//               width: "100%",
//               height: "320px",
//               objectFit: "cover",
//               borderRadius: "24px",
//               marginBottom: "36px",
//               border: "1px solid rgba(255,255,255,0.07)",
//             }}
//           />
//         )}

//         {/* TITLE */}
//         <h1
//           style={{
//             fontSize: "clamp(28px,5vw,48px)",
//             fontWeight: "900",
//             marginBottom: "10px",
//           }}
//         >
//           {career.title}
//         </h1>

//         <p
//           style={{
//             color: "#a1a1aa",
//             fontSize: "18px",
//             fontWeight: "600",
//             marginBottom: "28px",
//           }}
//         >
//           {career.company}
//         </p>

//         {/* META */}
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: "12px",
//             marginBottom: "32px",
//           }}
//         >
//           {[
//             { icon: MapPin, label: career.location },
//             { icon: Briefcase, label: career.mode },
//             career.duration && { icon: Clock, label: career.duration },
//             career.deadline && {
//               icon: Calendar,
//               label: `Deadline: ${new Date(career.deadline).toLocaleDateString(
//                 "en-IN",
//                 { day: "numeric", month: "short", year: "numeric" }
//               )}`,
//               color: isExpired ? "#f87171" : "#a1a1aa",
//             },
//           ]
//             .filter(Boolean)
//             .map((meta, i) => (
//               <span
//                 key={i}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "7px",
//                   background: "rgba(255,255,255,0.05)",
//                   border: "1px solid rgba(255,255,255,0.09)",
//                   borderRadius: "12px",
//                   padding: "8px 16px",
//                   fontSize: "14px",
//                   color: meta.color || "#a1a1aa",
//                 }}
//               >
//                 <meta.icon size={14} /> {meta.label}
//               </span>
//             ))}
//         </div>

//         {/* STIPEND / SALARY */}
//         {(career.stipend || career.salary) && (
//           <div
//             style={{
//               background: "rgba(6,182,212,0.08)",
//               border: "1px solid rgba(6,182,212,0.2)",
//               borderRadius: "16px",
//               padding: "16px 20px",
//               color: "#22d3ee",
//               fontSize: "16px",
//               fontWeight: "700",
//               marginBottom: "32px",
//             }}
//           >
//             {career.stipend
//               ? `💰 Stipend: ${career.stipend}`
//               : `💼 Salary: ${career.salary}`}
//           </div>
//         )}

//         {/* SKILLS */}
//         {career.skills?.length > 0 && (
//           <div style={{ marginBottom: "32px" }}>
//             <h3
//               style={{
//                 fontSize: "16px",
//                 fontWeight: "700",
//                 color: "#d4d4d8",
//                 marginBottom: "14px",
//               }}
//             >
//               Required Skills
//             </h3>

//             <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//               {career.skills.map((skill, i) => (
//                 <span
//                   key={i}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "6px",
//                     background: "rgba(255,255,255,0.06)",
//                     border: "1px solid rgba(255,255,255,0.1)",
//                     borderRadius: "10px",
//                     padding: "6px 14px",
//                     fontSize: "13px",
//                     color: "#e4e4e7",
//                   }}
//                 >
//                   <CheckCircle2 size={12} color="#4ade80" />
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* DESCRIPTION */}
//         <div
//           style={{
//             background: "rgba(255,255,255,0.03)",
//             border: "1px solid rgba(255,255,255,0.07)",
//             borderRadius: "20px",
//             padding: "28px",
//             marginBottom: "36px",
//           }}
//         >
//           <h3
//             style={{
//               fontSize: "18px",
//               fontWeight: "700",
//               marginBottom: "16px",
//             }}
//           >
//             About this Opportunity
//           </h3>

//           <p
//             style={{
//               color: "#a1a1aa",
//               lineHeight: "1.9",
//               fontSize: "15px",
//               whiteSpace: "pre-line",
//             }}
//           >
//             {career.description}
//           </p>
//         </div>

//         {/* APPLY BUTTON FIXED */}
//         <a
//           href={career.applyLink || "#"}
//           target="_blank"
//           rel="noreferrer"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "10px",
//             width: "100%",
//             padding: "18px",
//             borderRadius: "18px",
//             textDecoration: "none",
//             background: isExpired
//               ? "rgba(255,255,255,0.08)"
//               : "linear-gradient(135deg,#06b6d4,#3b82f6)",
//             color: isExpired ? "#71717a" : "#fff",
//             fontSize: "16px",
//             fontWeight: "800",
//             pointerEvents: isExpired ? "none" : "auto",
//             cursor: isExpired ? "not-allowed" : "pointer",
//           }}
//         >
//           {isExpired ? (
//             "Application Closed"
//           ) : (
//             <>
//               Apply Now <ExternalLink size={16} />
//             </>
//           )}
//         </a>
//       </div>
//     </div>
//   );
// };

// export default CareerView;













// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import {
//   MapPin,
//   Clock,
//   Briefcase,
//   ExternalLink,
//   Calendar,
//   ArrowLeft,
//   Loader2,
//   CheckCircle2,
//   Award,
//   BookOpen,
//   Users,
//   Zap,
//   TrendingUp,
// } from "lucide-react";

// /* ─── Type badge config ──────────────────────────────────────────── */
// const TYPE_CONFIG = {
//   internship: { label: "Internship", color: "#818cf8", bg: "rgba(129,140,248,0.12)", icon: Briefcase },
//   job: { label: "Full-time Job", color: "#34d399", bg: "rgba(52,211,153,0.12)", icon: TrendingUp },
//   certification: { label: "Certification", color: "#fbbf24", bg: "rgba(251,191,36,0.12)", icon: Award },
//   training: { label: "Training", color: "#f472b6", bg: "rgba(244,114,182,0.12)", icon: BookOpen },
// };

// const getTypeConfig = (type) =>
//   TYPE_CONFIG[type?.toLowerCase()] || TYPE_CONFIG["internship"];

// /* ─── Styles ─────────────────────────────────────────────────────── */
// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   .cv-root {
//     min-height: 100vh;
//     background: #0a0a0f;
//     color: #f1f1f3;
//     font-family: 'DM Sans', sans-serif;
//     padding: 0 0 80px;
//   }

//   /* ── Hero Banner ── */
//   .cv-hero {
//     position: relative;
//     width: 100%;
//     height: 260px;
//     overflow: hidden;
//   }
//   @media (min-width: 768px) { .cv-hero { height: 340px; } }

//   .cv-hero img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     display: block;
//   }

//   .cv-hero-overlay {
//     position: absolute;
//     inset: 0;
//     background: linear-gradient(to bottom, rgba(10,10,15,0.2) 0%, rgba(10,10,15,0.85) 100%);
//   }

//   .cv-hero-placeholder {
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   /* ── Container ── */
//   .cv-container {
//     max-width: 800px;
//     margin: 0 auto;
//     padding: 0 16px;
//   }
//   @media (min-width: 768px) { .cv-container { padding: 0 24px; } }

//   /* ── Back link ── */
//   .cv-back {
//     display: inline-flex;
//     align-items: center;
//     gap: 6px;
//     color: #71717a;
//     text-decoration: none;
//     font-size: 13px;
//     font-weight: 500;
//     padding: 20px 0 0;
//     transition: color 0.2s;
//     letter-spacing: 0.01em;
//   }
//   .cv-back:hover { color: #a1a1aa; }

//   /* ── Card ── */
//   .cv-card {
//     background: #111116;
//     border: 1px solid rgba(255,255,255,0.07);
//     border-radius: 20px;
//     margin-top: 28px;
//     overflow: hidden;
//   }

//   .cv-card-header {
//     padding: 28px 24px 24px;
//     border-bottom: 1px solid rgba(255,255,255,0.06);
//   }
//   @media (min-width: 768px) { .cv-card-header { padding: 36px 36px 28px; } }

//   /* ── Type badge ── */
//   .cv-type-badge {
//     display: inline-flex;
//     align-items: center;
//     gap: 6px;
//     border-radius: 8px;
//     padding: 5px 12px;
//     font-size: 12px;
//     font-weight: 700;
//     letter-spacing: 0.05em;
//     text-transform: uppercase;
//     margin-bottom: 16px;
//   }

//   /* ── Title ── */
//   .cv-title {
//     font-family: 'Sora', sans-serif;
//     font-size: clamp(22px, 5vw, 36px);
//     font-weight: 800;
//     line-height: 1.2;
//     color: #f8f8fc;
//     margin-bottom: 8px;
//   }

//   .cv-company {
//     font-size: 16px;
//     font-weight: 600;
//     color: #71717a;
//     margin-bottom: 20px;
//     display: flex;
//     align-items: center;
//     gap: 8px;
//   }
//   .cv-company::before {
//     content: '';
//     display: inline-block;
//     width: 18px;
//     height: 2px;
//     background: #3b82f6;
//     border-radius: 2px;
//     flex-shrink: 0;
//   }

//   /* ── Meta chips ── */
//   .cv-meta-row {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 8px;
//     margin-top: 4px;
//   }

//   .cv-meta-chip {
//     display: inline-flex;
//     align-items: center;
//     gap: 6px;
//     background: rgba(255,255,255,0.05);
//     border: 1px solid rgba(255,255,255,0.08);
//     border-radius: 10px;
//     padding: 7px 13px;
//     font-size: 13px;
//     color: #a1a1aa;
//     font-weight: 500;
//   }
//   .cv-meta-chip.deadline-expired { color: #f87171; border-color: rgba(248,113,113,0.25); background: rgba(248,113,113,0.07); }
//   .cv-meta-chip.deadline-active { color: #4ade80; border-color: rgba(74,222,128,0.25); background: rgba(74,222,128,0.07); }

//   /* ── Body ── */
//   .cv-body {
//     padding: 24px;
//     display: flex;
//     flex-direction: column;
//     gap: 24px;
//   }
//   @media (min-width: 768px) { .cv-body { padding: 32px 36px; gap: 32px; } }

//   /* ── Stipend/Salary banner ── */
//   .cv-pay-banner {
//     display: flex;
//     align-items: center;
//     gap: 14px;
//     background: linear-gradient(135deg, rgba(6,182,212,0.08), rgba(59,130,246,0.08));
//     border: 1px solid rgba(6,182,212,0.2);
//     border-radius: 14px;
//     padding: 16px 20px;
//   }

//   .cv-pay-icon {
//     width: 42px;
//     height: 42px;
//     border-radius: 12px;
//     background: rgba(6,182,212,0.15);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-shrink: 0;
//     font-size: 20px;
//   }

//   .cv-pay-label {
//     font-size: 12px;
//     color: #71717a;
//     font-weight: 500;
//     margin-bottom: 2px;
//     text-transform: uppercase;
//     letter-spacing: 0.06em;
//   }

//   .cv-pay-value {
//     font-family: 'Sora', sans-serif;
//     font-size: 20px;
//     font-weight: 800;
//     color: #22d3ee;
//   }

//   /* ── Section ── */
//   .cv-section-label {
//     font-size: 11px;
//     font-weight: 700;
//     color: #52525b;
//     text-transform: uppercase;
//     letter-spacing: 0.1em;
//     margin-bottom: 12px;
//   }

//   /* ── Skills ── */
//   .cv-skills-grid {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 8px;
//   }

//   .cv-skill-tag {
//     display: inline-flex;
//     align-items: center;
//     gap: 6px;
//     background: rgba(255,255,255,0.05);
//     border: 1px solid rgba(255,255,255,0.09);
//     border-radius: 8px;
//     padding: 6px 13px;
//     font-size: 13px;
//     color: #d4d4d8;
//     font-weight: 500;
//     transition: background 0.2s, border-color 0.2s;
//   }
//   .cv-skill-tag:hover {
//     background: rgba(255,255,255,0.08);
//     border-color: rgba(255,255,255,0.15);
//   }

//   /* ── Description ── */
//   .cv-description {
//     color: #a1a1aa;
//     line-height: 1.85;
//     font-size: 15px;
//     white-space: pre-line;
//   }

//   /* ── Divider ── */
//   .cv-divider {
//     height: 1px;
//     background: rgba(255,255,255,0.06);
//     width: 100%;
//   }

//   /* ── Apply footer ── */
//   .cv-footer {
//     padding: 20px 24px;
//     border-top: 1px solid rgba(255,255,255,0.06);
//     background: rgba(255,255,255,0.02);
//   }
//   @media (min-width: 768px) { .cv-footer { padding: 24px 36px; } }

//   .cv-apply-btn {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 10px;
//     width: 100%;
//     padding: 16px;
//     border-radius: 14px;
//     text-decoration: none;
//     font-family: 'Sora', sans-serif;
//     font-size: 15px;
//     font-weight: 700;
//     letter-spacing: 0.02em;
//     transition: opacity 0.2s, transform 0.15s;
//     cursor: pointer;
//   }
//   .cv-apply-btn:hover:not(.disabled) { opacity: 0.9; transform: translateY(-1px); }
//   .cv-apply-btn.active {
//     background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
//     color: #fff;
//     box-shadow: 0 4px 24px rgba(6,182,212,0.25);
//   }
//   .cv-apply-btn.disabled {
//     background: rgba(255,255,255,0.06);
//     color: #52525b;
//     cursor: not-allowed;
//     pointer-events: none;
//   }

//   /* ── Loading / Error ── */
//   .cv-center {
//     min-height: 100vh;
//     background: #0a0a0f;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-direction: column;
//     gap: 16px;
//     font-family: 'DM Sans', sans-serif;
//     color: #fff;
//   }

//   @keyframes spin { to { transform: rotate(360deg); } }
//   .spinning { animation: spin 1s linear infinite; }

//   @keyframes fadeUp {
//     from { opacity: 0; transform: translateY(16px); }
//     to { opacity: 1; transform: translateY(0); }
//   }
//   .cv-animate { animation: fadeUp 0.45s ease both; }
//   .cv-animate-2 { animation: fadeUp 0.45s ease 0.1s both; }
//   .cv-animate-3 { animation: fadeUp 0.45s ease 0.2s both; }
// `;

// /* ─── Component ──────────────────────────────────────────────────── */
// const CareerView = () => {
//   const { slug } = useParams();
//   const [career, setCareer] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCareer = async () => {
//       try {
//         const { data } = await axios.get(
//           `http://localhost:4000/api/v1/career/slug/${slug}`
//         );
//         setCareer(data.career);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCareer();
//   }, [slug]);

//   if (loading)
//     return (
//       <>
//         <style>{styles}</style>
//         <div className="cv-center">
//           <Loader2 size={36} color="#22d3ee" className="spinning" />
//           <p style={{ color: "#52525b", fontSize: "14px" }}>Loading opportunity…</p>
//         </div>
//       </>
//     );

//   if (!career)
//     return (
//       <>
//         <style>{styles}</style>
//         <div className="cv-center">
//           <p style={{ fontSize: "18px", color: "#71717a" }}>Opportunity not found.</p>
//           <Link to="/career" style={{ color: "#22d3ee", fontSize: "14px" }}>
//             ← Back to Careers
//           </Link>
//         </div>
//       </>
//     );

//   const isExpired = career.deadline
//     ? new Date(career.deadline) < new Date()
//     : false;

//   const typeConf = getTypeConfig(career.type);
//   const TypeIcon = typeConf.icon;

//   const metaChips = [
//     career.location && { icon: MapPin, label: career.location },
//     career.mode && { icon: Briefcase, label: career.mode },
//     career.openings && { icon: Users, label: `${career.openings} opening${career.openings > 1 ? "s" : ""}` },
//     career.duration && { icon: Clock, label: career.duration },
//     career.deadline && {
//       icon: Calendar,
//       label: `Deadline: ${new Date(career.deadline).toLocaleDateString("en-IN", {
//         day: "numeric", month: "short", year: "numeric",
//       })}`,
//       cls: isExpired ? "deadline-expired" : "deadline-active",
//     },
//   ].filter(Boolean);

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="cv-root">
//         {/* Hero */}
//         <div className="cv-hero">
//           {career?.careerImg?.url ? (
//             <img src={career.careerImg.url} alt={career.title} />
//           ) : (
//             <div className="cv-hero-placeholder">
//               <TypeIcon size={56} color="rgba(255,255,255,0.08)" />
//             </div>
//           )}
//           <div className="cv-hero-overlay" />
//         </div>

//         <div className="cv-container">
//           {/* Back */}
//           <Link to="/career" className="cv-back cv-animate">
//             <ArrowLeft size={15} /> Back to Careers
//           </Link>

//           {/* Main Card */}
//           <div className="cv-card cv-animate-2">
//             {/* Header */}
//             <div className="cv-card-header">
//               {/* Type badge */}
//               <div
//                 className="cv-type-badge"
//                 style={{ color: typeConf.color, background: typeConf.bg }}
//               >
//                 <TypeIcon size={12} />
//                 {typeConf.label}
//               </div>

//               <h1 className="cv-title">{career.title}</h1>
//               <p className="cv-company">{career.company}</p>

//               {/* Meta chips */}
//               <div className="cv-meta-row">
//                 {metaChips.map((m, i) => (
//                   <span key={i} className={`cv-meta-chip ${m.cls || ""}`}>
//                     <m.icon size={13} />
//                     {m.label}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Body */}
//             <div className="cv-body cv-animate-3">
//               {/* Pay */}
//               {(career.stipend || career.salary) && (
//                 <div className="cv-pay-banner">
//                   <div className="cv-pay-icon">
//                     {career.stipend ? "💰" : "💼"}
//                   </div>
//                   <div>
//                     <div className="cv-pay-label">
//                       {career.stipend ? "Monthly Stipend" : "Annual Salary"}
//                     </div>
//                     <div className="cv-pay-value">
//                       {career.stipend || career.salary}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Skills */}
//               {career.skills?.length > 0 && (
//                 <div>
//                   <p className="cv-section-label">
//                     <Zap size={10} style={{ display: "inline", marginRight: 5 }} />
//                     Required Skills
//                   </p>
//                   <div className="cv-skills-grid">
//                     {career.skills.map((skill, i) => (
//                       <span key={i} className="cv-skill-tag">
//                         <CheckCircle2 size={11} color="#4ade80" />
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {career.skills?.length > 0 && career.description && (
//                 <div className="cv-divider" />
//               )}

//               {/* Description */}
//               {career.description && (
//                 <div>
//                   <p className="cv-section-label">About this Opportunity</p>
//                   <p className="cv-description">{career.description}</p>
//                 </div>
//               )}
//             </div>

//             {/* Footer / Apply */}
//             <div className="cv-footer">
//               <a
//                 href={isExpired ? "#" : career.applyLink || "#"}
//                 target={isExpired ? "_self" : "_blank"}
//                 rel="noreferrer"
//                 className={`cv-apply-btn ${isExpired ? "disabled" : "active"}`}
//               >
//                 {isExpired ? (
//                   "Application Closed"
//                 ) : (
//                   <>
//                     Apply Now <ExternalLink size={15} />
//                   </>
//                 )}
//               </a>

//               {!isExpired && career.deadline && (
//                 <p
//                   style={{
//                     textAlign: "center",
//                     marginTop: "10px",
//                     fontSize: "12px",
//                     color: "#52525b",
//                   }}
//                 >
//                   Applications close on{" "}
//                   {new Date(career.deadline).toLocaleDateString("en-IN", {
//                     day: "numeric", month: "long", year: "numeric",
//                   })}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CareerView;








import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  MapPin,
  Clock,
  Briefcase,
  ExternalLink,
  Calendar,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Award,
  BookOpen,
  Users,
  Zap,
  TrendingUp,
  Share2,
  Bookmark,
  AlertCircle,
  IndianRupee,
  Globe,
  ChevronRight,
} from "lucide-react";

/* ─── Type config ────────────────────────────────────────────────── */
const TYPE_CONFIG = {
  internship: {
    label: "Internship",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.1)",
    border: "rgba(167,139,250,0.25)",
    icon: Briefcase,
    gradient: "from-violet-900/30 to-purple-900/10",
  },
  job: {
    label: "Full-time",
    color: "#34d399",
    bg: "rgba(52,211,153,0.1)",
    border: "rgba(52,211,153,0.25)",
    icon: TrendingUp,
    gradient: "from-emerald-900/30 to-teal-900/10",
  },
  certification: {
    label: "Certification",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.1)",
    border: "rgba(251,191,36,0.25)",
    icon: Award,
    gradient: "from-amber-900/30 to-yellow-900/10",
  },
  training: {
    label: "Training",
    color: "#f472b6",
    bg: "rgba(244,114,182,0.1)",
    border: "rgba(244,114,182,0.25)",
    icon: BookOpen,
    gradient: "from-pink-900/30 to-rose-900/10",
  },
};

const getTypeConfig = (type) =>
  TYPE_CONFIG[type?.toLowerCase()] || TYPE_CONFIG["internship"];

/* ─── Days remaining helper ─────────────────────────────────────── */
const getDaysRemaining = (deadline) => {
  if (!deadline) return null;
  const diff = new Date(deadline) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

/* ─── Styles ─────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #080810;
    --surface: #0f0f1a;
    --surface2: #16162a;
    --border: rgba(255,255,255,0.07);
    --border2: rgba(255,255,255,0.12);
    --text-primary: #f0f0f8;
    --text-secondary: #8b8ba8;
    --text-muted: #4a4a6a;
    --accent: #7c3aed;
    --accent2: #06b6d4;
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 20px;
  }

  .cv-root {
    min-height: 100vh;
    background: var(--bg);
    color: var(--text-primary);
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    line-height: 1.6;
  }

  /* ── Hero ── */
  .cv-hero {
    position: relative;
    width: 100%;
    height: 280px;
    overflow: hidden;
  }
  @media (min-width: 768px) { .cv-hero { height: 380px; } }

  .cv-hero img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
  }

  .cv-hero-placeholder {
    width: 100%; height: 100%;
    background: linear-gradient(135deg, #0d0d1f 0%, #12122a 40%, #0d1a33 100%);
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }
  .cv-hero-placeholder::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.15) 0%, transparent 60%),
                radial-gradient(ellipse at 70% 50%, rgba(6,182,212,0.1) 0%, transparent 60%);
  }
  .cv-hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .cv-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom,
      transparent 0%,
      rgba(8,8,16,0.3) 50%,
      rgba(8,8,16,0.95) 100%);
  }

  /* ── Breadcrumb bar ── */
  .cv-breadcrumb {
    background: rgba(15,15,26,0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    padding: 12px 0;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .cv-breadcrumb-inner {
    max-width: 860px;
    margin: 0 auto;
    padding: 0 16px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: var(--text-muted);
  }
  @media (min-width: 768px) { .cv-breadcrumb-inner { padding: 0 24px; } }

  .cv-breadcrumb a {
    color: var(--text-secondary);
    text-decoration: none;
    display: flex; align-items: center; gap: 4px;
    transition: color 0.2s;
  }
  .cv-breadcrumb a:hover { color: var(--text-primary); }
  .cv-breadcrumb .cv-crumb-current {
    color: var(--text-primary);
    font-weight: 500;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @media (min-width: 768px) { .cv-breadcrumb .cv-crumb-current { max-width: 400px; } }

  /* ── Layout ── */
  .cv-layout {
    max-width: 860px;
    margin: 0 auto;
    padding: 0 16px 80px;
    display: grid;
    gap: 0;
  }
  @media (min-width: 768px) {
    .cv-layout { padding: 0 24px 80px; grid-template-columns: 1fr 300px; gap: 24px; align-items: start; }
  }

  /* ── Main content ── */
  .cv-main { margin-top: -40px; position: relative; z-index: 10; }
  @media (min-width: 768px) { .cv-main { margin-top: -60px; } }

  /* ── Header card ── */
  .cv-header-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    overflow: hidden;
  }

  .cv-header-top {
    padding: 24px 20px 20px;
    border-bottom: 1px solid var(--border);
  }
  @media (min-width: 768px) { .cv-header-top { padding: 28px 28px 24px; } }

  .cv-header-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  .cv-type-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border-radius: var(--radius-sm);
    padding: 5px 12px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .cv-icon-btns { display: flex; gap: 8px; }
  .cv-icon-btn {
    width: 34px; height: 34px;
    border-radius: var(--radius-sm);
    background: var(--surface2);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    color: var(--text-secondary);
    transition: all 0.2s;
  }
  .cv-icon-btn:hover {
    background: rgba(255,255,255,0.08);
    border-color: var(--border2);
    color: var(--text-primary);
  }

  .cv-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(20px, 4.5vw, 30px);
    font-weight: 700;
    line-height: 1.2;
    color: var(--text-primary);
    margin-bottom: 6px;
  }

  .cv-company-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }

  .cv-company-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent2);
    flex-shrink: 0;
  }

  .cv-company-name {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-secondary);
  }

  /* ── Meta pills row ── */
  .cv-meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .cv-meta-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 5px 11px;
    font-size: 12.5px;
    color: var(--text-secondary);
    font-weight: 500;
  }

  .cv-meta-pill.urgent { color: #f87171; border-color: rgba(248,113,113,0.2); background: rgba(248,113,113,0.06); }
  .cv-meta-pill.active { color: #4ade80; border-color: rgba(74,222,128,0.2); background: rgba(74,222,128,0.06); }
  .cv-meta-pill.warning { color: #fbbf24; border-color: rgba(251,191,36,0.2); background: rgba(251,191,36,0.06); }

  /* ── Stats strip ── */
  .cv-stats-strip {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    border-top: 1px solid var(--border);
  }

  .cv-stat {
    padding: 14px 16px;
    text-align: center;
    border-right: 1px solid var(--border);
  }
  .cv-stat:last-child { border-right: none; }

  .cv-stat-val {
    font-family: 'Sora', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
  }

  .cv-stat-key {
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 2px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  /* ── Content sections ── */
  .cv-sections { display: flex; flex-direction: column; gap: 16px; margin-top: 16px; }
  @media (min-width: 768px) { .cv-sections { margin-top: 0; } }

  .cv-section {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .cv-section-head {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 18px;
    border-bottom: 1px solid var(--border);
  }

  .cv-section-icon {
    width: 30px; height: 30px;
    border-radius: var(--radius-sm);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .cv-section-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: 0.01em;
  }

  .cv-section-body { padding: 16px 18px; }

  /* ── Pay card ── */
  .cv-pay-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 16px 18px;
    margin-top: 16px;
    position: relative;
    overflow: hidden;
  }

  .cv-pay-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: linear-gradient(to bottom, #06b6d4, #7c3aed);
    border-radius: 3px 0 0 3px;
  }

  .cv-pay-left { display: flex; align-items: center; gap: 12px; }

  .cv-pay-dot {
    width: 40px; height: 40px;
    border-radius: var(--radius-md);
    background: rgba(6,182,212,0.1);
    border: 1px solid rgba(6,182,212,0.2);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    color: #22d3ee;
  }

  .cv-pay-label { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 3px; }
  .cv-pay-val {
    font-family: 'Sora', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: #22d3ee;
    line-height: 1;
  }

  .cv-pay-freq {
    font-size: 11px;
    color: var(--text-muted);
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 3px 9px;
  }

  /* ── Skills ── */
  .cv-skills-grid { display: flex; flex-wrap: wrap; gap: 7px; }

  .cv-skill {
    display: inline-flex; align-items: center; gap: 5px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 5px 11px;
    font-size: 12.5px;
    color: var(--text-secondary);
    font-weight: 500;
    transition: all 0.15s;
  }
  .cv-skill:hover {
    background: rgba(124,58,237,0.1);
    border-color: rgba(124,58,237,0.3);
    color: #c4b5fd;
  }

  /* ── Description ── */
  .cv-description {
    color: var(--text-secondary);
    line-height: 1.9;
    font-size: 14.5px;
    white-space: pre-line;
  }

  /* ── Sidebar ── */
  .cv-sidebar {
    position: relative;
  }
  @media (min-width: 768px) {
    .cv-sidebar {
      position: sticky;
      top: 60px;
    }
  }

  .cv-sidebar-inner { display: flex; flex-direction: column; gap: 12px; }

  /* ── Apply card ── */
  .cv-apply-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    overflow: hidden;
    margin-top: 16px;
  }
  @media (min-width: 768px) { .cv-apply-card { margin-top: -60px; } }

  .cv-apply-card-inner { padding: 20px; }

  .cv-apply-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 14px;
    border-radius: var(--radius-md);
    text-decoration: none;
    font-family: 'Sora', sans-serif;
    font-size: 14.5px;
    font-weight: 700;
    letter-spacing: 0.02em;
    transition: all 0.2s;
    border: none;
    cursor: pointer;
  }
  .cv-apply-btn.cv-btn-active {
    background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);
    color: #fff;
    box-shadow: 0 4px 20px rgba(124,58,237,0.3);
  }
  .cv-apply-btn.cv-btn-active:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 6px 28px rgba(124,58,237,0.4);
  }
  .cv-apply-btn.cv-btn-closed {
    background: var(--surface2);
    color: var(--text-muted);
    cursor: not-allowed;
    pointer-events: none;
  }

  .cv-deadline-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(251,191,36,0.06);
    border: 1px solid rgba(251,191,36,0.15);
    border-radius: var(--radius-md);
    padding: 10px 14px;
    font-size: 12.5px;
    color: #fbbf24;
    margin-top: 10px;
  }

  .cv-closed-notice {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(248,113,113,0.06);
    border: 1px solid rgba(248,113,113,0.15);
    border-radius: var(--radius-md);
    padding: 10px 14px;
    font-size: 12.5px;
    color: #f87171;
    margin-top: 10px;
  }

  /* ── Quick info card ── */
  .cv-info-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .cv-info-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px;
    border-bottom: 1px solid var(--border);
  }
  .cv-info-item:last-child { border-bottom: none; }

  .cv-info-left {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-muted);
    font-size: 13px;
  }

  .cv-info-right {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
    text-align: right;
  }

  /* ── Loading ── */
  .cv-loading {
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    font-family: 'Inter', sans-serif;
    color: var(--text-primary);
  }

  .cv-loading-dots {
    display: flex; gap: 6px; align-items: center;
  }

  .cv-loading-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent2);
  }

  @keyframes bounce {
    0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
    40% { transform: translateY(-8px); opacity: 1; }
  }

  .cv-loading-dot:nth-child(1) { animation: bounce 1.2s infinite 0s; }
  .cv-loading-dot:nth-child(2) { animation: bounce 1.2s infinite 0.15s; }
  .cv-loading-dot:nth-child(3) { animation: bounce 1.2s infinite 0.3s; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .cv-fade { animation: fadeUp 0.5s ease both; }
  .cv-fade-1 { animation: fadeUp 0.5s ease 0.05s both; }
  .cv-fade-2 { animation: fadeUp 0.5s ease 0.15s both; }
  .cv-fade-3 { animation: fadeUp 0.5s ease 0.25s both; }
`;

/* ─── Component ──────────────────────────────────────────────────── */
const CareerView = () => {
  const { slug } = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/career/slug/${slug}`
        );
        setCareer(data.career);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCareer();
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading)
    return (
      <>
        <style>{styles}</style>
        <div className="cv-loading">
          <div className="cv-loading-dots">
            <div className="cv-loading-dot" />
            <div className="cv-loading-dot" />
            <div className="cv-loading-dot" />
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            Loading opportunity…
          </p>
        </div>
      </>
    );

  if (!career)
    return (
      <>
        <style>{styles}</style>
        <div className="cv-loading">
          <AlertCircle size={40} color="#f87171" />
          <p style={{ fontSize: "16px", color: "var(--text-secondary)" }}>
            Opportunity not found
          </p>
          <Link
            to="/career"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "#22d3ee",
              fontSize: "13px",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={14} /> Back to Careers
          </Link>
        </div>
      </>
    );

  const isExpired = career.deadline
    ? new Date(career.deadline) < new Date()
    : false;

  const daysLeft = getDaysRemaining(career.deadline);
  const typeConf = getTypeConfig(career.type);
  const TypeIcon = typeConf.icon;

  /* Deadline pill variant */
  const getDeadlinePillClass = () => {
    if (!daysLeft || isExpired) return "urgent";
    if (daysLeft <= 3) return "urgent";
    if (daysLeft <= 7) return "warning";
    return "active";
  };

  const getDeadlineLabel = () => {
    if (isExpired) return "Deadline passed";
    if (daysLeft === 0) return "Closes today";
    if (daysLeft === 1) return "1 day left";
    if (daysLeft <= 7) return `${daysLeft} days left`;
    return `Closes ${new Date(career.deadline).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    })}`;
  };

  /* Build quick-info rows */
  const infoRows = [
    career.location && { icon: MapPin, label: "Location", value: career.location },
    career.mode && { icon: Globe, label: "Mode", value: career.mode },
    career.duration && { icon: Clock, label: "Duration", value: career.duration },
    career.openings && {
      icon: Users,
      label: "Openings",
      value: `${career.openings} position${career.openings > 1 ? "s" : ""}`,
    },
    career.deadline && {
      icon: Calendar,
      label: "Deadline",
      value: new Date(career.deadline).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    },
  ].filter(Boolean);

  /* Stats strip data */
  const statsStrip = [
    career.openings && { val: career.openings, key: "Openings" },
    career.duration && { val: career.duration, key: "Duration" },
    career.mode && { val: career.mode, key: "Mode" },
    !isExpired && daysLeft !== null && { val: daysLeft > 0 ? `${daysLeft}d` : "Today", key: "Deadline" },
  ].filter(Boolean);

  return (
    <>
      <style>{styles}</style>
      <div className="cv-root">
        {/* Sticky breadcrumb */}
        <nav className="cv-breadcrumb" aria-label="Breadcrumb">
          <div className="cv-breadcrumb-inner">
            <Link to="/career">
              <ArrowLeft size={13} />
              Careers
            </Link>
            <ChevronRight size={12} />
            <span
              className="cv-type-badge cv-crumb-type"
              style={{
                color: typeConf.color,
                background: typeConf.bg,
                border: `1px solid ${typeConf.border}`,
                padding: "2px 8px",
                borderRadius: "5px",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {typeConf.label}
            </span>
            <ChevronRight size={12} />
            <span className="cv-crumb-current">{career.title}</span>
          </div>
        </nav>

        {/* Hero */}
        <div className="cv-hero cv-fade">
          {career?.careerImg?.url ? (
            <img src={career.careerImg.url} alt={career.title} />
          ) : (
            <div className="cv-hero-placeholder">
              <div className="cv-hero-grid" />
              <TypeIcon size={64} color="rgba(255,255,255,0.05)" />
            </div>
          )}
          <div className="cv-hero-overlay" />
        </div>

        {/* Main grid layout */}
        <div className="cv-layout">
          {/* LEFT — main content */}
          <div className="cv-main cv-fade-1">
            {/* Header card */}
            <div className="cv-header-card">
              <div className="cv-header-top">
                {/* Actions row */}
                <div className="cv-header-actions">
                  <span
                    className="cv-type-badge"
                    style={{
                      color: typeConf.color,
                      background: typeConf.bg,
                      border: `1px solid ${typeConf.border}`,
                    }}
                  >
                    <TypeIcon size={11} />
                    {typeConf.label}
                  </span>

                  <div className="cv-icon-btns">
                    <button
                      className="cv-icon-btn"
                      title={copied ? "Copied!" : "Share link"}
                      onClick={handleShare}
                    >
                      <Share2 size={14} color={copied ? "#4ade80" : "currentColor"} />
                    </button>
                    <button
                      className="cv-icon-btn"
                      title={bookmarked ? "Saved" : "Save"}
                      onClick={() => setBookmarked((p) => !p)}
                    >
                      <Bookmark
                        size={14}
                        fill={bookmarked ? "#a78bfa" : "none"}
                        color={bookmarked ? "#a78bfa" : "currentColor"}
                      />
                    </button>
                  </div>
                </div>

                <h1 className="cv-title">{career.title}</h1>

                <div className="cv-company-row">
                  <span className="cv-company-dot" />
                  <span className="cv-company-name">{career.company}</span>
                </div>

                {/* Meta pills */}
                <div className="cv-meta-row">
                  {career.location && (
                    <span className="cv-meta-pill">
                      <MapPin size={12} /> {career.location}
                    </span>
                  )}
                  {career.mode && (
                    <span className="cv-meta-pill">
                      <Globe size={12} /> {career.mode}
                    </span>
                  )}
                  {career.openings && (
                    <span className="cv-meta-pill">
                      <Users size={12} /> {career.openings} opening{career.openings > 1 ? "s" : ""}
                    </span>
                  )}
                  {career.deadline && (
                    <span className={`cv-meta-pill ${getDeadlinePillClass()}`}>
                      <Calendar size={12} />
                      {getDeadlineLabel()}
                    </span>
                  )}
                </div>
              </div>

              {/* Stats strip */}
              {statsStrip.length > 0 && (
                <div className="cv-stats-strip">
                  {statsStrip.map((s, i) => (
                    <div key={i} className="cv-stat">
                      <div className="cv-stat-val">{s.val}</div>
                      <div className="cv-stat-key">{s.key}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pay card */}
            {(career.stipend || career.salary) && (
              <div className="cv-pay-card cv-fade-2">
                <div className="cv-pay-left">
                  <div className="cv-pay-dot">
                    <IndianRupee size={16} />
                  </div>
                  <div>
                    <div className="cv-pay-label">
                      {career.stipend ? "Monthly Stipend" : "Annual CTC"}
                    </div>
                    <div className="cv-pay-val">{career.stipend || career.salary}</div>
                  </div>
                </div>
                <div className="cv-pay-freq">
                  {career.stipend ? "/ month" : "/ year"}
                </div>
              </div>
            )}

            {/* Content sections */}
            <div className="cv-sections cv-fade-3">
              {/* Skills */}
              {career.skills?.length > 0 && (
                <div className="cv-section">
                  <div className="cv-section-head">
                    <div
                      className="cv-section-icon"
                      style={{ background: "rgba(124,58,237,0.12)", color: "#a78bfa" }}
                    >
                      <Zap size={14} />
                    </div>
                    <span className="cv-section-title">Required Skills</span>
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: "11px",
                        color: "var(--text-muted)",
                        background: "var(--surface2)",
                        border: "1px solid var(--border)",
                        borderRadius: "5px",
                        padding: "2px 8px",
                      }}
                    >
                      {career.skills.length}
                    </span>
                  </div>
                  <div className="cv-section-body">
                    <div className="cv-skills-grid">
                      {career.skills.map((skill, i) => (
                        <span key={i} className="cv-skill">
                          <CheckCircle2 size={10} color="#4ade80" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              {career.description && (
                <div className="cv-section">
                  <div className="cv-section-head">
                    <div
                      className="cv-section-icon"
                      style={{ background: "rgba(6,182,212,0.1)", color: "#22d3ee" }}
                    >
                      <BookOpen size={14} />
                    </div>
                    <span className="cv-section-title">About this Opportunity</span>
                  </div>
                  <div className="cv-section-body">
                    <p className="cv-description">{career.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — sidebar */}
          <div className="cv-sidebar cv-fade-2">
            <div className="cv-sidebar-inner">
              {/* Apply card */}
              <div className="cv-apply-card">
                <div className="cv-apply-card-inner">
                  <a
                    href={isExpired ? undefined : career.applyLink || "#"}
                    target={!isExpired && career.applyLink ? "_blank" : undefined}
                    rel={!isExpired && career.applyLink ? "noopener noreferrer" : undefined}
                    className={`cv-apply-btn ${isExpired ? "cv-btn-closed" : "cv-btn-active"}`}
                    aria-disabled={isExpired}
                    onClick={
                      isExpired
                        ? (e) => e.preventDefault()
                        : !career.applyLink
                        ? (e) => e.preventDefault()
                        : undefined
                    }
                  >
                    {isExpired ? (
                      "Applications Closed"
                    ) : (
                      <>
                        Apply Now <ExternalLink size={14} />
                      </>
                    )}
                  </a>

                  {!isExpired && career.deadline && (
                    <div className="cv-deadline-bar">
                      <Calendar size={13} />
                      <span>
                        Closes{" "}
                        {new Date(career.deadline).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  )}

                  {isExpired && (
                    <div className="cv-closed-notice">
                      <AlertCircle size={13} />
                      <span>This opportunity has closed</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick info */}
              {infoRows.length > 0 && (
                <div className="cv-info-card">
                  {infoRows.map((row, i) => (
                    <div key={i} className="cv-info-item">
                      <div className="cv-info-left">
                        <row.icon size={14} />
                        {row.label}
                      </div>
                      <div className="cv-info-right">{row.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Share card */}
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                  Know someone suited for this?
                </span>
                <button
                  onClick={handleShare}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    color: copied ? "#4ade80" : "#a78bfa",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "color 0.2s",
                    padding: 0,
                  }}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 size={13} /> Copied!
                    </>
                  ) : (
                    <>
                      <Share2 size={13} /> Share
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerView;