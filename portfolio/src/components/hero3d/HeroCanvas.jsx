import { Suspense, lazy, useEffect, useState } from "react";

// 3D scene tabhi bundle me load hoti hai jab actually render karni ho
const LaptopScene = lazy(() => import("./LaptopScene"));

// WebGL support + prefers-reduced-motion check — dono me se ek fail ho to 3D skip
const useCanRender3D = () => {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    let hasWebGL = false;
    try {
      const canvas = document.createElement("canvas");
      hasWebGL = !!(
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      );
    } catch {
      hasWebGL = false;
    }

    setCanRender(hasWebGL && !prefersReduced);
  }, []);

  return canRender;
};

// Browser idle hone ka wait — first paint kabhi 3D ke wajah se block nahi hoga
const useIdle = (timeout = 1500) => {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    const run = () => setIdle(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(run, { timeout });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(run, 800);
    return () => clearTimeout(id);
  }, [timeout]);

  return idle;
};

/**
 * fallback: instant-paint JSX (photo/poster) — jab tak 3D ready nahi,
 * ya WebGL/reduced-motion support nahi hai, yahi dikhega.
 */
const HeroCanvas = ({ fallback }) => {
  const canRender3D = useCanRender3D();
  const idle = useIdle();

  if (!canRender3D || !idle) return fallback;

  return <Suspense fallback={fallback}><LaptopScene /></Suspense>;
};

export default HeroCanvas;