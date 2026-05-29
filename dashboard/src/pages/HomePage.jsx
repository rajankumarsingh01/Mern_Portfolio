



// import { useNavigate } from "react-router-dom";
// import {
//   FolderGit, History, Home, LayoutGrid,
//   LogOut, MessageSquareMore, PencilRuler,
//   User, BarChart3, ChevronRight, ChevronLeft,
//   Zap,
// } from "lucide-react";
// import { useEffect, useState } from "react";

// import Dashboard               from "./sub-components/Dashboard";
// import AddSkill                from "./sub-components/AddSkill";
// import AddProject              from "./sub-components/AddProject";
// import AddSoftwareApplications from "./sub-components/AddSoftwareApplications";
// import Account                 from "./sub-components/Account";
// import Messages                from "./sub-components/Messages";
// import AddTimeline             from "./sub-components/AddTimeline";
// import VisitorAnalytics        from "../pages/VisitorAnalytics";

// import { useDispatch, useSelector } from "react-redux";
// import { logout, clearAllUserErrors } from "@/store/slices/userSlice";
// import { toast } from "react-toastify";

// /* ─── Nav config ──────────────────────────────────────────────── */
// const NAV = [
//   { id: "Dashboard",    icon: Home,             label: "Dashboard",  accent: "#22d3ee" },
//   { id: "Analytics",   icon: BarChart3,         label: "Analytics",  accent: "#a78bfa" },
//   { id: "Add Project", icon: FolderGit,         label: "Projects",   accent: "#f97316" },
//   { id: "Add Skill",   icon: PencilRuler,       label: "Skills",     accent: "#4ade80" },
//   { id: "Add Uses",    icon: LayoutGrid,        label: "Software",   accent: "#fbbf24" },
//   { id: "Add Timeline",icon: History,           label: "Timeline",   accent: "#fb7185" },
//   { id: "Messages",    icon: MessageSquareMore, label: "Messages",   accent: "#c084fc" },
//   { id: "Account",     icon: User,              label: "Account",    accent: "#38bdf8" },
// ];

// /* ─── NavBtn ──────────────────────────────────────────────────── */
// const NavBtn = ({ item, active, onClick, collapsed }) => {
//   const on = active === item.id;
//   const [hov, setHov] = useState(false);

//   return (
//     <button
//       onClick={() => onClick(item.id)}
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       title={collapsed ? item.label : undefined}
//       style={{
//         width: "100%",
//         display: "flex", alignItems: "center",
//         gap: 10,
//         padding: collapsed ? "10px 0" : "9px 12px",
//         justifyContent: collapsed ? "center" : "flex-start",
//         borderRadius: 10,
//         border: "none", cursor: "pointer", outline: "none",
//         background: on
//           ? `${item.accent}14`
//           : hov ? "#27272a" : "transparent",
//         transition: "background 0.15s",
//         position: "relative",
//       }}
//     >
//       {on && (
//         <div style={{
//           position: "absolute", left: 0, top: "18%", bottom: "18%",
//           width: 2.5, borderRadius: "0 3px 3px 0",
//           background: item.accent,
//           boxShadow: `0 0 8px ${item.accent}80`,
//         }} />
//       )}

//       {/* Icon */}
//       <div style={{
//         width: 30, height: 30, borderRadius: 8, flexShrink: 0,
//         display: "flex", alignItems: "center", justifyContent: "center",
//         background: on ? `${item.accent}18` : "transparent",
//         border: on ? `1px solid ${item.accent}30` : "1px solid transparent",
//         transition: "all 0.15s",
//       }}>
//         <item.icon
//           size={15}
//           strokeWidth={on ? 2.2 : 1.8}
//           style={{ color: on ? item.accent : hov ? "#a1a1aa" : "#52525b", transition: "color 0.15s" }}
//         />
//       </div>

//       {!collapsed && (
//         <span style={{
//           fontSize: 13.5, fontWeight: on ? 600 : 400,
//           color: on ? item.accent : hov ? "#d4d4d8" : "#71717a",
//           fontFamily: "'Cabinet Grotesk', sans-serif",
//           transition: "color 0.15s", whiteSpace: "nowrap", flex: 1, textAlign: "left",
//         }}>{item.label}</span>
//       )}

//       {!collapsed && on && (
//         <ChevronRight size={12} style={{ color: item.accent, opacity: 0.6 }} />
//       )}
//     </button>
//   );
// };

// /* ─── HomePage ────────────────────────────────────────────────── */
// const HomePage = () => {
//   const [active, setActive] = useState("Dashboard");
//   const [collapsed, setCollapsed] = useState(false);

//   const { isAuthenticated, error, user } = useSelector(s => s.user);
//   const dispatch = useDispatch();
//   const navigateTo = useNavigate();

//   const handleLogout = () => { dispatch(logout()); toast.success("Logged Out!"); };

//   useEffect(() => {
//     if (error) { toast.error(error); dispatch(clearAllUserErrors()); }
//     if (isAuthenticated === false) navigateTo("/login");
//   }, [dispatch, error, isAuthenticated, navigateTo]);

//   const SW = collapsed ? 64 : 218;
//   const cur = NAV.find(n => n.id === active);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
//         @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,600,500,400&display=swap');

//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//         html, body { background: #09090b; }

//         @keyframes hp-in  { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
//         @keyframes dot-pulse {
//           0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
//           50%      { box-shadow: 0 0 0 5px rgba(74,222,128,0); }
//         }

//         ::-webkit-scrollbar { width: 4px; }
//         ::-webkit-scrollbar-track { background: transparent; }
//         ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 4px; }

//         .nav-section-label {
//           font-size: 9px; font-weight: 700; letter-spacing: 0.14em;
//           text-transform: uppercase; color: #3f3f46;
//           font-family: 'Space Mono', monospace;
//           padding: 0 14px; margin-bottom: 6px;
//         }
//       `}</style>

//       <div style={{
//         display: "flex", minHeight: "100vh",
//         background: "#09090b", fontFamily: "'Cabinet Grotesk', sans-serif",
//       }}>

//         {/* ── Sidebar ── */}
//         <aside style={{
//           width: SW,
//           position: "fixed", top: 0, bottom: 0, left: 0, zIndex: 50,
//           background: "#111113",
//           borderRight: "1px solid #27272a",
//           display: "flex", flexDirection: "column",
//           transition: "width 0.26s cubic-bezier(0.4,0,0.2,1)",
//           overflow: "hidden",
//         }}>

//           {/* Logo row */}
//           <div style={{
//             height: 60,
//             display: "flex", alignItems: "center",
//             padding: collapsed ? "0" : "0 14px",
//             justifyContent: collapsed ? "center" : "space-between",
//             borderBottom: "1px solid #1c1c1f",
//             flexShrink: 0,
//           }}>
//             {!collapsed && (
//               <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
//                 <div style={{
//                   width: 30, height: 30, borderRadius: 8, flexShrink: 0,
//                   background: "linear-gradient(135deg, #22d3ee, #6366f1)",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   boxShadow: "0 0 16px rgba(34,211,238,0.3)",
//                 }}>
//                   <Zap size={14} color="#fff" fill="#fff" />
//                 </div>
//                 <span style={{
//                   fontSize: 15, fontWeight: 800, color: "#fafafa",
//                   fontFamily: "'Cabinet Grotesk', sans-serif",
//                   letterSpacing: "-0.01em", whiteSpace: "nowrap",
//                 }}>Portfolio</span>
//               </div>
//             )}
//             <button
//               onClick={() => setCollapsed(v => !v)}
//               style={{
//                 width: 26, height: 26, borderRadius: 7, flexShrink: 0,
//                 background: "#1c1c1f", border: "1px solid #27272a",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 cursor: "pointer", color: "#52525b",
//                 transition: "all 0.15s",
//               }}
//               onMouseEnter={e => { e.currentTarget.style.borderColor = "#3f3f46"; e.currentTarget.style.color = "#a1a1aa"; }}
//               onMouseLeave={e => { e.currentTarget.style.borderColor = "#27272a"; e.currentTarget.style.color = "#52525b"; }}
//             >
//               {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
//             </button>
//           </div>

//           {/* Nav */}
//           <nav style={{ flex: 1, padding: "16px 8px", overflowY: "auto", overflowX: "hidden" }}>
//             {!collapsed && <p className="nav-section-label">MENU</p>}
//             <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
//               {NAV.map(item => (
//                 <NavBtn key={item.id} item={item} active={active} onClick={setActive} collapsed={collapsed} />
//               ))}
//             </div>
//           </nav>

//           {/* User + logout */}
//           <div style={{ padding: "12px 8px", borderTop: "1px solid #1c1c1f", flexShrink: 0 }}>
//             {!collapsed && (
//               <div style={{
//                 display: "flex", alignItems: "center", gap: 9,
//                 padding: "10px 10px", borderRadius: 10,
//                 background: "#18181b", border: "1px solid #27272a",
//                 marginBottom: 6,
//               }}>
//                 <div style={{ position: "relative", flexShrink: 0 }}>
//                   <img
//                     src={user?.avatar?.url} alt="avatar"
//                     style={{
//                       width: 32, height: 32, borderRadius: 8, objectFit: "cover",
//                       border: "1px solid #3f3f46",
//                     }}
//                   />
//                   <div style={{
//                     position: "absolute", bottom: -1, right: -1,
//                     width: 9, height: 9, borderRadius: "50%",
//                     background: "#4ade80", border: "2px solid #111113",
//                     animation: "dot-pulse 2s ease infinite",
//                   }} />
//                 </div>
//                 <div style={{ minWidth: 0 }}>
//                   <p style={{
//                     fontSize: 13, fontWeight: 700, color: "#e4e4e7",
//                     whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
//                     fontFamily: "'Cabinet Grotesk', sans-serif",
//                   }}>{user?.fullName}</p>
//                   <p style={{
//                     fontSize: 10, color: "#3f3f46",
//                     fontFamily: "'Space Mono', monospace", letterSpacing: "0.06em",
//                   }}>ADMIN</p>
//                 </div>
//               </div>
//             )}

//             <button
//               onClick={handleLogout}
//               style={{
//                 width: "100%", display: "flex", alignItems: "center",
//                 justifyContent: collapsed ? "center" : "flex-start",
//                 gap: 10, padding: collapsed ? "10px 0" : "9px 12px",
//                 borderRadius: 10, border: "none", cursor: "pointer",
//                 background: "transparent", color: "#52525b",
//                 fontFamily: "'Cabinet Grotesk', sans-serif",
//                 fontSize: 13.5, fontWeight: 500,
//                 transition: "all 0.15s",
//               }}
//               onMouseEnter={e => {
//                 e.currentTarget.style.background = "#fca5a510";
//                 e.currentTarget.style.color = "#fca5a5";
//               }}
//               onMouseLeave={e => {
//                 e.currentTarget.style.background = "transparent";
//                 e.currentTarget.style.color = "#52525b";
//               }}
//             >
//               <LogOut size={15} strokeWidth={1.8} />
//               {!collapsed && <span>Sign Out</span>}
//             </button>
//           </div>
//         </aside>

//         {/* ── Main ── */}
//         <div style={{
//           marginLeft: SW, flex: 1,
//           display: "flex", flexDirection: "column",
//           minHeight: "100vh",
//           transition: "margin-left 0.26s cubic-bezier(0.4,0,0.2,1)",
//         }}>

//           {/* Header */}
//           <header style={{
//             position: "sticky", top: 0, zIndex: 40,
//             height: 60,
//             background: "rgba(9,9,11,0.85)",
//             backdropFilter: "blur(16px)",
//             WebkitBackdropFilter: "blur(16px)",
//             borderBottom: "1px solid #1c1c1f",
//             display: "flex", alignItems: "center",
//             padding: "0 24px",
//             justifyContent: "space-between",
//           }}>
//             {/* Breadcrumb */}
//             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//               <span style={{
//                 fontSize: 11, color: "#3f3f46",
//                 fontFamily: "'Space Mono', monospace",
//               }}>admin</span>
//               <span style={{ color: "#27272a", fontSize: 18 }}>/</span>
//               {cur && (
//                 <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
//                   <div style={{
//                     width: 22, height: 22, borderRadius: 6,
//                     background: `${cur.accent}14`, border: `1px solid ${cur.accent}25`,
//                     display: "flex", alignItems: "center", justifyContent: "center",
//                   }}>
//                     <cur.icon size={12} color={cur.accent} strokeWidth={2} />
//                   </div>
//                   <span style={{
//                     fontSize: 14, fontWeight: 700, color: "#e4e4e7",
//                     fontFamily: "'Cabinet Grotesk', sans-serif",
//                   }}>{active}</span>
//                   <div style={{
//                     width: 5, height: 5, borderRadius: "50%",
//                     background: cur.accent,
//                     boxShadow: `0 0 6px ${cur.accent}`,
//                   }} />
//                 </div>
//               )}
//             </div>

//             {/* Right */}
//             <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//               <span style={{
//                 fontSize: 13, color: "#52525b",
//                 fontFamily: "'Cabinet Grotesk', sans-serif",
//               }}>
//                 Hey,{" "}
//                 <strong style={{ color: "#d4d4d8", fontWeight: 600 }}>{user?.fullName}</strong>
//               </span>
//               <img
//                 src={user?.avatar?.url} alt="avatar"
//                 style={{
//                   width: 32, height: 32, borderRadius: 8, objectFit: "cover",
//                   border: "1px solid #3f3f46",
//                 }}
//               />
//             </div>
//           </header>

//           {/* Content */}
//           <main style={{ flex: 1, animation: "hp-in 0.3s ease both" }}>
//             {active === "Dashboard"    && <Dashboard />}
//             {active === "Analytics"    && <VisitorAnalytics />}
//             {active === "Add Project"  && <AddProject />}
//             {active === "Add Skill"    && <AddSkill />}
//             {active === "Add Uses"     && <AddSoftwareApplications />}
//             {active === "Add Timeline" && <AddTimeline />}
//             {active === "Messages"     && <Messages />}
//             {active === "Account"      && <Account />}
//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HomePage;






import { useNavigate } from "react-router-dom";
import {
  FolderGit, History, Home, LayoutGrid,
  LogOut, MessageSquareMore, PencilRuler,
  User, BarChart3, ChevronRight, ChevronLeft,
  Zap, BookOpen,  BriefcaseBusiness,
} from "lucide-react";
import { useEffect, useState } from "react";

import Dashboard               from "./sub-components/Dashboard";
import AddSkill                from "./sub-components/AddSkill";
import AddProject              from "./sub-components/AddProject";
import AddSoftwareApplications from "./sub-components/AddSoftwareApplications";
// import Account                 from "./";
import Messages                from "./sub-components/Messages";
import AddTimeline             from "./sub-components/AddTimeline";
import VisitorAnalytics        from "../pages/VisitorAnalytics";
import ManageArticles          from "./ManageArticle"; // ← NEW
import ManageCareer from "../pages/ManageCareer";

import { useDispatch, useSelector } from "react-redux";
import { logout, clearAllUserErrors } from "@/store/slices/userSlice";
import { toast } from "react-toastify";

/* ─── Nav config ──────────────────────────────────────────────── */
const NAV = [
  { id: "Dashboard",    icon: Home,             label: "Dashboard",  accent: "#22d3ee" },
  { id: "Analytics",    icon: BarChart3,         label: "Analytics",  accent: "#a78bfa" },
  { id: "Add Project",  icon: FolderGit,         label: "Projects",   accent: "#f97316" },
  { id: "Add Skill",    icon: PencilRuler,       label: "Skills",     accent: "#4ade80" },
  { id: "Add Uses",     icon: LayoutGrid,        label: "Software",   accent: "#fbbf24" },
  { id: "Add Timeline", icon: History,           label: "Timeline",   accent: "#fb7185" },
  { id: "Articles",     icon: BookOpen,          label: "Articles",   accent: "#34d399" }, // ← NEW
  { id: "Messages",     icon: MessageSquareMore, label: "Messages",   accent: "#c084fc" },
  {
  id: "Career",
  icon: BriefcaseBusiness,
  label: "Career",
  accent: "#06b6d4",
},
  // { id: "Account",      icon: User,              label: "Account",    accent: "#38bdf8" },
  
];

/* ─── NavBtn ──────────────────────────────────────────────────── */
const NavBtn = ({ item, active, onClick, collapsed }) => {
  const on = active === item.id;
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={() => onClick(item.id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      title={collapsed ? item.label : undefined}
      style={{
        width: "100%",
        display: "flex", alignItems: "center",
        gap: 10,
        padding: collapsed ? "10px 0" : "9px 12px",
        justifyContent: collapsed ? "center" : "flex-start",
        borderRadius: 10,
        border: "none", cursor: "pointer", outline: "none",
        background: on
          ? `${item.accent}14`
          : hov ? "#27272a" : "transparent",
        transition: "background 0.15s",
        position: "relative",
      }}
    >
      {on && (
        <div style={{
          position: "absolute", left: 0, top: "18%", bottom: "18%",
          width: 2.5, borderRadius: "0 3px 3px 0",
          background: item.accent,
          boxShadow: `0 0 8px ${item.accent}80`,
        }} />
      )}

      {/* Icon */}
      <div style={{
        width: 30, height: 30, borderRadius: 8, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: on ? `${item.accent}18` : "transparent",
        border: on ? `1px solid ${item.accent}30` : "1px solid transparent",
        transition: "all 0.15s",
      }}>
        <item.icon
          size={15}
          strokeWidth={on ? 2.2 : 1.8}
          style={{ color: on ? item.accent : hov ? "#a1a1aa" : "#52525b", transition: "color 0.15s" }}
        />
      </div>

      {!collapsed && (
        <span style={{
          fontSize: 13.5, fontWeight: on ? 600 : 400,
          color: on ? item.accent : hov ? "#d4d4d8" : "#71717a",
          fontFamily: "'Cabinet Grotesk', sans-serif",
          transition: "color 0.15s", whiteSpace: "nowrap", flex: 1, textAlign: "left",
        }}>{item.label}</span>
      )}

      {!collapsed && on && (
        <ChevronRight size={12} style={{ color: item.accent, opacity: 0.6 }} />
      )}
    </button>
  );
};

/* ─── HomePage ────────────────────────────────────────────────── */
const HomePage = () => {
  const [active, setActive] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const { isAuthenticated, error, user } = useSelector(s => s.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => { dispatch(logout()); toast.success("Logged Out!"); };

  useEffect(() => {
    if (error) { toast.error(error); dispatch(clearAllUserErrors()); }
    if (isAuthenticated === false) navigateTo("/login");
  }, [dispatch, error, isAuthenticated, navigateTo]);

  const SW = collapsed ? 64 : 218;
  const cur = NAV.find(n => n.id === active);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,600,500,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #09090b; }

        @keyframes hp-in  { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes dot-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
          50%      { box-shadow: 0 0 0 5px rgba(74,222,128,0); }
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 4px; }

        .nav-section-label {
          font-size: 9px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: #3f3f46;
          font-family: 'Space Mono', monospace;
          padding: 0 14px; margin-bottom: 6px;
        }
      `}</style>

      <div style={{
        display: "flex", minHeight: "100vh",
        background: "#09090b", fontFamily: "'Cabinet Grotesk', sans-serif",
      }}>

        {/* ── Sidebar ── */}
        <aside style={{
          width: SW,
          position: "fixed", top: 0, bottom: 0, left: 0, zIndex: 50,
          background: "#111113",
          borderRight: "1px solid #27272a",
          display: "flex", flexDirection: "column",
          transition: "width 0.26s cubic-bezier(0.4,0,0.2,1)",
          overflow: "hidden",
        }}>

          {/* Logo row */}
          <div style={{
            height: 60,
            display: "flex", alignItems: "center",
            padding: collapsed ? "0" : "0 14px",
            justifyContent: collapsed ? "center" : "space-between",
            borderBottom: "1px solid #1c1c1f",
            flexShrink: 0,
          }}>
            {!collapsed && (
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                  background: "linear-gradient(135deg, #22d3ee, #6366f1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 16px rgba(34,211,238,0.3)",
                }}>
                  <Zap size={14} color="#fff" fill="#fff" />
                </div>
                <span style={{
                  fontSize: 15, fontWeight: 800, color: "#fafafa",
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  letterSpacing: "-0.01em", whiteSpace: "nowrap",
                }}>Portfolio</span>
              </div>
            )}
            <button
              onClick={() => setCollapsed(v => !v)}
              style={{
                width: 26, height: 26, borderRadius: 7, flexShrink: 0,
                background: "#1c1c1f", border: "1px solid #27272a",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#52525b",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#3f3f46"; e.currentTarget.style.color = "#a1a1aa"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#27272a"; e.currentTarget.style.color = "#52525b"; }}
            >
              {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
            </button>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, padding: "16px 8px", overflowY: "auto", overflowX: "hidden" }}>
            {!collapsed && <p className="nav-section-label">MENU</p>}
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {NAV.map(item => (
                <NavBtn key={item.id} item={item} active={active} onClick={setActive} collapsed={collapsed} />
              ))}
            </div>
          </nav>

          {/* User + logout */}
          <div style={{ padding: "12px 8px", borderTop: "1px solid #1c1c1f", flexShrink: 0 }}>
            {!collapsed && (
              <div style={{
                display: "flex", alignItems: "center", gap: 9,
                padding: "10px 10px", borderRadius: 10,
                background: "#18181b", border: "1px solid #27272a",
                marginBottom: 6,
              }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <img
                    src={user?.avatar?.url} alt="avatar"
                    style={{
                      width: 32, height: 32, borderRadius: 8, objectFit: "cover",
                      border: "1px solid #3f3f46",
                    }}
                  />
                  <div style={{
                    position: "absolute", bottom: -1, right: -1,
                    width: 9, height: 9, borderRadius: "50%",
                    background: "#4ade80", border: "2px solid #111113",
                    animation: "dot-pulse 2s ease infinite",
                  }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{
                    fontSize: 13, fontWeight: 700, color: "#e4e4e7",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                  }}>{user?.fullName}</p>
                  <p style={{
                    fontSize: 10, color: "#3f3f46",
                    fontFamily: "'Space Mono', monospace", letterSpacing: "0.06em",
                  }}>ADMIN</p>
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              style={{
                width: "100%", display: "flex", alignItems: "center",
                justifyContent: collapsed ? "center" : "flex-start",
                gap: 10, padding: collapsed ? "10px 0" : "9px 12px",
                borderRadius: 10, border: "none", cursor: "pointer",
                background: "transparent", color: "#52525b",
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 13.5, fontWeight: 500,
                transition: "all 0.15s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#fca5a510";
                e.currentTarget.style.color = "#fca5a5";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#52525b";
              }}
            >
              <LogOut size={15} strokeWidth={1.8} />
              {!collapsed && <span>Sign Out</span>}
            </button>
          </div>
        </aside>

        {/* ── Main ── */}
        <div style={{
          marginLeft: SW, flex: 1,
          display: "flex", flexDirection: "column",
          minHeight: "100vh",
          transition: "margin-left 0.26s cubic-bezier(0.4,0,0.2,1)",
        }}>

          {/* Header */}
          <header style={{
            position: "sticky", top: 0, zIndex: 40,
            height: 60,
            background: "rgba(9,9,11,0.85)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid #1c1c1f",
            display: "flex", alignItems: "center",
            padding: "0 24px",
            justifyContent: "space-between",
          }}>
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                fontSize: 11, color: "#3f3f46",
                fontFamily: "'Space Mono', monospace",
              }}>admin</span>
              <span style={{ color: "#27272a", fontSize: 18 }}>/</span>
              {cur && (
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 6,
                    background: `${cur.accent}14`, border: `1px solid ${cur.accent}25`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <cur.icon size={12} color={cur.accent} strokeWidth={2} />
                  </div>
                  <span style={{
                    fontSize: 14, fontWeight: 700, color: "#e4e4e7",
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                  }}>{active}</span>
                  <div style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: cur.accent,
                    boxShadow: `0 0 6px ${cur.accent}`,
                  }} />
                </div>
              )}
            </div>

            {/* Right */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{
                fontSize: 13, color: "#52525b",
                fontFamily: "'Cabinet Grotesk', sans-serif",
              }}>
                Hey,{" "}
                <strong style={{ color: "#d4d4d8", fontWeight: 600 }}>{user?.fullName}</strong>
              </span>
              <img
                src={user?.avatar?.url} alt="avatar"
                style={{
                  width: 32, height: 32, borderRadius: 8, objectFit: "cover",
                  border: "1px solid #3f3f46",
                }}
              />
            </div>
          </header>

          {/* Content */}
          <main style={{ flex: 1, animation: "hp-in 0.3s ease both" }}>
            {active === "Dashboard"    && <Dashboard />}
            {active === "Analytics"    && <VisitorAnalytics />}
            {active === "Add Project"  && <AddProject />}
            {active === "Add Skill"    && <AddSkill />}
            {active === "Add Uses"     && <AddSoftwareApplications />}
            {active === "Add Timeline" && <AddTimeline />}
            {active === "Articles"     && <ManageArticles />}  {/* ← NEW */}
              {active === "Career"       && <ManageCareer />}
            {active === "Messages"     && <Messages />}
       
          
          </main>
        </div>
      </div>
    </>
  );
};

export default HomePage;