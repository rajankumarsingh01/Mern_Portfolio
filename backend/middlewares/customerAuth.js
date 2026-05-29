import admin from "../database/firebaseAdmin.js";
import { Customer } from "../models/customerSchema.js";

export const isCustomerAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.log("❌ NO AUTH HEADER");
      return res.status(401).json({ message: "No auth header" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    const decoded = await admin.auth().verifyIdToken(token);

    console.log("🔥 DECODED USER:", decoded.uid);

    let customer = await Customer.findOne({ firebaseUID: decoded.uid });

    if (!customer) {
      customer = await Customer.create({
        firebaseUID: decoded.uid,
        name: decoded.name || "User",
        email: decoded.email,
        avatar: decoded.picture || "",
      });
    }

    req.customer = customer;
    next();
  } catch (err) {
    console.log("❌ AUTH ERROR:", err.message);
    return res.status(401).json({
      message: "Auth failed",
      error: err.message,
    });
  }
};