





import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const API = import.meta.env.VITE_BACKEND_URL || "https://mern-portfolio-backend-ke5j.onrender.com";

// ── Call backend proxy (NOT direct Anthropic) ─────────────────────────────
const callAI = async (messages) => {
  const res = await fetch(`${API}/api/v1/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  const data = await res.json();



  if (!res.ok) {
    throw new Error(data?.error || "AI request failed");
  }

  return data.message || "Sorry, I couldn't respond.";
};

// ── Parse [ACTION:type:value] from AI text ────────────────────────────────
const parseAction = (text) => {
  const match = text.match(/\[ACTION:(\w+):([^\]]+)\]/);
  if (!match) return { clean: text, action: null };
  return {
    clean: text.replace(match[0], "").trim(),
    action: { type: match[1], value: match[2] },
  };
};

// ── Quick prompt chips ────────────────────────────────────────────────────
const QUICK = [
  { label: "Who is Rajan?",   msg: "Tell me about Rajan briefly" },
  { label: "See Projects",    msg: "Take me to his projects" },
  { label: "Tech Stack",      msg: "What tech stack does Rajan use?" },
  { label: "Hire / Contact",  msg: "How can I contact Rajan?" },
  { label: "Source Code?",    msg: "How do I buy source code of a project?" },
];

// ── Typing dots ───────────────────────────────────────────────────────────
const TypingDots = () => (
  <div style={{ display: "flex", gap: 4, padding: "10px 14px", alignItems: "center" }}>
    {[0, 1, 2].map(i => (
      <motion.div key={i}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
        style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }}
      />
    ))}
  </div>
);

// ── Action toast (above FAB) ──────────────────────────────────────────────
const ActionToast = ({ text }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
    style={{
      position: "absolute", bottom: "calc(100% + 10px)", left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)",
      borderRadius: 8, padding: "6px 14px", whiteSpace: "nowrap",
      fontSize: 11, color: "#4ade80", fontFamily: "'JetBrains Mono', monospace",
      pointerEvents: "none",
    }}
  >
    ⚡ {text}
  </motion.div>
);

// ── Main Component ────────────────────────────────────────────────────────
const PortfolioAI = () => {
  const [open, setOpen]           = useState(false);
  const [input, setInput]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [actionToast, setToast]   = useState(null);
  const [unread, setUnread]       = useState(0);
  const [messages, setMessages]   = useState([
    {
      role: "assistant",
      content: "Hey! I'm **ARIA**, Rajan's AI assistant 👋\nAsk me anything about his work, skills, or projects — or I can navigate you around the portfolio!",
      id: 0,
    },
  ]);

  const bottomRef = useRef(null);
  const inputRef  = useRef(null);
  const navigate  = useNavigate();

  // auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // focus + clear unread on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 280);
      setUnread(0);
    }
  }, [open]);

  const showToast = (text) => {
    setToast(text);
    setTimeout(() => setToast(null), 2500);
  };

  // perform navigation actions
  const performAction = useCallback((action) => {
    if (!action) return;
    if (action.type === "navigate") {
      showToast(`Navigating → ${action.value}`);
      setTimeout(() => navigate(action.value), 700);
    } else if (action.type === "scroll") {
      showToast(`Scrolling → ${action.value}`);
      setTimeout(() => {
        const el = document.getElementById(action.value)
          || document.querySelector(`[data-section="${action.value}"]`);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else navigate(`/#${action.value}`);
      }, 400);
    }
  }, [navigate]);

  // send message to ARIA
  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput("");

    const userMsg = { role: "user", content: userText, id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      // build clean history for API
      const history = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content,
      }));

      const raw = await callAI(history);
      const { clean, action } = parseAction(raw);

      const aiMsg = { role: "assistant", content: clean, id: Date.now() + 1, action };
      setMessages(prev => [...prev, aiMsg]);

      if (action) performAction(action);
      if (!open) setUnread(n => n + 1);
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Oops — something went wrong. Try again in a moment.",
        id: Date.now() + 1,
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  // basic markdown renderer (**bold**, newlines)
  const renderText = (text) => {
    return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**")
        ? <strong key={i} style={{ color: "#fff", fontWeight: 600 }}>{part.slice(2, -2)}</strong>
        : part.split("\n").map((line, j, arr) => (
            <React.Fragment key={`${i}-${j}`}>
              {line}{j < arr.length - 1 && <br />}
            </React.Fragment>
          ))
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Syne:wght@500;600;700&display=swap');

        .aria-scroll::-webkit-scrollbar { width: 3px; }
        .aria-scroll::-webkit-scrollbar-thumb { background: rgba(34,197,94,0.2); border-radius: 2px; }
        .aria-scroll::-webkit-scrollbar-track { background: transparent; }

        .aria-input { outline: none; }
        .aria-input::placeholder { color: rgba(255,255,255,0.2); }

        .q-chip {
          flex-shrink: 0;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px; padding: 6px 12px;
          font-size: 11px; color: rgba(255,255,255,0.45);
          cursor: pointer; white-space: nowrap;
          font-family: 'JetBrains Mono', monospace;
          transition: all 0.2s;
        }
        .q-chip:hover {
          background: rgba(34,197,94,0.08);
          border-color: rgba(34,197,94,0.25);
          color: #4ade80;
        }
        .q-chip:disabled { opacity: 0.4; cursor: not-allowed; }

        .send-btn {
          width: 36px; height: 36px; flex-shrink: 0;
          border-radius: 10px; border: none; cursor: pointer;
          background: linear-gradient(135deg, #14532d, #22c55e);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .send-btn:hover:not(:disabled) { transform: scale(1.1); box-shadow: 0 4px 16px rgba(34,197,94,0.4); }
        .send-btn:disabled { opacity: 0.35; cursor: not-allowed; }

        @keyframes aria-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.35); }
          50%      { box-shadow: 0 0 0 14px rgba(34,197,94,0); }
        }
        .aria-fab-ring { animation: aria-pulse 3s ease infinite; }

        @keyframes orbit {
          from { transform: rotate(0deg) translateX(22px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(22px) rotate(-360deg); }
        }
        .orbit { animation: orbit 2.8s linear infinite; position: absolute; width: 5px; height: 5px; border-radius: 50%; background: #4ade80; top: 50%; left: 50%; margin: -2.5px 0 0 -2.5px; }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .blink { animation: blink 2s ease infinite; }
      `}</style>

      {/* ── FAB Button ──────────────────────────────────────────────────── */}
     <div style={{ position: "fixed", bottom: "clamp(16px, 5vw, 28px)", right: "clamp(14px, 4vw, 28px)", zIndex: 1000 }}>
        <AnimatePresence>{actionToast && <ActionToast text={actionToast} />}</AnimatePresence>

        <motion.button
          className="aria-fab-ring"
          onClick={() => setOpen(o => !o)}
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
          style={{
           width: "clamp(50px, 13vw, 58px)", height: "clamp(50px, 13vw, 58px)", borderRadius: "50%", border: "none",
            background: open
              ? "rgba(8,12,18,0.97)"
              : "linear-gradient(135deg, #14532d, #22c55e)",
            outline: open ? "1px solid rgba(34,197,94,0.3)" : "none",
            cursor: "pointer", position: "relative", overflow: "visible",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 28px rgba(34,197,94,0.28)",
          }}
        >
          {!open && <div className="orbit" />}
          <AnimatePresence mode="wait">
            {open
              ? <motion.span key="x" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:0.18}} style={{fontSize:18,color:"#4ade80",lineHeight:1}}>✕</motion.span>
              : <motion.span key="o" initial={{scale:0.5,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.5,opacity:0}} transition={{duration:0.18}} style={{fontSize:22,lineHeight:1}}>✦</motion.span>
            }
          </AnimatePresence>
          {/* unread badge */}
          <AnimatePresence>
            {unread > 0 && !open && (
              <motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}
                style={{position:"absolute",top:-3,right:-3,width:18,height:18,borderRadius:"50%",background:"#ef4444",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#fff",fontWeight:700}}>
                {unread}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Chat Panel ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, scale:0.9, y:24 }}
            animate={{ opacity:1, scale:1,  y:0  }}
            exit={{   opacity:0, scale:0.9, y:16 }}
            transition={{ type:"spring", stiffness:340, damping:30 }}
            style={{
              position: "fixed",
              bottom: 100, right: 28,
              width: "min(420px, calc(100vw - 32px))",
              height: "min(580px, calc(100vh - 120px))",
              background: "rgba(7,11,17,0.97)",
              backdropFilter: "blur(28px)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 24,
              display: "flex", flexDirection: "column",
              overflow: "hidden", zIndex: 999,
              boxShadow: "0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(34,197,94,0.04)",
            }}
          >
            {/* header */}
            <div style={{
              padding: "16px 18px 13px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(34,197,94,0.025)",
              flexShrink: 0,
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:11 }}>
                <div style={{
                  width:38, height:38, borderRadius:"50%", flexShrink:0,
                  background:"linear-gradient(135deg,#14532d,#22c55e)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:17, boxShadow:"0 0 18px rgba(34,197,94,0.28)",
                }}>✦</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, color:"#fff" }}>ARIA</span>
                    <span style={{ fontSize:8, color:"#4ade80", fontFamily:"'JetBrains Mono',monospace", letterSpacing:"0.1em", background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.2)", borderRadius:4, padding:"1px 5px" }}>AI</span>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:2 }}>
                    <div className="blink" style={{ width:5, height:5, borderRadius:"50%", background:"#22c55e" }}/>
                    <span style={{ fontSize:10, color:"rgba(255,255,255,0.3)", fontFamily:"'JetBrains Mono',monospace" }}>
                      Rajan's Portfolio Assistant
                    </span>
                  </div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:3, alignItems:"flex-end" }}>
                  {["guide","answer","assist"].map((c,i)=>(
                    <span key={i} style={{ fontSize:8, color:"rgba(255,255,255,0.18)", fontFamily:"'JetBrains Mono',monospace" }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* messages */}
            <div className="aria-scroll" style={{
              flex:1, overflowY:"auto", padding:"14px 14px 8px",
              display:"flex", flexDirection:"column", gap:10,
            }}>
              {messages.map((msg) => (
                <motion.div key={msg.id}
                  initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                  transition={{ duration:0.28 }}
                  style={{ display:"flex", justifyContent: msg.role==="user" ? "flex-end" : "flex-start", gap:7, alignItems:"flex-end" }}
                >
                  {msg.role === "assistant" && (
                    <div style={{ width:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#14532d,#22c55e)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, flexShrink:0, marginBottom:2 }}>✦</div>
                  )}
                  <div style={{
                    maxWidth:"78%", padding:"10px 13px",
                    borderRadius: msg.role==="user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background: msg.role==="user" ? "linear-gradient(135deg,#14532d,#166534)" : "rgba(255,255,255,0.04)",
                    border: msg.role==="user" ? "1px solid rgba(34,197,94,0.2)" : "1px solid rgba(255,255,255,0.06)",
                    fontSize:13, color:"rgba(255,255,255,0.82)", lineHeight:1.65,
                    fontFamily:"'JetBrains Mono',monospace",
                  }}>
                    {renderText(msg.content)}
                    {msg.action && (
                      <div style={{ marginTop:8, display:"inline-flex", alignItems:"center", gap:4, background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.2)", borderRadius:5, padding:"3px 8px", fontSize:9, color:"#4ade80" }}>
                        ⚡ {msg.action.type}: {msg.action.value}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}
                  style={{ display:"flex", alignItems:"flex-end", gap:7 }}>
                  <div style={{ width:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#14532d,#22c55e)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11 }}>✦</div>
                  <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:"16px 16px 16px 4px" }}>
                    <TypingDots />
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* quick prompts */}
            <div style={{ padding:"8px 12px", borderTop:"1px solid rgba(255,255,255,0.04)", display:"flex", gap:6, overflowX:"auto", scrollbarWidth:"none", flexShrink:0 }}>
              {QUICK.map((q,i)=>(
                <button key={i} className="q-chip" onClick={()=>sendMessage(q.msg)} disabled={loading}>
                  {q.label}
                </button>
              ))}
            </div>

            {/* input */}
            <div style={{ padding:"8px 12px 13px", borderTop:"1px solid rgba(255,255,255,0.05)", flexShrink:0 }}>
              <div style={{
                display:"flex", alignItems:"center", gap:8,
                background:"rgba(255,255,255,0.04)",
                border:"1px solid rgba(255,255,255,0.08)",
                borderRadius:13, padding:"8px 8px 8px 13px",
              }}>
                <textarea
                  ref={inputRef}
                  className="aria-input"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask anything about Rajan..."
                  rows={1}
                  style={{
                    flex:1, background:"transparent", border:"none",
                    color:"rgba(255,255,255,0.8)", fontSize:13, resize:"none",
                    fontFamily:"'JetBrains Mono',monospace", lineHeight:1.5,
                    maxHeight:72, overflowY:"auto",
                  }}
                />
                <button className="send-btn" onClick={()=>sendMessage()} disabled={!input.trim()||loading}>
                  {loading
                    ? <motion.div animate={{rotate:360}} transition={{duration:0.9,repeat:Infinity,ease:"linear"}} style={{width:14,height:14,border:"2px solid rgba(255,255,255,0.25)",borderTop:"2px solid #fff",borderRadius:"50%"}}/>
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  }
                </button>
              </div>
              <p style={{ textAlign:"center", marginTop:7, fontSize:9, color:"rgba(255,255,255,0.13)", fontFamily:"'JetBrains Mono',monospace" }}>
                ARIA  · Rajan's Portfolio Assistant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioAI;
















