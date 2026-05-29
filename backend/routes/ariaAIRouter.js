import express from "express";
import { chatWithAria } from "../controller/ariaController.js";

const router = express.Router();

// POST /api/v1/ai/chat
router.post("/chat", chatWithAria);

export default router;