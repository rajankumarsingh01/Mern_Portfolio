import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    razorpay_order_id: {
      type: String,
      required: true,
    },

    razorpay_payment_id: {
      type: String,
      required: true,
    },

    razorpay_signature: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "paid",
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model(
  "Payment",
  paymentSchema
);