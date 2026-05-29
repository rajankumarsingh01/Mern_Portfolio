


import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyProjects = async () => {
      try {
        const { data } = await axios.get(
          "https://mern-portfolio-backend-ke5j.onrender.com/api/v1/project/getall",
          {
            withCredentials: true,
          }
        );

       

        setProjects(
          Array.isArray(data?.projects) ? data.projects : []
        );
      } catch (error) {
        

        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    getMyProjects();
  }, []);

  // Safe array
  const safeProjects = Array.isArray(projects)
    ? projects
    : [];

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

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <h2 className="text-gray-400 text-lg animate-pulse">
            Loading Projects...
          </h2>
        </div>
      ) : safeProjects.length === 0 ? (

        /* Empty State */
        <div className="flex justify-center items-center py-20">
          <h2 className="text-gray-500 text-lg">
            No Projects Found
          </h2>
        </div>

      ) : (

        /* Projects Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {(viewAll
            ? safeProjects
            : safeProjects.slice(0, 9)
          ).map((element, index) => (

            <motion.div
              key={element._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
              viewport={{ once: true }}
            >
              <Link to={`/project/${element._id}`}>

                <div
                  className="relative group overflow-hidden rounded-3xl 
                  border border-white/10 bg-white/5 backdrop-blur-xl
                  shadow-[0_10px_40px_rgba(0,0,0,0.25)]
                  hover:border-green-500/40 transition duration-500"
                >

                  {/* Image */}
                  <div className="overflow-hidden">
                    <img
                      src={
                        element?.projectBanner?.url ||
                        "https://via.placeholder.com/600x400"
                      }
                      alt={element?.title || "Project"}
                      className="w-full h-64 object-cover 
                      transition-transform duration-700 
                      group-hover:scale-110"
                    />
                  </div>

                  {/* Overlay */}
                  <div
                    className="absolute inset-0 bg-black/70 opacity-0
                    group-hover:opacity-100 transition duration-500
                    flex flex-col justify-center items-center
                    text-center p-6"
                  >

                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      className="text-white text-xl md:text-2xl font-bold mb-3"
                    >
                      {element?.title}
                    </motion.h3>

                    <p className="text-gray-300 text-sm leading-relaxed">
                      Explore this project with detailed features,
                      technologies, architecture, and implementation.
                    </p>

                    <button
                      className="mt-5 px-5 py-2 rounded-full
                      bg-green-500 text-black font-semibold
                      hover:bg-green-400 transition duration-300"
                    >
                      View Project
                    </button>

                  </div>
                </div>

              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* Show More Button */}
      {safeProjects?.length > 9 && (
        <div className="w-full text-center mt-14">
          <Button
            className="w-52 rounded-full bg-green-500 hover:bg-green-400 text-black font-semibold"
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