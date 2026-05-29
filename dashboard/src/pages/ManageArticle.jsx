import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getAllArticles,
  deleteArticle,
  clearArticleState,
} from "@/store/slices/articleSlice";
import AddArticle from "./Addarticle";
import UpdateArticle from "./UpdateArticle";

/* ─── Main Component ─────────────────────────────────────────── */
const ManageArticles = () => {
  const dispatch = useDispatch();
  const { articles, loading, error, message } = useSelector((s) => s.articles);

  const [view, setView]           = useState("list"); // "list" | "add" | "edit"
  const [editTarget, setEditTarget] = useState(null);
  const [search, setSearch]       = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => { dispatch(getAllArticles()); }, [dispatch]);

  useEffect(() => {
    if (error)   { toast.error(error);     dispatch(clearArticleState()); }
    if (message) { toast.success(message); dispatch(clearArticleState()); }
  }, [error, message, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteArticle(id));
    setConfirmId(null);
  };

  const goEdit = (article) => { setEditTarget(article); setView("edit"); };
  const goBack = () => { setView("list"); setEditTarget(null); };

  /* ── sub-view routing ── */
  if (view === "add")  return <AddArticle  onBack={goBack} />;
  if (view === "edit") return <UpdateArticle article={editTarget} onBack={goBack} />;

  /* ── list view ── */
  const cats = ["All", ...new Set(articles.map((a) => a.category).filter(Boolean))];
  const filtered = articles.filter((a) => {
    const q = search.toLowerCase();
    return (
      (a.title?.toLowerCase().includes(q) || a.excerpt?.toLowerCase().includes(q)) &&
      (filterCat === "All" || a.category === filterCat)
    );
  });

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <div>
          <h2 style={S.title}>Articles</h2>
          <p style={S.subtitle}>
            {articles.length} total &nbsp;·&nbsp;
            {articles.filter((a) => a.published).length} published &nbsp;·&nbsp;
            {articles.filter((a) => a.featured).length} featured
          </p>
        </div>
        <button style={S.addBtn} onClick={() => setView("add")}>
          + New Article
        </button>
      </div>

      {/* Filter bar */}
      <div style={S.filterBar}>
        <input
          style={S.searchInput}
          placeholder="Search articles…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div style={S.catTabs}>
          {cats.map((c) => (
            <button
              key={c}
              style={{ ...S.catBtn, ...(filterCat === c ? S.catBtnActive : {}) }}
              onClick={() => setFilterCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div style={S.empty}>Loading…</div>
      ) : filtered.length === 0 ? (
        <div style={S.empty}>
          No articles yet.{" "}
          <span style={S.emptyLink} onClick={() => setView("add")}>
            Write one?
          </span>
        </div>
      ) : (
        <div style={S.tableWrap}>
          <table style={S.table}>
            <thead>
              <tr>
                {["Cover","Title","Category","Tags","Views","Read Time","Status","Actions"].map((h) => (
                  <th key={h} style={S.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a._id} style={S.tr}>
                  <td style={S.td}>
                    <img src={a.coverImage?.url} alt="" style={S.cover} />
                  </td>
                  <td style={S.td}>
                    <div style={S.aTitle}>{a.title}</div>
                    <div style={S.aExcerpt}>
                      {a.excerpt?.slice(0, 64)}{a.excerpt?.length > 64 ? "…" : ""}
                    </div>
                  </td>
                  <td style={S.td}>
                    <span style={S.catBadge}>{a.category}</span>
                  </td>
                  <td style={S.td}>
                    <div style={S.tagWrap}>
                      {(a.tags || []).slice(0, 3).map((t) => (
                        <span key={t} style={S.tag}>{t}</span>
                      ))}
                      {a.tags?.length > 3 && (
                        <span style={S.tag}>+{a.tags.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td style={{ ...S.td, textAlign: "center" }}>
                    <span style={S.views}>{a.views ?? 0}</span>
                  </td>
                  <td style={S.td}>
                    <span style={S.readTime}>{a.readTime}</span>
                  </td>
                  <td style={S.td}>
                    <span style={{
                      ...S.statusBadge,
                      background: a.published ? "#d1fae520" : "#fee2e220",
                      color:      a.published ? "#6ee7b7"  : "#fca5a5",
                      borderColor:a.published ? "#059669"  : "#dc2626",
                    }}>
                      {a.published ? "Published" : "Draft"}
                    </span>
                    {a.featured && <span style={S.featuredBadge}>⭐ Featured</span>}
                  </td>
                  <td style={S.td}>
                    <div style={S.actions}>
                      <button style={S.editBtn}   onClick={() => goEdit(a)}>Edit</button>
                      <button style={S.deleteBtn} onClick={() => setConfirmId(a._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmId && (
        <div style={S.overlay}>
          <div style={S.modal}>
            <h3 style={S.modalTitle}>Delete Article?</h3>
            <p style={S.modalText}>
              This permanently removes the article and its Cloudinary image. Cannot be undone.
            </p>
            <div style={S.modalActions}>
              <button style={S.cancelBtn}        onClick={() => setConfirmId(null)}>Cancel</button>
              <button style={S.confirmDeleteBtn} onClick={() => handleDelete(confirmId)}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Styles ─────────────────────────────────────────────────── */
const S = {
  page:       { padding: "28px 28px", minHeight: "100%" },
  header:     { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 },
  title:      { fontSize: 22, fontWeight: 800, color: "#f4f4f5", fontFamily: "'Cabinet Grotesk', sans-serif", margin: 0 },
  subtitle:   { fontSize: 12, color: "#52525b", marginTop: 4, fontFamily: "'Space Mono', monospace" },
  addBtn: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff", border: "none", borderRadius: 8,
    padding: "9px 18px", fontSize: 13, fontWeight: 700,
    cursor: "pointer", fontFamily: "'Cabinet Grotesk', sans-serif",
  },
  filterBar:    { display: "flex", gap: 12, alignItems: "center", marginBottom: 20, flexWrap: "wrap" },
  searchInput: {
    background: "#18181b", border: "1px solid #27272a",
    color: "#e4e4e7", borderRadius: 8, padding: "8px 13px",
    fontSize: 13, width: 240, outline: "none",
    fontFamily: "'Cabinet Grotesk', sans-serif",
  },
  catTabs:      { display: "flex", gap: 6, flexWrap: "wrap" },
  catBtn: {
    background: "#18181b", border: "1px solid #27272a",
    color: "#71717a", borderRadius: 20, padding: "4px 13px",
    fontSize: 12, cursor: "pointer",
    fontFamily: "'Cabinet Grotesk', sans-serif",
    transition: "all 0.15s",
  },
  catBtnActive: { background: "#6366f1", borderColor: "#6366f1", color: "#fff" },
  tableWrap:    { overflowX: "auto", borderRadius: 12, border: "1px solid #27272a" },
  table:        { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  th: {
    background: "#111113", color: "#52525b",
    padding: "10px 14px", textAlign: "left",
    fontWeight: 700, fontSize: 11,
    textTransform: "uppercase", letterSpacing: "0.07em",
    borderBottom: "1px solid #27272a",
    fontFamily: "'Space Mono', monospace", whiteSpace: "nowrap",
  },
  tr:     { borderBottom: "1px solid #1c1c1f" },
  td:     { padding: "11px 14px", verticalAlign: "middle" },
  cover:  { width: 58, height: 40, objectFit: "cover", borderRadius: 6, border: "1px solid #27272a", display: "block" },
  aTitle: { fontWeight: 700, color: "#e4e4e7", fontSize: 13, marginBottom: 2, fontFamily: "'Cabinet Grotesk', sans-serif" },
  aExcerpt: { color: "#52525b", fontSize: 11 },
  catBadge: {
    background: "#1e1b4b", color: "#a5b4fc",
    border: "1px solid #3730a3",
    borderRadius: 4, padding: "2px 8px", fontSize: 11,
    fontFamily: "'Space Mono', monospace",
  },
  tagWrap:  { display: "flex", flexWrap: "wrap", gap: 4 },
  tag:      { background: "#18181b", color: "#71717a", border: "1px solid #27272a", borderRadius: 4, padding: "1px 7px", fontSize: 10 },
  views:    { color: "#fbbf24", fontWeight: 700 },
  readTime: { color: "#52525b", fontSize: 11, whiteSpace: "nowrap", fontFamily: "'Space Mono', monospace" },
  statusBadge: {
    borderRadius: 12, padding: "2px 9px", fontSize: 11,
    fontWeight: 700, display: "inline-block",
    border: "1px solid",
    fontFamily: "'Space Mono', monospace",
  },
  featuredBadge: { display: "block", marginTop: 4, fontSize: 10, color: "#fbbf24" },
  actions:        { display: "flex", gap: 6 },
  editBtn: {
    background: "#1d4ed820", color: "#93c5fd",
    border: "1px solid #1d4ed8", borderRadius: 6,
    padding: "5px 12px", fontSize: 11, cursor: "pointer", fontWeight: 700,
  },
  deleteBtn: {
    background: "#7f1d1d20", color: "#fca5a5",
    border: "1px solid #7f1d1d", borderRadius: 6,
    padding: "5px 12px", fontSize: 11, cursor: "pointer", fontWeight: 700,
  },
  empty:     { textAlign: "center", padding: "80px 20px", color: "#52525b", fontSize: 14 },
  emptyLink: { color: "#818cf8", cursor: "pointer", textDecoration: "underline" },
  overlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
  },
  modal: {
    background: "#111113", border: "1px solid #27272a",
    borderRadius: 12, padding: 28, maxWidth: 400, width: "90%",
  },
  modalTitle:   { color: "#f4f4f5", fontSize: 17, fontWeight: 800, marginBottom: 10, fontFamily: "'Cabinet Grotesk', sans-serif" },
  modalText:    { color: "#71717a", fontSize: 13, lineHeight: 1.6, marginBottom: 22 },
  modalActions: { display: "flex", justifyContent: "flex-end", gap: 10 },
  cancelBtn: {
    background: "#18181b", color: "#71717a",
    border: "1px solid #27272a", borderRadius: 8,
    padding: "8px 18px", cursor: "pointer", fontSize: 13,
  },
  confirmDeleteBtn: {
    background: "#dc2626", color: "#fff",
    border: "none", borderRadius: 8,
    padding: "8px 18px", cursor: "pointer", fontSize: 13, fontWeight: 700,
  },
};

export default ManageArticles;