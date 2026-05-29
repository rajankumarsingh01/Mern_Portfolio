import { Project } from "../models/projectSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import axios from "axios";

// =====================================================
// DOWNLOAD SOURCE CODE
// =====================================================

export const downloadSourceCode = catchAsyncErrors(async (req, res, next) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    return next(new ErrorHandler("Project Not Found!", 404));
  }

  if (!project.sourceCode || !project.sourceCode.url) {
    return next(new ErrorHandler("Source Code Not Available!", 404));
  }

  // ============================================
  // PAID PROJECT — CHECK PURCHASE
  // ============================================

  if (project.isPaid) {
    const hasPurchased = project.purchasedBy.some(
      (customerId) => customerId.toString() === req.customer._id.toString()
    );

    if (!hasPurchased) {
      return next(new ErrorHandler("Please Purchase This Project First!", 403));
    }
  }

  // ============================================
  // PROXY DOWNLOAD — Cloudinary se fetch karke browser ko do
  // ============================================

  // Clean URL — koi fl_attachment nahi chahiye
  const cleanUrl = project.sourceCode.url.replace(/\/upload\/[^/]*fl_attachment[^/]*\//,"/upload/");

  const safeFilename = project.title
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase()
    .trim();

  try {
    const response = await axios.get(cleanUrl, {
      responseType: "stream",
    });

    // Browser ko force download ke liye headers
    res.setHeader("Content-Disposition", `attachment; filename="${safeFilename}-source-code.zip"`);
    res.setHeader("Content-Type", "application/zip");

    if (response.headers["content-length"]) {
      res.setHeader("Content-Length", response.headers["content-length"]);
    }

    // Stream directly browser ko
    response.data.pipe(res);

  } catch (err) {
    console.error("Download proxy error:", err.message);
    return next(new ErrorHandler("Failed to fetch source code file!", 500));
  }
});