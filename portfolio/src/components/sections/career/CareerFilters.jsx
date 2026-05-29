const filters = ["All", "Internship", "Job", "Training"];

const CareerFilters = ({ active, onChange, counts }) => {
  return (
    <div style={{
      display: "flex", flexWrap: "wrap",
      gap: "10px", justifyContent: "center",
      marginBottom: "40px",
    }}>
      {filters.map((f) => {
        const isActive = active === f;
        const count = f === "All"
          ? counts.total
          : counts[f.toLowerCase()] || 0;

        return (
          <button
            key={f}
            onClick={() => onChange(f)}
            style={{
              padding: "10px 22px",
              borderRadius: "999px",
              border: isActive
                ? "1px solid rgba(6,182,212,0.5)"
                : "1px solid rgba(255,255,255,0.08)",
              background: isActive
                ? "linear-gradient(135deg,rgba(6,182,212,0.2),rgba(59,130,246,0.2))"
                : "rgba(255,255,255,0.04)",
              color: isActive ? "#22d3ee" : "#71717a",
              fontSize: "14px", fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: "8px",
            }}
          >
            {f}
            <span style={{
              background: isActive ? "rgba(6,182,212,0.2)" : "rgba(255,255,255,0.08)",
              borderRadius: "999px", padding: "1px 8px", fontSize: "11px",
            }}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CareerFilters;