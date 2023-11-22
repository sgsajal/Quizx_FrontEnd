
import { Navigate } from "react-router-dom";
import { useAuth } from './UseAuth';
export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    // user is not authenticated
    // console.log("haha")
    return <Navigate to="/login" />;
  }
  return children;
};