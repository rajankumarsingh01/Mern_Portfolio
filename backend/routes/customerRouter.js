


import express from "express";
import {
  loginCustomer,
  getCustomerProfile,
  checkPurchase,
} from "../controller/customerController.js";
import { isCustomerAuthenticated } from "../middlewares/customerAuth.js";

const router = express.Router();

// POST /api/v1/customer/login  ← THIS IS WHAT'S RETURNING 404
router.post("/login", isCustomerAuthenticated, loginCustomer);

// GET /api/v1/customer/profile
router.get("/profile", isCustomerAuthenticated, getCustomerProfile);

// GET /api/v1/customer/check-purchase/:id
router.get("/check-purchase/:id", isCustomerAuthenticated, checkPurchase);

export default router;