import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, isAuthenticated, hasRole } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated but wrong role - redirect to their correct portal
  if (allowedRoles && !hasRole(allowedRoles)) {
    // User is logged in but accessing wrong portal
    // Redirect to their actual portal
    return <Navigate to={`/portal/${user.role}`} replace />;
  }

  // All checks passed - render the protected content
  return children;
};

export default ProtectedRoute;
