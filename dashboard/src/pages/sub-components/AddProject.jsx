




// import React, { useEffect, useState } from "react";
// import {
//   FolderPlus,
//   Link as LinkIcon,
//   Upload,
//   Code2,
//   Globe,
//   DollarSign,
//   ImageIcon,
// } from "lucide-react";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { Textarea } from "@/components/ui/textarea";

// import { useDispatch, useSelector } from "react-redux";

// import { toast } from "react-toastify";

// import {
//   addNewProject,
//   clearAllProjectErrors,
//   getAllProjects,
//   resetProjectSlice,
// } from "@/store/slices/projectSlice";

// import SpecialLoadingButton from "./SpecialLoadingButton";

// const AddProject = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [projectBanner, setProjectBanner] = useState("");
//   const [projectBannerPreview, setProjectBannerPreview] =
//     useState("");

//   const [gitRepoLink, setGitRepoLink] = useState("");
//   const [projectLink, setProjectLink] = useState("");
//   const [technologies, setTechnologies] = useState("");
// const [stack, setStack] = useState(null);
//   const [deployed, setDeployed] = useState("");

//   const [isPaid, setIsPaid] = useState("false");
//   const [price, setPrice] = useState("");
//   const [sourceCode, setSourceCode] = useState(null);

//   const dispatch = useDispatch();

//   const { loading, error, message } = useSelector(
//     (state) => state.project
//   );

//   const handleSvg = (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     const reader = new FileReader();

//     reader.readAsDataURL(file);

//     reader.onload = () => {
//       setProjectBannerPreview(reader.result);
//       setProjectBanner(file);
//     };
//   };

//   const handleSourceCode = (e) => {
//     setSourceCode(e.target.files[0]);
//   };

// const handleAddNewProject = (e) => {
//   console.log("STACK VALUE:", stack);
// console.log("FORMDATA STACK:", formData.get("stack"));
//   e.preventDefault();

//   if (!title || !description || !stack || !technologies || !deployed || !projectBanner) {
//     toast.error("Please fill all required fields properly");
//     return;
//   }

//   const formData = new FormData();

//   formData.append("title", title);
//   formData.append("description", description);
//   formData.append("gitRepoLink", gitRepoLink);
//   formData.append("projectLink", projectLink);
//   formData.append("technologies", technologies);

//   // 🔥 IMPORTANT FIX
//   if (!stack) {
//     toast.error("Stack is required");
//     return;
//   }

//   formData.append("stack", stack);
//   formData.append("deployed", deployed);
//   formData.append("projectBanner", projectBanner);
//   formData.append("isPaid", isPaid);
//   formData.append("price", price);

//   if (sourceCode) {
//     formData.append("sourceCode", sourceCode);
//   }

//   dispatch(addNewProject(formData));
// };
//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearAllProjectErrors());
//     }

//     if (message) {
//       toast.success(message);
//       dispatch(resetProjectSlice());
//       dispatch(getAllProjects());
//     }
//   }, [dispatch, error, message]);

//   return (
//     <div className="min-h-screen bg-zinc-950 text-white">
//       <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
//         {/* HEADER */}

//         <div className="mb-10">
//           <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2">
//             <FolderPlus
//               size={16}
//               className="text-cyan-400"
//             />

//             <span className="text-sm text-zinc-300">
//               Project Management
//             </span>
//           </div>

//           <h1 className="text-4xl font-bold tracking-tight">
//             Add New Project
//           </h1>

//           <p className="mt-2 text-zinc-400">
//             Upload and manage your portfolio projects.
//           </p>
//         </div>

//         {/* FORM */}

//         <form
//           onSubmit={handleAddNewProject}
//           className="space-y-8"
//         >
//           <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 md:p-8 shadow-2xl">
//             <div className="grid gap-6 md:grid-cols-2">
//               {/* TITLE */}

//               <div className="md:col-span-2">
//                 <label className="mb-2 block text-sm font-medium text-zinc-300">
//                   Project Title
//                 </label>

//                 <input
//                   type="text"
//                   placeholder="MERN Portfolio"
//                   value={title}
//                   onChange={(e) =>
//                     setTitle(e.target.value)
//                   }
//                   className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 text-white placeholder:text-zinc-500 focus:border-cyan-500 focus:outline-none"
//                 />
//               </div>

//               {/* DESCRIPTION */}

//               <div className="md:col-span-2">
//                 <label className="mb-2 block text-sm font-medium text-zinc-300">
//                   Description
//                 </label>

//                 <Textarea
//                   placeholder="Write project features..."
//                   value={description}
//                   onChange={(e) =>
//                     setDescription(e.target.value)
//                   }
//                   className="min-h-[140px] border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus:border-cyan-500"
//                 />
//               </div>

//               {/* TECHNOLOGIES */}

//               <div className="md:col-span-2">
//                 <label className="mb-2 block text-sm font-medium text-zinc-300">
//                   Technologies
//                 </label>

//                 <Textarea
//                   placeholder="React, Node, MongoDB..."
//                   value={technologies}
//                   onChange={(e) =>
//                     setTechnologies(e.target.value)
//                   }
//                   className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus:border-cyan-500"
//                 />
//               </div>

//               {/* STACK */}

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-zinc-300">
//                   Project Stack
//                 </label>

//                 <Select
//                   value={stack}
//                   onValueChange={(value) =>
//                     setStack(value)
//                   }
//                 >
//                   <SelectTrigger className="h-12 border-zinc-700 bg-zinc-800 text-white">
//                     <SelectValue placeholder="Select Stack" />
//                   </SelectTrigger>

//                   <SelectContent className="border-zinc-700 bg-zinc-900 text-white">
//                     <SelectItem value="Full Stack">
//                       Full Stack
//                     </SelectItem>

//                     <SelectItem value="MERN">
//                       MERN
//                     </SelectItem>

//                     <SelectItem value="MEAN">
//                       MEAN
//                     </SelectItem>

//                     <SelectItem value="Next.js">
//                       Next.js
//                     </SelectItem>

//                     <SelectItem value="React.js">
//                       React.js
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* DEPLOYED */}

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-zinc-300">
//                   Deployment Status
//                 </label>

//                 <Select
//                   value={deployed}
//                   onValueChange={(value) =>
//                     setDeployed(value)
//                   }
//                 >
//                   <SelectTrigger className="h-12 border-zinc-700 bg-zinc-800 text-white">
//                     <SelectValue placeholder="Is deployed?" />
//                   </SelectTrigger>

//                   <SelectContent className="border-zinc-700 bg-zinc-900 text-white">
//                     <SelectItem value="Yes">
//                       Yes
//                     </SelectItem>

//                     <SelectItem value="No">
//                       No
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* PAID */}

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-zinc-300">
//                   Project Type
//                 </label>

//                 <Select
//                   value={isPaid}
//                   onValueChange={(value) =>
//                     setIsPaid(value)
//                   }
//                 >
//                   <SelectTrigger className="h-12 border-zinc-700 bg-zinc-800 text-white">
//                     <SelectValue placeholder="Select Type" />
//                   </SelectTrigger>

//                   <SelectContent className="border-zinc-700 bg-zinc-900 text-white">
//                     <SelectItem value="true">
//                       Paid
//                     </SelectItem>

//                     <SelectItem value="false">
//                       Free
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* PRICE */}

//               {isPaid === "true" && (
//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-zinc-300">
//                     Price
//                   </label>

//                   <div className="relative">
//                     <DollarSign className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />

//                     <input
//                       type="number"
//                       placeholder="499"
//                       value={price}
//                       onChange={(e) =>
//                         setPrice(e.target.value)
//                       }
//                       className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-800 pl-10 pr-4 text-white placeholder:text-zinc-500 focus:border-cyan-500 focus:outline-none"
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* GITHUB */}

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-zinc-300">
//                   GitHub Link
//                 </label>

//                 <div className="relative">
//                   <Code2 className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />

//                   <input
//                     type="text"
//                     placeholder="GitHub Repository URL"
//                     value={gitRepoLink}
//                     onChange={(e) =>
//                       setGitRepoLink(e.target.value)
//                     }
//                     className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-800 pl-10 pr-4 text-white placeholder:text-zinc-500 focus:border-cyan-500 focus:outline-none"
//                   />
//                 </div>
//               </div>

//               {/* LIVE */}

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-zinc-300">
//                   Live Project Link
//                 </label>

//                 <div className="relative">
//                   <Globe className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />

//                   <input
//                     type="text"
//                     placeholder="Live Website URL"
//                     value={projectLink}
//                     onChange={(e) =>
//                       setProjectLink(e.target.value)
//                     }
//                     className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-800 pl-10 pr-4 text-white placeholder:text-zinc-500 focus:border-cyan-500 focus:outline-none"
//                   />
//                 </div>
//               </div>

//               {/* SOURCE CODE */}

//               {isPaid === "true" && (
//                 <div className="md:col-span-2">
//                   <label className="mb-2 block text-sm font-medium text-zinc-300">
//                     Upload Source Code
//                   </label>

//                   <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-zinc-700 bg-zinc-800 px-6 py-8 transition hover:border-cyan-500">
//                     <Upload className="h-5 w-5 text-cyan-400" />

//                     <span className="text-zinc-300">
//                       Upload ZIP / RAR / 7Z File
//                     </span>

//                     <input
//                       type="file"
//                       accept=".zip,.rar,.7z"
//                       onChange={handleSourceCode}
//                       className="hidden"
//                     />
//                   </label>
//                 </div>
//               )}

//               {/* BANNER */}

//               <div className="md:col-span-2">
//                 <label className="mb-3 block text-sm font-medium text-zinc-300">
//                   Project Banner
//                 </label>

//                 <label className="flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-700 bg-zinc-800 p-6 transition hover:border-cyan-500">
//                   {projectBannerPreview ? (
//                     <img
//                       src={projectBannerPreview}
//                       alt="Preview"
//                       className="max-h-[300px] rounded-2xl object-cover"
//                     />
//                   ) : (
//                     <>
//                       <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900">
//                         <ImageIcon className="h-10 w-10 text-cyan-400" />
//                       </div>

//                       <h3 className="text-lg font-semibold text-white">
//                         Upload Banner
//                       </h3>

//                       <p className="mt-2 text-sm text-zinc-500">
//                         PNG, JPG, GIF up to 10MB
//                       </p>
//                     </>
//                   )}

//                   <input
//                     type="file"
//                     className="hidden"
//                     onChange={handleSvg}
//                   />
//                 </label>
//               </div>
//             </div>

//             {/* SUBMIT */}

//             <div className="mt-10 flex justify-end">
//               {loading ? (
//                 <SpecialLoadingButton
//                   content={"ADDING PROJECT"}
//                   width={"w-56"}
//                 />
//               ) : (
//                 <button
//                   type="submit"
//                   className="h-12 rounded-xl bg-cyan-500 px-8 font-semibold text-white transition hover:bg-cyan-600"
//                 >
//                   Add Project
//                 </button>
//               )}
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProject;




















import React, { useEffect, useState } from "react";
import {
  FolderPlus, Upload, Code2, Globe, DollarSign, ImageIcon,
} from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addNewProject, clearAllProjectErrors, getAllProjects, resetProjectSlice,
} from "@/store/slices/projectSlice";
import SpecialLoadingButton from "./SpecialLoadingButton";

const AddProject = () => {
  const [title, setTitle]                       = useState("");
  const [description, setDescription]           = useState("");
  const [projectBanner, setProjectBanner]       = useState(null);
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const [gitRepoLink, setGitRepoLink]           = useState("");
  const [projectLink, setProjectLink]           = useState("");
  const [technologies, setTechnologies]         = useState("");
  const [stack, setStack]                       = useState("");
  const [deployed, setDeployed]                 = useState("");
  const [isPaid, setIsPaid]                     = useState("false");
  const [price, setPrice]                       = useState("");
  const [sourceCode, setSourceCode]             = useState(null);
  const [sourceCodeName, setSourceCodeName]     = useState("");

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.project);

  const handleBanner = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBannerPreview(reader.result);
      setProjectBanner(file);
    };
  };

  const handleSourceCode = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSourceCode(file);
    setSourceCodeName(file.name);
  };

  const handleAddNewProject = (e) => {
    e.preventDefault();

    // ── Validation ─────────────────────────────────────────────────────────
    if (!title.trim()) { toast.error("Title is required"); return; }
    if (!description.trim()) { toast.error("Description is required"); return; }
    if (!stack) { toast.error("Stack is required"); return; }
    if (!technologies.trim()) { toast.error("Technologies are required"); return; }
    if (!deployed) { toast.error("Deployment status is required"); return; }
    if (!projectBanner) { toast.error("Project banner is required"); return; }
    if (isPaid === "true" && (!price || Number(price) <= 0)) {
      toast.error("Please enter a valid price for paid project");
      return;
    }

    // ── Build FormData ──────────────────────────────────────────────────────
    const formData = new FormData();
    formData.append("title",        title.trim());
    formData.append("description",  description.trim());
    formData.append("gitRepoLink",  gitRepoLink.trim());
    formData.append("projectLink",  projectLink.trim());
    formData.append("technologies", technologies.trim());
    formData.append("stack",        stack);
    formData.append("deployed",     deployed);
    formData.append("projectBanner", projectBanner);
    formData.append("isPaid",       isPaid);
    formData.append("price",        isPaid === "true" ? price : "0");

    if (isPaid === "true" && sourceCode) {
      formData.append("sourceCode", sourceCode);
    }

    dispatch(addNewProject(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
      // Reset form
      setTitle(""); setDescription(""); setGitRepoLink(""); setProjectLink("");
      setTechnologies(""); setStack(""); setDeployed(""); setIsPaid("false");
      setPrice(""); setProjectBanner(null); setProjectBannerPreview("");
      setSourceCode(null); setSourceCodeName("");
    }
  }, [dispatch, error, message]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">

        {/* HEADER */}
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2">
            <FolderPlus size={16} className="text-cyan-400" />
            <span className="text-sm text-zinc-300">Project Management</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Add New Project</h1>
          <p className="mt-2 text-zinc-400">Upload and manage your portfolio projects.</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleAddNewProject} className="space-y-8">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 md:p-8 shadow-2xl">
            <div className="grid gap-6 md:grid-cols-2">

              {/* TITLE */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Project Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="MERN Portfolio"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 text-white placeholder:text-zinc-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Description <span className="text-red-400">*</span>
                </label>
                <Textarea
                  placeholder="Write project features..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[140px] border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus:border-cyan-500"
                />
              </div>

              {/* TECHNOLOGIES */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Technologies <span className="text-red-400">*</span>
                </label>
                <Textarea
                  placeholder="React, Node.js, MongoDB, Express..."
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus:border-cyan-500"
                />
              </div>

              {/* STACK */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Project Stack <span className="text-red-400">*</span>
                </label>
                <Select value={stack} onValueChange={setStack}>
                  <SelectTrigger className="h-12 border-zinc-700 bg-zinc-800 text-white">
                    <SelectValue placeholder="Select Stack" />
                  </SelectTrigger>
                  <SelectContent className="border-zinc-700 bg-zinc-900 text-white">
                    <SelectItem value="Full Stack">Full Stack</SelectItem>
                    <SelectItem value="MERN">MERN</SelectItem>
                    <SelectItem value="MEAN">MEAN</SelectItem>
                    <SelectItem value="Next.js">Next.js</SelectItem>
                    <SelectItem value="React.js">React.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* DEPLOYED */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Deployment Status <span className="text-red-400">*</span>
                </label>
                <Select value={deployed} onValueChange={setDeployed}>
                  <SelectTrigger className="h-12 border-zinc-700 bg-zinc-800 text-white">
                    <SelectValue placeholder="Is deployed?" />
                  </SelectTrigger>
                  <SelectContent className="border-zinc-700 bg-zinc-900 text-white">
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* PAID TYPE */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Project Type
                </label>
                <Select value={isPaid} onValueChange={setIsPaid}>
                  <SelectTrigger className="h-12 border-zinc-700 bg-zinc-800 text-white">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent className="border-zinc-700 bg-zinc-900 text-white">
                    <SelectItem value="true">Paid</SelectItem>
                    <SelectItem value="false">Free</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* PRICE */}
              {isPaid === "true" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Price (₹) <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />
                    <input
                      type="number"
                      placeholder="499"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      min="1"
                      className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-800 pl-10 pr-4 text-white placeholder:text-zinc-500 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* GITHUB */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">GitHub Link</label>
                <div className="relative">
                  <Code2 className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="https://github.com/..."
                    value={gitRepoLink}
                    onChange={(e) => setGitRepoLink(e.target.value)}
                    className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-800 pl-10 pr-4 text-white placeholder:text-zinc-500 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* LIVE LINK */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Live Project Link</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="https://myproject.vercel.app"
                    value={projectLink}
                    onChange={(e) => setProjectLink(e.target.value)}
                    className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-800 pl-10 pr-4 text-white placeholder:text-zinc-500 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* SOURCE CODE UPLOAD */}
              {isPaid === "true" && (
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Upload Source Code (ZIP / RAR / 7Z)
                  </label>
                  <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-zinc-700 bg-zinc-800 px-6 py-8 transition hover:border-cyan-500">
                    <Upload className="h-5 w-5 text-cyan-400" />
                    <span className="text-zinc-300">
                      {sourceCodeName || "Click to upload source code file"}
                    </span>
                    <input
                      type="file"
                      accept=".zip,.rar,.7z"
                      onChange={handleSourceCode}
                      className="hidden"
                    />
                  </label>
                  {sourceCodeName && (
                    <p className="mt-2 text-xs text-green-400">✓ {sourceCodeName} selected</p>
                  )}
                </div>
              )}

              {/* BANNER */}
              <div className="md:col-span-2">
                <label className="mb-3 block text-sm font-medium text-zinc-300">
                  Project Banner <span className="text-red-400">*</span>
                </label>
                <label className="flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-700 bg-zinc-800 p-6 transition hover:border-cyan-500">
                  {projectBannerPreview ? (
                    <img
                      src={projectBannerPreview}
                      alt="Preview"
                      className="max-h-[300px] rounded-2xl object-contain"
                    />
                  ) : (
                    <>
                      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900">
                        <ImageIcon className="h-10 w-10 text-cyan-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Upload Banner</h3>
                      <p className="mt-2 text-sm text-zinc-500">PNG, JPG, GIF up to 10MB</p>
                    </>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleBanner} />
                </label>
                {projectBanner && (
                  <p className="mt-2 text-xs text-green-400">✓ {projectBanner.name} selected</p>
                )}
              </div>
            </div>

            {/* SUBMIT */}
            <div className="mt-10 flex justify-end">
              {loading ? (
                <SpecialLoadingButton content={"ADDING PROJECT"} width={"w-56"} />
              ) : (
                <button
                  type="submit"
                  className="h-12 rounded-xl bg-cyan-500 px-8 font-semibold text-white transition hover:bg-cyan-600 disabled:opacity-50"
                >
                  Add Project
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;