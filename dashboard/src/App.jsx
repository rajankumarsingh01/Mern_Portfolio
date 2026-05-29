


// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// import Login from "./pages/Login";
// import HomePage from "./pages/HomePage";
// import ManageSkills from "./pages/ManageSkills";
// import ManageProjects from "./pages/ManageProjects";
// import UpdateProject from "./pages/UpdateProject";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import ManageTimeline from "./pages/ManageTimeline";
// import ViewProject from "./pages/ViewProject";
// import ViewBuyers from "./pages/ViewBuyers";
// import VisitorAnalytics from "./pages/VisitorAnalytics";

// import { useDispatch } from "react-redux";
// import { useEffect } from "react";

// import { getUser } from "./store/slices/userSlice";
// import { getAllSkills } from "./store/slices/skillSlice";
// import { getAllSoftwareApplications } from "./store/slices/softwareApplicationSlice";
// import { getAllTimeline } from "./store/slices/timelineSlice";
// import { getAllMessages } from "./store/slices/messageSlice";
// import { getAllProjects } from "./store/slices/projectSlice";



// import { getAllArticles } from "./store/slices/articleSlice"; // ← ADD





// // ── Article Pages ───────────────────────────
// import ManageArticles from "./pages/ManageArticle";
// import AddArticle from "./pages/Addarticle";
// import UpdateArticle from "./pages/UpdateArticle"; // rename file to UpdateArticle.jsx

// function App() {
//   const dispatch = useDispatch();

//   // Track Visitor
//   useEffect(() => {
//     const trackVisitor = async () => {
//       try {
//         await axios.post(
//           "http://localhost:4000/api/v1/visitor/track",
//           {
//             page: window.location.pathname,
//           }
//         );
//       } catch (error) {
//         console.log("Visitor tracking error:", error.message);
//       }
//     };

//     trackVisitor();
//   }, []);

//   // Load Initial Data
//   useEffect(() => {
//     dispatch(getUser());
//     dispatch(getAllSkills());
//     dispatch(getAllSoftwareApplications());
//     dispatch(getAllTimeline());
//     dispatch(getAllMessages());
//     dispatch(getAllProjects());
//       dispatch(getAllArticles()); // ← ADD
//   }, [dispatch]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/password/forgot" element={<ForgotPassword />} />
//         <Route path="/password/reset/:token" element={<ResetPassword />} />
//         <Route path="/manage/skills" element={<ManageSkills />} />
//         <Route path="/manage/timeline" element={<ManageTimeline />} />
//         <Route path="/manage/projects" element={<ManageProjects />} />
//         <Route path="/view/project/:id" element={<ViewProject />} />
//         <Route path="/update/project/:id" element={<UpdateProject />} />
//         <Route path="/project/buyers/:id" element={<ViewBuyers />} />
//         <Route
//           path="/visitor/analytics"
//           element={<VisitorAnalytics />}
//         />




//           {/* ── Article Routes ── */}
//         <Route path="/manage/articles" element={<ManageArticles />} />
//         <Route path="/manage/articles/add" element={<AddArticle />} />
//         <Route path="/manage/articles/update/:id" element={<UpdateArticle />} />



//       </Routes>

//       <ToastContainer position="bottom-right" theme="dark" />
//     </Router>
//   );
// }

// export default App;





import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import ManageSkills from "./pages/ManageSkills";
import ManageProjects from "./pages/ManageProjects";
import UpdateProject from "./pages/UpdateProject";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ManageTimeline from "./pages/ManageTimeline";
import ViewProject from "./pages/ViewProject";
import ViewBuyers from "./pages/ViewBuyers";
import VisitorAnalytics from "./pages/VisitorAnalytics";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { getUser } from "./store/slices/userSlice";
import { getAllSkills } from "./store/slices/skillSlice";
import { getAllSoftwareApplications } from "./store/slices/softwareApplicationSlice";
import { getAllTimeline } from "./store/slices/timelineSlice";
import { getAllMessages } from "./store/slices/messageSlice";
import { getAllProjects } from "./store/slices/projectSlice";

import { getAllArticles } from "./store/slices/articleSlice";
import { getAllCareerItems } from "./store/slices/careerSlice"; // NEW

// ─────────────────────────────────────────────
// ARTICLE PAGES
// ─────────────────────────────────────────────
import ManageArticles from "./pages/ManageArticle";
import AddArticle from "./pages/Addarticle";
import UpdateArticle from "./pages/UpdateArticle";

// ─────────────────────────────────────────────
// CAREER PAGES
// ─────────────────────────────────────────────
import ManageCareer from "./pages/ManageCareer";
import AddCareer from "./pages/AddCareer";
import UpdateCareer from "./pages/UpdateCareer";

function App() {
  const dispatch = useDispatch();

  // TRACK VISITOR
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        await axios.post(
          "http://localhost:4000/api/v1/visitor/track",
          {
            page: window.location.pathname,
          }
        );
      } catch (error) {
        console.log(
          "Visitor tracking error:",
          error.message
        );
      }
    };

    trackVisitor();
  }, []);

  // LOAD INITIAL DATA
  useEffect(() => {
    dispatch(getUser());

    dispatch(getAllSkills());

    dispatch(
      getAllSoftwareApplications()
    );

    dispatch(getAllTimeline());

    dispatch(getAllMessages());

    dispatch(getAllProjects());

    dispatch(getAllArticles());

    dispatch(getAllCareerItems()); // NEW
  }, [dispatch]);

  return (
    <Router>
      <Routes>

        {/* MAIN */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* AUTH */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/password/forgot"
          element={<ForgotPassword />}
        />

        <Route
          path="/password/reset/:token"
          element={<ResetPassword />}
        />

        {/* SKILLS */}
        <Route
          path="/manage/skills"
          element={<ManageSkills />}
        />

        {/* TIMELINE */}
        <Route
          path="/manage/timeline"
          element={<ManageTimeline />}
        />

        {/* PROJECTS */}
        <Route
          path="/manage/projects"
          element={<ManageProjects />}
        />

        <Route
          path="/view/project/:id"
          element={<ViewProject />}
        />

        <Route
          path="/update/project/:id"
          element={<UpdateProject />}
        />

        <Route
          path="/project/buyers/:id"
          element={<ViewBuyers />}
        />

        {/* ANALYTICS */}
        <Route
          path="/visitor/analytics"
          element={<VisitorAnalytics />}
        />

        {/* ───────────────────────── */}
        {/* ARTICLE ROUTES */}
        {/* ───────────────────────── */}
        <Route
          path="/manage/articles"
          element={<ManageArticles />}
        />

        <Route
          path="/manage/articles/add"
          element={<AddArticle />}
        />

        <Route
          path="/manage/articles/update/:id"
          element={<UpdateArticle />}
        />

        {/* ───────────────────────── */}
        {/* CAREER ROUTES */}
        {/* ───────────────────────── */}
        <Route
          path="/manage/career"
          element={<ManageCareer />}
        />

        <Route
          path="/manage/career/add"
          element={<AddCareer />}
        />

        <Route
          path="/manage/career/update/:id"
          element={<UpdateCareer />}
        />

      </Routes>

      <ToastContainer
        position="bottom-right"
        theme="dark"
      />
    </Router>
  );
}

export default App;