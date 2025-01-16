import { Navigate } from 'react-router-dom';
import { useUser } from '@/store/auth-context';

export default function ProtectedRoute({ children }) {
  const { loggedIn } = useUser();

  if (!loggedIn) {
    return <Navigate to='/' />;
  }

  return children;
}
