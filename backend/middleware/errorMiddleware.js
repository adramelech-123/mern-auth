// Middleware for handling requests to undefined routes
const notFound = (req, res, next) => {
  // Create an Error object with a message indicating the requested URL was not found
  const error = new Error(`Not Found: ${req.originalUrl}`);

  // Set the HTTP response status code to 404 (Not Found)
  res.status(404);

  // Pass the error to the next middleware or error-handling middleware in the chain
  next(error);
};

// Error-handling middleware
const errorHandler = (err, req, res, next) => {
  // Determine the status code based on the existing response status code or default to 500 (Internal Server Error)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Get the error message from the error object
  let message = err.message;

  // Check if the error is of type 'CastError' and has a kind of 'ObjectId'
  if (err.name === "CastError" && err.kind === "ObjectId") {
    // If the error is a CastError with ObjectId kind, set status code to 404 and customize the error message
    statusCode = 404;
    message = "Resource not found!";
  }

  // Set the HTTP response status code and send a JSON response with error details
  res.status(statusCode).json({
    message,
    // Include the error stack in the response only if the environment is not set to 'production'
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// Exporting the notFound and errorHandler middleware functions
export { notFound, errorHandler };
