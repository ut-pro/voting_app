// Import express framework for building web applications
import express from "express";

// Import the userSignup controller function
import { userLogin, userSignup } from "../controllers/user.controller.js";

// Create a new router object
const router = express.Router();

// Define a POST route for user signup
router.post("/signup", userSignup);
router.post("/login", userLogin);

// Export the router object as the default export
export default router;
