import { Message } from "../models/messageSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { notifyByEmail } from "../utils/notifyByEmail.js";

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { senderName, email, subject, message } = req.body;

  if (!senderName || !email || !subject || !message) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  if (
    typeof senderName !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string"
  ) {
    return next(new ErrorHandler("Invalid input!", 400));
  }

  if (!EMAIL_REGEX.test(email)) {
    return next(new ErrorHandler("Please provide a valid email address!", 400));
  }

  if (senderName.length > 100 || subject.length > 200 || message.length > 2000) {
    return next(new ErrorHandler("Message is too long!", 400));
  }

  await Message.create({ senderName, email, subject, message });

  // Fire-and-forget: email fail ho to bhi message DB me save rahega
  notifyByEmail({ senderName, email, subject, message }).catch((err) =>
    console.error("Email notification failed:", err.message)
  );

  res.status(201).json({
    success: true,
    message: "Message Sent",
  });
});

export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (!message) {
    return next(new ErrorHandler("Message Already Deleted!", 400));
  }
  await message.deleteOne();
  res.status(201).json({
    success: true,
    message: "Message Deleted",
  });
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.status(201).json({
    success: true,
    messages,
  });
});