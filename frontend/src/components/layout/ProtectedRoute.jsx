import { Navigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../ui/Loader';
import './ProtectedRoute.scss';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="protected-loading">
        <Loader size="lg" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
