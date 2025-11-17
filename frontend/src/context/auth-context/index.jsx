import {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';
import { omit } from 'lodash-es';
import axios from '@/utils/axios';
import showAlert from '@/utils/alert';
import formatError from '@/utils/format-error';
import { useNavigate } from 'react-router-dom';

const INACTIVITY_TIMEOUT_INTERVAL = 60 * 60 * 1000; // 1 hour
const TOKEN_REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes

export const AuthContext = createContext({});

export const useUser = () => {
  return useContext(AuthContext);
};

// Auth context provider
export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isSessionReady, setIsSessionReady] = useState(false);
  const isAuthenticated = !!authUser;
  const navigate = useNavigate();

  // Local storage reference
  const lsRef = typeof window !== 'undefined' ? window.localStorage : null;

  const clearSession = useCallback(() => {
    setAuthUser(null);
    if (lsRef) {
      lsRef.removeItem('userSession');
    }
  }, [lsRef]);

  // Bootstrap session on mount
  useEffect(() => {
    let isMounted = true;

    const bootstrapSession = async () => {
      if (!lsRef) {
        setIsSessionReady(true);
        return;
      }

      let cachedSession = null;

      try {
        const stored = lsRef.getItem('userSession');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.expiresAt && parsed.expiresAt > Date.now()) {
            cachedSession = omit(parsed, ['expiresAt']);
          } else {
            lsRef.removeItem('userSession');
          }
        }
      } catch {
        lsRef.removeItem('userSession');
      }

      if (!cachedSession) {
        if (isMounted) {
          setIsSessionReady(true);
        }
        return;
      }

      try {
        const response = await axios.get('/api/auth/refresh-token', {
          validateStatus: () => true,
        });

        if (response.status === 200) {
          if (isMounted && cachedSession) {
            setAuthUser(cachedSession);
          }
        } else if (
          response.status === 401 ||
          response.status === 419 ||
          response.status === 403
        ) {
          if (isMounted) {
            clearSession();
          }
        }
      } catch {
        if (isMounted) {
          clearSession();
        }
      } finally {
        if (isMounted) {
          setIsSessionReady(true);
        }
      }
    };

    bootstrapSession();

    return () => {
      isMounted = false;
    };
  }, [lsRef, clearSession]);

  // Update session expiry on authUser change
  useEffect(() => {
    if (!lsRef || !authUser || !isSessionReady) {
      return;
    }

    const updatedAuthUser = {
      ...authUser,
      // align with cookie maxAge
      expiresAt: Date.now() + 20 * 60 * 1000,
    };

    lsRef.setItem('userSession', JSON.stringify(updatedAuthUser));
  }, [authUser, isSessionReady, lsRef]);

  // Inactivity logout
  useEffect(() => {
    let inactivityTimeout;

    const resetInactivityTimeout = () => {
      if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
      }

      inactivityTimeout = setTimeout(() => {
        handleLogout();
      }, INACTIVITY_TIMEOUT_INTERVAL);
    };

    if (isAuthenticated) {
      window.addEventListener('mousemove', resetInactivityTimeout);
      window.addEventListener('keydown', resetInactivityTimeout);
      // Initialize the inactivity timeout
      resetInactivityTimeout();
    }

    return () => {
      if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
      }
      window.removeEventListener('mousemove', resetInactivityTimeout);
      window.removeEventListener('keydown', resetInactivityTimeout);
    };
  }, [isAuthenticated]);

  // Token refresh
  useEffect(() => {
    let refreshInterval;

    const refreshToken = async () => {
      if (!isAuthenticated) return;

      try {
        await axios.get('/api/auth/refresh-token');
      } catch (error) {
        const status = error.response?.status;
        if (status === 401 || status === 419) {
          clearSession();
          showAlert(
            'error',
            null,
            'Your session expired. Please log in again.'
          );
        }
      }
    };

    if (isAuthenticated) {
      refreshInterval = setInterval(refreshToken, TOKEN_REFRESH_INTERVAL);
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [isAuthenticated, clearSession, authUser]);

  // SingnUp user
  const signUpUser = async formData => {
    setIsUserLoading(true);
    let isError = false;

    try {
      const response = await axios.post('/api/auth/signup', formData);

      if (response.status === 201) {
        // Display success message
        showAlert(
          'success',
          'Almost there!',
          'Please check your email to confirm your account.'
        );
      } else {
        // Handle other server response statuses
        showAlert(
          'error',
          'Sign Up Failed',
          response.data.message || 'An error occurred during sign up!'
        );

        isError = true;
      }
    } catch (error) {
      const errorMessage = formatError(error);
      showAlert('error', 'Sign Up Failed', null, errorMessage);
      isError = true;
    }

    setIsUserLoading(false);
    return isError;
  };

  // Confirm account
  const confirmAccount = async token => {
    setIsUserLoading(true);
    try {
      // Send the token to the backend for verification
      const response = await axios.post('/api/auth/confirm-account', { token });
      if (response.status === 200) {
        setAuthUser(response.data.user);
        setIsUserLoading(false);
        navigate('/account');
      } else {
        showAlert(
          'error',
          'Sign up failed',
          response.data.message || 'Something went wrong!'
        );
        navigate('/');
      }
    } catch (error) {
      showAlert(
        'error',
        'Sign up failed',
        error.response.data.message || 'Something went wrong!'
      );
      navigate('/');
    } finally {
      setIsUserLoading(false);
    }
  };

  // Login user
  const loginUser = async formData => {
    setIsUserLoading(true);

    try {
      const response = await axios.post('/api/auth/login', formData);
      if (response.status === 200) {
        setAuthUser(response.data.user);
      } else {
        showAlert(
          'error',
          'Login Failed',
          response.data.message || 'An error occurred during login!'
        );
      }
    } catch (error) {
      const status = error.response?.status;
      if (status === 401 || status === 419) {
        clearSession();
      }
      const errorMessage = formatError(error);
      showAlert('error', 'Login Failed', null, errorMessage);
    } finally {
      setIsUserLoading(false);
    }
  };

  // Request password reset
  const requestPasswordReset = async email => {
    setIsUserLoading(true);
    let isError = false;

    try {
      const response = await axios.post('/api/auth/forgot-password', {
        email,
      });

      showAlert(
        'success',
        null,
        response.data.message ||
          'If that email is registered, a reset link will be sent shortly.'
      );
    } catch (error) {
      const errorMessage = formatError(error);
      showAlert('error', 'Password Reset Failed', null, errorMessage);
      isError = true;
    } finally {
      setIsUserLoading(false);
    }

    return !isError;
  };

  // Reset password
  const resetPassword = async ({ token, password }) => {
    setIsUserLoading(true);
    let isError = false;

    try {
      const response = await axios.post('/api/auth/reset-password', {
        token,
        password,
      });

      showAlert(
        'success',
        null,
        response.data.message ||
          'Password updated successfully. Please log in with your new password.'
      );
    } catch (error) {
      const errorMessage = formatError(error);
      showAlert('error', 'Password Reset Failed', null, errorMessage);
      isError = true;
    } finally {
      setIsUserLoading(false);
    }

    return !isError;
  };

  // Update user
  const updateUser = async formData => {
    setIsUserLoading(true);

    try {
      const response = await axios.put('/api/user/update', formData);

      if (response.status === 200) {
        setAuthUser(response.data.user);
        // Display success message
        showAlert('success', null, 'Your account has been updated!');
      } else {
        // Handle other server response statuses
        showAlert(
          'error',
          'Update Failed',
          response.data.message || 'An error occurred during update!'
        );
      }
    } catch (error) {
      const errorMessage = formatError(error);
      showAlert('error', 'Update Failed', null, errorMessage);
    } finally {
      setIsUserLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      const status = error.response?.status;
      if (status !== 401 && status !== 419) {
        const errorMessage = formatError(error);
        showAlert('error', 'Logout Failed', null, errorMessage);
        return;
      }
    }

    clearSession();
    showAlert('success', null, 'You have been logged out!');
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        signUpUser,
        confirmAccount,
        updateUser,
        loginUser,
        requestPasswordReset,
        resetPassword,
        isUserLoading,
        setIsUserLoading,
        isAuthenticated,
        isSessionReady,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
