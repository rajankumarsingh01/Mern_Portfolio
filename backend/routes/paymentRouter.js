import express from "express";

import {
  createOrder,
  verifyPayment,
} from "../controller/paymentController.js";

import {
  isCustomerAuthenticated,
} from "../middlewares/customerAuth.js";

const router = express.Router();



// CREATE ORDER
router.post(
  "/create-order",
  isCustomerAuthenticated,
  createOrder
);



// VERIFY PAYMENT
router.post(
  "/verify-payment",
  isCustomerAuthenticated,
  verifyPayment
);

export default router;