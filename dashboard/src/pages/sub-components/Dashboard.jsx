





// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// import SpecialLoadingButton from "./SpecialLoadingButton";

// import {
//   clearAllSkillErrors,
// } from "@/store/slices/skillSlice";

// import {
//   clearAllSoftwareAppErrors,
//   deleteSoftwareApplication,
//   getAllSoftwareApplications,
//   resetSoftwareApplicationSlice,
// } from "@/store/slices/softwareApplicationSlice";

// import { clearAllTimelineErrors } from "@/store/slices/timelineSlice";

// import {
//   clearAllProjectErrors,
//   deleteProject,
//   getAllProjects,
//   resetProjectSlice,
// } from "@/store/slices/projectSlice";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@radix-ui/react-tooltip";

// import {
//   Eye,
//   Pen,
//   Trash2,
//   Users,
//   FolderGit2,
//   Code2,
// } from "lucide-react";

// const StatCard = ({ title, value, icon: Icon }) => {
//   return (
//     <Card className="relative overflow-hidden bg-[#0b0f1a] border border-cyan-500/20 shadow-[0_0_25px_rgba(0,255,255,0.08)] hover:shadow-[0_0_35px_rgba(0,255,255,0.25)] transition-all duration-300">
//       <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-purple-500/10 blur-2xl" />
//       <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
//         <CardTitle className="text-xs uppercase tracking-widest text-cyan-300">
//           {title}
//         </CardTitle>
//         {Icon && <Icon className="h-4 w-4 text-fuchsia-400" />}
//       </CardHeader>
//       <CardContent className="relative">
//         <div className="text-3xl font-bold text-white">
//           {value}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// const Dashboard = () => {
//   const navigateTo = useNavigate();
//   const dispatch = useDispatch();

//   const { user } = useSelector((state) => state.user);

//   const { skills, error: skillError } = useSelector((state) => state.skill);

//   const {
//     softwareApplications,
//     loading: appLoading,
//     error: appError,
//     message: appMessage,
//   } = useSelector((state) => state.softwareApplications);

//   const {
//     timeline,
//     error: timelineError,
//   } = useSelector((state) => state.timeline);

//   // ✅ FIX: only ONE selector for project
//   const {
//     projects,
//     error: projectError,
//     message: projectMessage,
//   } = useSelector((state) => state.project);

//   const [appId, setAppId] = useState(null);

//   const handleDeleteSoftwareApp = (id) => {
//     setAppId(id);
//     dispatch(deleteSoftwareApplication(id));
//   };

//   // LOAD DATA
//   useEffect(() => {
//     dispatch(getAllProjects());
//     dispatch(getAllSoftwareApplications());
//   }, [dispatch]);

//   // ERROR + MESSAGE HANDLING
//   useEffect(() => {
//     if (skillError) {
//       toast.error(skillError);
//       dispatch(clearAllSkillErrors());
//     }

//     if (appError) {
//       toast.error(appError);
//       dispatch(clearAllSoftwareAppErrors());
//     }

//     if (projectError) {
//       toast.error(projectError);
//       dispatch(clearAllProjectErrors());
//     }

//     if (timelineError) {
//       toast.error(timelineError);
//       dispatch(clearAllTimelineErrors());
//     }

//     if (appMessage) {
//       toast.success(appMessage);
//       dispatch(resetSoftwareApplicationSlice());
//       dispatch(getAllSoftwareApplications());
//     }

//     if (projectMessage) {
//       toast.success(projectMessage);
//       dispatch(resetProjectSlice());
//       dispatch(getAllProjects());
//     }
//   }, [
//     dispatch,
//     skillError,
//     appError,
//     projectError,
//     timelineError,
//     appMessage,
//     projectMessage,
//   ]);

//   return (
//   <div className="min-h-screen bg-[#05060a] text-white">

//     {/* HEADER */}
//     <div className="p-6 border-b border-cyan-500/20">
//       <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-500 text-transparent bg-clip-text">
//         ADMIN DASHBOARD
//       </h1>
//     </div>

//     {/* STATS */}
//     <div className="grid lg:grid-cols-4 gap-4 p-6">

//       <Card className="bg-[#0b0f1a] border-cyan-500/20">
//         <CardHeader>
//           <CardTitle className="text-cyan-300">About Me</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-slate-300 text-sm">
//             {user?.aboutMe}
//           </p>
//         </CardContent>
//       </Card>

//       <StatCard title="Projects" value={projects?.length || 0} icon={FolderGit2} />
//       <StatCard title="Skills" value={skills?.length || 0} icon={Code2} />

//     </div>

//     {/* TABS */}
//     <div className="px-6 pb-10">
//       <Tabs defaultValue="projects">

//         <TabsList className="bg-[#0b0f1a] border border-cyan-500/20">
//           <TabsTrigger value="projects">Projects</TabsTrigger>
//           <TabsTrigger value="skills">Skills</TabsTrigger>
//           <TabsTrigger value="apps">Apps</TabsTrigger>
//           <TabsTrigger value="timeline">Timeline</TabsTrigger>
//         </TabsList>

//         {/* PROJECTS */}
//         <TabsContent value="projects">
//           <Card className="bg-[#0b0f1a] border-cyan-500/20">
//             <CardHeader>
//               <CardTitle className="text-fuchsia-300">Projects</CardTitle>
//             </CardHeader>

//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Banner</TableHead>
//                     <TableHead>Title</TableHead>
//                     <TableHead>Stack</TableHead>
//                     <TableHead>Live</TableHead>
//                     <TableHead>Type</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>

//                 <TableBody>
//                   {projects?.length ? (
//                     projects.map((p) => (
//                       <TableRow key={p._id}>
//                         <TableCell>
//                           <img
//                             src={p.projectBanner?.url}
//                             className="w-12 h-12 rounded-lg"
//                             alt="banner"
//                           />
//                         </TableCell>

//                         <TableCell>{p.title}</TableCell>
//                         <TableCell>{p.stack}</TableCell>
//                         <TableCell>{p.deployed}</TableCell>

//                         <TableCell>
//                           {p.isPaid ? `Paid ₹${p.price}` : "Free"}
//                         </TableCell>

//                         <TableCell className="text-right flex gap-2 justify-end">
//                           <Link to={`/view/project/${p._id}`}>
//                             <Eye />
//                           </Link>

//                           <Link to={`/update/project/${p._id}`}>
//                             <Pen />
//                           </Link>

//                           <button onClick={() => dispatch(deleteProject(p._id))}>
//                             <Trash2 />
//                           </button>

//                           <Link to={`/project/buyers/${p._id}`}>
//                             <Users />
//                           </Link>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={6} className="text-center text-slate-400">
//                         No projects found
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* SKILLS */}
//         <TabsContent value="skills">
//           <div className="grid md:grid-cols-2 gap-4">
//             {skills?.length ? (
//               skills.map((s) => (
//                 <Card key={s._id} className="bg-[#0b0f1a] border-cyan-500/20">
//                   <CardHeader>
//                     <CardTitle className="text-cyan-300">
//                       {s.title}
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <Progress value={s.proficiency} />
//                   </CardContent>
//                 </Card>
//               ))
//             ) : (
//               <p className="text-slate-400">No skills added</p>
//             )}
//           </div>
//         </TabsContent>

//         {/* APPS */}
//         <TabsContent value="apps">
//           <Card className="bg-[#0b0f1a] border-cyan-500/20">
//             <CardHeader>
//               <CardTitle className="text-fuchsia-300">Apps</CardTitle>
//             </CardHeader>

//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="text-cyan-300">Name</TableHead>
//                     <TableHead className="text-cyan-300">Icon</TableHead>
//                     <TableHead className="text-right text-cyan-300">Action</TableHead>
//                   </TableRow>
//                 </TableHeader>

//                 <TableBody>
//                   {softwareApplications?.length ? (
//                     softwareApplications.map((a) => (
//                       <TableRow key={a._id}>
//                         <TableCell>{a.name}</TableCell>
//                         <TableCell>
//                           <img src={a.svg?.url} className="h-6 w-6" alt="icon" />
//                         </TableCell>

//                         <TableCell className="text-right">
//                           <Button
//                             className="bg-red-500 text-black"
//                             onClick={() => handleDeleteSoftwareApp(a._id)}
//                           >
//                             Delete
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell className="text-slate-400">
//                         No apps
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* TIMELINE */}
//         <TabsContent value="timeline">
//           <Card className="bg-[#0b0f1a] border-cyan-500/20">
//             <CardHeader>
//               <CardTitle className="text-fuchsia-300">Timeline</CardTitle>
//             </CardHeader>

//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="text-cyan-300">Title</TableHead>
//                     <TableHead className="text-cyan-300">From</TableHead>
//                     <TableHead className="text-cyan-300 text-right">To</TableHead>
//                   </TableRow>
//                 </TableHeader>

//                 <TableBody>
//                   {timeline?.length ? (
//                     timeline.map((t) => (
//                       <TableRow key={t._id}>
//                         <TableCell>{t.title}</TableCell>
//                         <TableCell>{t.timeline.from}</TableCell>
//                         <TableCell className="text-right">
//                           {t.timeline.to}
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell className="text-slate-400">
//                         No timeline
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>

//       </Tabs>
//     </div>
//   </div>
// );
// }


// export default Dashboard;


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import SpecialLoadingButton from "./SpecialLoadingButton";

import {
  clearAllSkillErrors,
  deleteSkill,
  getAllSkills,
  resetSkillSlice,
} from "@/store/slices/skillSlice";

import {
  clearAllSoftwareAppErrors,
  deleteSoftwareApplication,
  getAllSoftwareApplications,
  resetSoftwareApplicationSlice,
} from "@/store/slices/softwareApplicationSlice";

import {
  clearAllTimelineErrors,
  deleteTimeline,
  getAllTimeline,
  resetTimelineSlice,
} from "@/store/slices/timelineSlice";

import {
  clearAllProjectErrors,
  deleteProject,
  getAllProjects,
  resetProjectSlice,
} from "@/store/slices/projectSlice";

import { Eye, Pen, Trash2, Users, FolderGit2, Code2 } from "lucide-react";

const StatCard = ({ title, value, icon: Icon }) => (
  <Card className="relative overflow-hidden bg-[#0b0f1a] border border-cyan-500/20 shadow-[0_0_25px_rgba(0,255,255,0.08)] hover:shadow-[0_0_35px_rgba(0,255,255,0.25)] transition-all duration-300">
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-purple-500/10 blur-2xl" />
    <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
      <CardTitle className="text-xs uppercase tracking-widest text-cyan-300">{title}</CardTitle>
      {Icon && <Icon className="h-4 w-4 text-fuchsia-400" />}
    </CardHeader>
    <CardContent className="relative">
      <div className="text-3xl font-bold text-white">{value}</div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { skills, loading: skillLoading, error: skillError, message: skillMessage } = useSelector((state) => state.skill);

  const {
    softwareApplications,
    loading: appLoading,
    error: appError,
    message: appMessage,
  } = useSelector((state) => state.softwareApplications);

  const {
    timeline,
    loading: timelineLoading,
    error: timelineError,
    message: timelineMessage,
  } = useSelector((state) => state.timeline);

  const {
    projects,
    error: projectError,
    message: projectMessage,
  } = useSelector((state) => state.project);

  const [appId, setAppId] = useState(null);
  const [deletingTimelineId, setDeletingTimelineId] = useState(null);
  const [deletingSkillId, setDeletingSkillId] = useState(null);

  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getAllSoftwareApplications());
    dispatch(getAllTimeline());
    dispatch(getAllSkills());
  }, [dispatch]);

  useEffect(() => {
    if (skillError) { toast.error(skillError); dispatch(clearAllSkillErrors()); setDeletingSkillId(null); }
    if (appError) { toast.error(appError); dispatch(clearAllSoftwareAppErrors()); }
    if (projectError) { toast.error(projectError); dispatch(clearAllProjectErrors()); }

    if (timelineError) {
      toast.error(timelineError);
      dispatch(clearAllTimelineErrors());
      setDeletingTimelineId(null);
    }
    if (skillMessage) {
      toast.success(skillMessage);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
      setDeletingSkillId(null);
    }
    if (appMessage) {
      toast.success(appMessage);
      dispatch(resetSoftwareApplicationSlice());
      dispatch(getAllSoftwareApplications());
      setAppId(null);
    }
    if (projectMessage) {
      toast.success(projectMessage);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
    if (timelineMessage) {
      toast.success(timelineMessage);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
      setDeletingTimelineId(null);
    }
  }, [dispatch, skillError, skillMessage, appError, projectError, timelineError, appMessage, projectMessage, timelineMessage]);

  const handleDeleteSkill = (id, title) => {
    if (window.confirm(`"${title}" skill delete karna chahte ho?`)) {
      setDeletingSkillId(id);
      dispatch(deleteSkill(id));
    }
  };

  const handleDeleteApp = (id) => {
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  };

  const handleDeleteTimeline = (id, title) => {
    if (window.confirm(`"${title}" delete karna chahte ho?`)) {
      setDeletingTimelineId(id);
      dispatch(deleteTimeline(id));
    }
  };

  return (
    <div className="min-h-screen bg-[#05060a] text-white">

      <div className="p-6 border-b border-cyan-500/20">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-500 text-transparent bg-clip-text">
          ADMIN DASHBOARD
        </h1>
        <p className="text-slate-400 mt-1">Control center — Projects · Skills · Timeline · Apps</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-4 p-6">
        <Card className="bg-[#0b0f1a] border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-cyan-300">About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 text-sm leading-relaxed">{user?.aboutMe}</p>
          </CardContent>
        </Card>
        <StatCard title="Projects" value={projects?.length || 0} icon={FolderGit2} />
        <StatCard title="Skills" value={skills?.length || 0} icon={Code2} />
        <StatCard title="Timeline" value={timeline?.length || 0} icon={FolderGit2} />
      </div>

      <div className="px-6 pb-10">
        <Tabs defaultValue="projects">
          <TabsList className="bg-[#0b0f1a] border border-cyan-500/20 mb-4">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="apps">Apps</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          {/* PROJECTS */}
          <TabsContent value="projects">
            <Card className="bg-[#0b0f1a] border-cyan-500/20">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-fuchsia-300">Projects</CardTitle>
                <Link to="/add/project">
                  <Button className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs h-8 px-3">
                    + Add Project
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800">
                      <TableHead className="text-cyan-300">Banner</TableHead>
                      <TableHead className="text-cyan-300">Title</TableHead>
                      <TableHead className="text-cyan-300">Stack</TableHead>
                      <TableHead className="text-cyan-300">Live</TableHead>
                      <TableHead className="text-cyan-300">Type</TableHead>
                      <TableHead className="text-right text-cyan-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects?.length ? (
                      projects.map((p) => (
                        <TableRow key={p._id} className="border-zinc-800 hover:bg-cyan-500/5">
                          <TableCell>
                            {p.projectBanner?.url ? (
                              <img src={p.projectBanner.url} className="w-12 h-12 rounded-lg object-cover border border-slate-700" alt="banner" />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center text-xs text-slate-400">No img</div>
                            )}
                          </TableCell>
                          <TableCell className="text-white font-medium">{p.title}</TableCell>
                          <TableCell className="text-slate-300">{p.stack}</TableCell>
                          <TableCell>
                            <Badge className={p.deployed === "Yes" ? "bg-green-600" : "bg-slate-600"}>{p.deployed}</Badge>
                          </TableCell>
                          <TableCell>
                            {p.isPaid ? (
                              <Badge className="bg-yellow-600 text-black">Paid ₹{p.price}</Badge>
                            ) : (
                              <Badge className="bg-emerald-700">Free</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center gap-2 justify-end">
                              <Link to={`/view/project/${p._id}`}>
                                <button className="border-2 border-green-500 text-green-400 rounded-full h-8 w-8 flex items-center justify-center hover:bg-green-500 hover:text-black transition-all">
                                  <Eye className="h-4 w-4" />
                                </button>
                              </Link>
                              <Link to={`/update/project/${p._id}`}>
                                <button className="border-2 border-yellow-500 text-yellow-400 rounded-full h-8 w-8 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all">
                                  <Pen className="h-4 w-4" />
                                </button>
                              </Link>
                              <button
                                className="border-2 border-red-500 text-red-400 rounded-full h-8 w-8 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                                onClick={() => {
                                  if (window.confirm(`"${p.title}" delete karna chahte ho?`)) {
                                    dispatch(deleteProject(p._id));
                                  }
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                              <Link to={`/project/buyers/${p._id}`}>
                                <button className="border-2 border-blue-500 text-blue-400 rounded-full h-8 w-8 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all">
                                  <Users className="h-4 w-4" />
                                </button>
                              </Link>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-slate-400 py-8">Koi project nahi mila</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SKILLS */}
          <TabsContent value="skills">
            <div className="grid md:grid-cols-2 gap-4">
              {skills?.length ? (
                skills.map((s) => (
                  <Card key={s._id} className="bg-[#0b0f1a] border-cyan-500/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-cyan-300">{s.title}</CardTitle>
                      {skillLoading && deletingSkillId === s._id ? (
                        <div className="h-7 w-7 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <button
                          className="border-2 border-red-500 text-red-400 rounded-full h-8 w-8 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                          onClick={() => handleDeleteSkill(s._id, s.title)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-slate-400 mb-2">Proficiency: {s.proficiency}%</p>
                      <Progress value={s.proficiency} />
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-slate-400">Koi skill nahi</p>
              )}
            </div>
          </TabsContent>

          {/* APPS */}
          <TabsContent value="apps">
            <Card className="bg-[#0b0f1a] border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-fuchsia-300">Software Apps</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800">
                      <TableHead className="text-cyan-300">Name</TableHead>
                      <TableHead className="text-cyan-300">Icon</TableHead>
                      <TableHead className="text-right text-cyan-300">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {softwareApplications?.length ? (
                      softwareApplications.map((a) => (
                        <TableRow key={a._id} className="border-zinc-800 hover:bg-cyan-500/5">
                          <TableCell className="text-white">{a.name}</TableCell>
                          <TableCell>
                            <img src={a.svg?.url} className="h-6 w-6" alt="icon" />
                          </TableCell>
                          <TableCell className="text-right">
                            {appLoading && appId === a._id ? (
                              <SpecialLoadingButton content="Deleting" />
                            ) : (
                              <button
                                className="border-2 border-red-500 text-red-400 rounded-full h-8 w-8 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all ml-auto"
                                onClick={() => handleDeleteApp(a._id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell className="text-slate-400">Koi app nahi</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TIMELINE — sirf delete */}
          <TabsContent value="timeline">
            <Card className="bg-[#0b0f1a] border-cyan-500/20">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-fuchsia-300">Timeline</CardTitle>
                <Link to="/add/timeline">
                  <Button className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs h-8 px-3">
                    + Add Timeline
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800">
                      <TableHead className="text-cyan-300">Title</TableHead>
                      <TableHead className="text-cyan-300">Description</TableHead>
                      <TableHead className="text-cyan-300">From</TableHead>
                      <TableHead className="text-cyan-300">To</TableHead>
                      <TableHead className="text-right text-cyan-300">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeline?.length ? (
                      timeline.map((t) => (
                        <TableRow key={t._id} className="border-zinc-800 hover:bg-fuchsia-500/5">
                          <TableCell className="text-white font-medium">{t.title}</TableCell>
                          <TableCell className="text-slate-400 max-w-[200px] truncate">{t.description}</TableCell>
                          <TableCell className="text-slate-300">{t.timeline?.from}</TableCell>
                          <TableCell className="text-slate-300">{t.timeline?.to || "Present"}</TableCell>
                          <TableCell className="text-right">
                            {timelineLoading && deletingTimelineId === t._id ? (
                              <div className="flex justify-end">
                                <div className="h-8 w-8 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                              </div>
                            ) : (
                              <button
                                className="border-2 border-red-500 text-red-400 rounded-full h-8 w-8 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all ml-auto"
                                onClick={() => handleDeleteTimeline(t._id, t.title)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-slate-400 py-8">
                          Koi timeline entry nahi hai
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;