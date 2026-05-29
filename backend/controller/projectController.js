



import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Project } from "../models/projectSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { Payment } from "../models/paymentSchema.js";
import axios from "axios";




// ======================================================
// ADD NEW PROJECT
// ======================================================

export const addNewProject = catchAsyncErrors(
  async (req, res, next) => {

    // CHECK BANNER
    if (
      !req.files ||
      !req.files.projectBanner
    ) {
      return next(
        new ErrorHandler(
          "Project Banner Required!",
          400
        )
      );
    }

    const { projectBanner } = req.files;

    // FORM DATA
const {
  title,
  description,
  gitRepoLink,
  projectLink,
  stack,
  technologies,
  deployed,
  isPaid,
  price,
  sourceCodeLink,
} = req.body;



    // VALIDATION
    if (
      !title ||
      !description ||
      !stack ||
      !technologies ||
      !deployed
    ) {
      return next(
        new ErrorHandler(
          "Please Fill All Required Fields!",
          400
        )
      );
    }



    // ==========================================
    // UPLOAD PROJECT IMAGE
    // ==========================================

    const cloudinaryResponse =
      await cloudinary.uploader.upload(
        projectBanner.tempFilePath,
        {
          folder: "PORTFOLIO_SOURCE_CODES",
        }
      );

    if (
      !cloudinaryResponse ||
      cloudinaryResponse.error
    ) {
      console.log(cloudinaryResponse.error);

      return next(
        new ErrorHandler(
          "Failed To Upload Banner!",
          500
        )
      );
    }



    // ==========================================
    // SOURCE CODE ZIP UPLOAD
    // ==========================================

    let sourceCodeData = {
      public_id: "",
      url: "",
    };



    // IF PAID PROJECT
    if (
      isPaid === "true" &&
      req.files.sourceCode
    ) {

      const sourceCode =
        req.files.sourceCode;

      const sourceUpload =
        await cloudinary.uploader.upload(
          sourceCode.tempFilePath,
          {
            folder: "PORTFOLIO_SOURCE_CODES",

            resource_type: "raw",
          }
        );

      if (
        !sourceUpload ||
        sourceUpload.error
      ) {
        console.log(sourceUpload.error);

        return next(
          new ErrorHandler(
            "Source Code Upload Failed!",
            500
          )
        );
      }

      sourceCodeData = {
        public_id: sourceUpload.public_id,
        url: sourceUpload.secure_url,
      };
    }



    // ==========================================
    // CREATE PROJECT
    // ==========================================

    const project = await Project.create({

      title,

      description,

      gitRepoLink,

      projectLink,

      stack,

      technologies,

      deployed,

      isPaid:
        isPaid === "true" ? true : false,

      price:
        isPaid === "true"
          ? Number(price)
          : 0,

      sourceCode: sourceCodeData,

      projectBanner: {
        public_id:
          cloudinaryResponse.public_id,

        url:
          cloudinaryResponse.secure_url,
      },
    });



    res.status(201).json({
      success: true,
      message: "Project Added Successfully!",
      project,
    });
  }
);



// ======================================================
// UPDATE PROJECT
// ======================================================

export const updateProject = catchAsyncErrors(
  async (req, res, next) => {

    const project =
      await Project.findById(
        req.params.id
      );

    if (!project) {
      return next(
        new ErrorHandler(
          "Project Not Found!",
          404
        )
      );
    }



    const updatedData = {

      title: req.body.title,

      description: req.body.description,

      stack: req.body.stack,

      technologies: req.body.technologies,

      deployed: req.body.deployed,

      projectLink: req.body.projectLink,

      gitRepoLink: req.body.gitRepoLink,

      isPaid:
        req.body.isPaid === "true"
          ? true
          : false,

      price:
        req.body.isPaid === "true"
          ? Number(req.body.price)
          : 0,
    };



    // ==========================================
    // UPDATE BANNER
    // ==========================================

    if (
      req.files &&
      req.files.projectBanner
    ) {

      await cloudinary.uploader.destroy(
        project.projectBanner.public_id
      );

      const bannerUpload =
        await cloudinary.uploader.upload(
          req.files.projectBanner.tempFilePath,
          {
            folder:
              "PORTFOLIO_PROJECT_IMAGES",
          }
        );

      updatedData.projectBanner = {
        public_id:
          bannerUpload.public_id,

        url:
          bannerUpload.secure_url,
      };
    }



    // ==========================================
    // UPDATE SOURCE CODE
    // ==========================================

    if (
      req.body.isPaid === "true" &&
      req.files &&
      req.files.sourceCode
    ) {

      // DELETE OLD ZIP
      if (
        project.sourceCode &&
        project.sourceCode.public_id
      ) {
        await cloudinary.uploader.destroy(
          project.sourceCode.public_id,
          {
            resource_type: "raw",
          }
        );
      }



      const sourceUpload =
        await cloudinary.uploader.upload(
          req.files.sourceCode.tempFilePath,
          {
            folder:
              "PORTFOLIO SOURCE CODES",

            resource_type: "raw",
          }
        );

      updatedData.sourceCode = {
        public_id:
          sourceUpload.public_id,

        url:
          sourceUpload.secure_url,
      };
    }



    const updatedProject =
      await Project.findByIdAndUpdate(
        req.params.id,
        updatedData,
        {
          new: true,
          runValidators: true,
        }
      );



    res.status(200).json({
      success: true,
      message: "Project Updated Successfully!",
      project: updatedProject,
    });
  }
);



// ======================================================
// DELETE PROJECT
// ======================================================

export const deleteProject = catchAsyncErrors(
  async (req, res, next) => {

    const { id } = req.params;

    const project =
      await Project.findById(id);

    if (!project) {
      return next(
        new ErrorHandler(
          "Project Not Found!",
          404
        )
      );
    }



    // DELETE IMAGE
    await cloudinary.uploader.destroy(
      project.projectBanner.public_id
    );



    // DELETE SOURCE CODE
    if (
      project.sourceCode &&
      project.sourceCode.public_id
    ) {
      await cloudinary.uploader.destroy(
        project.sourceCode.public_id,
        {
          resource_type: "raw",
        }
      );
    }



    await project.deleteOne();



    res.status(200).json({
      success: true,
      message: "Project Deleted Successfully!",
    });
  }
);



// ======================================================
// GET ALL PROJECTS
// ======================================================

export const getAllProjects = catchAsyncErrors(
  async (req, res, next) => {

    const projects =
      await Project.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      projects,
    });
  }
);



// ======================================================
// GET SINGLE PROJECT
// ======================================================

// backend/controllers/projectController.js
// getSingleProject controller mein yeh add karo:

export const getSingleProject = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorHandler("Project Not Found!", 404));
  }

  // Koi URL modification nahi — backend proxy handle karega
  res.status(200).json({
    success: true,
    project,
  });
});



// ======================================================
// GET PROJECT BUYERS
// ======================================================

export const getProjectBuyers = catchAsyncErrors(
  async (req, res, next) => {

    const { id } = req.params;

    // FIND PROJECT
    const project = await Project.findById(id);

    if (!project) {
      return next(
        new ErrorHandler(
          "Project Not Found!",
          404
        )
      );
    }

    // FIND PAYMENTS
    const payments = await Payment.find({
      project: id,
    })
      .populate("customer")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,

      totalBuyers: payments.length,

      buyers: payments,
    });
  }
);





// =====================================================
// DOWNLOAD SOURCE CODE
// =====================================================
export const downloadSourceCode = catchAsyncErrors(async (req, res, next) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);
  if (!project) return next(new ErrorHandler("Project Not Found!", 404));
  if (!project.sourceCode?.url) return next(new ErrorHandler("Source Code Not Available!", 404));

  if (req.customer) {
    const hasPurchased = project.purchasedBy.some(
      (id) => id.toString() === req.customer._id.toString()
    );
    if (!hasPurchased) return next(new ErrorHandler("Please Purchase This Project First!", 403));
  }

  const safeFilename = project.title
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase()
    .trim();

  // URL ke spaces fix karo
  const rawUrl = project.sourceCode.url.trim();
  const parts = rawUrl.split("/");
  const fixedUrl = parts
    .map((part, i) => (i < 3 ? part : encodeURIComponent(decodeURIComponent(part))))
    .join("/");

  console.log("Downloading:", fixedUrl);

  let stream;
  try {
    stream = await axios({
      method: "GET",
      url: fixedUrl,
      responseType: "stream",
      maxRedirects: 10,
      headers: { "User-Agent": "Mozilla/5.0", Accept: "*/*" },
    });
  } catch (err) {
    console.error("Fetch error:", err.message);
    return next(new ErrorHandler("Could not fetch source code", 500));
  }

  const ct = stream.headers["content-type"] || "";
  if (ct.includes("text/html")) {
    console.error("Got HTML — URL wrong ya file missing:", fixedUrl);
    return next(new ErrorHandler("Source code file not found", 404));
  }

  res.setHeader("Content-Disposition", `attachment; filename="${safeFilename}-source-code.zip"`);
  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
  if (stream.headers["content-length"]) {
    res.setHeader("Content-Length", stream.headers["content-length"]);
  }

  stream.data.pipe(res);
  stream.data.on("error", (err) => console.error("Stream error:", err.message));
});
 