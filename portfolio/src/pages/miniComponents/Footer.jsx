



import React from "react";
import { Heart, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-24 w-full border-t border-border relative">

      {/* Top Accent Glow Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 
      w-40 h-[2px] bg-green-500 blur-sm opacity-70"></div>

      <div className="max-w-[1100px] mx-auto px-6 py-14 flex flex-col items-center gap-10 text-center">

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Thanks For <span className="text-green-500">Visiting</span>
        </h1>

        {/* Description */}
        <p className="text-muted-foreground max-w-[650px] leading-relaxed">
          I truly appreciate you taking the time to explore my portfolio.
          I’m always open to new opportunities, collaborations, and exciting projects.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/rajankumarsingh01/Mern_Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 rounded-full border border-border 
            hover:border-green-500 transition-all duration-300 
            hover:scale-110"
          >
            <Github className="text-muted-foreground 
            group-hover:text-green-500 transition-colors duration-300" />
          </a>

          <a
            href="www.linkedin.com/in/rajan-kumar-singh0"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 rounded-full border border-border 
            hover:border-blue-500 transition-all duration-300 
            hover:scale-110"
          >
            <Linkedin className="text-muted-foreground 
            group-hover:text-blue-500 transition-colors duration-300" />
          </a>
        </div>

        {/* Made With Love */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          Made with
          <Heart className="text-red-500 fill-red-500 animate-pulse" size={18} />
          by
          <span className="font-semibold text-green-500 hover:tracking-wide transition-all duration-300">
            Rajan Kumar Singh
          </span>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border"></div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Rajan Kumar Singh. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
