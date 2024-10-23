// import React, { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { UserContext } from "../useContext"; // Import your UserContext

// const ProtectedRoute = ({ children }) => {
//   const { user } = useContext(UserContext); // Access user from context

//   // If the user is not logged in, redirect to the login page
//   if (!user) {
//     alert("Please Login or signup first to continue");
//     return <Navigate to="/login" replace />;
//   }


//   // If the user is logged in, render the child component
//   return children;
// };

// export default ProtectedRoute;

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../useContext"; // Import your UserContext
 
const ProtectedRoute = ({ children }) => {
  // const { user } = useContext(UserContext); // Access user from context
  const isUserLoggedIn = localStorage.getItem("loggedinuser");
 
  // If the user is not logged in, redirect to the login page
  if (!isUserLoggedIn) {
    alert("Please Login or signup first to continue");
    return <Navigate to="/login" replace />;
  }
 
 
  // If the user is logged in, render the child component
  return children;
};
 
export default ProtectedRoute;
 