import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/store/auth-context';

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useContext(AuthContext);

  if (!loggedIn) {
    return <Navigate to='/' />;
  }
  return children;
};

export default ProtectedRoute;
