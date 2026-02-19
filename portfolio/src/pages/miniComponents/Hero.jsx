

import {
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Hero = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(
          "https://mern-portfolio-backend-ke5j.onrender.com/api/v1/user/portfolio/me",
          { withCredentials: true }
        );
        if (data?.user) setUser(data.user);
      } catch (error) {
        console.log("Profile fetch error:", error);
      }
    };
    getMyProfile();
  }, []);

  if (!user) {
    return <div className="text-xl">Loading...</div>;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {/* Availability */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-2 mb-2"
      >
        <span className="bg-green-400 rounded-full h-2 w-2 animate-pulse"></span>
        <p className="text-green-400 font-semibold">
          Available for Work
        </p>
      </motion.div>

      {/* Name */}
      <motion.h1
        variants={itemVariants}
        className="overflow-x-hidden text-[1.3rem] sm:text-[1.75rem] 
        md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4"
      >
        Hey, I'm Rajan Kumar Singh
      </motion.h1>

      {/* Typewriter */}
      <motion.h2
        variants={itemVariants}
        className="text-tubeLight-effect overflow-x-hidden text-[1.3rem] 
        sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px]"
      >
        <Typewriter
          words={[
            "ASPIRING FULLSTACK DEVELOPER",
            "MERN STACK ENTHUSIAST",
            "PROBLEM SOLVER",
          ]}
          loop
          cursor
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </motion.h2>

      {/* Social Icons */}
      <motion.div
        variants={itemVariants}
        className="w-fit px-5 py-2 bg-slate-50 rounded-[20px] 
        flex gap-5 items-center mt-4 md:mt-8 lg:mt-10"
      >
        <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
          <motion.div whileHover={{ scale: 1.3 }}>
            <Youtube className="text-red-500 w-7 h-7" />
          </motion.div>
        </a>

        {user?.instagramURL && (
          <a href={user.instagramURL} target="_blank" rel="noreferrer">
            <motion.div whileHover={{ scale: 1.3 }}>
              <Instagram className="text-pink-500 w-7 h-7" />
            </motion.div>
          </a>
        )}

        {user?.facebookURL && (
          <a href={user.facebookURL} target="_blank" rel="noreferrer">
            <motion.div whileHover={{ scale: 1.3 }}>
              <Facebook className="text-blue-800 w-7 h-7" />
            </motion.div>
          </a>
        )}

        {user?.linkedInURL && (
          <a href={user.linkedInURL} target="_blank" rel="noreferrer">
            <motion.div whileHover={{ scale: 1.3 }}>
              <Linkedin className="text-sky-500 w-7 h-7" />
            </motion.div>
          </a>
        )}

        {user?.twitterURL && (
          <a href={user.twitterURL} target="_blank" rel="noreferrer">
            <motion.div whileHover={{ scale: 1.3 }}>
              <Twitter className="text-blue-800 w-7 h-7" />
            </motion.div>
          </a>
        )}
      </motion.div>

      {/* Buttons */}
      <motion.div
        variants={itemVariants}
        className="mt-4 md:mt-8 lg:mt-10 flex gap-3"
      >
        {user?.githubURL && (
          <a href={user.githubURL} target="_blank" rel="noreferrer">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button className="rounded-[30px] flex items-center gap-2">
                <Github />
                <span>Github</span>
              </Button>
            </motion.div>
          </a>
        )}

        {user?.resume?.url && (
          <a href={user.resume.url} target="_blank" rel="noreferrer">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button className="rounded-[30px] flex items-center gap-2">
                <ExternalLink />
                <span>Resume</span>
              </Button>
            </motion.div>
          </a>
        )}

        <a href="mailto:rajankrsingh200@gmail.com">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button className="rounded-[30px] flex items-center gap-2 bg-green-500 hover:bg-green-600">
              Hire Me
            </Button>
          </motion.div>
        </a>
      </motion.div>

      {/* About */}
      {user?.aboutMe && (
        <motion.p
          variants={itemVariants}
          className="mt-8 text-xl tracking-[2px]"
        >
          {user.aboutMe}
        </motion.p>
      )}

      <hr className="my-8 md:my-10" />
    </motion.div>
  );
};

export default Hero;
