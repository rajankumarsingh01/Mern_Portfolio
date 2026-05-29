import geoip from "geoip-lite";
import { UAParser } from "ua-parser-js";

import { Visitor } from "../models/visitorSchema.js";


// ========================================
// TRACK VISITOR
// ========================================

export const trackVisitor = async (req, res) => {
  try {

    // ====================================
    // GET REAL IP
    // ====================================

    let ip =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      req.ip;

    // If multiple IPs
    if (ip && ip.includes(",")) {
      ip = ip.split(",")[0];
    }

    // Remove ::ffff:
    if (ip && ip.includes("::ffff:")) {
      ip = ip.replace("::ffff:", "");
    }

    // Localhost fallback
    const isLocalhost =
      ip === "::1" ||
      ip === "127.0.0.1" ||
      ip === "localhost";



    // ====================================
    // GEO LOCATION
    // ====================================

    let country = "Local";
    let city = "Development";

    if (!isLocalhost) {
      const geo = geoip.lookup(ip);

      country = geo?.country || "Unknown";
      city = geo?.city || "Unknown";
    }



    // ====================================
    // USER AGENT
    // ====================================

    const parser = new UAParser(
      req.headers["user-agent"]
    );

    const result = parser.getResult();

    const browser =
      result.browser.name || "Unknown";

    const os =
      result.os.name || "Unknown";

    const device =
      result.device.type || "Desktop";



    // ====================================
    // SAVE VISITOR
    // ====================================

    await Visitor.create({
      ip,
      country,
      city,
      browser,
      os,
      device,
      page: req.body.page || "/",
      userAgent: req.headers["user-agent"],
    });



    res.status(200).json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ========================================
// GET VISITOR ANALYTICS
// ========================================

export const getVisitorAnalytics =
  async (req, res) => {

    try {

      const totalVisitors =
        await Visitor.countDocuments();

      const uniqueVisitors =
        await Visitor.distinct("ip");



      const recentVisitors =
        await Visitor.find()
          .sort({ createdAt: -1 })
          .limit(10);



      const countryStats =
        await Visitor.aggregate([
          {
            $group: {
              _id: "$country",
              count: { $sum: 1 },
            },
          },
          {
            $sort: { count: -1 },
          },
        ]);



      const dailyVisitors =
        await Visitor.aggregate([
          {
            $group: {
              _id: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$createdAt",
                },
              },

              visitors: {
                $sum: 1,
              },
            },
          },

          {
            $sort: {
              _id: 1,
            },
          },
        ]);



      res.status(200).json({

        success: true,

        analytics: {

          totalVisitors,

          uniqueVisitors:
            uniqueVisitors.length,

          recentVisitors,

          countryStats,

          dailyVisitors,
        },
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };