import express from "express";

import {
  downloadSourceCode,
}
from "../controller/sourceCodeController.js";

import {
  isCustomerAuthenticated,
}
from "../middlewares/customerAuth.js";

const router = express.Router();



// ============================================
// DOWNLOAD SOURCE CODE
// ============================================

router.get(
  "/download/:projectId",

  isCustomerAuthenticated,

  downloadSourceCode
);

export default router;