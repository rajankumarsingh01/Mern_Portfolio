import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <Link
      to={`/article/${article.slug}`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          background: "#111",
          border: "1px solid #222",
          borderRadius: 20,
          overflow: "hidden",
          transition: "0.3s",
          cursor: "pointer",
          height: "100%",
        }}
      >
        <img
          src={article.coverImage?.url}
          alt={article.title}
          style={{
            width: "100%",
            height: 220,
            objectFit: "cover",
          }}
        />

        <div style={{ padding: 20 }}>
          <div
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 12,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                background: "#1e293b",
                color: "#38bdf8",
                padding: "4px 10px",
                borderRadius: 999,
                fontSize: 12,
              }}
            >
              {article.category}
            </span>

            {article.featured && (
              <span
                style={{
                  background: "#3b0764",
                  color: "#e879f9",
                  padding: "4px 10px",
                  borderRadius: 999,
                  fontSize: 12,
                }}
              >
                Featured
              </span>
            )}
          </div>

          <h2
            style={{
              color: "#fff",
              fontSize: 22,
              marginBottom: 12,
              lineHeight: 1.3,
            }}
          >
            {article.title}
          </h2>

          <p
            style={{
              color: "#aaa",
              lineHeight: 1.7,
              marginBottom: 20,
            }}
          >
            {article.excerpt}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#666",
              fontSize: 13,
            }}
          >
            <span>{article.readTime}</span>
            <span>{article.views || 0} views</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;