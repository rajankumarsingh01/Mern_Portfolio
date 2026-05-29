// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   BarChart,
//   Bar,
//   CartesianGrid,
// } from "recharts";
// import axios from "axios";
// import { Globe, Users, TrendingUp, Eye, Monitor, Wifi, ArrowUpRight, Activity } from "lucide-react";
// import { useEffect, useState } from "react";

// /* ─── Tooltip ─────────────────────────────────────────────────────── */
// const ChartTip = ({ active, payload, label }) => {
//   if (!active || !payload?.length) return null;
//   return (
//     <div style={{
//       background: "#18181b", border: "1px solid #3f3f46",
//       borderRadius: 10, padding: "10px 16px",
//       boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
//     }}>
//       <p style={{ color: "#71717a", fontSize: 11, fontFamily: "'Space Mono',monospace", margin: "0 0 4px" }}>{label}</p>
//       <p style={{ color: "#e4e4e7", fontSize: 22, fontWeight: 700, fontFamily: "'Cabinet Grotesk',sans-serif", margin: 0 }}>
//         {payload[0].value?.toLocaleString()}
//       </p>
//     </div>
//   );
// };

// /* ─── KPI Card ────────────────────────────────────────────────────── */
// const KpiCard = ({ icon: Icon, label, value, accent, sub, delay }) => (
//   <div className="kpi-card" style={{
//     background: "#18181b",
//     border: `1px solid #27272a`,
//     borderRadius: 16,
//     padding: "24px 22px",
//     position: "relative",
//     overflow: "hidden",
//     animationDelay: `${delay}ms`,
//   }}>
//     {/* Corner accent */}
//     <div style={{
//       position: "absolute", top: 0, right: 0,
//       width: 80, height: 80,
//       background: `radial-gradient(circle at top right, ${accent}22 0%, transparent 65%)`,
//       pointerEvents: "none",
//     }} />

//     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
//       <div style={{
//         width: 38, height: 38, borderRadius: 10,
//         border: `1px solid ${accent}40`,
//         background: `${accent}12`,
//         display: "flex", alignItems: "center", justifyContent: "center",
//       }}>
//         <Icon size={18} color={accent} strokeWidth={1.8} />
//       </div>
//       {sub && (
//         <div style={{
//           display: "flex", alignItems: "center", gap: 3,
//           fontSize: 11, color: "#22d3ee",
//           fontFamily: "'Space Mono', monospace",
//         }}>
//           <ArrowUpRight size={12} />
//           {sub}
//         </div>
//       )}
//     </div>

//     <div style={{
//       fontSize: 36, fontWeight: 800, color: "#fafafa", lineHeight: 1,
//       fontFamily: "'Cabinet Grotesk', sans-serif", marginBottom: 8,
//     }}>
//       {typeof value === "number" ? value.toLocaleString() : value}
//     </div>
//     <div style={{
//       fontSize: 12, color: "#52525b", fontFamily: "'Space Mono', monospace",
//       textTransform: "uppercase", letterSpacing: "0.08em",
//     }}>{label}</div>
//   </div>
// );

// /* ─── Section wrapper ─────────────────────────────────────────────── */
// const Panel = ({ children, style = {}, delay = 0 }) => (
//   <div className="panel-in" style={{
//     background: "#18181b",
//     border: "1px solid #27272a",
//     borderRadius: 16,
//     overflow: "hidden",
//     animationDelay: `${delay}ms`,
//     ...style,
//   }}>
//     {children}
//   </div>
// );

// const PanelHead = ({ icon: Icon, accent, title, badge }) => (
//   <div style={{
//     display: "flex", alignItems: "center", gap: 10,
//     padding: "20px 24px 16px",
//     borderBottom: "1px solid #27272a",
//   }}>
//     <Icon size={15} color={accent} strokeWidth={2} />
//     <span style={{
//       fontSize: 15, fontWeight: 700, color: "#e4e4e7",
//       fontFamily: "'Cabinet Grotesk', sans-serif",
//     }}>{title}</span>
//     {badge && (
//       <span style={{
//         marginLeft: "auto", fontSize: 10, fontWeight: 600,
//         padding: "3px 10px", borderRadius: 20,
//         background: "#22d3ee18", border: "1px solid #22d3ee30",
//         color: "#22d3ee", fontFamily: "'Space Mono', monospace",
//         letterSpacing: "0.06em",
//       }}>{badge}</span>
//     )}
//   </div>
// );

// /* ─── Main ────────────────────────────────────────────────────────── */
// const VisitorAnalytics = () => {
//   const [analytics, setAnalytics] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get("https://mern-portfolio-backend-ke5j.onrender.com/api/v1/visitor/analytics", { withCredentials: true })
//       .then(({ data }) => setAnalytics(data.analytics))
//       .catch(console.log)
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return (
//     <div style={{
//       minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center",
//       background: "#09090b",
//     }}>
//       <div style={{ textAlign: "center" }}>
//         <div style={{
//           width: 40, height: 40, margin: "0 auto 16px",
//           border: "2px solid #27272a", borderTopColor: "#22d3ee",
//           borderRadius: "50%", animation: "va-spin 0.7s linear infinite",
//         }} />
//         <p style={{ color: "#3f3f46", fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: "0.1em" }}>
//           FETCHING DATA
//         </p>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
//         @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap');

//         @keyframes va-up   { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
//         @keyframes va-spin { to   { transform: rotate(360deg); } }

//         .kpi-card, .panel-in {
//           animation: va-up 0.55s cubic-bezier(0.22,1,0.36,1) both;
//         }
//         .kpi-card { transition: border-color 0.2s, transform 0.2s; }
//         .kpi-card:hover { transform: translateY(-2px); border-color: #3f3f46 !important; }

//         .va-root .recharts-cartesian-grid line { stroke: #27272a; }
//         .va-root .recharts-xAxis .recharts-text,
//         .va-root .recharts-yAxis .recharts-text {
//           fill: #3f3f46 !important;
//           font-family: 'Space Mono', monospace !important;
//           font-size: 10px !important;
//         }
//         .va-root .recharts-tooltip-cursor { stroke: #3f3f46; }

//         .vr-row { transition: background 0.15s; }
//         .vr-row:hover { background: #1c1c1f !important; }
//       `}</style>

//       <div className="va-root" style={{
//         background: "#09090b",
//         minHeight: "100vh",
//         padding: "28px 26px",
//         fontFamily: "'Cabinet Grotesk', sans-serif",
//       }}>

//         {/* Page title */}
//         <div style={{ marginBottom: 26, animation: "va-up 0.4s ease both" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 5 }}>
//             <Activity size={18} color="#22d3ee" strokeWidth={1.8} />
//             <h1 style={{
//               fontSize: 24, fontWeight: 800, color: "#fafafa", margin: 0,
//               fontFamily: "'Cabinet Grotesk', sans-serif",
//             }}>Visitor Analytics</h1>
//           </div>
//           <p style={{ color: "#3f3f46", fontSize: 13, margin: 0, fontFamily: "'Space Mono', monospace" }}>
//             Real-time audience intelligence
//           </p>
//         </div>

//         {/* KPI grid */}
//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//           gap: 14, marginBottom: 18,
//         }}>
//           <KpiCard icon={Users}   label="Total Visitors"  value={analytics?.totalVisitors || 0}        accent="#22d3ee" sub="+12.4%" delay={0}   />
//           <KpiCard icon={Eye}     label="Unique Visitors" value={analytics?.uniqueVisitors || 0}       accent="#a78bfa" sub="+8.1%"  delay={60}  />
//           <KpiCard icon={Globe}   label="Countries"       value={analytics?.countryStats?.length || 0}  accent="#f97316" sub="+3"     delay={120} />
//           <KpiCard icon={Monitor} label="Devices"         value={analytics?.deviceStats?.length || 0}                         accent="#4ade80"              delay={180} />
//         </div>

//         {/* Charts row */}
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>

//           {/* Area */}
//           <Panel delay={220}>
//             <PanelHead icon={TrendingUp} accent="#22d3ee" title="Daily Visitors" badge="30 DAYS" />
//             <div style={{ padding: "16px 12px 20px" }}>
//               <ResponsiveContainer width="100%" height={240}>
//                 <AreaChart data={analytics.dailyVisitors} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
//                   <defs>
//                     <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="0%"   stopColor="#22d3ee" stopOpacity={0.18} />
//                       <stop offset="100%" stopColor="#22d3ee" stopOpacity={0}    />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="1 4" vertical={false} />
//                   <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ dy: 6 }} />
//                   <YAxis axisLine={false} tickLine={false} />
//                   <Tooltip content={<ChartTip />} />
//                   <Area type="monotone" dataKey="visitors"
//                     stroke="#22d3ee" strokeWidth={2}
//                     fill="url(#ag1)" dot={false}
//                     activeDot={{ r: 4, fill: "#22d3ee", stroke: "#09090b", strokeWidth: 2 }}
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </Panel>

//           {/* Bar */}
//           <Panel delay={280}>
//             <PanelHead icon={Globe} accent="#f97316" title="Top Countries" />
//             <div style={{ padding: "16px 12px 20px" }}>
//               <ResponsiveContainer width="100%" height={240}>
//                 <BarChart data={analytics.countryStats} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
//                   <defs>
//                     <linearGradient id="bg1" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="0%"   stopColor="#f97316" stopOpacity={0.9} />
//                       <stop offset="100%" stopColor="#ea580c" stopOpacity={0.5} />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="1 4" vertical={false} />
//                   <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ dy: 6 }} />
//                   <YAxis axisLine={false} tickLine={false} />
//                   <Tooltip content={<ChartTip />} />
//                   <Bar dataKey="count" fill="url(#bg1)" radius={[5, 5, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </Panel>
//         </div>

//         {/* Table */}
//         <Panel delay={340}>
//           <PanelHead icon={Wifi} accent="#4ade80" title="Recent Visitors" badge="● LIVE" />
//           <div style={{ overflowX: "auto" }}>
//             <table style={{ width: "100%", borderCollapse: "collapse" }}>
//               <thead>
//                 <tr style={{ borderBottom: "1px solid #27272a" }}>
//                   {["IP Address", "Country", "City", "Browser", "OS", "Device"].map(h => (
//                     <th key={h} style={{
//                       padding: "11px 20px", textAlign: "left",
//                       fontSize: 10, fontWeight: 700,
//                       letterSpacing: "0.1em", textTransform: "uppercase",
//                       color: "#3f3f46", fontFamily: "'Space Mono', monospace",
//                     }}>{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {analytics.recentVisitors.map((v, i) => (
//                   <tr key={v._id} className="vr-row"
//                     style={{ borderBottom: "1px solid #18181b", animationDelay: `${360 + i * 35}ms` }}>
//                     {[v.ip, v.country, v.city, v.browser, v.os, v.device].map((val, j) => (
//                       <td key={j} style={{
//                         padding: "13px 20px", fontSize: 13, whiteSpace: "nowrap",
//                         color: j === 0 ? "#22d3ee" : "#a1a1aa",
//                         fontFamily: j === 0 ? "'Space Mono', monospace" : "'Cabinet Grotesk', sans-serif",
//                         fontWeight: j === 0 ? 400 : 500,
//                       }}>
//                         {j === 5 ? (
//                           <span style={{
//                             padding: "3px 11px", borderRadius: 6, fontSize: 11, fontWeight: 700,
//                             fontFamily: "'Space Mono', monospace",
//                             background:
//                               val === "Mobile"  ? "#fca5a510" :
//                               val === "Desktop" ? "#22d3ee10" : "#fbbf2410",
//                             border: `1px solid ${
//                               val === "Mobile"  ? "#fca5a530" :
//                               val === "Desktop" ? "#22d3ee30" : "#fbbf2430"
//                             }`,
//                             color:
//                               val === "Mobile"  ? "#fca5a5" :
//                               val === "Desktop" ? "#22d3ee"  : "#fbbf24",
//                           }}>{val}</span>
//                         ) : val}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </Panel>

//       </div>
//     </>
//   );
// };

// export default VisitorAnalytics;



import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import {
  Globe,
  Users,
  TrendingUp,
  Eye,
  Monitor,
  Wifi,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import { useEffect, useState } from "react";

/* Tooltip */
const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: "#18181b",
        border: "1px solid #3f3f46",
        borderRadius: 10,
        padding: "10px 16px",
      }}
    >
      <p style={{ color: "#71717a", fontSize: 11 }}>{label}</p>
      <p style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>
        {payload[0].value?.toLocaleString()}
      </p>
    </div>
  );
};

/* KPI Card */
const KpiCard = ({ icon: Icon, label, value, accent, sub }) => (
  <div
    style={{
      background: "#18181b",
      border: "1px solid #27272a",
      borderRadius: 16,
      padding: "20px",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Icon color={accent} />
      {sub && <span style={{ color: "#22d3ee" }}>{sub}</span>}
    </div>

    <h2 style={{ color: "#fff", fontSize: 28, margin: "10px 0" }}>
      {value}
    </h2>

    <p style={{ color: "#71717a", fontSize: 12 }}>{label}</p>
  </div>
);

const VisitorAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalVisitors: 0,
    uniqueVisitors: 0,
    countryStats: [],
    dailyVisitors: [],
    recentVisitors: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://mern-portfolio-backend-ke5j.onrender.com/api/v1/visitor/analytics",
        { withCredentials: true }
      )
      .then((res) => {
        setAnalytics(res.data.analytics || analytics);
      })
      .catch((err) => {
        console.log("Analytics Error:", err?.response?.data || err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ color: "#fff", textAlign: "center", marginTop: 100 }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ background: "#09090b", minHeight: "100vh", padding: 20 }}>
      {/* HEADER */}
      <div style={{ marginBottom: 20 }}>
        <Activity color="#22d3ee" />
        <h1 style={{ color: "#fff" }}>Visitor Analytics</h1>
      </div>

      {/* KPI */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 12,
        }}
      >
        <KpiCard
          icon={Users}
          label="Total Visitors"
          value={analytics.totalVisitors}
          accent="#22d3ee"
        />
        <KpiCard
          icon={Eye}
          label="Unique Visitors"
          value={analytics.uniqueVisitors}
          accent="#a78bfa"
        />
        <KpiCard
          icon={Globe}
          label="Countries"
          value={analytics.countryStats.length}
          accent="#f97316"
        />
        <KpiCard
          icon={Monitor}
          label="Devices"
          value="Active"
          accent="#4ade80"
        />
      </div>

      {/* CHART */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
        
        {/* AREA CHART */}
        <div style={{ background: "#18181b", padding: 10 }}>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={analytics.dailyVisitors || []}>
              <CartesianGrid />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip content={<ChartTip />} />
              <Area
                dataKey="visitors"
                stroke="#22d3ee"
                fill="#22d3ee33"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div style={{ background: "#18181b", padding: 10 }}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics.countryStats || []}>
              <CartesianGrid />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip content={<ChartTip />} />
              <Bar dataKey="count" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default VisitorAnalytics;