import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
const PrivateRoute = ({ children }) => {
  const userName = useSelector(state => state.userSlice.user.name);
  return userName ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
