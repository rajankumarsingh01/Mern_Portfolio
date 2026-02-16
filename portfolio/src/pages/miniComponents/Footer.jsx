// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="p-5 mt-6 w-full max-w-[1050px] mx-auto">
//      <hr />
//      <h1 className="text-tubeLight-effect text-3xl mt-5 justify-center sm:justify-start tracking-[8px]">Thanks For Scrolling</h1>
//     </footer>
//   );
// };

// export default Footer;



import React from "react";
import { Heart, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-16 w-full border-t border-gray-300">
      
      <div className="max-w-[1100px] mx-auto px-6 py-10 flex flex-col items-center gap-6 text-center">
        
        <h1 className="text-3xl  sm:text-4xl  font-bold tracking-[6px] text-tubeLight-effect">
          Thanks For Visiting
        </h1>

        <p className="text-lg text-gray-400 max-w-[600px]">
          I truly appreciate you taking the time to explore my portfolio. 
          I’m always open to new opportunities, collaborations, and exciting projects.
        </p>

        <div className="flex items-center gap-2 text-lg font-medium">
          Made with 
          <Heart className="text-red-500 fill-red-500 animate-pulse" size={20} />
          by 
          <span className="text-green-500 font-semibold">
            Rajan Kumar Singh
          </span>
        </div>

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Rajan Kumar Singh. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
