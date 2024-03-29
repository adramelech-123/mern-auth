// Import necessary modules and files
import path from 'path'
import express from "express"; // Import the Express framework
import dotenv from "dotenv"; // Import dotenv for managing environment variables
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"; // Import custom error handling middleware
import connectDB from "./config/db.js"; // Import the database connection function
import userRoutes from "./routes/userRoutes.js"; // Import routes for user-related operations
import cookieParser from "cookie-parser";

// Configure environment variables
dotenv.config(); // Load environment variables from a .env file into process.env
const port = process.env.PORT || 5001; // Set the server port based on the environment variable or default to 5001

// Create an Express application
const app = express(); // Initialize the Express app

// Connect to the database
connectDB(); // Call the function to establish a connection to the database

// Middleware setup
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies for form submissions
app.use(cookieParser()) //Parse cookies

// Routes setup
app.use("/api/users", userRoutes); // Mount the user routes at the '/api/users' base path


// Setup for production or development modes
if(process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname, 'frontend/dist')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')))
} else {
  app.get("/", (req, res) => res.send("Server is ready!")); // Define a simple route for the root URL that returns 'Server is ready!'
}


// Error handling middleware setup
app.use(notFound); // Middleware to handle requests for undefined routes (404 Not Found)
app.use(errorHandler); // Error handling middleware to handle all types of errors

// Start the server and listen for incoming requests
app.listen(port, () => console.log(`Server started on port ${port}`)); // Start the server on the specified port and log a message when it starts
