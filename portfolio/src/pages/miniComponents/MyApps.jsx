// import { Card } from "@/components/ui/card";
// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const MyApps = () => {
//   const [apps, setApps] = useState([]);
//   useEffect(() => {
//     const getMyApps = async () => {
//       const { data } = await axios.get(
//         "http://localhost:4000/api/v1/softwareapplication/getall",
//         { withCredentials: true }
//       );
//       setApps(data.softwareApplications);
//     };
//     getMyApps();
//   }, []);
//   return (
//     <div className="w-full flex flex-col gap-8 sm:gap-12">
//       <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
//         MY APPS
//       </h1>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//         {apps &&
//           apps.map((element) => {
//             return (
//               <Card className="h-fit p-7 flex flex-col justify-center items-center gap-3" key={element._id}>
//                 <img
//                   src={element.svg && element.svg.url}
//                   alt="skill"
//                   className="h-12 sm:h-24 w-auto"
//                 />
//                 <p className="text-muted-foreground text-center">
//                   {element.name}
//                 </p>
//               </Card>
//             );
//           })}
//       </div>
//     </div>
//   );
// };

// export default MyApps;




import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

const MyApps = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const getMyApps = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/softwareapplication/getall",
        { withCredentials: true }
      );
      setApps(data.softwareApplications);
    };
    getMyApps();
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto py-20 px-6 overflow-hidden">
      
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          Tools & <span className="text-green-500">Applications</span>
        </h1>
        <div className="w-20 h-1 bg-green-500 mx-auto mt-4 rounded-full"></div>
      </motion.div>

      {/* Apps Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
      >
        {apps?.map((element, index) => (
          <motion.div
            key={element._id}
            variants={itemVariants}
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 3 + (index % 2),
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.08,
              rotate: 2,
            }}
            className="cursor-pointer"
          >
            <Card
              className="p-6 flex flex-col justify-center items-center gap-4
              bg-white/5 backdrop-blur-md border border-white/10
              hover:border-green-400 hover:bg-white/10
              transition-all duration-300 rounded-2xl shadow-lg"
            >
              <motion.img
                src={element.svg?.url}
                alt={element.name}
                className="h-12 md:h-14 w-auto"
                whileHover={{ rotate: -5 }}
                transition={{ duration: 0.3 }}
              />

              <p className="text-sm md:text-base text-gray-300 text-center font-medium">
                {element.name}
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default MyApps;
