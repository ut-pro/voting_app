// Import the User model and bcrypt library for password hashing
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get the number of salt rounds for bcrypt from environment variables
const saltRounds = +process.env.SALT_ROUNDS;

// Controller function for user signup
export const userSignup = async (req, res) => {
  try {
    // Extract password from request body
    let password = req.body.password;

    // Check if a user with the given ID already exists
    const user = await User.findOne({ _id: req.body._id });
    if (user) return res.status(400).send("user already exist, try again...");

    // Hash the password using bcrypt
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) console.error(err);

      // Create a new user object with the hashed password
      const userData = { ...req.body, password: hash };
      console.log(userData);

      // Save the new user to the database
      await User.create(userData);
      res.status(201).send("user registered successfully");
    });
  } catch (error) {
    // Handle errors and send a response
    res.status(500).send("user not registered");
    console.error(error);
  }
};

// Controller function for user login
export const userLogin = async (req, res) => {
  try {
    // Extract adharNo and password from request body
    const { adharNo, password } = req.body;

    // Find the user with the given adharNo
    const user = await User.findOne({ adharNo: adharNo });
    if (!user) return res.status(404).send("user not found");

    // Get the hashed password from the user object
    let hash = user.password;

    // Compare the provided password with the hashed password
    bcrypt.compare(password, hash, async (err, result) => {
      if (err) return res.status(401).send("invalid username or password");

      if (result) {
        // If the password matches, create a JWT token
        let payload = {
          id: user._id,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
        res.json({
          msg: "login success",
          token: token,
        });
      } else {
        // If the password does not match, send an error response
        res.status(401).send("password didn't match");
      }
    });
  } catch (error) {
    // Handle errors and send a response
    res.status(500).send("login failed");
    console.error(error);
  }
};

// Controller function for fetching user profile
export const userProfile = async (req, res) => {
  try {
    // Extract user ID from the request object (assumed to be set by authentication middleware)
    const userId = req.user;

    // Find the user by ID
    const user = await User.findById(userId);

    // Send the user object as a response
    res.status(200).send(user);
  } catch (error) {
    // Handle errors and send a response
    console.error(error);
    res.status(500).send("internal server error");
  }
};

// Controller fucnction to show all users
export const showUsers = async (req, res) => {
  try {
    // Find all users
    const users = await User.find();
    if (!users) return res.status(404).send("no user available");

    // Send the list of users as a response
    res.status(200).send(users);
  } catch (error) {
    // Handle errors and send a response
    res.status(500).send("internal server error");
    console.error(error);
  }
};

// Controller function for updating user password
export const updatePassword = async (req, res) => {
  try {
    // Extract user ID from the request object (assumed to be set by authentication middleware)
    const userId = req.user;

    // Extract current and new passwords from request body
    const { currentPassword, newPassword } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("user not found");

    // Compare the provided current password with the hashed password
    bcrypt.compare(currentPassword, user.password, async (err, result) => {
      if (err) return res.status(500).send("internal server error");

      if (result) {
        // If the current password matches, hash the new password
        bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
          if (err) return res.status(500).send("internal server error");

          // Update the user's password with the hashed new password
          user.password = hash;
          await user.save();
          return res.status(200).send("password updated successfully");
        });
      } else {
        // If the current password does not match, send an error response
        return res.status(401).send("password didn't match");
      }
    });
  } catch (error) {
    // Handle errors and send a response
    res.status(500).send("password not updated");
    console.error(error);
  }
};
