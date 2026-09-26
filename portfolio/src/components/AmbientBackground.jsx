import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Section id → ambient tint. Ye ids Home.jsx me LazySection wrappers pe already set hain.
const STORY_STOPS = [
  { id: "timeline", color: "#0a1420" },
  { id: "about", color: "#0a1c14" },
  { id: "skills", color: "#0a1a1c" },
  { id: "projects", color: "#10131c" },
  { id: "career", color: "#0a1420" },
  { id: "contact", color: "#0a1c14" },
];

const AmbientBackground = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    const triggers = STORY_STOPS.map(({ id, color }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () =>
          gsap.to(glowRef.current, { "--tint": color, duration: 0.8, ease: "power2.out" }),
        onEnterBack: () =>
          gsap.to(glowRef.current, { "--tint": color, duration: 0.8, ease: "power2.out" }),
      });
    }).filter(Boolean);

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        "--tint": "#05070a",
        background: "radial-gradient(ellipse 80% 50% at 50% 0%, var(--tint) 0%, #05070a 70%)",
      }}
    />
  );
};

export default AmbientBackground;