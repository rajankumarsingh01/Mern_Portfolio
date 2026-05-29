import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllCareerErrors,
  getSingleCareerItem,
  updateCareerItem,
} from "@/store/slices/careerSlice";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCareer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    loading,
    error,
    singleItem,
    message,
  } = useSelector((state) => state.career);

  const [title, setTitle] = useState("");
  const [category, setCategory] =
    useState("internship");

  const [company, setCompany] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [mode, setMode] =
    useState("Remote");

  const [duration, setDuration] =
    useState("");

  const [stipend, setStipend] =
    useState("");

  const [salary, setSalary] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [skills, setSkills] =
    useState("");

  const [applyLink, setApplyLink] =
    useState("");

  const [deadline, setDeadline] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

  const [published, setPublished] =
    useState(true);

  const [coverImage, setCoverImage] =
    useState("");

  const [
    coverImagePreview,
    setCoverImagePreview,
  ] = useState("");

  // GET SINGLE ITEM
  useEffect(() => {
    dispatch(getSingleCareerItem(id));
  }, [dispatch, id]);

  // SET DATA
  useEffect(() => {
    if (singleItem) {
      setTitle(singleItem.title || "");

      setCategory(
        singleItem.category || "internship"
      );

      setCompany(singleItem.company || "");

      setLocation(
        singleItem.location || ""
      );

      setMode(singleItem.mode || "Remote");

      setDuration(
        singleItem.duration || ""
      );

      setStipend(
        singleItem.stipend || ""
      );

      setSalary(singleItem.salary || "");

      setDescription(
        singleItem.description || ""
      );

      setSkills(
        Array.isArray(singleItem.skills)
          ? singleItem.skills.join(", ")
          : ""
      );

      setApplyLink(
        singleItem.applyLink || ""
      );

      setDeadline(
        singleItem.deadline
          ? singleItem.deadline
              .split("T")[0]
          : ""
      );

      setFeatured(
        singleItem.featured || false
      );

      setPublished(
        singleItem.published ?? true
      );

      setCoverImagePreview(
        singleItem.coverImage?.url || ""
      );
    }
  }, [singleItem]);

  // HANDLE ERRORS
  useEffect(() => {
    if (error) {
      toast.error(error);

      dispatch(clearAllCareerErrors());
    }

    if (message) {
      toast.success(message);

      navigate("/");
    }
  }, [
    dispatch,
    error,
    message,
    navigate,
  ]);

  // HANDLE IMAGE
  const handleCoverImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error(
        "Please select a valid image"
      );
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setCoverImage(file);

      setCoverImagePreview(reader.result);
    };
  };

  // UPDATE CAREER
  const handleUpdateCareer = (e) => {
    e.preventDefault();

    // VALIDATION
    if (
      !title ||
      !company ||
      !location ||
      !description ||
      !applyLink
    ) {
      toast.error(
        "Please fill all required fields"
      );
      return;
    }

    const formData = new FormData();

    formData.append("title", title);

    formData.append(
      "category",
      category
    );

    formData.append("company", company);

    formData.append(
      "location",
      location
    );

    formData.append("mode", mode);

    formData.append(
      "duration",
      duration
    );

    formData.append(
      "stipend",
      stipend
    );

    formData.append("salary", salary);

    formData.append(
      "description",
      description
    );

    formData.append(
      "applyLink",
      applyLink
    );

    formData.append(
      "deadline",
      deadline
    );

    formData.append(
      "featured",
      featured
    );

    formData.append(
      "published",
      published
    );

    // SKILLS ARRAY
    const skillsArray = skills
      .split(",")
      .map((skill) => skill.trim());

    skillsArray.forEach((skill) => {
      formData.append("skills", skill);
    });

    // IMAGE
    if (coverImagePreview) {
      // ❌ coverImage → ✅ careerImg
formData.append("careerImg", coverImage);
      
    }

    dispatch(
      updateCareerItem({
        id,
        formData,
      })
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#09090b",
        padding: "30px",
        color: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: "950px",
          margin: "0 auto",
          background: "#111113",
          border:
            "1px solid #27272a",
          borderRadius: "30px",
          padding: "35px",
        }}
      >
        {/* TOP */}
        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "38px",
              fontWeight: "800",
              marginBottom: "10px",
            }}
          >
            Update Career
          </h1>

          <p
            style={{
              color: "#71717a",
              fontSize: "15px",
            }}
          >
            Update internship, job or
            training
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleUpdateCareer}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(280px,1fr))",
              gap: "22px",
            }}
          >
            {/* TITLE */}
            <div>
              <label className="careerLabel">
                Title *
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="careerInput"
                placeholder="MERN Stack Developer"
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="careerLabel">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                className="careerInput"
              >
                <option value="internship">
                  Internship
                </option>

                <option value="job">
                  Job
                </option>

                <option value="training">
                  Training
                </option>
              </select>
            </div>

            {/* COMPANY */}
            <div>
              <label className="careerLabel">
                Company *
              </label>

              <input
                type="text"
                value={company}
                onChange={(e) =>
                  setCompany(
                    e.target.value
                  )
                }
                className="careerInput"
                placeholder="Google"
              />
            </div>

            {/* LOCATION */}
            <div>
              <label className="careerLabel">
                Location *
              </label>

              <input
                type="text"
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
                className="careerInput"
                placeholder="Remote"
              />
            </div>

            {/* MODE */}
            <div>
              <label className="careerLabel">
                Mode
              </label>

              <select
                value={mode}
                onChange={(e) =>
                  setMode(
                    e.target.value
                  )
                }
                className="careerInput"
              >
                <option value="Remote">
                  Remote
                </option>

                <option value="Onsite">
                  Onsite
                </option>

                <option value="Hybrid">
                  Hybrid
                </option>
              </select>
            </div>

            {/* DURATION */}
            <div>
              <label className="careerLabel">
                Duration
              </label>

              <input
                type="text"
                value={duration}
                onChange={(e) =>
                  setDuration(
                    e.target.value
                  )
                }
                className="careerInput"
                placeholder="3 Months"
              />
            </div>

            {/* STIPEND */}
            <div>
              <label className="careerLabel">
                Stipend
              </label>

              <input
                type="text"
                value={stipend}
                onChange={(e) =>
                  setStipend(
                    e.target.value
                  )
                }
                className="careerInput"
                placeholder="₹10,000/month"
              />
            </div>

            {/* SALARY */}
            <div>
              <label className="careerLabel">
                Salary
              </label>

              <input
                type="text"
                value={salary}
                onChange={(e) =>
                  setSalary(
                    e.target.value
                  )
                }
                className="careerInput"
                placeholder="₹8 LPA"
              />
            </div>

            {/* APPLY LINK */}
            <div>
              <label className="careerLabel">
                Apply Link *
              </label>

              <input
                type="text"
                value={applyLink}
                onChange={(e) =>
                  setApplyLink(
                    e.target.value
                  )
                }
                className="careerInput"
                placeholder="https://..."
              />
            </div>

            {/* DEADLINE */}
            <div>
              <label className="careerLabel">
                Deadline
              </label>

              <input
                type="date"
                value={deadline}
                onChange={(e) =>
                  setDeadline(
                    e.target.value
                  )
                }
                className="careerInput"
              />
            </div>
          </div>

          {/* SKILLS */}
          <div
            style={{
              marginTop: "22px",
            }}
          >
            <label className="careerLabel">
              Skills
            </label>

            <input
              type="text"
              value={skills}
              onChange={(e) =>
                setSkills(
                  e.target.value
                )
              }
              className="careerInput"
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          {/* DESCRIPTION */}
          <div
            style={{
              marginTop: "22px",
            }}
          >
            <label className="careerLabel">
              Description *
            </label>

            <textarea
              rows="7"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="careerTextarea"
              placeholder="Write full description..."
            />
          </div>

          {/* FEATURED */}
          <div
            style={{
              display: "flex",
              gap: "25px",
              marginTop: "22px",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) =>
                  setFeatured(
                    e.target.checked
                  )
                }
              />

              Featured
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <input
                type="checkbox"
                checked={published}
                onChange={(e) =>
                  setPublished(
                    e.target.checked
                  )
                }
              />

              Published
            </label>
          </div>

          {/* IMAGE */}
          <div
            style={{
              marginTop: "24px",
            }}
          >
            <label className="careerLabel">
              Cover Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={
                handleCoverImage
              }
              className="careerInput"
            />
          </div>

          {/* PREVIEW */}
          {coverImagePreview && (
            <div
              style={{
                marginTop: "25px",
              }}
            >
              <img
                src={
                  coverImagePreview
                }
                alt="preview"
                style={{
                  width: "100%",
                  maxHeight: "350px",
                  objectFit: "cover",
                  borderRadius:
                    "20px",
                  border:
                    "1px solid #27272a",
                }}
              />
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "30px",
              width: "100%",
              padding: "16px",
              borderRadius: "18px",
              border: "none",
              cursor: "pointer",
              fontWeight: "800",
              fontSize: "16px",
              background:
                "linear-gradient(135deg,#06b6d4,#3b82f6)",
              color: "#fff",
            }}
          >
            {loading
              ? "UPDATING..."
              : "UPDATE CAREER"}
          </button>
        </form>
      </div>

      {/* CSS */}
      <style>{`
        .careerLabel{
          display:block;
          margin-bottom:10px;
          font-size:14px;
          font-weight:700;
          color:#d4d4d8;
        }

        .careerInput{
          width:100%;
          background:#18181b;
          border:1px solid #27272a;
          border-radius:16px;
          padding:14px 16px;
          color:#fff;
          font-size:14px;
          outline:none;
        }

        .careerInput:focus{
          border-color:#06b6d4;
        }

        .careerTextarea{
          width:100%;
          background:#18181b;
          border:1px solid #27272a;
          border-radius:16px;
          padding:16px;
          color:#fff;
          font-size:14px;
          outline:none;
          resize:none;
        }

        .careerTextarea:focus{
          border-color:#06b6d4;
        }
      `}</style>
    </div>
  );
};

export default UpdateCareer;