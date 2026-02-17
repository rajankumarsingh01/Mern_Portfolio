// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Portfolio = () => {
//   const [viewAll, setViewAll] = useState(false);
//   const [projects, setProjects] = useState([]);
//   useEffect(() => {
//     const getMyProjects = async () => {
//       const { data } = await axios.get(
//         "https://mern-portfolio-backend-ke5j.onrender.com/api/v1/project/getall",
//         { withCredentials: true }
//       );
//       setProjects(data.projects);
//     };
//     getMyProjects();
//   }, []);
//   return (
//     <div>
//       <div className="relative mb-12">
//         <h1
//           className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
//           lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
//           mx-auto w-fit font-extrabold about-h1"
//           style={{
//             background: "hsl(222.2 84% 4.9%)",
//           }}
//         >
//           MY{" "}
//           <span className="text-tubeLight-effect font-extrabold">
//             PORTFOLIO
//           </span>
//         </h1>
//         <h1
//           className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
//           md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
//           tracking-[15px] mx-auto w-fit font-extrabold about-h1"
//           style={{
//             background: "hsl(222.2 84% 4.9%)",
//           }}
//         >
//           MY <span className="text-tubeLight-effect font-extrabold">WORK</span>
//         </h1>
//         <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {viewAll
//           ? projects &&
//             projects.map((element) => {
//               return (
//                 <Link to={`/project/${element._id}`} key={element._id}>
//                   <img
//                     src={element.projectBanner && element.projectBanner.url}
//                     alt={element.title}
//                   />
//                 </Link>
//               );
//             })
//           : projects &&
//             projects.slice(0, 9).map((element) => {
//               return (
//                 <Link to={`/project/${element._id}`} key={element._id}>
//                   <img
//                     src={element.projectBanner && element.projectBanner.url}
//                     alt={element.title}
//                   />
//                 </Link>
//               );
//             })}
//       </div>
//       {projects && projects.length > 9 && (
//         <div className="w-full text-center my-9">
//           <Button className="w-52" onClick={() => setViewAll(!viewAll)}>
//             {viewAll ? "Show Less" : "Show More"}
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Portfolio;



import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        "https://mern-portfolio-backend-ke5j.onrender.com/api/v1/project/getall",
        { withCredentials: true }
      );
      setProjects(data.projects);
    };
    getMyProjects();
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto py-20 px-6">
      
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          Selected <span className="text-green-500">Projects</span>
        </h1>
        <div className="w-20 h-1 bg-green-500 mx-auto mt-4 rounded-full"></div>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(viewAll ? projects : projects.slice(0, 9))?.map((element, index) => (
          <motion.div
            key={element._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <Link to={`/project/${element._id}`}>
              <div className="relative group overflow-hidden rounded-2xl shadow-xl cursor-pointer">
                
                {/* Image */}
                <img
                  src={element.projectBanner?.url}
                  alt={element.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 
                group-hover:opacity-100 transition duration-500 
                flex flex-col justify-center items-center text-center p-6">
                  
                  <h3 className="text-white text-lg md:text-xl font-semibold mb-2">
                    {element.title}
                  </h3>

                  <p className="text-gray-300 text-sm">
                    Click to view project
                  </p>
                </div>

              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Show More Button */}
      {projects?.length > 9 && (
        <div className="w-full text-center mt-14">
          <Button
            className="w-52 rounded-full"
            onClick={() => setViewAll(!viewAll)}
          >
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
