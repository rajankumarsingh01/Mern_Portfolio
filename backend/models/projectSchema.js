import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    gitRepoLink: {
      type: String,
      default: "",
    },

    projectLink: {
      type: String,
      default: "",
    },

    technologies: {
      type: String,
      required: true,
    },

    stack: {
      type: String,
      required: true,
    },

    // ── Case study fields (sab optional hain) ──
    problemStatement: {
      type: String,
      default: "",
    },

    solution: {
      type: String,
      default: "",
    },

    highlights: {
      type: String, // dashboard me ek line ek highlight, portfolio pe bullet list ban jaati hai
      default: "",
    },

    demoVideoUrl: {
      type: String,
      default: "",
    },

    deployed: {
      type: String,
      required: true,
    },



    isPaid: {
      type: Boolean,
      default: false,
    },





    price: {
      type: Number,
      default: 0,
    },





    sourceCode: {
      public_id: {
        type: String,
        default: "",
      },

      url: {
        type: String,
        default: "",
      },
    },





    purchasedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
      },
    ],



    projectBanner: {
      public_id: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: true,
      },
    },
  },

  {
    timestamps: true,
  }
);

export const Project = mongoose.model(
  "Project",
  projectSchema
);