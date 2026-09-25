import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { SITE } from "@/config/site";

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { profile } = useProfile();

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
      {
        label: "Open GitHub",
        action: () => window.open(profile?.githubURL || SITE.github, "_blank"),
      },
      {
        label: "Open LinkedIn",
        action: () => window.open(profile?.linkedInURL || SITE.linkedin, "_blank"),
      },
      ...(profile?.resume?.url
        ? [{ label: "Download Resume", action: () => window.open(profile.resume.url, "_blank") }]
        : []),
      { label: `Email ${SITE.email}`, action: () => (window.location.href = `mailto:${SITE.email}`) },
    ];
  }, [navigate, profile]);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

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
    if (!open) setQuery("");
  }, [open]);

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
            placeholder="Jump to a section or link…"
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              color: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
            }}
          />
          <kbd style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 4, padding: "2px 6px" }}>
            Esc
          </kbd>
        </div>
        <div style={{ maxHeight: 320, overflowY: "auto" }}>
          {filtered.length === 0 && (
            <p style={{ padding: 16, color: "rgba(255,255,255,0.4)", fontSize: 13 }}>No matches.</p>
          )}
          {filtered.map((c) => (
            <button
              key={c.label}
              onClick={() => {
                c.action();
                setOpen(false);
              }}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "12px 16px", background: "transparent", border: "none",
                color: "rgba(255,255,255,0.8)", fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13, cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(34,197,94,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;