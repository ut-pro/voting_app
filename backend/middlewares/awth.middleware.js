// Import jwt library for verifying JWT tokens
import jwt from "jsonwebtoken";

// Define the authentication middleware function
const awth = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];
    if (!token) res.send("token not found");

    // Verify the token using the secret key
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach the user ID from the token payload to the request object
    req.user = decode.id;
    next();
  } catch (error) {
    // Handle errors and send a response
    res.send("awthentication failed");
    console.error(error);
  }
};

// Export the middleware function as the default export
export default awth;
