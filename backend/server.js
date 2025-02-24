// Import dotenv to load environment variables from a .env file
import dotenv from "dotenv";
dotenv.config();

// Import express framework for building web applications
import express from "express";

// Import the function to connect to the MongoDB database
import connectDB from "./db/db.js";

// Import the user router for handling user-related routes
import userRouter from "./routes/user.route.js";

// Create an instance of an Express application
const app = express();

// Middleware to parse JSON bodies in incoming requests
app.use(express.json());

// Use the user router for routes starting with /user
app.use("/user", userRouter);

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
