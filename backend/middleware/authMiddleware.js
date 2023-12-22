// Import necessary modules and dependencies
import jwt from "jsonwebtoken"; // JSON Web Token handling
import asyncHandler from "express-async-handler"; // Middleware for handling asynchronous route handlers
import User from "../models/userModel.js"; // User model (assumed to be for interaction with a database)

// Middleware function to protect routes by verifying JWT
const protect = asyncHandler(async (req, res, next) => {
  let token; // Variable to store the extracted token

  // Extract token from the 'jwt' cookie in the request headers
  token = req.cookies.jwt;

  // Check if a token exists in the 'jwt' cookie
  if (token) {
    try {
      // Verify the authenticity of the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user data based on the userId stored in the decoded token
      // Exclude the 'password' field for security reasons
      req.user = await User.findById(decoded.userId).select("-password");

      // Move to the next middleware in the stack
      next();
    } catch (error) {
      // If token verification fails, set 401 status and throw an error
      res.status(401);
      throw new Error("Not Authorized! Invalid token.");
    }
  } else {
    // If no token is found, set 401 status and throw an error
    res.status(401);
    throw new Error("Not Authorized! Token not found.");
  }
});

// Export the 'protect' middleware function to be used in other parts of the application
export { protect };
