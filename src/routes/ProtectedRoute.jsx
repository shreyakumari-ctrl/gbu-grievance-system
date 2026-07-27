import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "./routePaths";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
  
    return <Navigate to={ROUTES.ADMIN_LOGIN} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;