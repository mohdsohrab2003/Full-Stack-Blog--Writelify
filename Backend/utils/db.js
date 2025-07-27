import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    await mongoose.connect(`${MONGODB_URI}/writelify`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
