import { v2 as cloudinary } from "cloudinary";
import { Career } from "../models/careerSchema.js";
import { generateSlug } from "../utils/generateSlug.js";

export const createCareer = async (req, res) => {
  try {
    const {
      title, category, company, location, mode,
      duration, stipend, salary, skills, description,
      applyLink, deadline, featured, published,
    } = req.body;

    const slug = generateSlug(title);

    const careerData = {
      title, slug, category, company, location, mode,
      duration, stipend, salary, skills, description,
      applyLink, deadline, featured, published,
    };

    // ✅ CLOUDINARY UPLOAD
    if (req.files && req.files.careerImg) {
      const file = req.files.careerImg;

      console.log("Uploading to Cloudinary:", file.tempFilePath); // debug

      const result = await cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: "career_images" }
      );

      console.log("Cloudinary result:", result.secure_url); // debug

      careerData.careerImg = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const career = await Career.create(careerData);

    res.status(201).json({
      success: true,
      message: "Career Created",
      career,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET ALL
export const getAllCareers = async (req, res) => {
  try {
    const { category } = req.query;

    let query = {};

    if (category) {
      query.category = category;
    }

    const opportunities = await Career.find(query)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      opportunities,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// GET SINGLE
export const getSingleCareer = async (req, res) => {
  try {
    const career = await Career.findOne({
      slug: req.params.slug,
    });

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career Not Found",
      });
    }

    res.status(200).json({
      success: true,
      career,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// DELETE
export const deleteCareer = async (req, res) => {
  try {
    const career = await Career.findById(
      req.params.id
    );

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career Not Found",
      });
    }

    await career.deleteOne();

    res.status(200).json({
      success: true,
      message: "Career Deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};




export const getSingleCareerById = async (
  req,
  res
) => {
  try {
    const career = await Career.findById(
      req.params.id
    );

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career Not Found",
      });
    }

    res.status(200).json({
      success: true,
      item: career,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



export const updateCareer = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({ success: false, message: "Career Not Found" });
    }

    const {
      title, category, company, location, mode,
      duration, stipend, salary, skills, description,
      applyLink, deadline, featured, published,
    } = req.body;

    career.title = title;
    career.category = category;
    career.company = company;
    career.location = location;
    career.mode = mode;
    career.duration = duration;
    career.stipend = stipend;
    career.salary = salary;
    career.skills = skills;
    career.description = description;
    career.applyLink = applyLink;
    career.deadline = deadline;
    career.featured = featured;
    career.published = published;

    // ✅ CLOUDINARY UPLOAD ON UPDATE
    if (req.files && req.files.careerImg) {
      const file = req.files.careerImg;

      // Purana image delete karo
      if (career.careerImg?.public_id && career.careerImg.public_id !== "temp_id") {
        await cloudinary.uploader.destroy(career.careerImg.public_id);
      }

      const result = await cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: "career_images" }
      );

      career.careerImg = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    await career.save();

    res.status(200).json({ success: true, message: "Career Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};