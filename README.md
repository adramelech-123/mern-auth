# MERN Authentication

## Description
This is a practice project derived from a MERN JWT Authentication tutorial by Traversy Media on https://www.youtube.com/watch?v=R4AhvYORZRY . The project uses various packages which include JsonWebTokens(JWT), ReduxToolkit, bcryptjs for encryption and cookie-parser.

# Generating a JWT Token



```js 
import { jwt } from "jsonwebtoken";
```

This line imports the Jwt object from the jsonwebtoken library.

```js
const generateToken = (res, userId) => {
```
Defines a function named **generateToken** that takes two parameters: res (representing the response object in Express) and userId (the user's identifier for whom the token is being generated).

```js 
const token = jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: '30d' }); 
```

Generates a JWT using the jwt.sign() method, which takes three arguments:
- **{userId}**: An object containing the userId that will be embedded in the token's payload.
- **process.env.JWT_SECRET**: The secret key used to sign the JWT. It's fetched from the environment variables (process.env) for security purposes.
- **{ expiresIn: '30d' }**: Specifies that the token will expire after 30 days.

```js
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    });
```
Sets a cookie named 'jwt' in the response object (res.cookie()) with the generated token and additional options:
- **httpOnly**: true: Makes the cookie accessible only through HTTP(S) requests and not accessible by client-side JavaScript, enhancing security.
- **secure**: process.env.NODE_ENV !== 'development': Sets the secure attribute based on the environment. If the environment is not in development mode (NODE_ENV is not 'development'), the cookie will only be sent over secure (HTTPS) connections.
- **sameSite**: 'strict': Restricts the cookie to be sent only with requests initiated from the same site as the origin.
- **maxAge**: 30 * 24 * 60 * 60 * 1000: Sets the expiration time of the cookie to 30 days in milliseconds.

___