/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";

const SuperAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return user?.result?.role === "superadmin" ? (
    children
  ) : (
    <Navigate to="/approval" />
  );
};
export default SuperAdminRoute;
