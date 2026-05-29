
import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    category: {
      type: String,
      enum: ["internship", "job", "training"],
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      default: "Remote",
    },

    mode: {
      type: String,
      enum: ["Remote", "Onsite", "Hybrid"],
      default: "Remote",
    },

    duration: {
      type: String,
    },

    stipend: {
      type: String,
    },

    salary: {
      type: String,
    },

    skills: [String],

    description: {
      type: String,
      required: true,
    },

    applyLink: {
      type: String,
      required: true,
    },

    deadline: {
      type: Date,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    published: {
      type: Boolean,
      default: true,
    },

    careerImg: {
      public_id: String,
      url: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Career = mongoose.model(
  "Career",
  careerSchema
);

