







import React, { useEffect, useState } from "react";

import {
  MonitorSmartphone,
  Upload,
  ImageIcon,
  Sparkles,
  AppWindow,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import {
  addNewSoftwareApplication,
  clearAllSoftwareAppErrors,
  getAllSoftwareApplications,
  resetSoftwareApplicationSlice,
} from "@/store/slices/softwareApplicationSlice";

import SpecialLoadingButton from "./SpecialLoadingButton";

const AddSoftwareApplications = () => {
  const [name, setName] = useState("");
  const [svg, setSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");

  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(
    (state) => state.softwareApplications
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

  const handleAddSoftwareApp = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("svg", svg);

    dispatch(addNewSoftwareApplication(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSoftwareAppErrors());
    }

    if (message) {
      toast.success(message);

      dispatch(resetSoftwareApplicationSlice());
      dispatch(getAllSoftwareApplications());

      setName("");
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
              Software Management
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Add Software Application
          </h1>

          <p className="mt-2 text-zinc-400">
            Showcase tools and applications you use.
          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleAddSoftwareApp}
          className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl md:p-8"
        >
          <div className="space-y-7">
            {/* APP NAME */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Application Name
              </label>

              <div className="relative">
                <AppWindow className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" />

                <input
                  type="text"
                  placeholder="Android Studio"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-800 pl-11 pr-4 text-white placeholder:text-zinc-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            {/* LIVE PREVIEW */}

            {name && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <p className="mb-4 text-sm text-zinc-400">
                  Live Preview
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">
                    {svgPreview ? (
                      <img
                        src={svgPreview}
                        alt="Preview"
                        className="h-10 w-10 object-contain"
                      />
                    ) : (
                      <MonitorSmartphone className="h-8 w-8 text-cyan-400" />
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {name}
                    </h3>

                    <p className="text-sm text-zinc-500">
                      Software Application
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* UPLOAD */}

            <div>
              <label className="mb-3 block text-sm font-medium text-zinc-300">
                Application Icon / SVG
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
                      Upload Application Icon
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

            {/* BUTTON */}

            <div className="pt-2">
              {!loading ? (
                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-cyan-500 text-base font-semibold text-white transition hover:bg-cyan-600"
                >
                  Add Software Application
                </Button>
              ) : (
                <SpecialLoadingButton
                  content="Adding Application"
                  width="w-full"
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSoftwareApplications;