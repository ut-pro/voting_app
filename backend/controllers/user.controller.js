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
    if (user) res.send("user already exist, try again...");

    // Hash the password using bcrypt
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) console.error(err);

      // Create a new user object with the hashed password
      const userData = { ...req.body, password: hash };
      console.log(userData);

      // Save the new user to the database
      await User.create(userData);
      res.send("user registered sucessfully");
    });
  } catch (error) {
    // Handle errors and send a response
    res.send("user not registered");
    console.error(error);
  }
};

export const userLogin = async (req, res) => {
  try {
    const { adharNo, password } = req.body;

    const user = await User.findOne({ adharNo: adharNo });
    if (!user) res.send("user not found");

    let hash = user.password;

    bcrypt.compare(password, hash, async (err, result) => {
      if (err) res.send("invalid username or password");

      if (result) {
        let payload = {
          id: user._id,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
        res.json({
          msg: "login success",
          token: token,
        });
      } else {
        res.send("password didn't match");
      }
    });
  } catch (error) {
    res.send("login failed");
    console.error(error);
  }
};
