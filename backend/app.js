




// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import fileUpload from "express-fileupload";
// import cors from "cors";

// import { dbConnection } from "./database/connection.js";
// import { errorMiddleware } from "./middlewares/error.js";

// /* ROUTES */
// import userRouter from "./routes/userRouter.js";
// import timelineRouter from "./routes/timelineRouter.js";
// import messageRouter from "./routes/messageRouter.js";
// import skillRouter from "./routes/skillRouter.js";
// import softwareApplicationRouter from "./routes/softwareApplicationRouter.js";
// import projectRouter from "./routes/projectRouter.js";
// import customerRouter from "./routes/customerRouter.js";
// import paymentRouter from "./routes/paymentRouter.js";
// import sourceCodeRouter from "./routes/sourceCodeRouter.js";
// import visitorRouter from "./routes/visitorRouter.js";
// import aiRouter from "./routes/ariaAIRouter.js";
// import careerRouter from "./routes/careerRouter.js";




// import articleRoutes from "./routes/articleRoutes.js";


// const app = express();
// dotenv.config();

// /* ---------------- TRUST PROXY (Render/Vercel FIX) ---------------- */
// app.set("trust proxy", 1);

// /* ---------------- DB ---------------- */
// dbConnection();

// /* ---------------- SECURITY HEADERS ---------------- */
// app.use((req, res, next) => {
//   res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
//   res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
//   next();
// });

// /* ---------------- CORS (PRODUCTION SAFE) ---------------- */

// const normalize = (url) => url?.replace(/\/$/, "");

// const allowedOrigins = [
//   process.env.PORTFOLIO_URL,
//   process.env.DASHBOARD_URL,
//   "http://localhost:5173",
//   "http://localhost:5174",
//   "http://localhost:3000",
//   "https://mern-portfoliodashboard.vercel.app",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);

//       const cleanOrigin = origin.replace(/\/$/, "");

//       const isAllowed = allowedOrigins
//         .filter(Boolean)
//         .map((o) => o.replace(/\/$/, ""))
//         .includes(cleanOrigin);

//       if (isAllowed) {
//         return callback(null, true);
//       }

//       console.log("❌ BLOCKED CORS:", origin);
//       return callback(new Error("Not allowed by CORS"));
//     },

//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
// // MUST for preflight
// app.options("*", cors({
//   origin: allowedOrigins,
//   credentials: true,
// }));
// /* ---------------- MIDDLEWARES ---------------- */
// app.use(cookieParser());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//     limits: { fileSize: 10 * 1024 * 1024 }, // 10MB safety
//   })
// );

// /* ---------------- ROUTES ---------------- */

// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/timeline", timelineRouter);
// app.use("/api/v1/message", messageRouter);
// app.use("/api/v1/skill", skillRouter);
// app.use("/api/v1/softwareapplication", softwareApplicationRouter);
// app.use("/api/v1/project", projectRouter);
// app.use("/api/v1/customer", customerRouter);
// app.use("/api/v1/payment", paymentRouter);
// app.use("/api/v1/source-code", sourceCodeRouter);
// app.use("/api/v1/visitor", visitorRouter);
// app.use("/api/v1/ai", aiRouter);



// app.use("/api/v1/article", articleRoutes);
// app.use("/api/v1/career", careerRouter);

// /* ---------------- HEALTH CHECK ---------------- */

// app.get("/health", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Server is running 🚀",
//   });
// });

// /* ---------------- ERROR HANDLER ---------------- */
// app.use(errorMiddleware);

// export default app;

























import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import morgan from "morgan";

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

dotenv.config();

const app = express();

/* ─────────────────────────────────────────
   1. TRUST PROXY (Render fix)
───────────────────────────────────────── */
app.set("trust proxy", 1);

/* ─────────────────────────────────────────
   2. DATABASE
───────────────────────────────────────── */
dbConnection();

/* ─────────────────────────────────────────
   3. LOGGING (dev only)
───────────────────────────────────────── */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/* ─────────────────────────────────────────
   4. HELMET — Security HTTP headers
   Covers: XSS, clickjacking, sniffing, etc.
───────────────────────────────────────── */
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'", "https://api.cloudinary.com"],
      },
    },
  })
);

/* ─────────────────────────────────────────
   5. CORS
───────────────────────────────────────── */
const allowedOrigins = [
  process.env.PORTFOLIO_URL,
  process.env.DASHBOARD_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:4000",
  "https://mern-portfoliodashboard.vercel.app",
].filter(Boolean).map((o) => o.replace(/\/$/, ""));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Postman / server-to-server

      const clean = origin.replace(/\/$/, "");
      if (allowedOrigins.includes(clean)) return callback(null, true);

      console.warn("❌ BLOCKED CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors({ origin: allowedOrigins, credentials: true }));

/* ─────────────────────────────────────────
   6. BODY PARSERS
───────────────────────────────────────── */
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ─────────────────────────────────────────
   7. FILE UPLOAD
───────────────────────────────────────── */
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 10 * 1024 * 1024 },
    abortOnLimit: true,           // ← reject oversized files immediately
    safeFileNames: true,          // ← strip special chars from filenames
    preserveExtension: true,
  })
);

/* ─────────────────────────────────────────
   8. MONGO SANITIZE
   Blocks NoSQL injection: { "$gt": "" }
───────────────────────────────────────── */
app.use(mongoSanitize());

/* ─────────────────────────────────────────
   9. XSS CLEAN
   Strips <script> tags from req.body/query
───────────────────────────────────────── */
app.use(xss());

/* ─────────────────────────────────────────
   10. HPP — HTTP Parameter Pollution
   Stops ?sort=asc&sort=desc attacks
───────────────────────────────────────── */
app.use(hpp());

/* ─────────────────────────────────────────
   11. RATE LIMITING
───────────────────────────────────────── */

// General API — 200 requests / 15 min per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again after 15 minutes.",
  },
});

// Auth routes — 10 attempts / 15 min (brute-force protection)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please wait 15 minutes.",
  },
});

// Contact / message form — 5 per hour (spam protection)
const messageLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Message limit reached. Try again in an hour.",
  },
});

// AI route — 30 per hour (expensive endpoint)
const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "AI request limit reached. Try again in an hour.",
  },
});

/* ─────────────────────────────────────────
   12. ROUTES (with targeted limiters)
───────────────────────────────────────── */
app.use("/api/v1", generalLimiter); // applies to all routes below

app.use("/api/v1/user",              authLimiter, userRouter);
app.use("/api/v1/message",           messageLimiter, messageRouter);
app.use("/api/v1/ai",                aiLimiter, aiRouter);

app.use("/api/v1/timeline",          timelineRouter);
app.use("/api/v1/skill",             skillRouter);
app.use("/api/v1/softwareapplication", softwareApplicationRouter);
app.use("/api/v1/project",           projectRouter);
app.use("/api/v1/customer",          customerRouter);
app.use("/api/v1/payment",           paymentRouter);
app.use("/api/v1/source-code",       sourceCodeRouter);
app.use("/api/v1/visitor",           visitorRouter);
app.use("/api/v1/article",           articleRoutes);
app.use("/api/v1/career",            careerRouter);

/* ─────────────────────────────────────────
   13. HEALTH CHECK
───────────────────────────────────────── */
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy 🚀",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

/* ─────────────────────────────────────────
   14. 404 HANDLER
───────────────────────────────────────── */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found.`,
  });
});

/* ─────────────────────────────────────────
   15. GLOBAL ERROR HANDLER
───────────────────────────────────────── */
app.use(errorMiddleware);

export default app;