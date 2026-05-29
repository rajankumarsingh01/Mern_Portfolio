


import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import GoogleLoginButton from "../components/GoogleLoginButton";

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

// ── Particles Background ────────────────────────────────────────────────────
const ParticleField = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,197,94,${p.opacity})`;
        ctx.fill();
      });
      // draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(34,197,94,${0.08 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0,
      }}
    />
  );
};

// ── Tech Badge ───────────────────────────────────────────────────────────────
const TechBadge = ({ label }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "4px 12px", borderRadius: 20,
    background: "rgba(34,197,94,0.08)",
    border: "1px solid rgba(34,197,94,0.2)",
    color: "#4ade80", fontSize: 12, fontWeight: 500,
    fontFamily: "'JetBrains Mono', monospace",
  }}>
    {label}
  </span>
);

// ── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value }) => (
  <div style={{
    padding: "20px 24px", borderRadius: 16,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    display: "flex", alignItems: "center", gap: 16,
  }}>
    <div style={{
      width: 44, height: 44, borderRadius: 12,
      background: "rgba(34,197,94,0.1)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 20,
    }}>
      {icon}
    </div>
    <div>
      <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</p>
      <p style={{ margin: 0, fontSize: 15, color: "#e2e8f0", fontWeight: 600 }}>{value}</p>
    </div>
  </div>
);

// ── Main Component ───────────────────────────────────────────────────────────
const ProjectView = () => {
  const [project, setProject] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projectLoading, setProjectLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);



  const [downloading, setDownloading] = useState(false);


  const navigate = useNavigate();
  const { id } = useParams();

  // AUTH
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return () => unsub();
  }, []);

  // FETCH PROJECT
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setProjectLoading(true);
        const res = await axios.get(`${API}/api/v1/project/get/${id}`);
        setProject(res.data.project);
      } catch {
        toast.error("Failed to load project");
      } finally {
        setProjectLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // CHECK PURCHASE
  const checkPurchase = useCallback(async (userOverride) => {
    const user = userOverride || currentUser;
    if (!user) { setIsPurchased(false); return false; }
    try {
      const token = await user.getIdToken(false);
      if (!token) return false;
      const { data } = await axios.get(
        `${API}/api/v1/customer/check-purchase/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsPurchased(data.purchased);
      return data.purchased;
    } catch { return false; }
  }, [currentUser, id]);

  useEffect(() => { checkPurchase(); }, [checkPurchase]);

  // LOGOUT
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsPurchased(false);
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    }
  };


 // =====================================================
// ProjectView.jsx — handleDownload FIXED
// =====================================================
// Sirf yeh function replace karo apne ProjectView.jsx mein
// baaki sab same rehega
// =====================================================
const handleDownload = async () => {
  try {
    setDownloading(true);
    const user = auth.currentUser;
    if (!user) { toast.error("Please login first"); return; }

    const token = await user.getIdToken(false);

    const response = await fetch(
      `${API}/api/v1/project/download/customer/${project._id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      toast.error(err.message || "Download failed");
      return;
    }

    const blob = await response.blob();
    const zipBlob = new Blob([blob], { type: "application/zip" });
    const blobUrl = window.URL.createObjectURL(zipBlob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${project.title}-source-code.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => window.URL.revokeObjectURL(blobUrl), 3000);
    toast.success("Download started! ✅");
  } catch (err) {
    console.error(err);
    toast.error("Download failed");
  } finally {
    setDownloading(false);
  }
};
// =====================================================
// IMPORTANT: projectRouter.js mein yeh route SAME rehega
// GET /download/customer/:projectId
// isCustomerAuthenticated middleware lagega
// =====================================================

  // PAYMENT
  const handlePayment = async (tokenOverride) => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) { setShowLoginModal(true); return; }
      const token = tokenOverride || await user.getIdToken(false);
      if (!token) { setShowLoginModal(true); return; }

      const { data } = await axios.post(
        `${API}/api/v1/payment/create-order`,
        { projectId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: project.title,
        description: "Source Code Purchase",
        order_id: data.order.id,
        handler: async (response) => {
          try {
            const freshToken = await user.getIdToken(false);
            await axios.post(
              `${API}/api/v1/payment/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                projectId: id,
              },
              { headers: { Authorization: `Bearer ${freshToken}` } }
            );
            toast.success("Payment Successful 🎉 Source code unlocked!");
            setIsPurchased(true);
          } catch {
            toast.error("Payment verification failed.");
          }
        },
        prefill: { email: user.email || "", name: user.displayName || "" },
        theme: { color: "#22c55e" },
        modal: { ondismiss: () => setLoading(false) },
      };
      new window.Razorpay(options).open();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyClick = () => {
    if (!auth.currentUser) { setShowLoginModal(true); return; }
    handlePayment();
  };

  const handleLoginSuccess = async () => {
    setShowLoginModal(false);
    const user = auth.currentUser;
    if (!user) return;
    const token = await user.getIdToken(true);
    const alreadyPurchased = await checkPurchase(user);
    if (alreadyPurchased) { toast.info("You already own this!"); return; }
    handlePayment(token);
  };

  // ── LOADING ──────────────────────────────────────────────────────────────
  if (projectLoading) return (
    <div style={{
      minHeight: "100vh", background: "#020408",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: 20,
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: "50%",
        border: "2px solid rgba(34,197,94,0.15)",
        borderTop: "2px solid #22c55e",
        animation: "spin 0.8s linear infinite",
      }} />
      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, letterSpacing: "0.1em" }}>
        LOADING PROJECT
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!project) return (
    <div style={{ minHeight: "100vh", background: "#020408", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "rgba(255,255,255,0.3)" }}>Project not found.</p>
    </div>
  );

  const techList = project.technologies
    ? project.technologies.split(",").map(t => t.trim()).filter(Boolean)
    : [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #020408; }
        
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.3); }
          70% { box-shadow: 0 0 0 12px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .fade-up-1 { animation: fadeUp 0.6s 0.1s ease both; }
        .fade-up-2 { animation: fadeUp 0.6s 0.2s ease both; }
        .fade-up-3 { animation: fadeUp 0.6s 0.3s ease both; }
        .fade-up-4 { animation: fadeUp 0.6s 0.4s ease both; }
        .fade-up-5 { animation: fadeUp 0.6s 0.5s ease both; }

        .buy-btn {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #16a34a, #22c55e);
          border: none; cursor: pointer;
          transition: all 0.3s ease;
        }
        .buy-btn::before {
          content: '';
          position: absolute; top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }
        .buy-btn:hover::before { left: 100%; }
        .buy-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(34,197,94,0.3); }
        .buy-btn:active { transform: translateY(0); }
        .buy-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .download-btn {
          background: transparent;
          border: 1px solid rgba(96,165,250,0.4);
          color: #93c5fd;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .download-btn:hover {
          background: rgba(96,165,250,0.1);
          border-color: #60a5fa;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(96,165,250,0.15);
        }

        .ghost-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .ghost-btn:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.2);
          color: #fff;
        }

        .logout-btn {
          background: transparent;
          border: 1px solid rgba(239,68,68,0.3);
          color: rgba(239,68,68,0.7);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .logout-btn:hover {
          background: rgba(239,68,68,0.08);
          border-color: rgba(239,68,68,0.6);
          color: #ef4444;
        }

        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          border-color: rgba(34,197,94,0.2) !important;
          background: rgba(34,197,94,0.03) !important;
          transform: translateY(-2px);
        }

        .glass-nav {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        .user-avatar {
          animation: pulse-ring 2s infinite;
        }

        .scanline-effect {
          position: absolute; inset: 0; overflow: hidden; pointer-events: none;
        }
        .scanline-effect::after {
          content: '';
          position: absolute; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(34,197,94,0.15), transparent);
          animation: scanline 6s linear infinite;
        }
      `}</style>

      {/* PARTICLE CANVAS */}
      <ParticleField />

      {/* SCANLINE ON HERO */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── TOP NAV ─────────────────────────────────────────────────────── */}
        <nav className="glass-nav" style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(2,4,8,0.85)",
          padding: "0 32px", height: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <button
            onClick={() => navigate(-1)}
            className="ghost-btn"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 16px", borderRadius: 10,
              fontSize: 13, fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            ← back
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "#22c55e",
              animation: "shimmer 2s infinite",
            }} />
            <span style={{
              color: "rgba(255,255,255,0.4)", fontSize: 11,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.15em",
            }}>
              PORTFOLIO.DEV
            </span>
          </div>

          {/* USER CONTROLS */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {currentUser ? (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="user-avatar" style={{
                    width: 34, height: 34, borderRadius: "50%",
                    background: "linear-gradient(135deg, #16a34a, #22c55e)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, color: "#fff",
                  }}>
                    {currentUser.email?.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: 12, color: "#e2e8f0", fontWeight: 500 }}>
                      {currentUser.displayName?.split(" ")[0] || "User"}
                    </span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono', monospace" }}>
                      {isPurchased ? "✓ purchased" : "logged in"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="logout-btn"
                  style={{
                    padding: "7px 14px", borderRadius: 8,
                    fontSize: 12, fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="ghost-btn"
                style={{
                  padding: "8px 16px", borderRadius: 10,
                  fontSize: 12, fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                sign in
              </button>
            )}
          </div>
        </nav>

        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <div style={{ position: "relative", paddingTop: 64 }}>
          {/* Banner */}
          <div style={{ position: "relative", height: "clamp(300px, 50vh, 520px)", overflow: "hidden" }}>
            {project?.projectBanner?.url ? (
              <>
                <img
                  src={project.projectBanner.url}
                  alt={project.title}
                  onLoad={() => setImgLoaded(true)}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    filter: "brightness(0.55) saturate(1.2)",
                    transition: "opacity 0.8s ease",
                    opacity: imgLoaded ? 1 : 0,
                  }}
                />
                {!imgLoaded && (
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(135deg, rgba(34,197,94,0.1), rgba(2,4,8,1))",
                  }} />
                )}
              </>
            ) : (
              <div style={{
                width: "100%", height: "100%",
                background: "linear-gradient(135deg, rgba(34,197,94,0.08) 0%, #020408 60%)",
              }}>
                {/* grid pattern */}
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: "linear-gradient(rgba(34,197,94,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.05) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }} />
              </div>
            )}

            {/* Gradient overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, #020408 0%, rgba(2,4,8,0.6) 50%, rgba(2,4,8,0.1) 100%)",
            }} />

            {/* Scanline */}
            <div className="scanline-effect" />

            {/* Hero text */}
            <div className="fade-up" style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "48px 48px 40px",
              maxWidth: 900,
            }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                <span style={{
                  padding: "3px 10px", borderRadius: 20,
                  background: "rgba(34,197,94,0.15)",
                  border: "1px solid rgba(34,197,94,0.3)",
                  color: "#4ade80", fontSize: 11, fontWeight: 500,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {project.stack || "PROJECT"}
                </span>
                {project.isPaid && (
                  <span style={{
                    padding: "3px 10px", borderRadius: 20,
                    background: "rgba(250,204,21,0.1)",
                    border: "1px solid rgba(250,204,21,0.25)",
                    color: "#fbbf24", fontSize: 11, fontWeight: 500,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    PREMIUM
                  </span>
                )}
                {isPurchased && (
                  <span style={{
                    padding: "3px 10px", borderRadius: 20,
                    background: "rgba(96,165,250,0.1)",
                    border: "1px solid rgba(96,165,250,0.25)",
                    color: "#93c5fd", fontSize: 11, fontWeight: 500,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    ✓ OWNED
                  </span>
                )}
              </div>

              <h1 style={{
                fontSize: "clamp(32px, 5vw, 64px)",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800, color: "#fff",
                lineHeight: 1.1, letterSpacing: "-0.02em",
                textShadow: "0 2px 40px rgba(0,0,0,0.5)",
              }}>
                {project.title}
              </h1>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 32px 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 32, alignItems: "start" }}>

            {/* LEFT COLUMN */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

              {/* Description */}
              {project.description && (
                <div className="fade-up-1">
                  <p style={{
                    fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "#22c55e", marginBottom: 12,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>Overview</p>
                  <p style={{
                    fontSize: 16, lineHeight: 1.8,
                    color: "rgba(255,255,255,0.65)",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 400,
                  }}>
                    {project.description}
                  </p>
                </div>
              )}

              {/* Stats Grid */}
              <div className="fade-up-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {project.stack && <StatCard icon="⚡" label="Stack" value={project.stack} />}
                {project.deployed && <StatCard icon="🚀" label="Deployed" value={project.deployed} />}
              </div>

              {/* Technologies */}
              {techList.length > 0 && (
                <div className="fade-up-3">
                  <p style={{
                    fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "#22c55e", marginBottom: 14,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>Technologies</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {techList.map((t, i) => <TechBadge key={i} label={t} />)}
                  </div>
                </div>
              )}

              {/* Live Demo link */}
              {project.projectLink && project.projectLink !== "http" && (
                <div className="fade-up-4">
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "12px 20px", borderRadius: 12,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.6)",
                      textDecoration: "none", fontSize: 13,
                      fontFamily: "'JetBrains Mono', monospace",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "rgba(34,197,94,0.3)";
                      e.currentTarget.style.color = "#4ade80";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                    }}
                  >
                    <span style={{ fontSize: 16 }}>↗</span>
                    view live demo
                  </a>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN — Purchase Card */}
            <div className="fade-up-2" style={{ position: "sticky", top: 88 }}>
              <div style={{
                borderRadius: 24,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}>
                {/* Card header */}
                <div style={{
                  padding: "28px 28px 24px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(34,197,94,0.03)",
                }}>
                  <p style={{
                    fontSize: 11, letterSpacing: "0.15em", color: "#22c55e",
                    textTransform: "uppercase", marginBottom: 8,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    {project.isPaid ? "Source Code" : "Open Source"}
                  </p>

                  {project.isPaid && (
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                      <span style={{
                        fontSize: 40, fontWeight: 800, color: "#fff",
                        fontFamily: "'Syne', sans-serif",
                      }}>₹{project.price}</span>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>one time</span>
                    </div>
                  )}

                  {isPurchased && (
                    <div style={{
                      marginTop: 12, padding: "8px 14px", borderRadius: 8,
                      background: "rgba(34,197,94,0.08)",
                      border: "1px solid rgba(34,197,94,0.2)",
                      display: "inline-flex", alignItems: "center", gap: 6,
                    }}>
                      <span style={{ color: "#4ade80", fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
                        ✓ you own this
                      </span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div style={{ padding: "20px 28px" }}>
                  {[
                    "Full source code access",
                    "Commercial use allowed",
                    "Lifetime access",
                    project.isPaid ? "One-time payment" : "Free forever",
                  ].map((f, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 0",
                      borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    }}>
                      <span style={{ color: "#22c55e", fontSize: 14 }}>✓</span>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div style={{ padding: "4px 28px 28px", display: "flex", flexDirection: "column", gap: 10 }}>

                  {/* FREE */}
                  {!project.isPaid && (
                    <a
                      href={project.gitRepoLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        padding: "14px", borderRadius: 12,
                        background: "linear-gradient(135deg, #16a34a, #22c55e)",
                        color: "#fff", textDecoration: "none",
                        fontSize: 14, fontWeight: 600,
                        fontFamily: "'Syne', sans-serif",
                        transition: "all 0.3s",
                      }}
                    >
                      View Source Code ↗
                    </a>
                  )}

                  {/* BUY */}
                  {project.isPaid && !isPurchased && (
                    <button
                      onClick={handleBuyClick}
                      disabled={loading}
                      className="buy-btn"
                      style={{
                        width: "100%", padding: "15px", borderRadius: 12,
                        color: "#fff", fontSize: 14, fontWeight: 600,
                        fontFamily: "'Syne', sans-serif",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      }}
                    >
                      {loading ? (
                        <>
                          <div style={{
                            width: 16, height: 16, borderRadius: "50%",
                            border: "2px solid rgba(255,255,255,0.3)",
                            borderTop: "2px solid #fff",
                            animation: "spin 0.6s linear infinite",
                          }} />
                          Processing...
                        </>
                      ) : (
                        <>Buy Source Code — ₹{project.price}</>
                      )}
                    </button>
                  )}

                  {/* DOWNLOAD */}
                  {/* DOWNLOAD — replace karo pura <a> tag */}
                  {project.isPaid && isPurchased && (
                    <button
                      onClick={handleDownload}
                      disabled={downloading}
                      className="download-btn"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        padding: "15px", borderRadius: 12, width: "100%",
                        fontSize: 14, fontWeight: 600,
                        fontFamily: "'Syne', sans-serif",
                        opacity: downloading ? 0.6 : 1,
                        cursor: downloading ? "not-allowed" : "pointer",
                      }}
                    >
                      {downloading ? "Downloading..." : "⬇ Download Source Code"}
                    </button>
                  )}
                  {/* Security note */}
                  <p style={{
                    textAlign: "center", fontSize: 11, marginTop: 4,
                    color: "rgba(255,255,255,0.2)",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    🔒 secured by razorpay
                  </p>
                </div>
              </div>

              {/* User card below purchase card */}
              {currentUser && (
                <div style={{
                  marginTop: 12, padding: "16px 20px", borderRadius: 16,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img
                      src={currentUser.photoURL || ""}
                      alt=""
                      onError={e => e.target.style.display = "none"}
                      style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }}
                    />
                    <div>
                      <p style={{ fontSize: 12, color: "#e2e8f0", fontWeight: 500 }}>
                        {currentUser.displayName || "User"}
                      </p>
                      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono', monospace" }}>
                        {currentUser.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="logout-btn"
                    style={{
                      padding: "6px 12px", borderRadius: 8,
                      fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── LOGIN MODAL ──────────────────────────────────────────────────────── */}
      {showLoginModal && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(12px)",
            padding: 20,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowLoginModal(false); }}
        >
          <div style={{
            background: "#0d1117",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 24, padding: 40,
            width: "100%", maxWidth: 400,
            textAlign: "center",
            animation: "fadeUp 0.3s ease",
            position: "relative",
          }}>
            {/* Close */}
            <button
              onClick={() => setShowLoginModal(false)}
              style={{
                position: "absolute", top: 16, right: 16,
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(255,255,255,0.3)", fontSize: 18, lineHeight: 1,
                padding: 4,
              }}
            >✕</button>

            {/* Icon */}
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, margin: "0 auto 24px",
            }}>
              🔐
            </div>

            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700, fontSize: 24, color: "#fff",
              marginBottom: 8,
            }}>
              Sign in to continue
            </h2>
            <p style={{
              fontSize: 13, color: "rgba(255,255,255,0.4)",
              marginBottom: 28, lineHeight: 1.6,
            }}>
              Authenticate with Google to purchase and access source code.
            </p>

            {/* Divider */}
            <div style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              marginBottom: 24,
            }} />

            <div style={{ display: "flex", justifyContent: "center" }}>
              <GoogleLoginButton onLoginSuccess={handleLoginSuccess} />
            </div>

            <p style={{
              marginTop: 20, fontSize: 11,
              color: "rgba(255,255,255,0.2)",
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              your data is never shared
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectView;