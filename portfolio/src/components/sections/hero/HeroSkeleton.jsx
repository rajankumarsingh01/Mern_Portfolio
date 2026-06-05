// HeroSkeleton.jsx — Enhanced Version
// Portfolio theme: Dark (#0a0f0d) + Green (#00ff88)

const HeroSkeleton = () => {
  return (
    <div className="w-full relative overflow-hidden">

      {/* Scan line effect — green ray sweeping down */}
      <div className="absolute left-0 right-0 h-10 pointer-events-none z-10 animate-scan-line"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(0,255,136,0.05) 50%, transparent 100%)"
        }}
      />

      {/* Availability badge */}
      <div className="flex items-center gap-2 mb-4 animate-fade-in-up">
        <span
          className="h-2 w-2 rounded-full bg-green-400 flex-shrink-0"
          style={{ animation: "pulse-dot 1.8s infinite ease-in-out" }}
        />
        <div className="h-5 w-36 rounded-full skeleton-shimmer" />
      </div>

      {/* Name — large heading */}
      <div className="mb-3 animate-fade-in-up animation-delay-75">
        <div className="h-9 w-11/12 rounded-xl skeleton-shimmer mb-2" />
      </div>

      {/* Typewriter line */}
      <div className="mb-6 animate-fade-in-up animation-delay-150">
        <div className="h-6 w-3/5 rounded-lg skeleton-shimmer" />
      </div>

      {/* Social icons — circles */}
      <div className="flex gap-2 mb-6 animate-fade-in-up animation-delay-200">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-10 w-10 rounded-full skeleton-shimmer-green flex-shrink-0"
            style={{ animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </div>

      {/* Buttons row */}
      <div className="flex gap-3 mb-8 flex-wrap animate-fade-in-up animation-delay-300">
        <div className="h-10 w-28 rounded-full skeleton-outline" />
        <div className="h-10 w-28 rounded-full skeleton-outline" />
        <div className="h-10 w-24 rounded-full skeleton-filled" />
      </div>

      {/* Bio text lines */}
      <div className="space-y-2 animate-fade-in-up animation-delay-400">
        <div className="h-3.5 w-full rounded skeleton-shimmer" />
        <div className="h-3.5 w-11/12 rounded skeleton-shimmer" style={{ animationDelay: "0.1s" }} />
        <div className="h-3.5 w-3/4 rounded skeleton-shimmer" style={{ animationDelay: "0.2s" }} />
      </div>

      {/* Divider with green gradient */}
      <hr className="my-8 md:my-10 border-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.2), transparent)" }}
      />

      {/* Loading hint text */}
      <p className="text-center font-mono animate-fade-in-up"
        style={{ fontSize: "10px", color: "rgba(0,255,136,0.3)", letterSpacing: "0.08em" }}>
        connecting to server
        <span style={{ animation: "blink 1.2s infinite" }}>...</span>
      </p>
    </div>
  );
};

export default HeroSkeleton;