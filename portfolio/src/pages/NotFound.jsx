import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const glitchFrames = [
  "⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏",
  "▓▒░▒▓",
  "◤◥◢◣",
];

const randomChar = () => {
  const chars = "!@#$%^&*<>/\\|[]{}0123456789ABCDEF";
  return chars[Math.floor(Math.random() * chars.length)];
};

const GlitchText = ({ text, className = "" }) => {
  const [display, setDisplay] = useState(text);
  const [glitching, setGlitching] = useState(false);
  const intervalRef = useRef(null);

  const triggerGlitch = () => {
    if (glitching) return;
    setGlitching(true);
    let count = 0;
    intervalRef.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((c, i) =>
            Math.random() > 0.6 ? randomChar() : c
          )
          .join("")
      );
      count++;
      if (count > 12) {
        clearInterval(intervalRef.current);
        setDisplay(text);
        setGlitching(false);
      }
    }, 40);
  };

  useEffect(() => {
    const t = setTimeout(triggerGlitch, Math.random() * 2000 + 500);
    const loop = setInterval(triggerGlitch, 4000 + Math.random() * 2000);
    return () => {
      clearTimeout(t);
      clearInterval(loop);
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span className={className} onMouseEnter={triggerGlitch}>
      {display}
    </span>
  );
};

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.floor(canvas.width / 20);
    const drops = Array(cols).fill(1);
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff9d22";
      ctx.font = "14px monospace";

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = `rgba(0,255,157,${Math.random() * 0.15 + 0.02})`;
        ctx.fillText(char, i * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const id = setInterval(draw, 50);
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => {
      clearInterval(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        opacity: 0.6,
        pointerEvents: "none",
      }}
    />
  );
};

const ScanLine = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,157,0.015) 2px, rgba(0,255,157,0.015) 4px)",
      pointerEvents: "none",
      zIndex: 1,
    }}
  />
);

const FloatingParticle = ({ style }) => (
  <div
    style={{
      position: "absolute",
      width: 2,
      height: 2,
      borderRadius: "50%",
      background: "#00ff9d",
      boxShadow: "0 0 6px #00ff9d",
      animation: `floatUp ${3 + Math.random() * 4}s ease-in infinite`,
      ...style,
    }}
  />
);

export default function NotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      bottom: `${Math.random() * 20}%`,
      animationDelay: `${Math.random() * 4}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
    }))
  );
  const [terminalLines, setTerminalLines] = useState([]);
  const [typed, setTyped] = useState("");

  const lines = [
    "> SYSTEM BREACH DETECTED...",
    "> Tracing route to /???",
    "> ERROR: Destination node unreachable",
    "> Packet loss: 100%",
    "> HTTP STATUS: 404 — PAGE_NOT_FOUND",
    "> Initiating recovery protocol...",
  ];

  useEffect(() => {
    let i = 0;
    const typeNext = () => {
      if (i < lines.length) {
        const lineIndex = i;
        i++;
        setTimeout(() => {
          setTerminalLines((prev) => [...prev, lines[lineIndex]]);
          typeNext();
        }, 600);
      }
    };
    typeNext();
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(t);
          navigate("/");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body { background: #000; }

    @keyframes floatUp {
      0% { transform: translateY(0) scale(1); opacity: 1; }
      100% { transform: translateY(-100vh) scale(0); opacity: 0; }
    }

    @keyframes flicker {
      0%, 100% { opacity: 1; }
      92% { opacity: 1; }
      93% { opacity: 0.3; }
      94% { opacity: 1; }
      96% { opacity: 0.5; }
      97% { opacity: 1; }
    }

    @keyframes glowPulse {
      0%, 100% { text-shadow: 0 0 20px #00ff9d, 0 0 60px #00ff9d44; }
      50% { text-shadow: 0 0 40px #00ff9d, 0 0 100px #00ff9d66, 0 0 200px #00ff9d22; }
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes zoomBreathe {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.04); }
    }

    @keyframes borderRun {
      0% { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }

    @keyframes countdownShrink {
      from { stroke-dashoffset: 0; }
      to { stroke-dashoffset: 283; }
    }

    .page-404 {
      min-height: 100vh;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Share Tech Mono', monospace;
      color: #00ff9d;
      position: relative;
      overflow: hidden;
      animation: flicker 8s ease-in-out infinite;
    }

    .big-404 {
      font-family: 'Orbitron', sans-serif;
      font-size: clamp(120px, 22vw, 240px);
      font-weight: 900;
      line-height: 0.85;
      color: transparent;
      -webkit-text-stroke: 2px #00ff9d;
      letter-spacing: -0.02em;
      position: relative;
      animation: glowPulse 3s ease-in-out infinite, zoomBreathe 6s ease-in-out infinite;
      filter: drop-shadow(0 0 30px #00ff9d66);
      user-select: none;
    }

    .big-404::before {
      content: '404';
      position: absolute;
      inset: 0;
      color: transparent;
      -webkit-text-stroke: 2px #ff003c;
      transform: translate(3px, -3px);
      opacity: 0.5;
      animation: glowPulse 3s ease-in-out infinite reverse;
    }

    .big-404::after {
      content: '404';
      position: absolute;
      inset: 0;
      color: transparent;
      -webkit-text-stroke: 2px #0066ff;
      transform: translate(-3px, 3px);
      opacity: 0.4;
    }

    .terminal-box {
      background: rgba(0, 255, 157, 0.03);
      border: 1px solid rgba(0, 255, 157, 0.2);
      border-radius: 4px;
      padding: 16px 20px;
      font-size: 12px;
      max-width: 460px;
      width: 100%;
      min-height: 160px;
      position: relative;
    }

    .terminal-box::before {
      content: '● ● ●';
      position: absolute;
      top: 8px;
      left: 12px;
      font-size: 10px;
      color: rgba(0, 255, 157, 0.4);
      letter-spacing: 4px;
    }

    .terminal-box::after {
      content: 'SYSTEM LOG — ERR/404';
      position: absolute;
      top: 7px;
      right: 12px;
      font-size: 9px;
      color: rgba(0, 255, 157, 0.3);
      letter-spacing: 2px;
    }

    .terminal-content {
      margin-top: 22px;
    }

    .terminal-line {
      animation: slideIn 0.3s ease forwards;
      margin: 4px 0;
      opacity: 0.85;
      font-size: 11px;
      line-height: 1.6;
    }

    .terminal-line.error {
      color: #ff4466;
    }

    .terminal-line.warning {
      color: #ffaa00;
    }

    .cursor {
      display: inline-block;
      width: 8px;
      height: 14px;
      background: #00ff9d;
      margin-left: 2px;
      animation: flicker 1s ease-in-out infinite;
      vertical-align: middle;
    }

    .btn-home {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 28px;
      background: transparent;
      border: 1px solid #00ff9d;
      color: #00ff9d;
      font-family: 'Orbitron', sans-serif;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: all 0.3s;
      text-decoration: none;
    }

    .btn-home::before {
      content: '';
      position: absolute;
      inset: 0;
      background: #00ff9d;
      transform: translateX(-101%);
      transition: transform 0.3s ease;
      z-index: -1;
    }

    .btn-home:hover {
      color: #000;
      box-shadow: 0 0 30px #00ff9d55;
    }

    .btn-home:hover::before {
      transform: translateX(0);
    }

    .countdown-ring {
      position: relative;
      width: 60px;
      height: 60px;
      flex-shrink: 0;
    }

    .countdown-ring svg {
      transform: rotate(-90deg);
    }

    .countdown-ring .ring-bg {
      fill: none;
      stroke: rgba(0, 255, 157, 0.1);
      stroke-width: 3;
    }

    .countdown-ring .ring-progress {
      fill: none;
      stroke: #00ff9d;
      stroke-width: 3;
      stroke-dasharray: 283;
      stroke-dashoffset: 0;
      stroke-linecap: round;
      animation: countdownShrink 10s linear forwards;
      filter: drop-shadow(0 0 4px #00ff9d);
    }

    .countdown-number {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Orbitron', sans-serif;
      font-size: 18px;
      font-weight: 900;
      color: #00ff9d;
    }

    .status-bar {
      display: flex;
      gap: 20px;
      font-size: 10px;
      color: rgba(0, 255, 157, 0.5);
      letter-spacing: 2px;
    }

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #ff003c;
      display: inline-block;
      margin-right: 6px;
      box-shadow: 0 0 8px #ff003c;
      animation: flicker 2s ease-in-out infinite;
    }

    .hex-grid {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background-image:
        radial-gradient(circle at 20% 30%, rgba(0,255,157,0.04) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(0,102,255,0.04) 0%, transparent 50%);
      pointer-events: none;
      z-index: 0;
    }

    .corner-decoration {
      position: absolute;
      width: 40px;
      height: 40px;
      border-color: rgba(0, 255, 157, 0.4);
      border-style: solid;
    }
    .corner-tl { top: 20px; left: 20px; border-width: 2px 0 0 2px; }
    .corner-tr { top: 20px; right: 20px; border-width: 2px 2px 0 0; }
    .corner-bl { bottom: 20px; left: 20px; border-width: 0 0 2px 2px; }
    .corner-br { bottom: 20px; right: 20px; border-width: 0 2px 2px 0; }

    .error-code {
      font-size: 10px;
      color: rgba(0, 255, 157, 0.35);
      letter-spacing: 4px;
      text-transform: uppercase;
    }

    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(0,255,157,0.3), transparent);
      margin: 12px 0;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="page-404">
        <MatrixRain />
        <ScanLine />
        <div className="hex-grid" />

        {/* Corner decorations */}
        <div className="corner-decoration corner-tl" />
        <div className="corner-decoration corner-tr" />
        <div className="corner-decoration corner-bl" />
        <div className="corner-decoration corner-br" />

        {/* Floating particles */}
        {particles.map((p, i) => (
          <FloatingParticle key={i} style={p} />
        ))}

        {/* Main content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
            padding: "24px",
            maxWidth: "600px",
            width: "100%",
          }}
        >
          {/* Status bar */}
          <div className="status-bar">
            <span><span className="status-dot" />SYSTEM ERROR</span>
            <span>PROTOCOL: HTTP</span>
            <span>CODE: 0x194</span>
          </div>

          {/* Big 404 */}
          <div style={{ textAlign: "center" }}>
            <div className="big-404">
              <GlitchText text="404" />
            </div>
          </div>

          {/* Error title */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "clamp(14px, 3vw, 20px)",
                fontWeight: 700,
                letterSpacing: "6px",
                textTransform: "uppercase",
                color: "#00ff9d",
                textShadow: "0 0 20px #00ff9d55",
              }}
            >
              <GlitchText text="PAGE_NOT_FOUND" />
            </div>
            <div className="error-code" style={{ marginTop: 8 }}>
              REQUESTED RESOURCE DOES NOT EXIST IN THIS DIMENSION
            </div>
          </div>

          <div className="divider" style={{ width: "100%" }} />

          {/* Terminal */}
          <div className="terminal-box">
            <div className="terminal-content">
              {terminalLines.map((line, i) => (
                <div
                  key={i}
                  className={`terminal-line ${
                    line.includes("ERROR") ? "error" : line.includes("loss") ? "warning" : ""
                  }`}
                >
                  {line}
                </div>
              ))}
              {terminalLines.length < lines.length && (
                <div className="terminal-line">
                  <span className="cursor" />
                </div>
              )}
            </div>
          </div>

          {/* Action row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button className="btn-home" onClick={() => navigate("/")}>
              <span>↩</span>
              <span>RETURN HOME</span>
            </button>

            {/* Countdown ring */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="countdown-ring">
                <svg viewBox="0 0 100 100" width="60" height="60">
                  <circle className="ring-bg" cx="50" cy="50" r="45" />
                  <circle className="ring-progress" cx="50" cy="50" r="45" />
                </svg>
                <div className="countdown-number">{countdown}</div>
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(0,255,157,0.5)",
                  letterSpacing: 2,
                  lineHeight: 1.6,
                }}
              >
                AUTO REDIRECT
                <br />
                IN {countdown}s
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              fontSize: 9,
              color: "rgba(0,255,157,0.25)",
              letterSpacing: 3,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()} — PORTFOLIO SYSTEM v2.0 — ALL NODES MONITORED
          </div>
        </div>
      </div>
    </>
  );
}