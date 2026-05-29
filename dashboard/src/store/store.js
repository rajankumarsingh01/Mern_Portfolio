// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./slices/userSlice";
// import forgotPasswordReducer from "./slices/forgotResetPasswordSlice";
// import skillReducer from "./slices/skillSlice";
// import projectReducer from "./slices/projectSlice";
// import timelineReducer from "./slices/timelineSlice";
// import softwareApplicationReducer from "./slices/softwareApplicationSlice";
// import messageReducer from "./slices/messageSlice";

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     forgotPassword: forgotPasswordReducer,
//     skill: skillReducer,
//     project: projectReducer,
//     timeline: timelineReducer,
//     softwareApplications: softwareApplicationReducer,
//     messages: messageReducer,
//   },
// });













import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotPasswordReducer from "./slices/forgotResetPasswordSlice";
import skillReducer from "./slices/skillSlice";
import projectReducer from "./slices/projectSlice";
import timelineReducer from "./slices/timelineSlice";
import softwareApplicationReducer from "./slices/softwareApplicationSlice";
import messageReducer from "./slices/messageSlice";
import articleReducer from "./slices/articleSlice"; // ← ADD THIS
import careerSlice from "./slices/careerSlice";// ← ADD THIS

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    skill: skillReducer,
    project: projectReducer,
    timeline: timelineReducer,
    softwareApplications: softwareApplicationReducer,
    messages: messageReducer,
    articles: articleReducer, // ← ADD THIS
 career: careerSlice, // ← ADD THIS
  },
});