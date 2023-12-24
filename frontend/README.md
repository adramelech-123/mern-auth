# FrontEnd Notes

We have installed **react-bootstrap** and **react-icons** by running the command `npm i react-bootstrap react-icons`. In order to use react-bootstrap we also need to install the bootstrap package `npm i bootstrap`. In `main.jsx` file we have imported bootstrap for react `import 'bootstrap/dist/css/bootstrap.min.css'`.

## 1. Redux Store Configuration

The provided code snippet pertains to setting up a Redux store using @reduxjs/toolkit. Let's break it down block by block:

1. **Importing `configureStore` from `@reduxjs/toolkit`:**
   ```javascript
   import { configureStore } from '@reduxjs/toolkit'
   ```
   This line imports the `configureStore` function from the `@reduxjs/toolkit` package, which is used to create a Redux store with simplified configuration.

2. **Importing reducers (`authReducer` and `apiSlice`) from their respective files:**
   ```javascript
   import authReducer from './slices/authSlice'
   import { apiSlice } from './slices/apiSlice'
   ```
   - **`authReducer`**: This imports the `authReducer` from a file named `authSlice` located in the `slices` directory. The `authReducer` contains the logic for handling authentication-related state changes.
   - **`apiSlice`**: This imports an `apiSlice` object (which typically contains a slice with reducer and actions) from a file named `apiSlice` located in the `slices` directory. The `apiSlice` could include logic related to API calls and handling the API state.

3. **Configuring the Redux store:**
   ```javascript
   const store = configureStore({
       reducer: {
           auth: authReducer,
           [apiSlice.reducerPath]: apiSlice.reducer
       },
       middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
       devTools: true
   })
   ```
   - **`reducer`**: This part of the configuration specifies the root reducer for the Redux store. It combines multiple reducers into a single reducer object using the property names as keys.
     - **`auth: authReducer`**: Assigns the `authReducer` to a slice named `auth` within the Redux store. This slice handles authentication-related state changes.
     - **`[apiSlice.reducerPath]: apiSlice.reducer`**: Dynamically assigns the reducer from the `apiSlice` to a key in the reducer object based on `apiSlice.reducerPath`. This is usually used for handling API-related state changes.

   - **`middleware`**: It uses `getDefaultMiddleware()` provided by Redux Toolkit to apply the default set of middleware. This function returns an array of middleware that includes thunk, immutability checks, and other common middleware used in Redux Toolkit.

   - **`devTools: true`**: This enables the Redux DevTools Extension for the store, allowing you to debug and inspect state changes in the store.

4. **Exporting the configured store as the default export:**
   ```javascript
   export default store
   ```
   This line exports the `store` variable as the default export, making it available for import in other parts of your application. Other modules can then import this configured Redux store using `import store from 'path/to/store'`.

In summary, this code sets up a Redux store using Redux Toolkit's `configureStore` function. It combines reducers (`authReducer` and `apiSlice.reducer`) into the root reducer, configures middleware, and enables Redux DevTools Extension for debugging purposes. The resulting `store` is then exported for use in other parts of the application.


## 2. Auth Slice

This code snippet deals with the creation of a Redux slice using `createSlice` from `@reduxjs/toolkit`. Let's break it down block by block:

1. **Importing `createSlice` from `@reduxjs/toolkit`:**
   ```javascript
   import { createSlice } from "@reduxjs/toolkit";
   ```
   This line imports the `createSlice` function from the `@reduxjs/toolkit` package. `createSlice` is a utility function provided by Redux Toolkit to define a slice of the Redux state.

2. **Defining the initial state:**
   ```javascript
   const initialState = {
     userInfo: localStorage.getItem("userInfo")
       ? JSON.parse(localStorage.getItem("userInfo"))
       : null,
   };
   ```
   - The `initialState` object contains the initial state for the `authSlice`. It checks `localStorage` for an item named `"userInfo"`. If it exists, it parses the stored JSON string into an object and assigns it to `userInfo`. Otherwise, it sets `userInfo` to `null`.

3. **Creating the authSlice using `createSlice`:**
   ```javascript
   const authSlice = createSlice({
       name: 'auth',
       initialState,
       reducers: {
           setCredentials: (state, action) => {
               state.userInfo = action.payload;
               localStorage.setItem('userInfo', JSON.stringify(action.payload));
           },
           clearCredentials: (state) => {
               state.userInfo = null;
               localStorage.removeItem('userInfo');
           }
       }
   })
   ```
   - **`name: 'auth'`**: This sets the name of the slice to `'auth'`. It will be used as part of the action type string when dispatching actions from this slice.
   
   - **`initialState`**: Assigns the previously defined `initialState` to this slice.

   - **`reducers`**: This defines the reducers for the `authSlice`. It contains two reducer functions:
     - **`setCredentials`**: A reducer responsible for setting the `userInfo` in the state to the `action.payload` (data passed with the action) and storing it in `localStorage` after converting it to a JSON string.
     - **`clearCredentials`**: A reducer responsible for clearing the `userInfo` in the state (setting it to `null`) and removing the corresponding item from `localStorage`.

4. **Exporting actions and reducer:**
   ```javascript
   export const { setCredentials, clearCredentials } = authSlice.actions;
   export default authSlice.reducer;
   ```
   - **`export const { setCredentials, clearCredentials } = authSlice.actions;`**: This line exports the action creators `setCredentials` and `clearCredentials`, allowing other parts of the application to dispatch these actions.
   
   - **`export default authSlice.reducer;`**: This line exports the reducer created by `createSlice`, enabling it to be used as a part of the combined reducer when configuring the Redux store.

In summary, this code defines an authentication slice in Redux using `createSlice`. It sets initial state based on data retrieved from `localStorage`, defines reducers to modify the state (`setCredentials` and `clearCredentials`), and exports action creators along with the reducer for use within a Redux store.

---

## 3. API Slice

The provided code snippet utilizes the `createApi` and `fetchBaseQuery` functions from `@reduxjs/toolkit/query/react` to set up an API slice using RTK Query. Let's break it down block by block:

1. **Importing `createApi` and `fetchBaseQuery` from `@reduxjs/toolkit/query/react`:**
   ```javascript
   import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
   ```
   This line imports the `createApi` and `fetchBaseQuery` functions necessary for setting up and configuring an API slice using Redux Toolkit's RTK Query.

2. **Configuring `fetchBaseQuery`:**
   ```javascript
   const baseQuery = fetchBaseQuery({ baseUrl: '' })
   ```
   - **`fetchBaseQuery({ baseUrl: '' })`**: `fetchBaseQuery` is a function that creates a base query setup for RTK Query. It's used to define the default configuration for sending network requests.
     - In this case, it creates a `baseQuery` with an empty `baseUrl`. Typically, you'd provide the base URL for your API endpoints here.

3. **Creating the API slice using `createApi`:**
   ```javascript
   export const apiSlice = createApi({
       baseQuery,
       tagTypes: ['User'],
       endpoints: (builder) => ({})
   })
   ```
   - **`createApi()`**: This function is used to define an API slice with RTK Query.
     - **`baseQuery`**: The `baseQuery` object (created using `fetchBaseQuery`) is passed as a parameter to configure the base behavior for making API requests.

     - **`tagTypes: ['User']`**: This field specifies the tag types for the API slice. Tag types are used to group and manage cache data with RTK Query's caching behavior. In this case, it creates a tag type for the 'User' entity.

     - **`endpoints: (builder) => ({})`**: The `endpoints` field defines the API endpoints using a function that takes a `builder` object.
       - Currently, it appears empty (`{}`) as there are no defined endpoints within this snippet. Typically, you would define specific endpoints here using the `builder` object provided. Each endpoint definition includes configurations for querying specific API routes.

4. **Exporting `apiSlice`:**
   ```javascript
   export const apiSlice = createApi({ /* ... */ })
   ```
   This line exports the created `apiSlice`, allowing other parts of the application to import and use this configured API slice for defining and executing API requests using RTK Query.

In summary, this code sets up an API slice using RTK Query from Redux Toolkit. It configures a base query with a specified base URL (currently empty), defines tag types for caching purposes, and provides a structure to define and manage various API endpoints.

## UsersAPI Slice

This code is using Redux Toolkit's `createApi` or `createAsyncThunk` for managing API requests. Let's break down the code block by block:

### Import Statement
```javascript
import { apiSlice } from './apiSlice'
```
This line imports the `apiSlice` from a file named `'apiSlice'`. This imported `apiSlice` likely contains utility functions or configurations related to making API requests.

### Constant Declaration
```javascript
const USERS_URL = 'api/users'
```
This line declares a constant variable `USERS_URL` and sets its value to `'api/users'`. It holds the base URL for user-related API endpoints.

### `usersApiSlice` Definition
```javascript
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    })
  }),
});
```
This block of code defines an `usersApiSlice` using the `injectEndpoints` method from the `apiSlice`. It creates different API endpoints (`login`, `logout`, `register`, `updateUser`) using the `builder.mutation` method.

The `builder.mutation()` method is a part of Redux Toolkit's API creation capabilities, specifically used within the `createApi` function. This method is used to define mutation endpoints within an API slice.

Here's an explanation of the `builder.mutation()` method:

### Purpose:
- **Defining Mutations:** It's used to define mutations or actions that will interact with the API. Mutations generally correspond to HTTP requests (e.g., GET, POST, PUT, DELETE) and define how the API request should be made.

### Parameters:
- **Query Function:** The `builder.mutation()` method typically takes an object as an argument that contains a `query` property. This `query` property is a function that defines the details of the API request (such as URL, method, request body).

### Anatomy of the `query` Function:
- **URL:** It specifies the endpoint URL to which the API request will be sent. This URL is constructed based on the base URL (`USERS_URL` in this case) and additional path segments.
- **Method:** It specifies the HTTP method used for the request (e.g., POST, PUT, DELETE).
- **Body (optional):** If applicable (for POST or PUT requests), the `body` property includes the data to be sent with the request payload.

### Usage:
- **Within `builder.mutation()`:** Each `builder.mutation()` call defines a specific API action (such as login, logout, register, updateUser) by providing the necessary details through the `query` function.

### Example:
```javascript
builder.mutation({
  query: (data) => ({
    url: `${USERS_URL}/auth`,
    method: "POST",
    body: data,
  }),
})
```
In this example:
- The `query` function specifies a POST request to the `${USERS_URL}/auth` endpoint with the provided `data` as the request body.

The `builder.mutation()` method plays a crucial role in defining API-related actions (mutations) within Redux Toolkit's API creation, allowing for efficient management and usage of API endpoints within the application.

___

- **`login`**: Defines a mutation for a login endpoint using the POST method. It constructs the URL as `${USERS_URL}/auth` and includes the `data` object in the request body.
- **`logout`**: Defines a mutation for a logout endpoint using the POST method. It constructs the URL as `${USERS_URL}/logout`. It doesn't include a request body since it's a logout action.
- **`register`**: Defines a mutation for a user registration endpoint using the POST method. It constructs the URL as `${USERS_URL}` and includes the `data` object in the request body.
- **`updateUser`**: Defines a mutation for updating user profile information using the PUT method. It constructs the URL as `${USERS_URL}/profile` and includes the `data` object in the request body.

### Export Statements
```javascript
export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation } = usersApiSlice
```
This line exports `useLoginMutation`, `useLogoutMutation`, `useRegisterMutation`, and `useUpdateUserMutation` from the `usersApiSlice`. These exported values likely contain hooks or functions that can be used within React components to perform the defined API operations (login, logout, register, update user).

In summary, this code creates a set of API endpoints (`login`, `logout`, `register`, `updateUser`) with corresponding mutations and exports hooks or functions to use these mutations in React components, utilizing the configured `apiSlice` for managing API requests.