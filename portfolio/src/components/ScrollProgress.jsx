import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 200,
        background: "rgba(255,255,255,0.05)",
      }}
    >
      <div
        ref={barRef}
        style={{
          height: "100%",
          width: "100%",
          background: "linear-gradient(90deg, #22c55e, #38bdf8)",
          transformOrigin: "left center",
          transform: "scaleX(0)",
        }}
      />
    </div>
  );
};

export default ScrollProgress;