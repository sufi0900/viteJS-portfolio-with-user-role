/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user?.result?.role === "admin" ? (
    children
  ) : (
    <Navigate to="/approval" />
  );
};

export default PrivateRoute;
