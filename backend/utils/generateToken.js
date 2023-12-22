// The provided code generates a JSON Web Token (JWT) and sets it in a cookie in a Node.js/Express application.

import jwt from "jsonwebtoken";

// Function to generate a JWT and set it in a cookie
const generateToken = (res, userId) => {
    // Generating a JWT token using the jwt.sign() method
    const token = jwt.sign(
        // Payload embedded in the token, containing the userId
        { userId },
        // Secret key used to sign the JWT, fetched from environment variables
        process.env.JWT_SECRET,
        {
            // Additional options for the JWT token
            expiresIn: '30d' // Token expiration set to 30 days
        }
    );

    // Setting a cookie named 'jwt' in the response object
    res.cookie(
        'jwt', // Cookie name
        token, // JWT token value
        {
            // Additional cookie options for security and configuration
            httpOnly: true, // Cookie accessible only through HTTP(S) requests
            secure: process.env.NODE_ENV !== 'development', // Set cookie as secure (HTTPS) in non-development environment
            sameSite: 'strict', // Cookie restricted to same-site requests
            maxAge: 30 * 24 * 60 * 60 * 1000 // Cookie expiration time set to 30 days in milliseconds
        }
    );
};


export default generateToken;
