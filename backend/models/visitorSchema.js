import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
    },

    country: {
      type: String,
      default: "Unknown",
    },

    city: {
      type: String,
      default: "Unknown",
    },

    browser: {
      type: String,
      default: "Unknown",
    },

    os: {
      type: String,
      default: "Unknown",
    },

    device: {
      type: String,
      default: "Desktop",
    },

    page: {
      type: String,
      default: "/",
    },

    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Visitor = mongoose.model(
  "Visitor",
  visitorSchema
);