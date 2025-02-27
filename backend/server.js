// Import dotenv to load environment variables from a .env file
import dotenv from "dotenv";
// Load environment variables from the .env file into process.env
dotenv.config();

// Import express framework for building web applications
import express from "express";

//Import cors to allow cross-origin requests
import cors from "cors";

// Import the function to connect to the MongoDB database
import connectDB from "./db/db.js";

// Import the user router for handling user-related routes
import userRouter from "./routes/user.route.js";

// Import the candidate router for handling candidate-related routes
import candidateRouter from "./routes/candidate.route.js";

// Create an instance of an Express application
const app = express();

// Middleware to parse JSON bodies in incoming requests
app.use(express.json());

// Middleware to allow cross-origin requests
app.use(cors());

// Define a route handler for the root URL that sends a welcome message
app.get("/", (req, res) => {
  res.send("Welcome to the vote app");
});

// Use the user router for routes starting with /user
app.use("/user", userRouter);

// Use the candidate router for routes starting with /candidate
app.use("/candidate", candidateRouter);

// Connect to the database and start the server
connectDB()
  .then(() => {
    // Start the server and listen on the specified port
    app.listen(process.env.PORT, () => {
      console.log(`server is listening at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    // Handle errors in database connection
    console.error("database connection failed", err);
  });
