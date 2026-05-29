import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addCareerItem,
  clearAllCareerErrors,
} from "@/store/slices/careerSlice";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCareer = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, message } =
    useSelector((state) => state.career);

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

  const [skills, setSkills] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [applyLink, setApplyLink] =
    useState("");

  const [careerImg, setcareerImg] =
    useState("");

  const [careerImgPreview, setcareerImgPreview] =
    useState("");

  // IMAGE HANDLER
  const handlecareerImg = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // IMAGE VALIDATION
    if (!file.type.startsWith("image/")) {
      toast.error(
        "Please select a valid image"
      );

      return;
    }

    // SIZE VALIDATION
    if (file.size > 5 * 1024 * 1024) {
      toast.error(
        "Image size should be less than 5MB"
      );

      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setcareerImg(file);

      setcareerImgPreview(reader.result);
    };
  };

  // SUBMIT
const handleAddCareer = (e) => {
  e.preventDefault();

  if (!title || !company || !location || !duration || !description) {
    toast.error("Please fill all required fields");
    return;
  }

  const formData = new FormData();

  formData.append("title", title);
  formData.append("category", category);
  formData.append("company", company);
  formData.append("location", location);
  formData.append("mode", mode);
  formData.append("duration", duration);
  formData.append("stipend", stipend);
  formData.append("salary", salary);
  formData.append("description", description);
  formData.append("applyLink", applyLink);

  // skills (optional better handling)
  formData.append("skills", skills);

  if (careerImg) {
    formData.append("careerImg", careerImg);
  }

  dispatch(addCareerItem(formData));
};
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
          maxWidth: "900px",
          margin: "0 auto",
          background: "#111113",
          border: "1px solid #27272a",
          borderRadius: "30px",
          padding: "35px",
        }}
      >
        {/* TOP */}
        <div style={{ marginBottom: "30px" }}>
          <h1
            style={{
              fontSize: "38px",
              fontWeight: "800",
              marginBottom: "10px",
            }}
          >
            Add Career
          </h1>

          <p
            style={{
              color: "#71717a",
              fontSize: "15px",
            }}
          >
            Add internship, jobs or training
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleAddCareer}>
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
                Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Frontend Internship"
                className="careerInput"
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
                  setCategory(e.target.value)
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
                Company
              </label>

              <input
                type="text"
                value={company}
                onChange={(e) =>
                  setCompany(e.target.value)
                }
                placeholder="Google"
                className="careerInput"
              />
            </div>

            {/* LOCATION */}
            <div>
              <label className="careerLabel">
                Location
              </label>

              <input
                type="text"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                placeholder="Remote"
                className="careerInput"
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
                  setMode(e.target.value)
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
                  setDuration(e.target.value)
                }
                placeholder="3 Months"
                className="careerInput"
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
                  setStipend(e.target.value)
                }
                placeholder="₹15,000/month"
                className="careerInput"
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
                  setSalary(e.target.value)
                }
                placeholder="₹8 LPA"
                className="careerInput"
              />
            </div>

            {/* APPLY LINK */}
            <div>
              <label className="careerLabel">
                Apply Link
              </label>

              <input
                type="text"
                value={applyLink}
                onChange={(e) =>
                  setApplyLink(
                    e.target.value
                  )
                }
                placeholder="https://..."
                className="careerInput"
              />
            </div>
          </div>

          {/* SKILLS */}
          <div style={{ marginTop: "22px" }}>
            <label className="careerLabel">
              Skills
            </label>

            <input
              type="text"
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value)
              }
              placeholder="React, Node.js"
              className="careerInput"
            />
          </div>

          {/* DESCRIPTION */}
          <div style={{ marginTop: "22px" }}>
            <label className="careerLabel">
              Description
            </label>

            <textarea
              rows="7"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="Write full description..."
              className="careerTextarea"
            />
          </div>

          {/* careerImg */}
          <div style={{ marginTop: "24px" }}>
            <label className="careerLabel">
              careerImg
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handlecareerImg}
              className="careerInput"
            />
          </div>

          {/* PREVIEW */}
          {careerImgPreview && (
            <div
              style={{
                marginTop: "25px",
              }}
            >
              <img
                src={careerImgPreview}
                alt="preview"
                style={{
                  width: "100%",
                  maxHeight: "350px",
                  objectFit: "cover",
                  borderRadius: "20px",
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
              ? "ADDING..."
              : "ADD CAREER"}
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

export default AddCareer;