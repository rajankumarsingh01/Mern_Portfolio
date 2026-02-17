// import { Card } from "@/components/ui/card";
// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const Skills = () => {
//   const [skills, setSkills] = useState([]);
//   useEffect(() => {
//     const getMySkills = async () => {
//       const { data } = await axios.get(
//         "http://localhost:4000/api/v1/skill/getall",
//         { withCredentials: true }
//       );
//       setSkills(data.skills);
//     };
//     getMySkills();
//   }, []);
//   return (
//     <div className="w-full flex flex-col gap-8 sm:gap-12">
//       <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
//       lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
//         SKILLS
//       </h1>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//         {skills &&
//           skills.map((element) => {
//             return (
//               <Card className="h-fit p-7 flex flex-col justify-center items-center gap-3" key={element._id}>
//                 <img
//                   src={element.svg && element.svg.url}
//                   alt="skill"
//                   className="h-12 sm:h-24 w-auto"
//                 />
//                 <p className="text-muted-foreground text-center">
//                   {element.title}
//                 </p>
//               </Card>
//             );
//           })}
//       </div>
//     </div>
//   );
// };

// export default Skills;




import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const getMySkills = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/skill/getall",
        { withCredentials: true }
      );
      setSkills(data.skills);
    };
    getMySkills();
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto py-20 px-6 overflow-hidden">
      
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          My <span className="text-green-500">Skills</span>
        </h1>
        <div className="w-20 h-1 bg-green-500 mx-auto mt-4 rounded-full"></div>
      </motion.div>

      {/* Floating Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {skills?.map((element, index) => (
          <motion.div
            key={element._id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3 + (index % 3),
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.1,
              rotate: 2,
            }}
            className="cursor-pointer"
          >
            <Card className="p-6 flex flex-col items-center gap-4 
            bg-white/5 backdrop-blur-md border border-white/10 
            hover:border-green-400 transition-all duration-300 
            rounded-2xl shadow-lg">
              
              <motion.img
                src={element.svg?.url}
                alt={element.title}
                className="h-12 md:h-14 w-auto"
                whileHover={{ rotate: -5 }}
              />

              <p className="text-sm md:text-base text-gray-300 font-medium text-center">
                {element.title}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
