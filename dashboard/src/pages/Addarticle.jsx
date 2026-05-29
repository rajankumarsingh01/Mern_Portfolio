import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createArticle, clearArticleState } from "@/store/slices/articleSlice";

const CATEGORIES = [
  "Technology","Web Development","React","Node.js",
  "Design","Career","Tutorial","Other",
];

const AddArticle = ({ onBack }) => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((s) => s.articles);
  const fileRef = useRef();

  const [form, setForm] = useState({
    title: "", excerpt: "", content: "",
    category: "", tags: "",
    featured: false, published: true,
  });
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview]       = useState(null);

  useEffect(() => {
    if (error)   { toast.error(error);     dispatch(clearArticleState()); }
    if (message) { toast.success(message); dispatch(clearArticleState()); onBack(); }
  }, [error, message, dispatch, onBack]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCoverImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!coverImage)                                        { toast.error("Cover image is required"); return; }
    if (!form.title || !form.excerpt || !form.content || !form.category)
                                                            { toast.error("Please fill all required fields"); return; }

    const fd = new FormData();
    fd.append("title",     form.title);
    fd.append("excerpt",   form.excerpt);
    fd.append("content",   form.content);
    fd.append("category",  form.category);
    fd.append("tags",      JSON.stringify(form.tags.split(",").map((t) => t.trim()).filter(Boolean)));
    fd.append("featured",  form.featured);
    fd.append("published", form.published);
    fd.append("coverImage", coverImage);
    dispatch(createArticle(fd));
  };

  return (
    <div style={S.page}>
      {/* Top bar */}
      <div style={S.topBar}>
        <button style={S.backBtn} onClick={onBack}>← Back</button>
        <h2 style={S.pageTitle}>New Article</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={S.grid}>
          {/* ── Left ── */}
          <div style={S.col}>
            <Field label="Title *">
              <input name="title" value={form.title} onChange={handleChange}
                placeholder="e.g. Building a REST API with Node.js" style={S.input} required />
            </Field>

            <Field label="Excerpt *">
              <textarea name="excerpt" value={form.excerpt} onChange={handleChange}
                placeholder="Short summary shown on article cards…"
                style={{ ...S.input, height: 80, resize: "vertical" }} required />
            </Field>

            <Field label="Content * — Markdown supported">
              <textarea name="content" value={form.content} onChange={handleChange}
                placeholder="Write your full article here…"
                style={{ ...S.input, height: 340, resize: "vertical", fontFamily: "monospace", fontSize: 12 }}
                required />
            </Field>
          </div>

          {/* ── Right ── */}
          <div style={S.sideCol}>
            {/* Cover */}
            <Field label="Cover Image *">
              <div style={S.dropZone} onClick={() => fileRef.current.click()}>
                {preview
                  ? <img src={preview} alt="" style={S.previewImg} />
                  : <div style={S.dropPlaceholder}>
                      <span style={{ fontSize: 28 }}>📷</span>
                      <span style={{ fontSize: 13, color: "#52525b" }}>Click to upload</span>
                      <span style={{ fontSize: 11, color: "#3f3f46" }}>JPG · PNG · WEBP · max 10 MB</span>
                    </div>
                }
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
            </Field>

            {/* Category */}
            <Field label="Category *">
              <select name="category" value={form.category} onChange={handleChange} style={S.select} required>
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>

            {/* Tags */}
            <Field label="Tags">
              <input name="tags" value={form.tags} onChange={handleChange}
                placeholder="react, nodejs, api (comma separated)" style={S.input} />
            </Field>

            {/* Toggles */}
            <div style={S.toggleCard}>
              <Toggle
                label="Published" hint="Visible to readers"
                active={form.published} color="#6366f1"
                onToggle={() => setForm((p) => ({ ...p, published: !p.published }))}
              />
              <div style={{ height: 1, background: "#1c1c1f" }} />
              <Toggle
                label="Featured" hint="Pin to top of feed"
                active={form.featured} color="#f59e0b"
                onToggle={() => setForm((p) => ({ ...p, featured: !p.featured }))}
              />
            </div>

            <button type="submit" style={S.submitBtn} disabled={loading}>
              {loading ? "Publishing…" : "Publish Article"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

/* ── helpers ── */
const Field = ({ label, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={S.label}>{label}</label>
    {children}
  </div>
);

const Toggle = ({ label, hint, active, color, onToggle }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div>
      <div style={{ fontSize: 13, color: "#e4e4e7", fontFamily: "'Cabinet Grotesk', sans-serif" }}>{label}</div>
      <div style={{ fontSize: 11, color: "#52525b" }}>{hint}</div>
    </div>
    <div
      onClick={onToggle}
      style={{
        width: 44, height: 24, borderRadius: 12, padding: 2,
        background: active ? color : "#27272a",
        display: "flex", alignItems: "center",
        cursor: "pointer", transition: "background 0.2s", flexShrink: 0,
      }}
    >
      <div style={{
        width: 20, height: 20, borderRadius: "50%", background: "#fff",
        transform: active ? "translateX(20px)" : "translateX(0)",
        transition: "transform 0.2s",
      }} />
    </div>
  </div>
);

/* ── styles ── */
const S = {
  page:      { padding: "28px 28px", minHeight: "100%" },
  topBar:    { display: "flex", alignItems: "center", gap: 14, marginBottom: 28 },
  backBtn: {
    background: "#18181b", border: "1px solid #27272a", color: "#71717a",
    borderRadius: 8, padding: "7px 14px", fontSize: 12, cursor: "pointer",
    fontFamily: "'Cabinet Grotesk', sans-serif",
  },
  pageTitle: { fontSize: 22, fontWeight: 800, color: "#f4f4f5", margin: 0, fontFamily: "'Cabinet Grotesk', sans-serif" },
  grid:      { display: "grid", gridTemplateColumns: "1fr 360px", gap: 28, alignItems: "start" },
  col:       { display: "flex", flexDirection: "column", gap: 18 },
  sideCol:   { display: "flex", flexDirection: "column", gap: 18, position: "sticky", top: 24 },
  label: {
    fontSize: 11, fontWeight: 700, color: "#52525b",
    textTransform: "uppercase", letterSpacing: "0.07em",
    fontFamily: "'Space Mono', monospace",
  },
  input: {
    background: "#18181b", border: "1px solid #27272a",
    borderRadius: 8, color: "#e4e4e7", padding: "9px 13px",
    fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box",
    fontFamily: "'Cabinet Grotesk', sans-serif",
  },
  select: {
    background: "#18181b", border: "1px solid #27272a",
    borderRadius: 8, color: "#e4e4e7", padding: "9px 13px",
    fontSize: 13, outline: "none", width: "100%", cursor: "pointer",
    fontFamily: "'Cabinet Grotesk', sans-serif",
  },
  dropZone: {
    border: "2px dashed #27272a", borderRadius: 10,
    minHeight: 170, display: "flex", alignItems: "center",
    justifyContent: "center", cursor: "pointer", overflow: "hidden",
    transition: "border-color 0.2s",
  },
  dropPlaceholder: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 },
  previewImg:      { width: "100%", height: 170, objectFit: "cover" },
  toggleCard: {
    background: "#111113", border: "1px solid #1c1c1f",
    borderRadius: 10, padding: "14px 16px",
    display: "flex", flexDirection: "column", gap: 14,
  },
  submitBtn: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff", border: "none", borderRadius: 10,
    padding: "13px", fontSize: 14, fontWeight: 800,
    cursor: "pointer", width: "100%",
    fontFamily: "'Cabinet Grotesk', sans-serif",
  },
};

export default AddArticle;