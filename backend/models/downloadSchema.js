import mongoose from "mongoose";

const downloadSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },

    downloadedAt: {
      type: Date,
      default: Date.now,
    },

    ipAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Download = mongoose.model("Download", downloadSchema);