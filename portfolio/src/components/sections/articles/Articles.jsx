// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import {
//   Calendar,
//   Clock3,
//   ArrowRight,
//   Sparkles,
// } from "lucide-react";

// const Articles = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchArticles();
//   }, []);

//   const fetchArticles = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://mern-portfolio-backend-ke5j.onrender.com/api/v1/article/all"
//       );

//       setArticles(data.articles || []);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <section className="w-full">
//         <div className="text-center py-20">
//           <h1 className="text-3xl font-bold">
//             Loading Articles...
//           </h1>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section
//       id="articles"
//       className="w-full flex flex-col gap-10"
//     >
//       {/* TOP */}
//       <div className="flex items-center gap-3">
//         <div className="p-3 rounded-2xl bg-white/10 border border-white/10">
//           <Sparkles className="w-6 h-6" />
//         </div>

//         <div>
//           <h1 className="text-4xl font-black">
//             Latest Articles
//           </h1>

//           <p className="text-gray-400 mt-1">
//             Blogs, development insights & tech content
//           </p>
//         </div>
//       </div>

//       {/* EMPTY */}
//       {articles.length === 0 && (
//         <div className="w-full py-24 border border-white/10 rounded-3xl text-center bg-white/5">
//           <h2 className="text-3xl font-bold">
//             No Articles Found
//           </h2>

//           <p className="text-gray-400 mt-3">
//             Articles will appear here soon 🚀
//           </p>
//         </div>
//       )}

//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {articles.map((article) => (
//           <Link
//             key={article._id}
//             to={`/article/${article.slug}`}
//             className="group"
//           >
//             <div
//               className="
//                 overflow-hidden
//                 rounded-3xl
//                 border
//                 border-white/10
//                 bg-white/5
//                 backdrop-blur-xl
//                 transition-all
//                 duration-500
//                 hover:border-cyan-400/40
//                 hover:shadow-[0_0_40px_rgba(0,255,255,0.15)]
//                 hover:-translate-y-2
//               "
//             >
//               {/* IMAGE */}
//               <div className="h-[240px] overflow-hidden">
//                 <img
//                   src={article.coverImage?.url}
//                   alt={article.title}
//                   className="
//                     w-full
//                     h-full
//                     object-cover
//                     transition-transform
//                     duration-700
//                     group-hover:scale-110
//                   "
//                 />
//               </div>

//               {/* CONTENT */}
//               <div className="p-6 flex flex-col gap-5">
//                 {/* CATEGORY */}
//                 <div>
//                   <span
//                     className="
//                       px-4
//                       py-1
//                       rounded-full
//                       text-xs
//                       font-bold
//                       bg-cyan-500/20
//                       text-cyan-300
//                       border
//                       border-cyan-400/20
//                     "
//                   >
//                     {article.category}
//                   </span>
//                 </div>

//                 {/* TITLE */}
//                 <h2
//                   className="
//                     text-2xl
//                     font-black
//                     leading-tight
//                     group-hover:text-cyan-300
//                     transition-colors
//                   "
//                 >
//                   {article.title}
//                 </h2>

//                 {/* EXCERPT */}
//                 <p className="text-gray-400 leading-relaxed">
//                   {article.excerpt}
//                 </p>

//                 {/* META */}
//                 <div className="flex items-center justify-between pt-4 border-t border-white/10">
//                   <div className="flex items-center gap-5 text-sm text-gray-400">
//                     <div className="flex items-center gap-2">
//                       <Calendar className="w-4 h-4" />
//                       {new Date(
//                         article.createdAt
//                       ).toLocaleDateString()}
//                     </div>

//                     <div className="flex items-center gap-2">
//                       <Clock3 className="w-4 h-4" />
//                       {article.readTime}
//                     </div>
//                   </div>

//                   <div
//                     className="
//                       flex
//                       items-center
//                       gap-2
//                       text-cyan-300
//                       font-semibold
//                     "
//                   >
//                     Read
//                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Articles;









// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import {
//   Calendar,
//   Clock3,
//   ArrowRight,
//   Sparkles,
//   BookOpen,
// } from "lucide-react";

// const Articles = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchArticles();
//   }, []);

//   const fetchArticles = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://mern-portfolio-backend-ke5j.onrender.com/api/v1/article/all"
//       );

//       setArticles(data.articles || []);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <section className="min-h-screen flex items-center justify-center bg-black text-white">
//         <div className="flex flex-col items-center gap-6">
//           <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>

//           <h1 className="text-3xl md:text-5xl font-black tracking-tight">
//             Loading Articles...
//           </h1>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section
//       id="articles"
//       className="
//         relative
//         min-h-screen
//         overflow-hidden
//         bg-[#030712]
//         text-white
//         pt-36
//         pb-24
//         px-5
//         md:px-10
//       "
//     >
//       {/* BACKGROUND GLOW */}
//       <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

//       <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[140px] rounded-full"></div>

//       {/* CONTAINER */}
//       <div className="max-w-7xl mx-auto relative z-10">

//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-16">

//           <div>
//             <div
//               className="
//                 inline-flex
//                 items-center
//                 gap-2
//                 px-5
//                 py-2
//                 rounded-full
//                 border
//                 border-cyan-400/20
//                 bg-cyan-400/10
//                 text-cyan-300
//                 text-sm
//                 font-semibold
//                 mb-6
//               "
//             >
//               <Sparkles className="w-4 h-4" />
//               Tech Insights & Development Blogs
//             </div>

//             <h1
//               className="
//                 text-5xl
//                 md:text-7xl
//                 font-black
//                 leading-none
//                 tracking-tight
//               "
//             >
//               Latest
//               <span className="text-cyan-400"> Articles</span>
//             </h1>

//             <p className="text-gray-400 text-lg mt-6 max-w-2xl leading-relaxed">
//               Explore premium development content, coding insights,
//               MERN stack guides, UI inspirations, backend architecture,
//               AI tools and modern web engineering articles.
//             </p>
//           </div>

//           {/* TOTAL */}
//           <div
//             className="
//               flex
//               items-center
//               gap-4
//               px-6
//               py-4
//               rounded-3xl
//               border
//               border-white/10
//               bg-white/5
//               backdrop-blur-2xl
//             "
//           >
//             <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300">
//               <BookOpen className="w-6 h-6" />
//             </div>

//             <div>
//               <h3 className="text-3xl font-black">
//                 {articles.length}
//               </h3>

//               <p className="text-gray-400 text-sm">
//                 Published Articles
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* EMPTY */}
//         {articles.length === 0 && (
//           <div
//             className="
//               w-full
//               py-28
//               rounded-[40px]
//               border
//               border-white/10
//               bg-white/5
//               backdrop-blur-2xl
//               text-center
//             "
//           >
//             <h2 className="text-4xl font-black">
//               No Articles Found
//             </h2>

//             <p className="text-gray-400 mt-5 text-lg">
//               Articles will appear here soon 🚀
//             </p>
//           </div>
//         )}

//         {/* GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

//           {articles.map((article) => (
//             <Link
//               key={article._id}
//               to={`/article/${article.slug}`}
//               className="group"
//             >
//               <article
//                 className="
//                   relative
//                   overflow-hidden
//                   rounded-[36px]
//                   border
//                   border-white/10
//                   bg-white/[0.04]
//                   backdrop-blur-2xl
//                   transition-all
//                   duration-700
//                   hover:border-cyan-400/40
//                   hover:-translate-y-3
//                   hover:shadow-[0_0_60px_rgba(0,255,255,0.12)]
//                 "
//               >
//                 {/* IMAGE */}
//                 <div className="relative h-[280px] overflow-hidden">

//                   <img
//                     src={article.coverImage?.url}
//                     alt={article.title}
//                     className="
//                       w-full
//                       h-full
//                       object-cover
//                       transition-transform
//                       duration-700
//                       group-hover:scale-110
//                     "
//                   />

//                   {/* OVERLAY */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

//                   {/* CATEGORY */}
//                   <div className="absolute top-5 left-5">
//                     <span
//                       className="
//                         px-4
//                         py-2
//                         rounded-full
//                         text-xs
//                         font-bold
//                         bg-cyan-500/20
//                         text-cyan-300
//                         border
//                         border-cyan-400/20
//                         backdrop-blur-xl
//                       "
//                     >
//                       {article.category}
//                     </span>
//                   </div>
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-8 flex flex-col gap-6">

//                   {/* TITLE */}
//                   <h2
//                     className="
//                       text-3xl
//                       font-black
//                       leading-tight
//                       tracking-tight
//                       transition-colors
//                       duration-300
//                       group-hover:text-cyan-300
//                     "
//                   >
//                     {article.title}
//                   </h2>

//                   {/* EXCERPT */}
//                   <p className="text-gray-400 leading-relaxed text-[15px]">
//                     {article.excerpt}
//                   </p>

//                   {/* META */}
//                   <div
//                     className="
//                       flex
//                       items-center
//                       justify-between
//                       pt-5
//                       border-t
//                       border-white/10
//                     "
//                   >
//                     <div className="flex items-center gap-5 text-sm text-gray-400">

//                       <div className="flex items-center gap-2">
//                         <Calendar className="w-4 h-4 text-cyan-300" />

//                         {new Date(
//                           article.createdAt
//                         ).toLocaleDateString()}
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <Clock3 className="w-4 h-4 text-cyan-300" />

//                         {article.readTime}
//                       </div>
//                     </div>

//                     {/* READ BUTTON */}
//                     <div
//                       className="
//                         flex
//                         items-center
//                         gap-2
//                         text-cyan-300
//                         font-semibold
//                         transition-all
//                         duration-300
//                       "
//                     >
//                       Read More

//                       <ArrowRight
//                         className="
//                           w-5
//                           h-5
//                           transition-transform
//                           duration-300
//                           group-hover:translate-x-2
//                         "
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* BORDER GLOW */}
//                 <div
//                   className="
//                     absolute
//                     inset-0
//                     rounded-[36px]
//                     border
//                     border-cyan-400/0
//                     group-hover:border-cyan-400/20
//                     pointer-events-none
//                   "
//                 ></div>
//               </article>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Articles;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Calendar, Clock3, ArrowUpRight, Layers, Tag } from "lucide-react";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data } = await axios.get("https://mern-portfolio-backend-ke5j.onrender.com/api/v1/article/all");
      setArticles(data.articles || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#030712] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm tracking-widest uppercase">Loading Articles</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="articles"
      className="relative min-h-screen bg-[#030712] text-white pt-28 pb-20 px-5 md:px-10 overflow-hidden"
    >
      {/* Subtle background glows */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── HEADER ── */}
        <div className="mb-14">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-cyan-400" />
            <span className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase">
              Writing & Insights
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-none">
              Latest{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Articles
              </span>
            </h2>

            {/* Count chip */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.04] w-fit">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-white">{articles.length}</span>
              <span className="text-sm text-gray-400">Articles Published</span>
            </div>
          </div>

          <p className="text-gray-400 text-sm md:text-base mt-4 max-w-xl leading-relaxed">
            MERN stack guides, UI design breakdowns, backend architecture, AI tools &amp; modern web engineering.
          </p>
        </div>

        {/* ── EMPTY STATE ── */}
        {articles.length === 0 && (
          <div className="w-full py-20 rounded-2xl border border-white/10 bg-white/[0.03] text-center">
            <p className="text-2xl font-bold text-white">No Articles Yet</p>
            <p className="text-gray-500 mt-3 text-sm">Articles will appear here soon 🚀</p>
          </div>
        )}

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <Link key={article._id} to={`/article/${article.slug}`} className="group">
              <article
                className="
                  flex flex-col h-full
                  rounded-2xl overflow-hidden
                  border border-white/[0.08]
                  bg-white/[0.03]
                  backdrop-blur-xl
                  transition-all duration-500
                  hover:border-cyan-400/30
                  hover:-translate-y-1.5
                  hover:shadow-[0_8px_40px_rgba(0,255,255,0.08)]
                "
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* ── IMAGE ── */}
                <div className="relative h-[180px] overflow-hidden bg-white/[0.05] flex-shrink-0">
                  {article.coverImage?.url ? (
                    <img
                      src={article.coverImage.url}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      <Layers className="w-10 h-10" />
                    </div>
                  )}
                  {/* Gradient fade into card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-transparent to-transparent" />

                  {/* Category badge */}
                  {article.category && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#030712]/70 border border-cyan-400/20 text-cyan-300 backdrop-blur-md">
                        <Tag className="w-3 h-3" />
                        {article.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* ── BODY ── */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  {/* Title */}
                  <h3 className="text-[15px] font-bold leading-snug tracking-tight group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-400 text-[13px] leading-relaxed line-clamp-2 flex-1">
                    {article.excerpt}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.07] mt-auto">
                    <div className="flex items-center gap-4 text-[12px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400/70" />
                        {new Date(article.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      {article.readTime && (
                        <span className="flex items-center gap-1">
                          <Clock3 className="w-3.5 h-3.5 text-cyan-400/70" />
                          {article.readTime}
                        </span>
                      )}
                    </div>

                    {/* Arrow */}
                    <span className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:border-cyan-400 group-hover:text-black transition-all duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;