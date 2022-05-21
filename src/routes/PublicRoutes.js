import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const PublicRoutes = ({ children }) => {
  const { logged } = useSelector((state) => state.auth);
  const location = useLocation();

  return !logged ? (
    children
  ) : (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  );
};
