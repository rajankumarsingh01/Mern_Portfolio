// import {
//   ExternalLink,
//   Facebook,
//   Github,
//   Instagram,
//   Linkedin,
//   Twitter,
//   Youtube,
// } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Typewriter } from "react-simple-typewriter";
// import { Button } from "@/components/ui/button";
// import axios from "axios";

// const Hero = () => {
//   const [user, setUser] = useState({});
//   useEffect(() => {
//     const getMyProfile = async () => {
//       const { data } = await axios.get(
//         "http://localhost:4000/api/v1/user/portfolio/me",
//         { withCredentials: true }
//       );
//       setUser(data.user);
//     };
//     getMyProfile();
//   }, []);
//   return (
//     <div className="w-full">
//       <div className="flex items-center gap-2 mb-2">
//         <span className="bg-green-400 rounded-full h-2 w-2"></span>
//         <p>Online</p>
//       </div>
//       <h1 className="overflow-x-hidden text-[1.3rem] sm:text-[1.75rem] 
//       md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4">
//         Hey, I'm Rajan Kumar Singh


//       </h1>
//       <h1 className="text-tubeLight-effect overflow-x-hidden text-[1.3rem] 
//       sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px]">
//         <Typewriter
//           words={["FULLSTACK DEVELOPER", "YOUTUBER", "FREELANCER"]}
//           loop={50}
//           cursor
//           typeSpeed={70}
//           deleteSpeed={50}
//           delaySpeed={1000}
//         />
//       </h1>
//       <div className="w-fit px-5 py-2 bg-slate-50 rounded-[20px] flex gap-5 
//       items-center mt-4 md:mt-8 lg:mt-10">
//         <Link to={"https://www.youtube.com"} target="_blank">
//           <Youtube className="text-red-500 w-7 h-7"/>
//         </Link>
//         <Link to={user.instagramURL} target="_blank">
//           <Instagram className="text-pink-500 w-7 h-7" />
//         </Link>
//         <Link to={user.facebookURL} target="_blank">
//           <Facebook className="text-blue-800 w-7 h-7" />
//         </Link>
//         <Link to={user.linkedInURL} target="_blank">
//           <Linkedin className="text-sky-500 w-7 h-7" />
//         </Link>
//         <Link to={user.twitterURL} target="_blank">
//           <Twitter className="text-blue-800 w-7 h-7" />
//         </Link>
//       </div>
//       <div className="mt-4 md:mt-8 lg:mt-10  flex gap-3">
//         <Link to={user.githubURL} target="_blank">
//           <Button className="rounded-[30px] flex items-center gap-2 flex-row">
//             <span>
//               <Github />
//             </span>
//             <span>Github</span>
//           </Button>
//         </Link>
//         <Link to={user.resume && user.resume.url} target="_blank">
//           <Button className="rounded-[30px] flex items-center gap-2 flex-row">
//             <span>
//               <ExternalLink />
//             </span>
//             <span>Resume </span>
//           </Button>
//         </Link>
//       </div>
//       <p className="mt-8 text-xl tracking-[2px]">{user.aboutMe}</p>
//       <hr className="my-8 md::my-10 " />
//     </div>
//   );
// };

// export default Hero;





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

const Hero = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/portfolio/me",
          { withCredentials: true }
        );

        if (data?.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.log("Profile fetch error:", error);
      }
    };

    getMyProfile();
  }, []);

  // ✅ Loading guard (prevents crash)
  if (!user) {
    return <div className="text-xl">Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-green-400 rounded-full h-2 w-2"></span>
        <p className="text-green-400 font-semibold">Available for Work</p>

      </div>

      <h1 className="overflow-x-hidden text-[1.3rem] sm:text-[1.75rem] 
      md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4">
        Hey, I'm Rajan Kumar Singh
      </h1>

      <h2 className="text-tubeLight-effect overflow-x-hidden text-[1.3rem] 
      sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px]">
        <Typewriter
          words={["ASPIRING FULLSTACK DEVELOPER", "MERN STACK ENTHUSIAST", "PROBLEM SOLVER"]}

          loop={50}
          cursor
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>

      <div className="w-fit px-5 py-2 bg-slate-50 rounded-[20px] flex gap-5 
      items-center mt-4 md:mt-8 lg:mt-10">

        <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
          <Youtube className="text-red-500 w-7 h-7" />
        </a>

        {user?.instagramURL && (
          <a href={user.instagramURL} target="_blank" rel="noreferrer">
            <Instagram className="text-pink-500 w-7 h-7" />
          </a>
        )}

        {user?.facebookURL && (
          <a href={user.facebookURL} target="_blank" rel="noreferrer">
            <Facebook className="text-blue-800 w-7 h-7" />
          </a>
        )}

        {user?.linkedInURL && (
          <a href={user.linkedInURL} target="_blank" rel="noreferrer">
            <Linkedin className="text-sky-500 w-7 h-7" />
          </a>
        )}

        {user?.twitterURL && (
          <a href={user.twitterURL} target="_blank" rel="noreferrer">
            <Twitter className="text-blue-800 w-7 h-7" />
          </a>
        )}
      </div>

      <div className="mt-4 md:mt-8 lg:mt-10 flex gap-3">
        {user?.githubURL && (
          <a href={user.githubURL} target="_blank" rel="noreferrer">
            <Button className="rounded-[30px] flex items-center gap-2">
              <Github />
              <span>Github</span>
            </Button>
          </a>
        
        )}

        {user?.resume?.url && (
          <a href={user.resume.url} target="_blank" rel="noreferrer">
            <Button className="rounded-[30px] flex items-center gap-2">
              <ExternalLink />
              <span>Resume</span>
            </Button>
          </a>
        )}
        <a
          href="mailto:rajankrsingh200@gmail.com?subject=Internship Opportunity&body=Hello Rajan,%0D%0A%0D%0AI would like to discuss an opportunity with you.%0D%0A%0D%0ARegards,"
        >
          <Button className="rounded-[30px] flex items-center gap-2 bg-green-500 hover:bg-green-600">
            Hire Me
          </Button>
        </a>


      </div>

      {user?.aboutMe && (
        <p className="mt-8 text-xl tracking-[2px]">{user.aboutMe}</p>
      )}

      <hr className="my-8 md:my-10" />
    </div>
  );
};

export default Hero;
