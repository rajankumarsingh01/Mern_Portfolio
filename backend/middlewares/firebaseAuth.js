import admin from "../database/firebaseAdmin.js";

export const verifyFirebaseToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = await admin.auth().verifyIdToken(token);

    req.firebaseUser = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Firebase token",
      error: error.message,
    });
  }
};