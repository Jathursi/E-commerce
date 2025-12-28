import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

const ProtectedRoute = ({ roles }) => {
  const { user, loading } = useAuth();

  // show nothing or spinner while checking auth
  if (loading) return <div>Loading...</div>;

  // if no user, redirect to login
  if (!user) return <Navigate to="/login" />;

  // if user role doesn't match, redirect
  if (roles && !roles.includes(user.role)) return <Navigate to="/login" />;

  // authorized
  return <Outlet />;
};

export default ProtectedRoute;
