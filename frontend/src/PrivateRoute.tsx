import { Navigate } from "react-router-dom";
import { useAdminAuth } from "./hooks/useAdminAuth"; // Assume you have an auth context

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn} = useAdminAuth();

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
