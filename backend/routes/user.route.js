// Import express framework for building web applications
import express from "express";

// Import the userLogin, userProfile, userSignup, and updatePassword controller functions
import {
  userLogin,
  userProfile,
  userSignup,
  updatePassword,
  showUsers,
} from "../controllers/user.controller.js";

// Import the authentication middleware
import awth from "../middlewares/awth.middleware.js";
import checkRole from "../middlewares/role.middleware.js";

// Create a new router object
const router = express.Router();

// Define a POST route for user signup
// When a POST request is made to /signup, the userSignup controller function is called
router.post("/signup", userSignup);

// Define a POST route for user login
// When a POST request is made to /login, the userLogin controller function is called
router.post("/login", userLogin);

// Define a GET route for user profile
// When a GET request is made to /profile, the awth middleware is called first to authenticate the user
// If authentication is successful, the userProfile controller function is called
router.get("/profile", awth, userProfile);

// Define a GET route for user profile
// When a GET request is made to /, the awth middleware is called first to authenticate the user
// If authentication is successful, the checkRole middleware is called to check if the user has the "admin" role
// If the user has the "admin" role, the userProfile controller function is called
router.get("/", awth, checkRole("admin"), showUsers);

// Define a PATCH route for updating user password
// When a PATCH request is made to /update/update_password, the awth middleware is called first to authenticate the user
// If authentication is successful, the updatePassword controller function is called
router.patch("/update/update_password", awth, updatePassword);

// Export the router object as the default export
export default router;
