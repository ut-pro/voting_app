// Import mongoose library for MongoDB interaction
import mongoose from "mongoose";

// Define the candidate schema with various fields and their validation rules
const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  party: {
    type: String,
    trim: true,
    required: true,
  },
  votes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      votedAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  voteCount: {
    type: Number,
    default: 0,
  },
});

// Create a Candidate model using the candidate schema
const Candidate = mongoose.model("Candidate", candidateSchema);

// Export the Candidate model as the default export
export default Candidate;
