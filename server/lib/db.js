import mongoose from "mongoose";

// Set event listeners once (outside connectDB)
mongoose.connection.on('connected', () => console.log('Database Connected'));
mongoose.connection.on('error', (error) => console.error('Database connection error:', error));

export const connectDB = async () => {

  // console.log("MONGODB_URL is:", process.env.MONGODB_URL);

  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Optional: exit app on DB connection failure
  }
};
