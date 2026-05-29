




import React, { useEffect, useState } from "react";

import {
  CalendarRange,
  Clock3,
  GraduationCap,
  Sparkles,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import SpecialLoadingButton from "./SpecialLoadingButton";

import {
  addNewTimeline,
  clearAllTimelineErrors,
  getAllTimeline,
  resetTimelineSlice,
} from "@/store/slices/timelineSlice";

const AddTimeline = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(
    (state) => state.timeline
  );

  const handleAddNewTimeline = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("from", from);
    formData.append("to", to);

    dispatch(addNewTimeline(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }

    if (message) {
      toast.success(message);

      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());

      setTitle("");
      setDescription("");
      setFrom("");
      setTo("");
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
              Timeline Management
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Add New Timeline
          </h1>

          <p className="mt-2 text-zinc-400">
            Showcase your journey, education & career.
          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleAddNewTimeline}
          className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl md:p-8"
        >
          <div className="space-y-7">
            {/* TITLE */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Timeline Title
              </label>

              <div className="relative">
                <GraduationCap className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" />

                <Input
                  type="text"
                  placeholder="Matriculation"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  className="h-12 border-zinc-700 bg-zinc-800 pl-11 text-white placeholder:text-zinc-500 focus:border-cyan-500"
                />
              </div>
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Description
              </label>

              <div className="relative">
                <FileText className="absolute left-3 top-4 h-5 w-5 text-zinc-500" />

                <Textarea
                  placeholder="Describe your achievement or journey..."
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  className="min-h-[140px] border-zinc-700 bg-zinc-800 pl-11 pt-4 text-white placeholder:text-zinc-500 focus:border-cyan-500"
                />
              </div>
            </div>

            {/* FROM & TO */}

            <div className="grid gap-6 md:grid-cols-2">
              {/* FROM */}

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Starting Year
                </label>

                <div className="relative">
                  <Clock3 className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" />

                  <Input
                    type="number"
                    placeholder="2018"
                    value={from}
                    onChange={(e) =>
                      setFrom(e.target.value)
                    }
                    className="h-12 border-zinc-700 bg-zinc-800 pl-11 text-white placeholder:text-zinc-500 focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* TO */}

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Ending Year
                </label>

                <div className="relative">
                  <CalendarRange className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" />

                  <Input
                    type="number"
                    placeholder="2022"
                    value={to}
                    onChange={(e) =>
                      setTo(e.target.value)
                    }
                    className="h-12 border-zinc-700 bg-zinc-800 pl-11 text-white placeholder:text-zinc-500 focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* LIVE PREVIEW */}

            {(title || description) && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <p className="mb-4 text-sm text-zinc-400">
                  Timeline Preview
                </p>

                <div className="flex gap-4">
                  <div className="mt-1 h-4 w-4 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50" />

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {title || "Timeline Title"}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-400">
                      {from || "Start"} - {to || "End"}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                      {description ||
                        "Timeline description preview..."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* BUTTON */}

            <div className="pt-2">
              {!loading ? (
                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-cyan-500 text-base font-semibold text-white transition hover:bg-cyan-600"
                >
                  Add Timeline
                </Button>
              ) : (
                <SpecialLoadingButton
                  content={"Adding Timeline"}
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

export default AddTimeline;