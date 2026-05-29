import { Article } from "../models/articleSchema.js";
import { v2 as cloudinary } from "cloudinary";
import slugify from "slugify";
import readingTime from "reading-time";

// ─────────────────────────────
// CREATE ARTICLE
// ─────────────────────────────

export const createArticle = async (req, res) => {
    console.log("req.files:", req.files);
console.log("req.body:", req.body);
  try {
    const {
      title,
      excerpt,
      content,
      category,
      tags,
      featured,
      published,
    } = req.body;

    // ✅ FILEUPLOAD FIX (NOT MULTER)
    if (!req.files || !req.files.coverImage) {
      return res.status(400).json({
        success: false,
        message: "Cover image is required",
      });
    }

   // More robust file check
const file = req.files?.coverImage;

if (!file) {
  console.log("Files received:", req.files); // debug
  return res.status(400).json({
    success: false,
    message: "Cover image is required",
  });
}

    const result = await cloudinary.uploader.upload(
      file.tempFilePath,
      {
        folder: "portfolio_articles",
      }
    );

    const slug = slugify(title, {
      lower: true,
      strict: true,
    });

    // safe tags parsing
    let parsedTags = [];
    try {
      parsedTags =
        typeof tags === "string" ? JSON.parse(tags) : tags || [];
    } catch {
      parsedTags = [];
    }

    const stats = readingTime(content || "");

    const article = await Article.create({
      title,
      slug,
      excerpt,
      content,
      category,
      tags: parsedTags,
      featured,
      published,
      readTime: stats.text,
      coverImage: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.status(201).json({
      success: true,
      message: "Article created successfully",
      article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────
// GET ALL ARTICLES
// ─────────────────────────────
export const getAllArticles = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const articles = await Article.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      articles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────
// GET SINGLE ARTICLE
// ─────────────────────────────
export const getSingleArticle = async (req, res) => {
  try {
    const article = await Article.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    res.status(200).json({
      success: true,
      article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────
// DELETE ARTICLE
// ─────────────────────────────
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    if (article.coverImage?.public_id) {
      await cloudinary.uploader.destroy(article.coverImage.public_id);
    }

    await article.deleteOne();

    res.status(200).json({
      success: true,
      message: "Article deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────
// UPDATE ARTICLE
// ─────────────────────────────
export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    const {
      title,
      excerpt,
      content,
      category,
      tags,
      featured,
      published,
      seoTitle,
      seoDescription,
    } = req.body;

    // ✅ FILEUPLOAD FIX
    if (req.files && req.files.coverImage) {
      const file = req.files.coverImage;

      if (article.coverImage?.public_id) {
        await cloudinary.uploader.destroy(article.coverImage.public_id);
      }

      const uploadedImage = await cloudinary.uploader.upload(
        file.tempFilePath,
        {
          folder: "portfolio_articles",
        }
      );

      article.coverImage = {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      };
    }

    if (title) {
      article.slug = slugify(title, { lower: true, strict: true });
      article.title = title;
    }

    if (content) {
      const stats = readingTime(content);
      article.readTime = stats.text;
      article.content = content;
    }

    // tags safe parsing
    let parsedTags = article.tags;
    if (tags) {
      try {
        parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
      } catch {
        parsedTags = article.tags;
      }
    }

    article.excerpt = excerpt || article.excerpt;
    article.category = category || article.category;
    article.tags = parsedTags;
    article.featured = featured ?? article.featured;
    article.published = published ?? article.published;
    article.seoTitle = seoTitle || article.seoTitle;
    article.seoDescription = seoDescription || article.seoDescription;

    await article.save();

    res.status(200).json({
      success: true,
      message: "Article updated successfully",
      article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};