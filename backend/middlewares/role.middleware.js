import User from "../models/user.model.js";

// Middleware function to check the user's role
const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      // Extract user ID from the request object (assumed to be set by authentication middleware)
      const userId = req.user;

      // Find the user by ID
      const user = await User.findById(userId);

      // Check if the user's role matches the required role
      if (user.role !== role) return res.send("user not authorised");

      // If the role matches, proceed to the next middleware or route handler
      next();
    } catch (error) {
      // Handle errors and send a response
      console.error(error);
      res.send("authorization failed");
    }
  };
};

export default checkRole;
