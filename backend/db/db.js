// Import the mongoose library for MongoDB interaction
import mongoose from "mongoose";

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the URI from environment variables
    await mongoose.connect(`${process.env.MONGODB_URI}/votingDB`);
    console.log("database connected");
  } catch (error) {
    // Handle connection errors and log them
    console.log("database not connected");
    console.error(error);
  }
};

// Export the connectDB function as the default export
export default connectDB;
