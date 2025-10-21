import { AuthContext } from "@/providers/AuthProviders";
import { useContext, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "../common/Loading";

interface PrivateRoutesProps {
  children: ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const location = useLocation();
  const context = useContext(AuthContext);
  
  // Null check for context
  if (!context) {
    throw new Error('PrivateRoutes must be used within AuthProvider');
  }
  
  const { loading, user } = context;

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" state={location.pathname} />;
  }

  return <>{children}</>;
};

export default PrivateRoutes;