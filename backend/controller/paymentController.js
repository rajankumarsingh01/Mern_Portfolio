import crypto from "crypto";
import { razorpayInstance } from "../utils/razorpay.js";
import { Project } from "../models/projectSchema.js";
import { Payment } from "../models/paymentSchema.js";
import { Customer } from "../models/customerSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";

// =====================================================
// CREATE RAZORPAY ORDER
// =====================================================
export const createOrder = catchAsyncErrors(async (req, res, next) => {
  console.log("🔥 CREATE ORDER HIT");
  console.log("🔥 req.customer:", req.customer);
  console.log("🔥 req.body:", req.body);

  // 1. Auth check
  if (!req.customer) {
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }

  // 2. Env check
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.log("❌ KEY_ID:", process.env.RAZORPAY_KEY_ID ? "set" : "MISSING");
    console.log("❌ KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET ? "set" : "MISSING");
    return res.status(500).json({ success: false, message: "Razorpay env missing" });
  }

  // 3. Razorpay instance check
  if (!razorpayInstance) {
    console.log("❌ razorpayInstance is null/undefined");
    return res.status(500).json({ success: false, message: "Razorpay not initialized" });
  }

  // 4. Project ID
  const { projectId } = req.body;
  if (!projectId) {
    return res.status(400).json({ success: false, message: "projectId missing in body" });
  }

  // 5. Find project
  const project = await Project.findById(projectId);
  console.log("🔥 Project:", project?._id, "| isPaid:", project?.isPaid, "| price:", project?.price);

  if (!project) {
    return res.status(404).json({ success: false, message: "Project not found" });
  }

  if (!project.isPaid) {
    return res.status(400).json({ success: false, message: "This project is free" });
  }

  // 6. Price validation
  const price = Number(project.price);
  if (!price || isNaN(price) || price <= 0) {
    console.log("❌ Invalid price:", project.price);
    return res.status(400).json({ success: false, message: "Invalid project price: " + project.price });
  }

  // 7. Already purchased?
  const customer = await Customer.findById(req.customer._id);
  const alreadyPurchased = customer.purchasedProjects.some(
    (pid) => pid.toString() === projectId
  );
  if (alreadyPurchased) {
    return res.status(400).json({ success: false, message: "Already purchased" });
  }

  // 8. Create Razorpay order
  try {
    const amount = Math.round(price * 100);
    console.log("🔥 Creating order | amount (paise):", amount);

    const order = await razorpayInstance.orders.create({
      amount,
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
    });

    console.log("✅ Razorpay order created:", order.id);

    return res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (razorpayError) {
    console.log("❌ Razorpay error:", razorpayError);
    return res.status(500).json({
      success: false,
      message: "Razorpay order creation failed",
      error: razorpayError?.error?.description || razorpayError.message,
    });
  }
});

// =====================================================
// VERIFY PAYMENT
// =====================================================
export const verifyPayment = catchAsyncErrors(async (req, res, next) => {
  console.log("🔥 VERIFY PAYMENT HIT");
  console.log("🔥 req.customer:", req.customer?._id);

  if (!req.customer) {
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    projectId,
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !projectId) {
    return res.status(400).json({ success: false, message: "Missing payment fields" });
  }

  // Verify signature
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  console.log("🔥 Signature match:", generated_signature === razorpay_signature);

  if (generated_signature !== razorpay_signature) {
    return next(new ErrorHandler("Payment Verification Failed!", 400));
  }

  const project = await Project.findById(projectId);
  if (!project) {
    return next(new ErrorHandler("Project Not Found!", 404));
  }

  // Prevent duplicate
  const existingPayment = await Payment.findOne({ razorpay_payment_id });
  if (existingPayment) {
    return res.status(200).json({ success: true, message: "Payment already recorded" });
  }

  // Save payment
  await Payment.create({
    customer: req.customer._id,
    project: project._id,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    amount: project.price,
  });

  // Update project.purchasedBy
  if (!project.purchasedBy.includes(req.customer._id)) {
    project.purchasedBy.push(req.customer._id);
    await project.save();
  }

  // ✅ THIS WAS MISSING — update customer.purchasedProjects
  const customer = await Customer.findById(req.customer._id);
  if (!customer.purchasedProjects.includes(project._id)) {
    customer.purchasedProjects.push(project._id);
    await customer.save();
  }

  console.log("✅ Payment verified successfully");

  return res.status(200).json({
    success: true,
    message: "Payment Successful!",
  });
});