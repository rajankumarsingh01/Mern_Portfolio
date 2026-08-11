import React, { useRef, useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gamepad2, X, RotateCcw } from "lucide-react";

const HIGH_SCORE_KEY = "rajan_dev_runner_highscore";

const OBSTACLE_LABELS = ["Bug", "404", "Merge Conflict", "Deadline", "NaN"];

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
  const [gameOver, setGameOver] = useState(false);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setHighScore(getHighScore());
  }, []);

  const resetGame = useCallback(() => {
    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;
    const groundY = height - 40;

    stateRef.current = {
      width,
      height,
      groundY,
      player: { x: 60, y: groundY - 30, w: 24, h: 30, vy: 0, jumping: false },
      gravity: 0.9,
      jumpForce: -14,
      speed: 5,
      obstacles: [],
      spawnTimer: 0,
      spawnInterval: 90,
      frame: 0,
      score: 0,
      alive: true,
    };
    setScore(0);
    setGameOver(false);
  }, []);

  const jump = useCallback(() => {
    const s = stateRef.current;
    if (!s || !s.alive) return;
    if (!s.player.jumping) {
      s.player.vy = s.jumpForce;
      s.player.jumping = true;
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    resetGame();
    setRunning(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const loop = () => {
      const s = stateRef.current;
      if (!s) return;

      if (s.alive) {
        s.frame++;

        // physics
        s.player.vy += s.gravity;
        s.player.y += s.player.vy;
        if (s.player.y >= s.groundY - s.player.h) {
          s.player.y = s.groundY - s.player.h;
          s.player.vy = 0;
          s.player.jumping = false;
        }

        // difficulty ramp
        s.speed = 5 + Math.min(6, s.frame / 300);

        // spawn obstacles
        s.spawnTimer++;
        const interval = Math.max(45, s.spawnInterval - s.frame / 20);
        if (s.spawnTimer > interval) {
          s.spawnTimer = 0;
          const label = OBSTACLE_LABELS[Math.floor(Math.random() * OBSTACLE_LABELS.length)];
          s.obstacles.push({
            x: s.width + 10,
            y: s.groundY - 26,
            w: 18 + label.length * 6,
            h: 26,
            label,
          });
        }

        // move obstacles + collision
        s.obstacles.forEach((o) => (o.x -= s.speed));
        s.obstacles = s.obstacles.filter((o) => o.x + o.w > 0);

        const p = s.player;
        for (const o of s.obstacles) {
          if (
            p.x < o.x + o.w &&
            p.x + p.w > o.x &&
            p.y < o.y + o.h &&
            p.y + p.h > o.y
          ) {
            s.alive = false;
            setGameOver(true);
            setRunning(false);
            const finalScore = Math.floor(s.score);
            const hs = getHighScore();
            if (finalScore > hs) {
              saveHighScore(finalScore);
              setHighScore(finalScore);
            }
          }
        }

        s.score += 0.12;
        setScore(Math.floor(s.score));
      }

      // ---- draw ----
      ctx.clearRect(0, 0, s.width, s.height);

      // background
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, s.width, s.height);

      // ground line
      ctx.strokeStyle = "#22c55e55";
      ctx.beginPath();
      ctx.moveTo(0, s.groundY);
      ctx.lineTo(s.width, s.groundY);
      ctx.stroke();

      // player
      ctx.fillStyle = "#4ade80";
      ctx.fillRect(s.player.x, s.player.y, s.player.w, s.player.h);

      // obstacles
      ctx.font = "11px monospace";
      s.obstacles.forEach((o) => {
        ctx.fillStyle = "#f87171";
        ctx.fillRect(o.x, o.y, o.w, o.h);
        ctx.fillStyle = "#0a0a0a";
        ctx.fillText(o.label, o.x + 4, o.y + o.h / 2 + 4);
      });

      // score
      ctx.fillStyle = "#d1fae5";
      ctx.font = "14px monospace";
      ctx.fillText(`Score: ${Math.floor(s.score)}`, 12, 20);

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
        jump();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, jump]);

  const handleTap = () => {
    if (gameOver) {
      resetGame();
      setRunning(true);
    } else {
      jump();
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Play game"
        style={{
          position: "fixed",
          bottom: 156,
          right: 24,
          zIndex: 9998,
          width: 52,
          height: 52,
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
                  height={260}
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
                    <span style={{ color: "#d1fae5", fontSize: 13 }}>Score: {score}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        resetGame();
                        setRunning(true);
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
                Tap / Click / Space or ↑ to jump — dodge the bugs
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EndlessRunner;