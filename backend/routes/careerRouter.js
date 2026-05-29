import express from "express";

import {
  createCareer,
  getAllCareers,
  getSingleCareer,
  deleteCareer,
  updateCareer,
  getSingleCareerById,
} from "../controller/careerController.js";

const router = express.Router();

// Slug se single career fetch karne ke liye
router.get("/slug/:slug", getSingleCareer); // ← yeh add karo





router.post("/add", createCareer);

router.get("/all", getAllCareers);

router.get("/:id", getSingleCareerById);

router.put("/update/:id", updateCareer);

router.delete("/delete/:id", deleteCareer);

export default router;