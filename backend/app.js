




import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";

import { dbConnection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";

/* ROUTES */
import userRouter from "./routes/userRouter.js";
import timelineRouter from "./routes/timelineRouter.js";
import messageRouter from "./routes/messageRouter.js";
import skillRouter from "./routes/skillRouter.js";
import softwareApplicationRouter from "./routes/softwareApplicationRouter.js";
import projectRouter from "./routes/projectRouter.js";
import customerRouter from "./routes/customerRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
import sourceCodeRouter from "./routes/sourceCodeRouter.js";
import visitorRouter from "./routes/visitorRouter.js";
import aiRouter from "./routes/ariaAIRouter.js";
import careerRouter from "./routes/careerRouter.js";




import articleRoutes from "./routes/articleRoutes.js";


const app = express();
dotenv.config();

/* ---------------- TRUST PROXY (Render/Vercel FIX) ---------------- */
app.set("trust proxy", 1);

/* ---------------- DB ---------------- */
dbConnection();

/* ---------------- SECURITY HEADERS ---------------- */
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

/* ---------------- CORS (PRODUCTION SAFE) ---------------- */

const normalize = (url) => url?.replace(/\/$/, "");

const allowedOrigins = [
  process.env.PORTFOLIO_URL,
  process.env.DASHBOARD_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://mern-portfoliodashboard.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const cleanOrigin = origin.replace(/\/$/, "");

      const isAllowed = allowedOrigins
        .filter(Boolean)
        .map((o) => o.replace(/\/$/, ""))
        .includes(cleanOrigin);

      if (isAllowed) {
        return callback(null, true);
      }

      console.log("❌ BLOCKED CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// MUST for preflight
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
}));
/* ---------------- MIDDLEWARES ---------------- */
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB safety
  })
);

/* ---------------- ROUTES ---------------- */

app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/softwareapplication", softwareApplicationRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/source-code", sourceCodeRouter);
app.use("/api/v1/visitor", visitorRouter);
app.use("/api/v1/ai", aiRouter);



app.use("/api/v1/article", articleRoutes);
app.use("/api/v1/career", careerRouter);

/* ---------------- HEALTH CHECK ---------------- */

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running 🚀",
  });
});

/* ---------------- ERROR HANDLER ---------------- */
app.use(errorMiddleware);

export default app;