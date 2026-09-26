import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sun, Moon, Monitor, TerminalSquare, Sparkles } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useTheme } from "@/components/theme-provider";
import { SITE } from "@/config/site";

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { setTheme } = useTheme();
  const listRef = useRef(null);

  const commands = useMemo(() => {
    const goHome = (id) => () => {
      navigate("/");
      setTimeout(() => scrollToId(id), 60);
    };
    return [
      { label: "Go to Projects", action: goHome("projects") },
      { label: "Go to Skills", action: goHome("skills") },
      { label: "Go to About", action: goHome("about") },
      { label: "Go to Career", action: goHome("career") },
      { label: "Go to Contact", action: goHome("contact") },
      { label: "Open Terminal", icon: TerminalSquare, action: () => window.dispatchEvent(new CustomEvent("open-terminal")) },
      { label: "Ask ARIA (AI Assistant)", icon: Sparkles, action: () => window.dispatchEvent(new CustomEvent("open-aria")) },
      { label: "Theme: Dark", icon: Moon, action: () => setTheme("dark") },
      { label: "Theme: Light", icon: Sun, action: () => setTheme("light") },
      { label: "Theme: System", icon: Monitor, action: () => setTheme("system") },
      { label: "Open GitHub", action: () => window.open(profile?.githubURL || SITE.github, "_blank") },
      { label: "Open LinkedIn", action: () => window.open(profile?.linkedInURL || SITE.linkedin, "_blank") },
      ...(profile?.resume?.url
        ? [{ label: "Download Resume", action: () => window.open(profile.resume.url, "_blank") }]
        : []),
      { label: `Email ${SITE.email}`, action: () => (window.location.href = `mailto:${SITE.email}`) },
    ];
  }, [navigate, profile, setTheme]);

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[activeIndex];
      if (cmd) {
        cmd.action();
        setOpen(false);
      }
    }
  };

  useEffect(() => {
    const el = listRef.current?.children[activeIndex];
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        paddingTop: "12vh",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(520px, 92vw)", background: "#0a0f0d",
          border: "1px solid rgba(34,197,94,0.25)", borderRadius: 16,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)", overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <Search size={16} color="#4ade80" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Jump to a section, toggle theme, open Terminal…"
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              color: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
            }}
          />
          <kbd style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 4, padding: "2px 6px" }}>
            Esc
          </kbd>
        </div>
        <div ref={listRef} style={{ maxHeight: 340, overflowY: "auto" }}>
          {filtered.length === 0 && (
            <p style={{ padding: 16, color: "rgba(255,255,255,0.4)", fontSize: 13 }}>No matches.</p>
          )}
          {filtered.map((c, i) => {
            const Icon = c.icon;
            return (
              <button
                key={c.label}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => {
                  c.action();
                  setOpen(false);
                }}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  width: "100%", textAlign: "left",
                  padding: "12px 16px", border: "none", cursor: "pointer",
                  background: i === activeIndex ? "rgba(34,197,94,0.12)" : "transparent",
                  color: i === activeIndex ? "#86efac" : "rgba(255,255,255,0.8)",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
                }}
              >
                {Icon && <Icon size={14} />}
                {c.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;