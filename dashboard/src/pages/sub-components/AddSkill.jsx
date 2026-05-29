








import React, { useEffect, useState } from "react";

import {
  Sparkles,
  Upload,
  Code2,
  BarChart3,
  ImageIcon,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";

import {
  addNewSkill,
  clearAllSkillErrors,
  getAllSkills,
  resetSkillSlice,
} from "@/store/slices/skillSlice";

import SpecialLoadingButton from "./SpecialLoadingButton";

const AddSkill = () => {
  const [title, setTitle] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [svg, setSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");


  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const { loading, message, error } = useSelector(
    (state) => state.skill
  );

  const handleSvg = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setSvgPreview(reader.result);
      setSvg(file);
    };
  };

  const handleAddNewSkill = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("proficiency", proficiency);
    formData.append("category", category);
    formData.append("svg", svg);

    dispatch(addNewSkill(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }

    if (message) {
      toast.success(message);

      dispatch(resetSkillSlice());
      dispatch(getAllSkills());

      setTitle("");
      setProficiency("");
      setSvg("");
      setSvgPreview("");
    }
  }, [dispatch, error, message]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-4 py-10 md:px-8">
        {/* HEADER */}

        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2">
            <Sparkles
              size={16}
              className="text-cyan-400"
            />

            <span className="text-sm text-zinc-300">
              Skills Management
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Add New Skill
          </h1>

          <p className="mt-2 text-zinc-400">
            Showcase your technologies and expertise.
          </p>
        </div>

        {/* FORM CARD */}

        <form
          onSubmit={handleAddNewSkill}
          className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl md:p-8"
        >
          <div className="space-y-6">
            {/* TITLE */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Skill Name
              </label>

              <div className="relative">
                <Code2 className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" />

                <input
                  type="text"
                  placeholder="React.js"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-800 pl-11 pr-4 text-white placeholder:text-zinc-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            {/* PROFICIENCY */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Proficiency (%)
              </label>

              <div className="relative">
                <BarChart3 className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" />

                <input
                  type="number"
                  placeholder="90"
                  value={proficiency}
                  onChange={(e) =>
                    setProficiency(e.target.value)
                  }
                  className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-800 pl-11 pr-4 text-white placeholder:text-zinc-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>



              {/* CATEGORY */}

<div>
  <label className="mb-2 block text-sm font-medium text-zinc-300">
    Skill Category
  </label>

  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 text-white focus:border-cyan-500 focus:outline-none"
  >
    <option value="">Select Category</option>

    <option value="Frontend">Frontend</option>

    <option value="Backend">Backend</option>

    <option value="Database">Database</option>

    <option value="DevOps">DevOps</option>

    <option value="Tools">Tools</option>

    <option value="Mobile">Mobile</option>

    <option value="AI/ML">AI/ML</option>
  </select>
</div>

              {/* PROGRESS PREVIEW */}

              {proficiency && (
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-zinc-400">
                      Skill Progress
                    </span>

                    <span className="font-medium text-cyan-400">
                      {proficiency}%
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                      style={{
                        width: `${proficiency}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* SVG UPLOAD */}

            <div>
              <label className="mb-3 block text-sm font-medium text-zinc-300">
                Skill Icon / SVG
              </label>

              <label className="flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-700 bg-zinc-800 p-6 transition hover:border-cyan-500 hover:bg-zinc-800/80">
                {svgPreview ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={svgPreview}
                      alt="Preview"
                      className="mb-4 h-28 w-28 object-contain"
                    />

                    <p className="text-sm text-cyan-400">
                      Preview Ready
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900">
                      <ImageIcon className="h-10 w-10 text-cyan-400" />
                    </div>

                    <h3 className="text-lg font-semibold text-white">
                      Upload Skill Icon
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500">
                      SVG, PNG, JPG up to 10MB
                    </p>

                    <div className="mt-5 flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-white">
                      <Upload className="h-4 w-4" />

                      Choose File
                    </div>
                  </>
                )}

                <input
                  type="file"
                  className="hidden"
                  onChange={handleSvg}
                />
              </label>
            </div>

            {/* SUBMIT */}

            <div className="pt-4">
              {!loading ? (
                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-cyan-500 text-base font-semibold text-white transition hover:bg-cyan-600"
                >
                  Add Skill
                </Button>
              ) : (
                <SpecialLoadingButton
                  content={"Adding New Skill"}
                  width={"w-full"}
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSkill;