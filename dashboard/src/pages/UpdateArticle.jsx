
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  updateArticle,
  clearArticleState,
} from "@/store/slices/articleSlice";

const CATEGORIES = [
  "Technology",
  "Web Development",
  "React",
  "Node.js",
  "Design",
  "Career",
  "Tutorial",
  "Other",
];

const UpdateArticle = ({ article, onBack }) => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(
    (s) => s.articles
  );

  const fileRef = useRef();

  const [form, setForm] = useState({
    title: article?.title || "",
    excerpt: article?.excerpt || "",
    content: article?.content || "",
    category: article?.category || "",
    tags: article?.tags?.join(", ") || "",
    featured: article?.featured || false,
    published: article?.published || false,
    seoTitle: article?.seoTitle || "",
    seoDescription: article?.seoDescription || "",
  });

  const [coverImage, setCoverImage] = useState(null);

  const [preview, setPreview] = useState(
    article?.coverImage?.url || null
  );

  /* ───────────────────────────── */
  /* TOASTS */
  /* ───────────────────────────── */

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearArticleState());
    }

    if (message) {
      toast.success(message);
      dispatch(clearArticleState());
      onBack();
    }
  }, [error, message, dispatch, onBack]);

  /* ───────────────────────────── */
  /* HANDLE CHANGE */
  /* ───────────────────────────── */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* ───────────────────────────── */
  /* HANDLE FILE */
  /* ───────────────────────────── */

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setCoverImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ───────────────────────────── */
  /* SUBMIT */
  /* ───────────────────────────── */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.excerpt ||
      !form.content ||
      !form.category
    ) {
      toast.error(
        "Please fill all required fields"
      );
      return;
    }

    const fd = new FormData();

    fd.append("title", form.title);
    fd.append("excerpt", form.excerpt);
    fd.append("content", form.content);
    fd.append("category", form.category);

    fd.append(
      "tags",
      JSON.stringify(
        form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      )
    );

    fd.append("featured", form.featured);

    fd.append(
      "published",
      form.published
    );

    fd.append(
      "seoTitle",
      form.seoTitle
    );

    fd.append(
      "seoDescription",
      form.seoDescription
    );

    if (coverImage) {
      fd.append(
        "coverImage",
        coverImage
      );
    }

    dispatch(
      updateArticle({
        id: article._id,
        formData: fd,
      })
    );
  };

  /* ───────────────────────────── */
  /* UI */
  /* ───────────────────────────── */

  return (
    <div style={S.page}>
      {/* HEADER */}

      <div style={S.header}>
        <div>
          <button
            style={S.backBtn}
            onClick={onBack}
          >
            ← Back
          </button>

          <h1 style={S.title}>
            Edit Article
          </h1>

          <p style={S.subtitle}>
            Update article content,
            SEO, careerImg and publish
            status
          </p>
        </div>

        <button
          style={S.publishBtn}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? "Updating..."
            : "Save Changes"}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={S.grid}>
          {/* LEFT */}

          <div style={S.left}>
            {/* TITLE */}

            <Field label="Article Title *">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Write article title..."
                style={S.input}
              />
            </Field>

            {/* EXCERPT */}

            <Field label="Excerpt *">
              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                placeholder="Short article description..."
                style={{
                  ...S.input,
                  minHeight: 90,
                }}
              />
            </Field>

            {/* CONTENT */}

            <Field label="Article Content *">
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Write full markdown content..."
                style={{
                  ...S.input,
                  minHeight: 420,
                  fontFamily:
                    "monospace",
                  lineHeight: 1.7,
                }}
              />
            </Field>

            {/* SEO */}

            <div style={S.card}>
              <h3 style={S.cardTitle}>
                SEO Settings
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection:
                    "column",
                  gap: 16,
                }}
              >
                <Field label="SEO Title">
                  <input
                    type="text"
                    name="seoTitle"
                    value={form.seoTitle}
                    onChange={
                      handleChange
                    }
                    placeholder="SEO optimized title..."
                    style={S.input}
                  />
                </Field>

                <Field label="SEO Description">
                  <textarea
                    name="seoDescription"
                    value={
                      form.seoDescription
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="SEO meta description..."
                    style={{
                      ...S.input,
                      minHeight: 100,
                    }}
                  />
                </Field>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div style={S.right}>
            {/* COVER */}

            <div style={S.card}>
              <Field label="Cover Image">
                <div
                  style={S.uploadBox}
                  onClick={() =>
                    fileRef.current.click()
                  }
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      style={
                        S.previewImg
                      }
                    />
                  ) : (
                    <div
                      style={
                        S.placeholder
                      }
                    >
                      <span
                        style={{
                          fontSize: 40,
                        }}
                      >
                        📸
                      </span>

                      <p
                        style={{
                          color:
                            "#71717a",
                        }}
                      >
                        Click to upload
                      </p>
                    </div>
                  )}
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  style={{
                    display:
                      "none",
                  }}
                />
              </Field>
            </div>

            {/* CATEGORY */}

            <div style={S.card}>
              <Field label="Category *">
                <select
                  name="category"
                  value={form.category}
                  onChange={
                    handleChange
                  }
                  style={S.input}
                >
                  <option value="">
                    Select category
                  </option>

                  {CATEGORIES.map(
                    (cat) => (
                      <option
                        key={cat}
                        value={cat}
                      >
                        {cat}
                      </option>
                    )
                  )}
                </select>
              </Field>

              <div
                style={{
                  height: 14,
                }}
              />

              <Field label="Tags">
                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={
                    handleChange
                  }
                  placeholder="react, nodejs, mongodb"
                  style={S.input}
                />
              </Field>
            </div>

            {/* SETTINGS */}

            <div style={S.card}>
              <h3 style={S.cardTitle}>
                Publishing
              </h3>

              <Toggle
                label="Published"
                active={form.published}
                color="#4ade80"
                onClick={() =>
                  setForm((p) => ({
                    ...p,
                    published:
                      !p.published,
                  }))
                }
              />

              <div style={S.divider} />

              <Toggle
                label="Featured"
                active={form.featured}
                color="#f59e0b"
                onClick={() =>
                  setForm((p) => ({
                    ...p,
                    featured:
                      !p.featured,
                  }))
                }
              />
            </div>

            {/* INFO */}

            <div style={S.infoCard}>
              <p>
                👁 Views:
                <strong>
                  {" "}
                  {article?.views ||
                    0}
                </strong>
              </p>

              <p>
                ⏱ Read Time:
                <strong>
                  {" "}
                  {article?.readTime}
                </strong>
              </p>

              <p>
                📅 Created:
                <strong>
                  {" "}
                  {new Date(
                    article?.createdAt
                  ).toLocaleDateString()}
                </strong>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

/* ───────────────────────────── */
/* HELPERS */
/* ───────────────────────────── */

const Field = ({
  label,
  children,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 8,
    }}
  >
    <label style={S.label}>
      {label}
    </label>

    {children}
  </div>
);

const Toggle = ({
  label,
  active,
  color,
  onClick,
}) => (
  <div
    style={{
      display: "flex",
      justifyContent:
        "space-between",
      alignItems: "center",
    }}
  >
    <span
      style={{
        color: "#e4e4e7",
        fontSize: 14,
      }}
    >
      {label}
    </span>

    <div
      onClick={onClick}
      style={{
        width: 48,
        height: 26,
        borderRadius: 20,
        background: active
          ? color
          : "#27272a",
        padding: 3,
        cursor: "pointer",
        transition:
          "all 0.2s ease",
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#fff",
          transform: active
            ? "translateX(22px)"
            : "translateX(0px)",
          transition:
            "all 0.2s ease",
        }}
      />
    </div>
  </div>
);

/* ───────────────────────────── */
/* STYLES */
/* ───────────────────────────── */

const S = {
  page: {
    padding: 28,
  },

  header: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "flex-start",
    marginBottom: 30,
  },

  backBtn: {
    background: "#18181b",
    border: "1px solid #27272a",
    color: "#a1a1aa",
    padding: "8px 14px",
    borderRadius: 8,
    cursor: "pointer",
    marginBottom: 18,
  },

  title: {
    fontSize: 28,
    fontWeight: 800,
    color: "#fff",
    marginBottom: 8,
  },

  subtitle: {
    color: "#71717a",
    fontSize: 14,
  },

  publishBtn: {
    background:
      "linear-gradient(135deg,#6366f1,#8b5cf6)",
    border: "none",
    color: "#fff",
    padding: "12px 22px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14,
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "1fr 360px",
    gap: 28,
    alignItems: "start",
  },

  left: {
    display: "flex",
    flexDirection: "column",
    gap: 22,
  },

  right: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    position: "sticky",
    top: 24,
  },

  card: {
    background: "#111113",
    border:
      "1px solid #27272a",
    borderRadius: 14,
    padding: 18,
  },

  infoCard: {
    background:
      "linear-gradient(135deg,#18181b,#111113)",
    border:
      "1px solid #27272a",
    borderRadius: 14,
    padding: 18,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    color: "#a1a1aa",
    fontSize: 13,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 18,
  },

  label: {
    color: "#71717a",
    fontSize: 11,
    textTransform:
      "uppercase",
    letterSpacing: "0.08em",
    fontWeight: 700,
  },

  input: {
    width: "100%",
    background: "#18181b",
    border:
      "1px solid #27272a",
    color: "#fff",
    borderRadius: 10,
    padding: "12px 14px",
    fontSize: 14,
    outline: "none",
  },

  uploadBox: {
    border:
      "2px dashed #27272a",
    borderRadius: 12,
    minHeight: 220,
    overflow: "hidden",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  previewImg: {
    width: "100%",
    height: 220,
    objectFit: "cover",
  },

  placeholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },

  divider: {
    height: 1,
    background: "#27272a",
    margin: "16px 0",
  },
};

export default UpdateArticle;

