// Import dotenv to load environment variables from a .env file
import dotenv from "dotenv";
// Load environment variables from the .env file into process.env
dotenv.config();

// Import express framework for building web applications
import express from "express";

//Import cors to allow cross-origin requests
import cors from "cors";

// Import http module to create an HTTP server
import { createServer } from "http";

// Import socket.io module to enable real-time, bidirectional and event-based communication
import { Server } from "socket.io";

// Import the function to connect to the MongoDB database
import connectDB from "./db/db.js";

// Import the user router for handling user-related routes
import userRouter from "./routes/user.route.js";

// Import the candidate router for handling candidate-related routes
import candidateRouter from "./routes/candidate.route.js";

// Create an instance of an Express application
const app = express();

// Create an HTTP server using the Express application
const httpServer = createServer(app);

// Create an instance of the socket.io server
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(express.static("../frontend"));
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

// Listen for websocket connections
io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("voteUpdate", (candidates) => {
    console.log("Live Vote Update:", candidates);
    io.emit("voteUpdate", candidates);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Connect to the database and start the server
connectDB()
  .then(() => {
    // Start the server and listen on the specified port
    httpServer.listen(process.env.PORT, () => {
      console.log(`server is listening at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    // Handle errors in database connection
    console.error("database connection failed", err);
  });

// Export the io object to be used in other files
export default io;
