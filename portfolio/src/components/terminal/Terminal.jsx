import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { TerminalSquare, X } from "lucide-react";

const ASCII_NAME = `
 ____        _             
|  _ \\ __ _ (_) __ _ _ __  
| |_) / _\` || |/ _\` | '_ \\ 
|  _ < (_| || | (_| | | | |
|_| \\_\\__,_|/ |\\__,_|_| |_|
          |__/              
`;

const Terminal = () => {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState([
    { type: "ascii", text: ASCII_NAME },
    { type: "out", text: "Welcome to rajan.dev — type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const print = (text, type = "out") => {
    setLines((prev) => [...prev, { type, text }]);
  };

  const commands = {
    help: () => {
      print(
        [
          "Available commands:",
          "  whoami        - about Rajan",
          "  skills        - list tech skills",
          "  projects      - open projects page",
          "  career        - open career & opportunities",
          "  articles      - open latest articles",
          "  contact       - open contact section",
          "  resume        - open resume link",
          "  github        - open GitHub profile",
          "  clear         - clear the terminal",
          "  exit          - close terminal",
        ].join("\n")
      );
    },
    whoami: () => {
      print(
        "Rajan Kumar Singh — Full Stack MERN Developer, exploring Agentic AI. Building scalable, modern, high-performance web apps."
      );
    },
    skills: () => {
      print("React.js, Node.js, Express.js, MongoDB, TypeScript, Tailwind CSS, REST APIs, OpenAI/Gemini/Claude API integration. Type 'projects' to see them in action.");
    },
    projects: () => {
      print("Opening projects...");
      setOpen(false);
      navigate("/projects");
    },
    career: () => {
      print("Opening career & opportunities...");
      setOpen(false);
      navigate("/career");
    },
    articles: () => {
      print("Opening latest articles...");
      setOpen(false);
      navigate("/articles");
    },
    contact: () => {
      print("Opening contact section...");
      setOpen(false);
      navigate("/contact");
    },
    resume: () => {
      print("Resume link opened in a new tab (if configured).");
      window.open("/resume", "_blank");
    },
    github: () => {
      print("Opening GitHub...");
      window.open("https://github.com/", "_blank");
    },
    clear: () => {
      setLines([]);
    },
    exit: () => {
      setOpen(false);
    },
  };

  const runCommand = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    print(`rajan@portfolio ~ % ${raw}`, "cmd");
    if (commands[cmd]) {
      commands[cmd]();
    } else {
      print(`command not found: ${cmd} — type 'help' for a list of commands`, "err");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      runCommand(input);
      setHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open terminal"
        style={{
          position: "fixed",
          bottom: 96,
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
        <TerminalSquare color="#4ade80" size={22} />
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
              background: "rgba(0,0,0,0.6)",
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
                maxWidth: 720,
                height: "70vh",
                maxHeight: 560,
                background: "#0a0a0a",
                border: "1px solid #22c55e33",
                borderRadius: 10,
                display: "flex",
                flexDirection: "column",
                fontFamily: "monospace",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              }}
            >
              {/* Title bar */}
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
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
                  <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }} />
                  <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#27c93f", display: "inline-block" }} />
                </div>
                <span style={{ color: "#888", fontSize: 12 }}>rajan@portfolio: ~</span>
                <X
                  size={16}
                  color="#888"
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpen(false)}
                />
              </div>

              {/* Output */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "14px 16px",
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "#d1fae5",
                }}
                onClick={() => inputRef.current?.focus()}
              >
                {lines.map((line, i) => (
                  <pre
                    key={i}
                    style={{
                      whiteSpace: "pre-wrap",
                      margin: 0,
                      marginBottom: 4,
                      color:
                        line.type === "cmd" ? "#4ade80" : line.type === "err" ? "#f87171" : line.type === "ascii" ? "#22c55e" : "#d1fae5",
                      fontFamily: "monospace",
                    }}
                  >
                    {line.text}
                  </pre>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input line */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 16px",
                  borderTop: "1px solid #22c55e22",
                  gap: 8,
                }}
              >
                <span style={{ color: "#4ade80", fontSize: 13 }}>rajan@portfolio ~ %</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#fff",
                    fontFamily: "monospace",
                    fontSize: 13,
                  }}
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Terminal;