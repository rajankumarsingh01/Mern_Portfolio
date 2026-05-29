// import React, { useEffect, useState } from "react";

// import { useNavigate, useParams, Link } from "react-router-dom";

// import { toast } from "react-toastify";

// import axios from "axios";

// import { Button } from "@/components/ui/button";

// const ViewProject = () => {
//   const [project, setProject] = useState(null);

//   const { id } = useParams();

//   const navigateTo = useNavigate();

//   useEffect(() => {
//     const getProject = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:4000/api/v1/project/get/${id}`,
//           {
//             withCredentials: true,
//           }
//         );

//         setProject(res.data.project);
//       } catch (error) {
//         toast.error(error.response.data.message);
//       }
//     };

//     getProject();
//   }, [id]);

//   const handleReturnToDashboard = () => {
//     navigateTo("/");
//   };

//   if (!project) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         Loading...
//       </div>
//     );
//   }

//   const descriptionList =
//     project.description.split(". ");

//   const technologiesList =
//     project.technologies.split(", ");

//   return (
//     <div className="flex justify-center items-center min-h-screen py-10 px-4">
//       <div className="w-full max-w-5xl">

//         {/* TOP BAR */}

//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-4xl font-bold">
//             Project Details
//           </h1>

//           <Button onClick={handleReturnToDashboard}>
//             Return To Dashboard
//           </Button>
//         </div>

//         {/* BANNER */}

//         <img
//           src={project.projectBanner?.url}
//           alt={project.title}
//           className="w-full rounded-xl mb-8"
//         />

//         {/* TITLE */}

//         <h2 className="text-3xl font-bold mb-6">
//           {project.title}
//         </h2>

//         {/* DESCRIPTION */}

//         <div className="mb-8">
//           <h3 className="text-2xl font-semibold mb-3">
//             Description
//           </h3>

//           <ul className="list-disc pl-5 space-y-2">
//             {descriptionList.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>

//         {/* TECHNOLOGIES */}

//         <div className="mb-8">
//           <h3 className="text-2xl font-semibold mb-3">
//             Technologies
//           </h3>

//           <div className="flex flex-wrap gap-3">
//             {technologiesList.map((tech, index) => (
//               <span
//                 key={index}
//                 className="bg-black text-white px-4 py-2 rounded-full"
//               >
//                 {tech}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* STACK */}

//         <div className="mb-5">
//           <h3 className="text-2xl font-semibold mb-2">
//             Stack
//           </h3>

//           <p>{project.stack}</p>
//         </div>

//         {/* DEPLOYED */}

//         <div className="mb-5">
//           <h3 className="text-2xl font-semibold mb-2">
//             Deployed
//           </h3>

//           <p>{project.deployed}</p>
//         </div>

//         {/* PAID */}

//         <div className="mb-5">
//           <h3 className="text-2xl font-semibold mb-2">
//             Project Type
//           </h3>

//           <p>
//             {project.isPaid
//               ? `Paid Project ₹${project.price}`
//               : "Free Project"}
//           </p>
//         </div>

//         {/* GITHUB */}

//         <div className="mb-5">
//           <h3 className="text-2xl font-semibold mb-2">
//             Github Repository
//           </h3>

//           <Link
//             to={project.gitRepoLink}
//             target="_blank"
//             className="text-blue-600"
//           >
//             {project.gitRepoLink}
//           </Link>
//         </div>

//         {/* LIVE LINK */}

//         <div className="mb-5">
//           <h3 className="text-2xl font-semibold mb-2">
//             Live Project
//           </h3>

//           <Link
//             to={project.projectLink}
//             target="_blank"
//             className="text-blue-600"
//           >
//             {project.projectLink}
//           </Link>
//         </div>

//         {/* SOURCE CODE */}

//         {project.isPaid &&
//           project.sourceCode?.url && (
//             <div className="mb-5">
//               <h3 className="text-2xl font-semibold mb-2">
//                 Source Code ZIP
//               </h3>

//               <a
//                 href={project.sourceCode.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-green-600 text-white px-5 py-3 rounded-lg inline-block"
//               >
//                 Download Source Code
//               </a>
//             </div>
//           )}
//       </div>
//     </div>
//   );
// };

// export default ViewProject;





import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ViewProject = () => {
  const [project, setProject] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const { id } = useParams();
  const navigateTo = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/project/get/${id}`,
          { withCredentials: true }
        );
        setProject(res.data.project);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load project");
      }
    };
    getProject();
  }, [id]);

  if (!project) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

const handleDownload = async () => {
  try {
    setDownloading(true);

    const token = localStorage.getItem("adminToken");
    console.log("TOKEN:", token);  // token hai ya null?

    const url = `http://localhost:4000/api/v1/project/download/admin/${project._id}`;
    console.log("HITTING URL:", url);  // URL sahi hai?

    const response = await fetch(url, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("RESPONSE STATUS:", response.status);  // kya status aaya?
    console.log("RESPONSE OK:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("ERROR BODY:", errorText);  // exact error kya hai?
      throw new Error(errorText);
    }

    const blob = await response.blob();
    console.log("BLOB SIZE:", blob.size);  // blob empty toh nahi?
    console.log("BLOB TYPE:", blob.type);

    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${project.title}-source-code.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(blobUrl);
    toast.success("Download started!");

  } catch (err) {
    console.error("FULL ERROR:", err);
    toast.error("Download failed: " + err.message);
  } finally {
    setDownloading(false);
  }
};

  const descriptionList  = project.description.split(". ");
  const technologiesList = project.technologies.split(", ");

  return (
    <div className="flex justify-center items-center min-h-screen py-10 px-4">
      <div className="w-full max-w-5xl">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Project Details</h1>
          <Button onClick={() => navigateTo("/")}>Return To Dashboard</Button>
        </div>

        <img
          src={project.projectBanner?.url}
          alt={project.title}
          className="w-full rounded-xl mb-8"
        />

        <h2 className="text-3xl font-bold mb-6">{project.title}</h2>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3">Description</h3>
          <ul className="list-disc pl-5 space-y-2">
            {descriptionList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3">Technologies</h3>
          <div className="flex flex-wrap gap-3">
            {technologiesList.map((tech, index) => (
              <span key={index} className="bg-black text-white px-4 py-2 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <h3 className="text-2xl font-semibold mb-2">Stack</h3>
          <p>{project.stack}</p>
        </div>

        <div className="mb-5">
          <h3 className="text-2xl font-semibold mb-2">Deployed</h3>
          <p>{project.deployed}</p>
        </div>

        <div className="mb-5">
          <h3 className="text-2xl font-semibold mb-2">Project Type</h3>
          <p>{project.isPaid ? `Paid Project ₹${project.price}` : "Free Project"}</p>
        </div>

        <div className="mb-5">
          <h3 className="text-2xl font-semibold mb-2">Github Repository</h3>
          <Link to={project.gitRepoLink} target="_blank" className="text-blue-600">
            {project.gitRepoLink}
          </Link>
        </div>

        <div className="mb-5">
          <h3 className="text-2xl font-semibold mb-2">Live Project</h3>
          <Link to={project.projectLink} target="_blank" className="text-blue-600">
            {project.projectLink}
          </Link>
        </div>

        {project.isPaid && project.sourceCode?.url && (
          <div className="mb-5">
            <h3 className="text-2xl font-semibold mb-2">Source Code ZIP</h3>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="bg-green-600 text-white px-5 py-3 rounded-lg inline-block hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {downloading ? "Downloading..." : "⬇ Download Source Code"}
            </button>
            <p className="text-sm text-gray-400 mt-2">
              File will download automatically
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ViewProject;