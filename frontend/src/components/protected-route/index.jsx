import { Navigate } from 'react-router-dom';
import { useUser } from '@/context/auth-context';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isSessionReady } = useUser();

  if (!isSessionReady) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return children;
}
