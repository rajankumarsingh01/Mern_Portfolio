import { MapPin, Clock, Briefcase, ExternalLink, Calendar, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const categoryConfig = {
  internship: {
    label: "Internship",
    color: "#4ade80",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.2)",
  },
  job: {
    label: "Job",
    color: "#60a5fa",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.2)",
  },
  training: {
    label: "Training",
    color: "#c084fc",
    bg: "rgba(168,85,247,0.1)",
    border: "rgba(168,85,247,0.2)",
  },
};

const CareerCard = ({ item }) => {
  const config = categoryConfig[item.category] || categoryConfig.internship;

  const isDeadlineSoon = item.deadline
    ? (new Date(item.deadline) - new Date()) / (1000 * 60 * 60 * 24) <= 7
    : false;

  const isExpired = item.deadline
    ? new Date(item.deadline) < new Date()
    : false;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "24px",
        overflow: "hidden",
        transition: "transform 0.3s, box-shadow 0.3s",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* IMAGE */}
      <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
        <img
          src={item.careerImg?.url || "https://placehold.co/600x200/111/333?text=Career"}
          alt={item.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* FEATURED */}
        {item.featured && (
          <div
            style={{
              position: "absolute",
              top: "14px",
              left: "14px",
              background: "linear-gradient(135deg,#f59e0b,#ef4444)",
              borderRadius: "999px",
              padding: "5px 12px",
              fontSize: "11px",
              fontWeight: "800",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Zap size={11} /> FEATURED
          </div>
        )}

        {/* EXPIRED */}
        {isExpired && (
          <div
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              background: "rgba(239,68,68,0.9)",
              borderRadius: "999px",
              padding: "5px 12px",
              fontSize: "11px",
              fontWeight: "700",
              color: "#fff",
            }}
          >
            Expired
          </div>
        )}

        {!isExpired && isDeadlineSoon && (
          <div
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              background: "rgba(245,158,11,0.9)",
              borderRadius: "999px",
              padding: "5px 12px",
              fontSize: "11px",
              fontWeight: "700",
              color: "#fff",
            }}
          >
            Closing Soon
          </div>
        )}
      </div>

      {/* BODY */}
      <div
        style={{
          padding: "24px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* CATEGORY */}
        <span
          style={{
            display: "inline-block",
            padding: "5px 14px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: "700",
            marginBottom: "14px",
            background: config.bg,
            border: `1px solid ${config.border}`,
            color: config.color,
          }}
        >
          {config.label}
        </span>

        {/* TITLE */}
        <h3
          style={{
            fontSize: "20px",
            fontWeight: "800",
            color: "#fff",
            marginBottom: "8px",
            lineHeight: "1.3",
          }}
        >
          {item.title}
        </h3>

        {/* COMPANY */}
        <p
          style={{
            color: "#a1a1aa",
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "16px",
          }}
        >
          {item.company}
        </p>

        {/* META */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#71717a", fontSize: "13px" }}>
            <MapPin size={13} /> {item.location}
          </span>

          <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#71717a", fontSize: "13px" }}>
            <Briefcase size={13} /> {item.mode}
          </span>

          {item.duration && (
            <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#71717a", fontSize: "13px" }}>
              <Clock size={13} /> {item.duration}
            </span>
          )}
        </div>

        {/* STIPEND / SALARY */}
        {(item.stipend || item.salary) && (
          <div
            style={{
              background: "rgba(6,182,212,0.08)",
              border: "1px solid rgba(6,182,212,0.15)",
              borderRadius: "12px",
              padding: "10px 14px",
              color: "#22d3ee",
              fontSize: "13px",
              fontWeight: "700",
              marginBottom: "16px",
            }}
          >
            {item.stipend ? `Stipend: ${item.stipend}` : `Salary: ${item.salary}`}
          </div>
        )}

        {/* SKILLS */}
        {item.skills?.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            {item.skills.slice(0, 4).map((skill, i) => (
              <span
                key={i}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "4px 10px",
                  fontSize: "12px",
                  color: "#d4d4d8",
                }}
              >
                {skill}
              </span>
            ))}

            {item.skills.length > 4 && (
              <span style={{ fontSize: "12px", color: "#71717a", padding: "4px 6px" }}>
                +{item.skills.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* DEADLINE */}
        {item.deadline && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              color: isExpired ? "#f87171" : isDeadlineSoon ? "#fbbf24" : "#71717a",
              fontSize: "13px",
              marginBottom: "20px",
            }}
          >
            <Calendar size={13} />
            Deadline:{" "}
            {new Date(item.deadline).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        )}

        {/* PUSH BUTTONS TO BOTTOM */}
        <div style={{ flex: 1 }} />

        {/* BUTTONS */}
        <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
          <Link
            to={`/career/${item.slug}`}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "11px",
              borderRadius: "14px",
              textDecoration: "none",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#e4e4e7",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            View Details
          </Link>

          <a
            href={item.applyLink || "#"}
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1,
              textAlign: "center",
              padding: "11px",
              borderRadius: "14px",
              textDecoration: "none",
              background: "linear-gradient(135deg,#06b6d4,#3b82f6)",
              color: "#fff",
              fontSize: "13px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              opacity: isExpired ? 0.5 : 1,
              pointerEvents: isExpired ? "none" : "auto",
              cursor: isExpired ? "not-allowed" : "pointer",
            }}
          >
            Apply <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CareerCard;