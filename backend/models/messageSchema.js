import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderName: {
    type: String,
    trim: true,
    minLength: [2, "Name Must Contain At Least 2 Characters!"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  subject: {
    type: String,
    trim: true,
    minLength: [2, "Subject Must Contain At Least 2 Characters!"],
  },
  message: {
    type: String,
    trim: true,
    minLength: [2, "Message Must Contain At Least 2 Characters!"],
  },
  createdAt: {
    type: Date,
    default: Date.now, // pehle Date.now() tha, jisse sab messages ka time same ban raha tha
  },
});

export const Message = mongoose.model("Message", messageSchema);