import express from "express";

import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getSingleArticle,
  updateArticle
} from "../controller/articleController.js";

import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

/* ---------------- CREATE ARTICLE (NO ROLE CHECK) ---------------- */
router.post(
  "/create",
  isAuthenticated,
  
  createArticle
);

/* ---------------- GET ALL (PUBLIC) ---------------- */
router.get("/all", getAllArticles);

/* ---------------- GET SINGLE (PUBLIC) ---------------- */
router.get("/:slug", getSingleArticle);

/* ---------------- UPDATE (AUTH ONLY) ---------------- */
router.put(
  "/update/:id",
  isAuthenticated,
  
  updateArticle
);

/* ---------------- DELETE (AUTH ONLY) ---------------- */
router.delete(
  "/delete/:id",
  isAuthenticated,
  deleteArticle
);

export default router;