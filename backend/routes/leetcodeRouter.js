import express from "express";
import { getLeetCodeStats } from "../controller/leetcodeController.js";

const router = express.Router();

router.get("/:username", getLeetCodeStats);

export default router;