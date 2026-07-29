import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: process.env.DB_NAME || "Zomato_clone",
      serverSelectionTimeoutMS: 5000,
    });

    console.log("connected to mongodb");
  } catch (error: any) {
    console.error("MongoDB connection failed:", error?.message || error);
  }
};

export default connectDB;
