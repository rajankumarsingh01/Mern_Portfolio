import React, { Suspense, useEffect, useRef, useState } from "react";

// Section tabhi load + mount hota hai jab user uske paas scroll kare.
// Isse first load me JS aur API calls kam hoti hain.
// `id` wrapper pe lagta hai, isliye #contact jaise anchor links pehle se kaam karte hain.
const LazySection = ({ id, children, minHeight = 320, rootMargin = "600px" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div id={id} ref={ref} style={visible ? undefined : { minHeight }}>
      {visible && (
        <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense>
      )}
    </div>
  );
};

export default LazySection;