import express from "express";

import {
  createCareer,
  getAllCareers,
  getSingleCareer,
  deleteCareer,
  updateCareer,
  getSingleCareerById,
} from "../controller/careerController.js";

import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

/* ---------- PUBLIC ---------- */
router.get("/slug/:slug", getSingleCareer);
router.get("/all", getAllCareers);
router.get("/:id", getSingleCareerById);

/* ---------- ADMIN ONLY ---------- */
router.post("/add", isAuthenticated, createCareer);
router.put("/update/:id", isAuthenticated, updateCareer);
router.delete("/delete/:id", isAuthenticated, deleteCareer);

export default router;