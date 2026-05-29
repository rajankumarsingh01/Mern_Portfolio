import { useEffect, useState } from "react";
import axios from "axios";
import CareerCard from "./CareerCard";
import CareerFilters from "./CareerFilters";
import { Briefcase, Loader2 } from "lucide-react";

const Career = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const { data } = await axios.get(
          "https://mern-portfolio-backend-ke5j.onrender.com/api/v1/career/all"
        );
        // only published ones
        setItems(
          (data.opportunities || []).filter((i) => i.published)
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  const filtered =
    activeFilter === "All"
      ? items
      : items.filter(
          (i) => i.category.toLowerCase() === activeFilter.toLowerCase()
        );

  const counts = {
    total: items.length,
    internship: items.filter((i) => i.category === "internship").length,
    job: items.filter((i) => i.category === "job").length,
    training: items.filter((i) => i.category === "training").length,
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#09090b",
      color: "#fff",
      padding: "80px 20px",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)",
            borderRadius: "999px", padding: "8px 20px",
            color: "#22d3ee", fontSize: "13px", fontWeight: "700",
            marginBottom: "24px",
          }}>
            <Briefcase size={14} /> Opportunities
          </div>

          <h1 style={{
            fontSize: "clamp(36px,6vw,64px)",
            fontWeight: "900", lineHeight: "1.1",
            marginBottom: "20px",
            background: "linear-gradient(135deg,#fff 40%,#71717a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Career & Opportunities
          </h1>

          <p style={{
            color: "#71717a", fontSize: "17px",
            maxWidth: "520px", margin: "0 auto", lineHeight: "1.7",
          }}>
            Explore internships, jobs and training programs curated for you.
          </p>
        </div>

        {/* FILTERS */}
        {!loading && items.length > 0 && (
          <CareerFilters
            active={activeFilter}
            onChange={setActiveFilter}
            counts={counts}
          />
        )}

        {/* LOADING */}
        {loading && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <Loader2
              size={40}
              color="#22d3ee"
              style={{ animation: "spin 1s linear infinite", margin: "0 auto" }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* EMPTY */}
        {!loading && filtered.length === 0 && (
          <div style={{
            textAlign: "center", padding: "80px 20px",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "24px",
          }}>
            <p style={{ color: "#71717a", fontSize: "18px" }}>
              No {activeFilter === "All" ? "" : activeFilter} opportunities right now.
            </p>
          </div>
        )}

        {/* GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "28px",
        }}>
          {filtered.map((item) => (
            <CareerCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;