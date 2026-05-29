import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    excerpt: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    tags: [
      {
        type: String,
      },
    ],

    coverImage: {
      public_id: String,
      url: String,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    published: {
      type: Boolean,
      default: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    readTime: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Article =
  mongoose.models.Article ||
  mongoose.model("Article", articleSchema);