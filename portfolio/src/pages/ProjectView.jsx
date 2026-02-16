// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { Button } from "@/components/ui/button";



// const ProjectView = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [technologies, setTechnologies] = useState("");
//   const [stack, setStack] = useState("");
//   const [gitRepoLink, setGitRepoLink] = useState("");
//   const [deployed, setDeployed] = useState("");
//   const [projectLink, setProjectLink] = useState("");
//   const [projectBanner, setProjectBanner] = useState("");
//   const [projectBannerPreview, setProjectBannerPreview] = useState("");
//   const { id } = useParams();

//   useEffect(() => {
//     console.log("Preview:", projectBannerPreview);

//     const getProject = async () => {
//       await axios
//         .get(`http://localhost:4000/api/v1/project/get/${id}`, {
//           withCredentials: true,
//         })
//         .then((res) => {
//           setTitle(res.data.project.title);
//           setDescription(res.data.project.description);
//           setStack(res.data.project.stack);
//           setDeployed(res.data.project.deployed);
//           setTechnologies(res.data.project.technologies);
//           setGitRepoLink(res.data.project.gitRepoLink);
//           setProjectLink(res.data.project.projectLink);
//           setProjectBanner(
//             res.data.project.projectBanner && res.data.project.projectBanner.url
//           );
//           setProjectBannerPreview(
//             res.data.project.projectBanner && res.data.project.projectBanner.url
//           );
//         })
//         .catch((error) => {
//           toast.error(error.response.data.message);
//         });
//     };
//     getProject();
//   }, [id]);




//   // const descriptionList = description.split(". ");
//   // const technologiesList = technologies.split(", ");
//   const descriptionList = description ? description.split(". ") : [];
//   const technologiesList = technologies ? technologies.split(", ") : [];


//   const navigateTo = useNavigate();
//   const handleReturnToPortfolio = () => {
//     navigateTo("/");
//   };

//   return (
//     <>
//       <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
//         <div className="w-[100%] px-5 md:w-[1000px] pb-5">
//           <div className="space-y-12">
//             <div className="border-b border-gray-900/10 pb-12">
//               <div className="flex justify-end">
//                 <Button onClick={handleReturnToPortfolio}>
//                   Return to Portfolio
//                 </Button>
//               </div>
//               <div className="mt-10 flex flex-col gap-5">
//                 <div className="w-full sm:col-span-4">
//                   <h1 className="text-2xl font-bold mb-4">{title}</h1>
//                   {/* <img
//                     src={
//                       projectBannerPreview
//                         ? projectBannerPreview
//                         : "/Rajanprofile.jpeg"
//                     }
//                     alt="projectBanner"
//                     className="w-full h-auto"
//                   /> */}

// <img
//   src={projectBannerPreview ? projectBannerPreview : ""}
//   alt="project"
//   className="w-[300px] h-auto object-contain"
// />







//                 </div>
//                 <div className="w-full sm:col-span-4">
//                   <p className="text-2xl mb-2">Description:</p>
//                   <ul className="list-disc">
//                     {descriptionList.map((item, index) => (
//                       <li key={index}>{item}</li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="w-full sm:col-span-4">
//                   <p className="text-2xl mb-2">Technologies:</p>
//                   <ul className="list-disc">
//                     {technologiesList.map((item, index) => (
//                       <li key={index}>{item}</li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="w-full sm:col-span-4">
//                   <p className="text-2xl mb-2">Stack:</p>
//                   <p>{stack}</p>
//                 </div>
//                 <div className="w-full sm:col-span-4">
//                   <p className="text-2xl mb-2">Deployed:</p>
//                   <p>{deployed}</p>
//                 </div>
//                 <div className="w-full sm:col-span-4">
//                   <p className="text-2xl mb-2">Github Repository Link:</p>
//                   <Link
//                     className="text-sky-700"
//                     target="_blank"
//                     to={gitRepoLink}
//                   >
//                     {gitRepoLink}
//                   </Link>
//                 </div>
//                 <div className="w-full sm:col-span-4">
//                   <p className="text-2xl mb-2">Project Link:</p>
//                   <Link
//                     className="text-sky-700"
//                     target="_blank"
//                     to={projectLink}
//                   >
//                     {projectLink}
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProjectView;



import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState(null);

  const { id } = useParams();
  const navigateTo = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/project/get/${id}`,
          { withCredentials: true }
        );

        const project = res.data.project;

        setTitle(project.title);
        setDescription(project.description);
        setStack(project.stack);
        setDeployed(project.deployed);
        setTechnologies(project.technologies);
        setGitRepoLink(project.gitRepoLink);
        setProjectLink(project.projectLink);
        setProjectBannerPreview(project.projectBanner?.url || null);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch project"
        );
      }
    };

    getProject();
  }, [id]);

  const descriptionList = description ? description.split(". ") : [];
  const technologiesList = technologies ? technologies.split(", ") : [];

  const handleReturnToPortfolio = () => {
    navigateTo("/");
  };

  return (
    <div className="flex mt-7 justify-center items-center min-h-screen sm:gap-4 sm:py-4">
      <div className="w-full px-5 md:w-[1000px] pb-5">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex justify-end">
              <Button onClick={handleReturnToPortfolio}>
                Return to Portfolio
              </Button>
            </div>

            <div className="mt-10 flex flex-col gap-5">

              {/* TITLE */}
              <div>
                <h1 className="text-2xl font-bold mb-4">{title}</h1>

                {/* IMAGE (Only renders if URL exists) */}
                {projectBannerPreview && (
                  <img
                    src={projectBannerPreview}
                    alt={title}
                    className="w-[400px] h-auto object-contain rounded-lg shadow-md"
                  />
                )}
              </div>

              {/* DESCRIPTION */}
              <div>
                <p className="text-2xl mb-2">Description:</p>
                <ul className="list-disc pl-5">
                  {descriptionList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* TECHNOLOGIES */}
              <div>
                <p className="text-2xl mb-2">Technologies:</p>
                <ul className="list-disc pl-5">
                  {technologiesList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* STACK */}
              <div>
                <p className="text-2xl mb-2">Stack:</p>
                <p>{stack}</p>
              </div>

              {/* DEPLOYED */}
              <div>
                <p className="text-2xl mb-2">Deployed:</p>
                <p>{deployed}</p>
              </div>

              {/* GITHUB LINK */}
              <div>
                <p className="text-2xl mb-2">Github Repository Link:</p>
                <a
                  className="text-sky-700 underline"
                  href={gitRepoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {gitRepoLink}
                </a>
              </div>

              {/* PROJECT LINK */}
              <div>
                <p className="text-2xl mb-2">Project Link:</p>
                <a
                  className="text-sky-700 underline"
                  href={projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {projectLink}
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
