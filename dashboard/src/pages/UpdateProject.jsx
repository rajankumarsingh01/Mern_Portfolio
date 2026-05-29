




import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import { Link } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import axios from "axios";

import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

import {
  clearAllProjectErrors,
  getAllProjects,
  resetProjectSlice,
  updateProject,
} from "@/store/slices/projectSlice";

import { Button } from "@/components/ui/button";

const UpdateProject = () => {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [technologies, setTechnologies] = useState("");

  const [stack, setStack] = useState("");

  const [gitRepoLink, setGitRepoLink] = useState("");

  const [deployed, setDeployed] = useState("");

  const [projectLink, setProjectLink] = useState("");

  const [projectBanner, setProjectBanner] = useState("");

  const [projectBannerPreview, setProjectBannerPreview] =
    useState("");

  // NEW STATES
  const [isPaid, setIsPaid] = useState("false");

  const [price, setPrice] = useState("");

  const [sourceCode, setSourceCode] = useState(null);

  const { error, message, loading } = useSelector(
    (state) => state.project
  );

  const dispatch = useDispatch();

  const { id } = useParams();

  // =========================================
  // PROJECT BANNER
  // =========================================

  const handleProjectBanner = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setProjectBannerPreview(reader.result);

      setProjectBanner(file);
    };
  };

  // =========================================
  // SOURCE CODE
  // =========================================

  const handleSourceCode = (e) => {
    setSourceCode(e.target.files[0]);
  };

  // =========================================
  // FETCH PROJECT
  // =========================================

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/project/get/${id}`,
          {
            withCredentials: true,
          }
        );

        const project = res.data.project;

        setTitle(project.title);

        setDescription(project.description);

        setStack(project.stack);

        setDeployed(project.deployed);

        setTechnologies(project.technologies);

        setGitRepoLink(project.gitRepoLink);

        setProjectLink(project.projectLink);

        setIsPaid(project.isPaid ? "true" : "false");

        setPrice(project.price || "");

        setProjectBanner(
          project.projectBanner &&
          project.projectBanner.url
        );

        setProjectBannerPreview(
          project.projectBanner &&
          project.projectBanner.url
        );
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    getProject();

    if (error) {
      toast.error(error);

      dispatch(clearAllProjectErrors());
    }

    if (message) {
      toast.success(message);

      dispatch(resetProjectSlice());

      dispatch(getAllProjects());
    }
  }, [id, message, error]);

  // =========================================
  // UPDATE PROJECT
  // =========================================

  const handleUpdateProject = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);

    formData.append("description", description);

    formData.append("deployed", deployed);

    formData.append("stack", stack);

    formData.append("technologies", technologies);

    formData.append("gitRepoLink", gitRepoLink);

    formData.append("projectLink", projectLink);

    formData.append("projectBanner", projectBanner);

    // NEW
    formData.append("isPaid", isPaid);

    formData.append("price", price);

    if (sourceCode) {
      formData.append("sourceCode", sourceCode);
    }

    dispatch(updateProject(id, formData));
  };

  const navigateTo = useNavigate();

  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  return (
    <>
      <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
        <form
          onSubmit={handleUpdateProject}
          className="w-[100%] px-5 md:w-[1000px] pb-5"
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="flex flex-col gap-2 items-start justify-between sm:items-center sm:flex-row">
                <h2 className="font-semibold leading-7 text-gray-900 text-3xl">
                  UPDATE PROJECT
                </h2>

                <Button onClick={handleReturnToDashboard}>
                  Return to Dashboard
                </Button>
              </div>

              <div className="mt-10 flex flex-col gap-5">
                {/* IMAGE */}
                <div className="w-full sm:col-span-4">
                  <img
                    src={
                      projectBannerPreview
                        ? projectBannerPreview
                        : "/avatarHolder.jpg"
                    }
                    alt="projectBanner"
                    className="w-full h-auto"
                  />

                  <input
                    type="file"
                    onChange={handleProjectBanner}
                    className="mt-4 w-full"
                  />
                </div>

                {/* TITLE */}
                <div>
                  <label>Project Title</label>

                  <input
                    type="text"
                    value={title}
                    onChange={(e) =>
                      setTitle(e.target.value)
                    }
                    className="w-full border p-2"
                  />
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label>Description</label>

                  <Textarea
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                  />
                </div>

                {/* TECHNOLOGIES */}
                <div>
                  <label>Technologies</label>

                  <Textarea
                    value={technologies}
                    onChange={(e) =>
                      setTechnologies(e.target.value)
                    }
                  />
                </div>

                {/* STACK */}
                <div>
                  <label>Stack</label>

                  <Select
                    value={stack}
                    onValueChange={(value) =>
                      setStack(value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Stack" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Full Stack">
                        Full Stack
                      </SelectItem>

                      <SelectItem value="MERN">
                        MERN
                      </SelectItem>

                      <SelectItem value="Next.js">
                        Next.js
                      </SelectItem>

                      <SelectItem value="React">
                        React
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* DEPLOYED */}
                <div>
                  <label>Deployed</label>

                  <Select
                    value={deployed}
                    onValueChange={(value) =>
                      setDeployed(value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Deployed?" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Yes">
                        Yes
                      </SelectItem>

                      <SelectItem value="No">
                        No
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* IS PAID */}
                <div>
                  <label>Paid Project?</label>

                  <Select
                    value={isPaid}
                    onValueChange={(value) =>
                      setIsPaid(value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Paid?" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="true">
                        Paid
                      </SelectItem>

                      <SelectItem value="false">
                        Free
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* PRICE */}
                {isPaid === "true" && (
                  <div>
                    <label>Price</label>

                    <input
                      type="number"
                      value={price}
                      onChange={(e) =>
                        setPrice(e.target.value)
                      }
                      className="w-full border p-2"
                    />
                  </div>
                )}

                {/* SOURCE CODE */}
                {isPaid === "true" && (
                  <div>
                    <label>Upload Source Code ZIP</label>

                    <input
                      type="file"
                      accept=".zip,.rar,.7zip"
                      onChange={handleSourceCode}
                      className="w-full border p-2"
                    />
                  </div>
                )}

                {/* GITHUB */}
                <div>
                  <label>Github Repo Link</label>

                  <input
                    type="text"
                    value={gitRepoLink}
                    onChange={(e) =>
                      setGitRepoLink(e.target.value)
                    }
                    className="w-full border p-2"
                  />
                </div>

                {/* LIVE LINK */}
                <div>
                  <label>Project Link</label>

                  <input
                    type="text"
                    value={projectLink}
                    onChange={(e) =>
                      setProjectLink(e.target.value)
                    }
                    className="w-full border p-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            {loading ? (
              <SpecialLoadingButton
                content={"Updating"}
                width={"w-52"}
              />
            ) : (
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded"
              >
                Update Project
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProject;