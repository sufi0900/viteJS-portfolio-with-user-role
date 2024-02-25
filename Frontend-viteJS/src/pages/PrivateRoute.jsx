/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user?.result?.role === "admin" ? children : <Navigate to="/" />;
};
//   const { user } = useSelector((state) => ({ ...state.auth }));
//   return user ? children : <LoadingToRedirect />;
// };

export default PrivateRoute;
