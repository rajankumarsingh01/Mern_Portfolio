import React, { useRef, useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gamepad2, X, RotateCcw } from "lucide-react";

const HIGH_SCORE_KEY = "rajan_dev_flappy_highscore";

const getHighScore = () => {
  try {
    const v = localStorage.getItem(HIGH_SCORE_KEY);
    return v ? parseInt(v, 10) : 0;
  } catch {
    return 0;
  }
};

const saveHighScore = (score) => {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, String(score));
  } catch {
    // localStorage unavailable — ignore silently
  }
};

const EndlessRunner = () => {
  const [open, setOpen] = useState(false);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setHighScore(getHighScore());
  }, []);

  const resetGame = useCallback(() => {
    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;

    stateRef.current = {
      width,
      height,
      bird: { x: 70, y: height / 2, w: 22, h: 22, vy: 0 },
      gravity: 0.45,
      flapForce: -7.2,
      speed: 2.6,
      pipes: [],
      pipeGap: 130,
      spawnTimer: 0,
      spawnInterval: 100,
      frame: 0,
      score: 0,
      level: 1,
      levelFlashTimer: 0,
      alive: true,
      started: false,
      bgOffset: 0,
    };
    setScore(0);
    setLevel(1);
    setGameOver(false);
  }, []);

  const flap = useCallback(() => {
    const s = stateRef.current;
    if (!s || !s.alive) return;
    s.started = true;
    s.bird.vy = s.flapForce;
  }, []);

  useEffect(() => {
    if (!open) return;
    resetGame();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const loop = () => {
      const s = stateRef.current;
      if (!s) return;

      if (s.alive && s.started) {
        s.frame++;
        s.bgOffset = (s.bgOffset + s.speed * 0.4) % 40;

        s.bird.vy += s.gravity;
        s.bird.y += s.bird.vy;

        s.speed = 2.6 + Math.min(2.4, s.frame / 900) + s.level * 0.12;

        s.spawnTimer++;
        const interval = Math.max(62, s.spawnInterval - s.level * 3);
        if (s.spawnTimer > interval) {
          s.spawnTimer = 0;
          const gap = Math.max(96, s.pipeGap - s.level * 2);
          const margin = 30;
          const gapY = margin + Math.random() * (s.height - gap - margin * 2);
          s.pipes.push({ x: s.width + 20, gapY, gap, w: 34, passed: false });
        }

        const b = s.bird;
        s.pipes.forEach((p) => (p.x -= s.speed));
        s.pipes = s.pipes.filter((p) => p.x + p.w > -5);

        for (const p of s.pipes) {
          if (!p.passed && p.x + p.w < b.x) {
            p.passed = true;
            s.score += 1;
            setScore(s.score);

            const newLevel = Math.floor(s.score / 6) + 1;
            if (newLevel > s.level) {
              s.level = newLevel;
              s.levelFlashTimer = 40;
              setLevel(newLevel);
            }
          }

          const hitX = b.x + b.w > p.x && b.x < p.x + p.w;
          const hitY = b.y < p.gapY || b.y + b.h > p.gapY + p.gap;
          if (hitX && hitY) {
            s.alive = false;
          }
        }

        if (b.y < 0 || b.y + b.h > s.height) {
          s.alive = false;
        }

        if (s.levelFlashTimer > 0) s.levelFlashTimer--;

        if (!s.alive) {
          setGameOver(true);
          const finalScore = s.score;
          const hs = getHighScore();
          if (finalScore > hs) {
            saveHighScore(finalScore);
            setHighScore(finalScore);
          }
        }
      }

      ctx.clearRect(0, 0, s.width, s.height);

      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, s.width, s.height);

      ctx.strokeStyle = "rgba(34,197,94,0.06)";
      ctx.lineWidth = 1;
      for (let x = -40 + (s.bgOffset || 0); x < s.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, s.height);
        ctx.stroke();
      }

      s.pipes.forEach((p) => {
        ctx.fillStyle = "#0f2a1a";
        ctx.strokeStyle = "#22c55e88";
        ctx.lineWidth = 2;
        ctx.fillRect(p.x, 0, p.w, p.gapY);
        ctx.strokeRect(p.x, 0, p.w, p.gapY);
        const bottomY = p.gapY + p.gap;
        ctx.fillRect(p.x, bottomY, p.w, s.height - bottomY);
        ctx.strokeRect(p.x, bottomY, p.w, s.height - bottomY);
        ctx.fillStyle = "#16341f";
        ctx.fillRect(p.x - 3, p.gapY - 10, p.w + 6, 10);
        ctx.fillRect(p.x - 3, bottomY, p.w + 6, 10);
      });

      const b = s.bird;
      ctx.save();
      ctx.translate(b.x + b.w / 2, b.y + b.h / 2);
      const angle = Math.max(-0.5, Math.min(0.9, b.vy / 12));
      ctx.rotate(angle);
      ctx.fillStyle = "#4ade80";
      ctx.beginPath();
      ctx.roundRect(-b.w / 2, -b.h / 2, b.w, b.h, 6);
      ctx.fill();
      ctx.fillStyle = "#0a0a0a";
      ctx.font = "bold 10px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("<>", 0, 1);
      ctx.restore();
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";

      ctx.fillStyle = "#d1fae5";
      ctx.font = "14px monospace";
      ctx.fillText(`Score: ${s.score}`, 12, 22);
      ctx.fillStyle = "#4ade80";
      ctx.fillText(`Level ${s.level}`, s.width - 82, 22);

      if (!s.started) {
        ctx.fillStyle = "rgba(0,0,0,0.35)";
        ctx.fillRect(0, 0, s.width, s.height);
        ctx.fillStyle = "#d1fae5";
        ctx.font = "13px monospace";
        ctx.textAlign = "center";
        ctx.fillText("Tap / Space to start", s.width / 2, s.height / 2);
        ctx.textAlign = "left";
      }

      if (s.levelFlashTimer > 0) {
        ctx.fillStyle = `rgba(74,222,128,${s.levelFlashTimer / 200})`;
        ctx.fillRect(0, 0, s.width, s.height);
        ctx.fillStyle = "#0a0a0a";
        ctx.font = "bold 20px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`LEVEL ${s.level}!`, s.width / 2, s.height / 2);
        ctx.textAlign = "left";
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [open, resetGame]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        flap();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, flap]);

  const handleTap = () => {
    if (gameOver) {
      resetGame();
    } else {
      flap();
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Play game"
        style={{
          position: "fixed",
          bottom: "calc(clamp(16px, 5vw, 28px) + 132px)",
          right: "clamp(14px, 4vw, 28px)",
          zIndex: 9998,
          width: "clamp(44px, 12vw, 52px)",
          height: "clamp(44px, 12vw, 52px)",
          borderRadius: "50%",
          background: "#0f0f0f",
          border: "1px solid #22c55e55",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
          cursor: "pointer",
        }}
      >
        <Gamepad2 color="#4ade80" size={22} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
            }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 620,
                background: "#0a0a0a",
                border: "1px solid #22c55e33",
                borderRadius: 10,
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                fontFamily: "monospace",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderBottom: "1px solid #22c55e22",
                  background: "#111",
                }}
              >
                <span style={{ color: "#4ade80", fontSize: 13 }}>
                  High Score: {highScore}
                </span>
                <X
                  size={16}
                  color="#888"
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpen(false)}
                />
              </div>

              <div style={{ position: "relative" }} onClick={handleTap}>
                <canvas
                  ref={canvasRef}
                  width={580}
                  height={320}
                  style={{ width: "100%", height: "auto", display: "block", cursor: "pointer" }}
                />

                {gameOver && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0,0,0,0.55)",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: "#f87171", fontSize: 18, fontWeight: "bold" }}>
                      Game Over
                    </span>
                    <span style={{ color: "#d1fae5", fontSize: 13 }}>
                      Score: {score} · Level: {level}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        resetGame();
                      }}
                      style={{
                        marginTop: 6,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        background: "#22c55e",
                        color: "#0a0a0a",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: 6,
                        fontFamily: "monospace",
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      <RotateCcw size={14} /> Retry
                    </button>
                  </div>
                )}
              </div>

              <div
                style={{
                  padding: "8px 14px",
                  color: "#888",
                  fontSize: 11,
                  textAlign: "center",
                  borderTop: "1px solid #22c55e22",
                }}
              >
                Tap / Click / Space to flap — dodge the pipes
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EndlessRunner;