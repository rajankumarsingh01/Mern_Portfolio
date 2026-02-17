// import React, { useEffect, useState } from "react";

// const About = () => {
//   return (
//     <div className="w-full flex flex-col overflow-x-hidden">
//       <div className="relative">
//         <h1
//           className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
//           md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
//           lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
//           style={{
//             background: "hsl(222.2 84% 4.9%)",
//           }}
//         >
//           ABOUT <span className="text-tubeLight-effect font-extrabold">ME</span>
//         </h1>
//         <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
//       </div>
//       <div className="text-center">
//         <p className="uppercase text-xl text-slate-400">
//           Allow me to introduce myself.
//         </p>
//       </div>
//       <div>
//         <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
//           <div className="flex justify-center items-center">
//             <img
//               src="/Rajanprofile.jpeg"
//               alt="avatar"
//               className="bg-white p-2 sm:p-4 rotate-[25deg] h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px]"
//             />
//           </div>
//           <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
//             <p>
//               Hello! I'm <span className="font-semibold text-green-500">Rajan Kumar Singh</span>,
//               a passionate B.Tech Computer Science student and aspiring Full Stack Developer
//               specializing in the MERN stack.
//             </p>
//             <p>
//               I build responsive, scalable, and user-friendly web applications using
//               MongoDB, Express.js, React.js, and Node.js. I enjoy transforming ideas
//               into real-world projects that solve practical problems.
//             </p>
        
//           </div>
//         </div>
//         <p className="tracking-[1px] text-xl">
//           My dedication and perseverance in timely delivery of work are integral
//           to me. I maintain the courage to face any challenges for extended
//           periods.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default About;




// import React from "react";
// import { motion } from "framer-motion";

// const About = () => {
//   return (
//     <section className="w-full max-w-6xl mx-auto py-16 px-6 overflow-x-hidden">
      
//       {/* Heading */}
//       <motion.div
//         initial={{ opacity: 0, y: -30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         viewport={{ once: true }}
//         className="relative mb-16 text-center"
//       >
//         <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
//           About <span className="text-green-500">Me</span>
//         </h1>

//         {/* Animated underline */}
//         <motion.div
//           initial={{ width: 0 }}
//           whileInView={{ width: "80px" }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="h-1 bg-green-500 mx-auto mt-4 rounded-full"
//         />
//       </motion.div>

//       {/* Content Grid */}
//       <div className="grid md:grid-cols-2 gap-12 items-center">
        
//         {/* Image Section */}
//         <motion.div
//           initial={{ opacity: 0, x: -60 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="flex justify-center"
//         >
//           <motion.img
//             src="/Rajanprofile.jpeg"
//             alt="Rajan Kumar Singh"
//             whileHover={{ scale: 1.05, rotate: 0 }}
//             initial={{ rotate: 6 }}
//             transition={{ type: "spring", stiffness: 120 }}
//             className="rounded-2xl shadow-xl h-[280px] md:h-[380px] object-cover"
//           />
//         </motion.div>

//         {/* Text Section */}
//         <motion.div
//           initial={{ opacity: 0, x: 60 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="flex flex-col gap-6 text-gray-300 text-base md:text-lg leading-relaxed"
//         >
//           <p>
//             Hello! I'm{" "}
//             <span className="font-semibold text-green-500">
//               Rajan Kumar Singh
//             </span>
//             , a passionate Computer Science student and aspiring Full Stack
//             Developer specializing in the MERN stack.
//           </p>

//           <p>
//             I build scalable, responsive, and high-performance web applications
//             using MongoDB, Express.js, React.js, and Node.js — transforming
//             ideas into impactful digital solutions.
//           </p>

//           <p>
//             I value clean architecture, maintainable code, and thoughtful UI/UX.
//             Consistency, discipline, and long-term growth define my development
//             journey.
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default About;




import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="w-full max-w-6xl mx-auto py-20 px-6 overflow-x-hidden">
      
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative mb-20 text-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          About <span className="text-green-500">Me</span>
        </h1>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="h-1 bg-green-500 mx-auto mt-4 rounded-full"
        />
      </motion.div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-14 items-center">

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <motion.div
            className="relative group"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {/* Glow Background */}
            <div className="absolute -inset-1 rounded-2xl bg-green-500/20 blur-xl opacity-70 group-hover:opacity-100 transition duration-500"></div>

            <motion.img
              src="/Rajanprofile.jpeg"
              alt="Rajan Kumar Singh"
              className="relative rounded-2xl shadow-2xl h-[280px] md:h-[380px] object-cover 
              transition-transform duration-500"
              whileHover={{
                scale: 1.08,
                rotate: 2,
              }}
              transition={{ type: "spring", stiffness: 150 }}
            />
          </motion.div>
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 text-gray-300 text-base md:text-lg leading-relaxed"
        >
          <p>
            Hello! I'm{" "}
            <span className="font-semibold text-green-500">
              Rajan Kumar Singh
            </span>
            , a passionate Computer Science student and aspiring Full Stack
            Developer specializing in the MERN stack.
          </p>

          <p>
            I build scalable, responsive, and high-performance web applications
            using MongoDB, Express.js, React.js, and Node.js — transforming
            ideas into impactful digital solutions.
          </p>

          <p>
            I value clean architecture, maintainable code, and thoughtful UI/UX.
            Consistency, discipline, and long-term growth define my development
            journey.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
