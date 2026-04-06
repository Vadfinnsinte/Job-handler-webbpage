import { Navigate } from "react-router-dom";
import { getToken, getTokenExpiration } from "../functions/helpers/token";

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  const tokenExpiration = getTokenExpiration();
  if (
    !token ||
    (tokenExpiration && Date.now() > new Date(tokenExpiration).getTime())
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
