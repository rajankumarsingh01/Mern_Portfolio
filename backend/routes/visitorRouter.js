import express from "express";

import {
  trackVisitor,
  getVisitorAnalytics,
}
from "../controller/visitorController.js";

import {
  isAuthenticated,
}
from "../middlewares/auth.js";

const router = express.Router();



// TRACK VISITOR
router.post(
  "/track",
  trackVisitor
);



// ADMIN ANALYTICS
router.get(
  "/analytics",
  isAuthenticated,
  getVisitorAnalytics
);

export default router;