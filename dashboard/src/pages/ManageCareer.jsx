import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Briefcase,
  GraduationCap,
  Award,
  Plus,
  Pencil,
  Trash2,
  Calendar,
} from "lucide-react";

import {
  getAllCareerItems,
  deleteCareerItem,
  clearAllCareerErrors,
} from "@/store/slices/careerSlice";

import { toast } from "react-toastify";

const badgeStyles = {
  Internship: {
    bg: "rgba(34,197,94,0.15)",
    border: "1px solid rgba(34,197,94,0.25)",
    color: "#4ade80",
    icon: Briefcase,
  },

  Training: {
    bg: "rgba(59,130,246,0.15)",
    border: "1px solid rgba(59,130,246,0.25)",
    color: "#60a5fa",
    icon: GraduationCap,
  },

  Certification: {
    bg: "rgba(168,85,247,0.15)",
    border: "1px solid rgba(168,85,247,0.25)",
    color: "#c084fc",
    icon: Award,
  },
};

const ManageCareer = () => {
  const dispatch = useDispatch();

  const {
    loading,
    error,
    items,
  } = useSelector((state) => state.career);

  useEffect(() => {
    dispatch(getAllCareerItems());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllCareerErrors());
    }
  }, [dispatch, error]);



useEffect(() => {
  console.log("IMAGE URL CHECK:", items?.[0]?.careerImg?.url);
}, [items]);


  const handleDelete = (id) => {
    if (window.confirm("Delete this item?")) {
      dispatch(deleteCareerItem(id));
      toast.success("Deleted Successfully");
    }
  };

  return (
    <div
      style={{
        padding: "24px",
        minHeight: "100vh",
        background: "#09090b",
        color: "#fff",
      }}
    >
      {/* TOP */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "800",
              marginBottom: "6px",
            }}
          >
            Career Management
          </h1>

          <p
            style={{
              color: "#71717a",
              fontSize: "14px",
            }}
          >
            Manage internships, training & certifications
          </p>
        </div>

        <Link
          to="/manage/career/add"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 18px",
            borderRadius: "14px",
            textDecoration: "none",
            background:
              "linear-gradient(135deg,#06b6d4,#3b82f6)",
            color: "#fff",
            fontWeight: "700",
            border: "none",
          }}
        >
          <Plus size={18} />
          Add Career Item
        </Link>
      </div>

      {/* EMPTY */}
      {!loading && items?.length === 0 && (
        <div
          style={{
            border: "1px solid #27272a",
            background: "#111113",
            borderRadius: "24px",
            padding: "60px 20px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              marginBottom: "10px",
            }}
          >
            No Career Items Found
          </h2>

          <p style={{ color: "#71717a" }}>
            Add internship, training or certifications
          </p>
        </div>
      )}

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "24px",
        }}
      >
        {items?.map((item) => {
          const style =
            badgeStyles[item.category] ||
            badgeStyles.Internship;

          const Icon = style.icon;

          return (
            <div
              key={item._id}
              style={{
                background: "#111113",
                border: "1px solid #27272a",
                borderRadius: "24px",
                overflow: "hidden",
                transition: "0.3s",
              }}
            >
              {/* IMAGE */}
              <div
                style={{
                  height: "220px",
                  overflow: "hidden",
                }}
              >
<img
  src={item.careerImg?.url || "https://placehold.co/300x200"}
  alt={item.title}
  style={{ width: "100%", height: "100%", objectFit: "cover" }}
/>
              </div>

              {/* BODY */}
              <div style={{ padding: "22px" }}>
                {/* CATEGORY */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 14px",
                    borderRadius: "999px",
                    marginBottom: "18px",
                    background: style.bg,
                    border: style.border,
                    color: style.color,
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  <Icon size={14} />
                  {item.category}
                </div>

                {/* TITLE */}
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: "800",
                    marginBottom: "12px",
                    lineHeight: "1.3",
                  }}
                >
                  {item.title}
                </h2>

                {/* DESCRIPTION */}
                <p
                  style={{
                    color: "#a1a1aa",
                    fontSize: "14px",
                    lineHeight: "1.7",
                    marginBottom: "20px",
                  }}
                >
                  {item.description?.slice(0, 120)}...
                </p>

                {/* DATE */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#71717a",
                    fontSize: "13px",
                    marginBottom: "22px",
                  }}
                >
                  <Calendar size={15} />

                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}
                </div>

                {/* ACTIONS */}
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                  }}
                >
                  <Link
                    to={`/manage/career/update/${item._id}`}
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px",
                      borderRadius: "14px",
                      textDecoration: "none",
                      background:
                        "rgba(59,130,246,0.15)",
                      border:
                        "1px solid rgba(59,130,246,0.25)",
                      color: "#60a5fa",
                      fontWeight: "700",
                    }}
                  >
                    <Pencil size={16} />
                    Update
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(item._id)
                    }
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px",
                      borderRadius: "14px",
                      background:
                        "rgba(239,68,68,0.15)",
                      border:
                        "1px solid rgba(239,68,68,0.25)",
                      color: "#f87171",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageCareer;