// Import express framework for building web applications
import express from "express";

// Import the authentication middleware
import awth from "../middlewares/awth.middleware.js";

// Import the role-checking middleware
import checkRole from "../middlewares/role.middleware.js";

// Import the createCandidate, deleteCandidate, showCandidates, updateCandidate, voteCandidate, and voteCount controller functions
import {
  createCandidate,
  deleteCandidate,
  showCandidates,
  updateCandidate,
  voteCandidate,
  voteCount,
} from "../controllers/candidate.controller.js";

// Create a new router object
const router = express.Router();

// Define a POST route for creating a candidate
// When a POST request is made to /create, the awth middleware is called first to authenticate the user
// If authentication is successful, the checkRole middleware is called to check if the user has the "admin" role
// If the user has the "admin" role, the createCandidate controller function is called
router.post("/create", awth, checkRole("admin"), createCandidate);

// Define a PATCH route for updating a candidate
// When a PATCH request is made to /update/:id, the awth middleware is called first to authenticate the user
// If authentication is successful, the checkRole middleware is called to check if the user has the "admin" role
// If the user has the "admin" role, the updateCandidate controller function is called
router.patch("/update/:id", awth, checkRole("admin"), updateCandidate);

// Define a PATCH route for deleting a candidate
// When a PATCH request is made to /delete/:id, the awth middleware is called first to authenticate the user
// If authentication is successful, the checkRole middleware is called to check if the user has the "admin" role
// If the user has the "admin" role, the deleteCandidate controller function is called
router.delete("/delete/:id", awth, checkRole("admin"), deleteCandidate);

// Define a GET route for showing all candidates
// When a GET request is made to the root path, the awth middleware is called first to authenticate the user
// If authentication is successful, the showCandidates controller function is called
router.get("/", awth, showCandidates);

// Define a PATCH route for voting a candidate
// When a PATCH request is made to /vote/:id, the awth middleware is called first to authenticate the user
// If authentication is successful, the checkRole middleware is called to check if the user has the "voter" role
// If the user has the "voter" role, the voteCandidate controller function is called
router.patch("/vote/:id", awth, checkRole("voter"), voteCandidate);

// Define a GET route for getting the vote count
// When a GET request is made to /vote/count, the voteCount controller function is called
router.get("/vote/count", voteCount);

// Export the router object as the default export
export default router;
