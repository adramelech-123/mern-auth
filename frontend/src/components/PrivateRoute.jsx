// Import necessary components from React Router DOM and React Redux
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// Define a component called PrivateRoute
const PrivateRoute = () => {
  // Access the userInfo from the Redux store using the useSelector hook
  const { userInfo } = useSelector((state) => state.auth);

  // Check if userInfo exists; if it does, render the child components using <Outlet/>
  // If userInfo doesn't exist, redirect to the '/login' route using <Navigate/>
  return userInfo ? <Outlet /> : <Navigate to={"/login"} replace />;
};

// Export the PrivateRoute component as the default export
export default PrivateRoute;
