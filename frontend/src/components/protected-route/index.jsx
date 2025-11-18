import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@/context/auth-context';
import { DEFAULT_LANGUAGE } from '@/constants';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isSessionReady } = useUser();
  const location = useLocation();

  if (!isSessionReady) {
    return null;
  }

  if (!isAuthenticated) {
    const [, locale] = location.pathname.split('/');
    const targetLocale = locale || DEFAULT_LANGUAGE;
    return (
      <Navigate
        to={`/${targetLocale}`}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}
