import { Navigate } from 'react-router-dom';
import { useUser } from '@/context/auth-context';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return children;
}
