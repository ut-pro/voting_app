import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/votingDB`);
    console.log("database connected");
  } catch (error) {
    console.log("database not connected");
    console.error(error);
  }
};

export default connectDB;
