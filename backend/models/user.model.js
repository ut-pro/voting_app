// Import mongoose library for MongoDB interaction
import mongoose from "mongoose";

// Define the user schema with various fields and their validation rules
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
  },
  mobileNo: {
    type: String,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  adharNo: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "voter"],
    default: "voter",
  },
  isVoted: {
    type: Boolean,
    default: false,
  },
});

// Create a User model using the user schema
const User = mongoose.model("User", userSchema);

// Export the User model as the default export
export default User;
