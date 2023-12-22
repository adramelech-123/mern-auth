# MERN Authentication

## Description
This is a practice project derived from a MERN JWT Authentication tutorial by Traversy Media on https://www.youtube.com/watch?v=R4AhvYORZRY . The project uses various packages which include JsonWebTokens(JWT), ReduxToolkit, bcryptjs for encryption and cookie-parser.

## 1. Generating a JWT Token



```js 
import { jwt } from "jsonwebtoken";
```

This line imports the Jwt object from the jsonwebtoken library.

```js
const generateToken = (res, userId) => {
```
Defines a function named `generateToken` that takes two parameters: res (representing the response object in Express) and userId (the user's identifier for whom the token is being generated).

```js 
const token = jwt.sign({userId}, process.env.JWT_SECRET, { expiresIn: '30d' }); 
```

Generates a JWT using the jwt.sign() method, which takes three arguments:
- `{userId}`: An object containing the userId that will be embedded in the token's payload.
- `process.env.JWT_SECRET`: The secret key used to sign the JWT. It's fetched from the environment variables (process.env) for security purposes.
- `{ expiresIn: '30d' }`: Specifies that the token will expire after 30 days.

```js
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    });
```
Sets a cookie named 'jwt' in the response object (res.cookie()) with the generated token and additional options:
- `httpOnly`: true: Makes the cookie accessible only through HTTP(S) requests and not accessible by client-side JavaScript, enhancing security.
- `secure`: process.env.NODE_ENV !== 'development': Sets the secure attribute based on the environment. If the environment is not in development mode (NODE_ENV is not 'development'), the cookie will only be sent over secure (HTTPS) connections.
- `sameSite`: 'strict': Restricts the cookie to be sent only with requests initiated from the same site as the origin.
- `maxAge`: 30 * 24 * 60 * 60 * 1000: Sets the expiration time of the cookie to 30 days in milliseconds.

___

## 2. Vite Configuration

The Vite configuration file sets up a Vite project with specific settings (in this case for the backend to communicate with the frontend). Let's break down each part:

### Import Statements
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
```
- `defineConfig` is a function imported from `vite` used to define the Vite configuration.
- `react` is a Vite plugin for integrating React into Vite projects.

### Configuration Object
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
```
- `defineConfig()` function is called with an object that represents the Vite configuration.

#### `plugins`:
```javascript
plugins: [react()],
```
- Configures Vite to use the `@vitejs/plugin-react`, enabling support for React in the Vite project.
- This plugin allows Vite to handle React-specific features like JSX, Hot Module Replacement (HMR), and React Fast Refresh.

#### `server`:
```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true
    }
  }
}
```
- Configures the Vite development server settings.

#### `port`:
```javascript
port: 3000,
```
- Specifies the port number on which the Vite development server will run. In this case, it's set to port `3000`.

#### `proxy`:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true
  }
}
```
- Sets up a proxy for API requests. Any request starting with `/api` will be redirected to another server.
- `/api` acts as the prefix for requests to be proxied.
- `target` specifies the URL of the server where the requests will be forwarded.
- `changeOrigin: true` ensures that the `Host` header is modified to the target URL's host, allowing the backend server to identify the original host properly.

### Explanation:
- The configuration is structured to enable React support via the `@vitejs/plugin-react` plugin.
- The development server runs on port `3000`.
- The `/api` route prefix is proxied to a backend server running at `http://localhost:5000`. This setup is helpful during development, allowing frontend code (running on Vite) to communicate with a backend API server without encountering CORS (Cross-Origin Resource Sharing) issues.

In summary, this Vite configuration sets up the development environment for a Vite project with React support and configures a proxy to handle API requests, forwarding them to a backend server during development to facilitate frontend-backend communication.

___

## 3. Scripts in root package.json file

These scripts are setup in the root package.json file tpo allow us to run our backend server as well as our frontend server and enable them to communicate. We have installed a package called **concurrently** by running the command `npm i -D concurrently`. This package allows us to execute more than one script at a time. That way, we can run our backend server and frontend at the same time with the use of a single command.

```json
  "scripts": {
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js",
    "client": "npm run dev --prefix frontend",
    "dev": "concurrently \"npm run server\" \"npm run client \""
  },
```

Certainly! These scripts are defined in the `scripts` section of the root `package.json` file. They are used for various development-related tasks using npm scripts. Here's an explanation of each script:

### 1. `"start": "node backend/server.js"`
- This script is executed when running `npm start` in the terminal.
- It starts the Node.js server by running the `server.js` file located in the `backend` directory using the `node` command.

### 2. `"server": "nodemon backend/server.js"`
- Running `npm run server` in the terminal executes this script.
- It starts the Node.js server using `nodemon`, a utility that automatically restarts the server whenever changes are detected in the `server.js` file or its dependencies. The server file is located in the `backend` directory.

### 3. `"client": "npm run dev --prefix frontend"`
- Executing `npm run client` in the terminal triggers this script.
- It runs another script named `dev` located in the `frontend` directory using the `--prefix` flag to specify the path to the `frontend` directory. The exact command executed will depend on the definition of `npm run dev` within the `frontend` package.json file.

### 4. `"dev": "concurrently \"npm run server\" \"npm run client \""`
- Invoking `npm run dev` in the terminal runs this script.
- It uses `concurrently`, a utility that allows running multiple commands concurrently in the terminal.
- Specifically, it runs two other scripts simultaneously:
   - `npm run server`: Starts the Node.js server using `nodemon`.
   - `npm run client`: Triggers another script for the client-side (as defined in the `"client"` script), potentially starting the development server or bundler for the frontend application.

### Summary:
- `start`: Launches the Node.js server directly.
- `server`: Starts the server with `nodemon` for automatic server restarts on file changes.
- `client`: Executes a script related to the frontend development (potentially starting a development server or build process).
- `dev`: Concurrently runs both server and client scripts to streamline the development process, facilitating both backend and frontend development simultaneously.

These scripts are configured to facilitate the development workflow by enabling quick startup of both backend and frontend environments, aiding in concurrent development of both parts of the application.

___