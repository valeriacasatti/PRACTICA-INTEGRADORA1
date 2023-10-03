import mongoose from "mongoose";

const chatCollection = "chat";

const chatSchema = new mongoose.Schema({
  user: {
    require: true,
    type: String,
    unique: true,
  },
  message: {
    require: true,
    type: String,
  },
});

export const chatModel = new mongoose.model(chatCollection, chatSchema);
