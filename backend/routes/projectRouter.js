import express from "express";
import {
  addNewProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  getProjectBuyers,
  downloadSourceCode
} from "../controller/projectController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { isCustomerAuthenticated } from "../middlewares/customerAuth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewProject);
router.delete("/delete/:id", isAuthenticated, deleteProject);
router.put("/update/:id", isAuthenticated, updateProject);
router.get("/getall", getAllProjects);
router.get("/get/:id", getSingleProject);
router.get(
  "/buyers/:id",
  isAuthenticated,
  getProjectBuyers
);




// Customer download (purchase ke baad)
router.get("/download/customer/:projectId", isCustomerAuthenticated, downloadSourceCode);
export default router;
