import {
  createContext,
  useEffect,
  useState,
  useReducer,
  useContext,
} from 'react';
import { omit } from 'lodash-es';
import {
  paymentSessionReducer,
  patronReducer,
  calculateGrandPrice,
  OrderItemsReducer,
} from '../../reducers/reducers';
import axios from '@/utils/axiosInstance';
import showAlert from '@/utils/alert';

const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const TOKEN_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

// To be refactored step by step
export const AuthContext = createContext({});
export const useUser = () => {
  return useContext(AuthContext);
};

// Auth context provider
export const AuthProvider = ({ children }) => {
  // Local storage reference
  const lsRef = typeof window !== 'undefined' ? window.localStorage : null;

  let initialUserState = null;
  // Load login session from local storage
  if (lsRef) {
    try {
      const storedSession = lsRef.getItem('userSession');
      if (storedSession) {
        const session = JSON.parse(storedSession);

        if (session.expiresAt > Date.now()) {
          initialUserState = omit(session, ['expiresAt']);
        } else {
          // Token is expired, clear the session
          lsRef.removeItem('userSession');
        }
      }
    } catch (error) {
      // Do nothing
    }
  }

  const [authUser, setAuthUser] = useState(initialUserState);
  const isAuthenticated = !!authUser;

  // Save user to local storage
  useEffect(() => {
    if (authUser) {
      const updatedAuthUser = {
        ...authUser,
        expiresAt: Date.now() + 3600000, // 1 hour from now
      };
      lsRef.setItem('userSession', JSON.stringify(updatedAuthUser));
    }
  }, [authUser]);

  // Inactivity logout
  useEffect(() => {
    let inactivityTimeout;

    const resetInactivityTimeout = () => {
      if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
      }
      inactivityTimeout = setTimeout(() => {
        handleLogout();
      }, INACTIVITY_TIMEOUT);
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
      if (isAuthenticated) {
        try {
          await axios.get('/api/users/refresh-token');
        } catch (error) {
          // Do nothing
        }
      }
    };

    if (isAuthenticated) {
      // Initialize the token refresh interval
      refreshInterval = setInterval(refreshToken, TOKEN_REFRESH_INTERVAL);
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [isAuthenticated, authUser]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
      setAuthUser(null);
      // Clear user data from local storage
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('userSession');
      }
      // Display success message
      showAlert('success', null, 'You have been logged out!');
    } catch (error) {
      // Display error message
      showAlert(
        'error',
        'Logout Failed',
        error.response?.data.message || 'An error occurred during logout!'
      );
    }
  };

  // stripe session id
  const stripSessionValue = JSON.parse(lsRef.getItem('ssid')) || {};
  const [stripeSession, handleStripeSession] = useReducer(
    paymentSessionReducer,
    {
      sid: stripSessionValue.stripeSession?.sid || '',
    }
  );

  useEffect(() => {
    lsRef?.setItem('ssid', JSON.stringify({ stripeSession }));
  }, [stripeSession]);

  // patron details
  const patronDataValue = JSON.parse(lsRef.getItem('patron')) || {};
  const [patron, handlePatronInfo] = useReducer(patronReducer, {
    patronInfo: patronDataValue.patron?.patronInfo || {},
  });

  useEffect(() => {
    lsRef.setItem('patron', JSON.stringify({ patron }));
  }, [patron]);

  // calculate total grand price
  const grandValue = JSON.parse(lsRef.getItem('orderGrandPrice')) || {};
  const [orderGrandPrice, handleOrderGrandPrice] = useReducer(
    calculateGrandPrice,
    {
      grand: grandValue.orderGrandPrice?.grand || 0.0,
    }
  );

  useEffect(() => {
    lsRef.setItem('orderGrandPrice', JSON.stringify({ orderGrandPrice }));
  }, [orderGrandPrice]);

  // save payment
  const orderValue = JSON.parse(lsRef.getItem('items')) || {};
  const [order, handleOrder] = useReducer(OrderItemsReducer, {
    items: orderValue.order?.items || {},
  });

  useEffect(() => {
    lsRef.setItem('items', JSON.stringify({ order }));
  }, [order]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        isAuthenticated,
        stripeSession,
        handleStripeSession,
        patron,
        handlePatronInfo,
        orderGrandPrice,
        handleOrderGrandPrice,
        order,
        handleOrder,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
