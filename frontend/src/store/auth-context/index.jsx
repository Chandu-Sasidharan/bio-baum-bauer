import {
  createContext,
  useEffect,
  useState,
  useReducer,
  useContext,
} from 'react';
import {
  paymentSessionReducer,
  patronReducer,
  calculateGrandPrice,
  OrderItemsReducer,
} from '../../reducers/reducers';
import axios from '@/utils/axiosInstance';
import showAlert from '@/utils/alert';

// To be refactored step by step
export const AuthContext = createContext({});
export const useUser = () => {
  return useContext(AuthContext);
};

// Auth context provider
export const AuthProvider = ({ children }) => {
  const lsRef = typeof window !== 'undefined' ? window.localStorage : null;
  // receiving the login information from local storage
  const loginSession = JSON.parse(lsRef.getItem('login')) || {
    loggedIn: false,
    authUser: {},
    expireTime: null,
  };

  const [loggedIn, setLoggedIn] = useState(loginSession.loggedIn);
  const [authUser, setAuthUser] = useState(loginSession.authUser);
  const [expiredTime, setExpiredTime] = useState(loginSession.expireTime);

  // it will be called any time that the (loggedIn and authUser) changed
  useEffect(() => {
    lsRef.setItem(
      'login',
      JSON.stringify({
        loggedIn: loggedIn,
        authUser: authUser,
        expireTime: expiredTime,
      })
    );
  }, [loggedIn, authUser, expiredTime]);

  const handleLogout = async () => {
    try {
      await axios.get('/api/users/logout');
      setLoggedIn(false);
      setExpiredTime(null);
      setAuthUser({});
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

  // checkForInactivity...
  const checkForInactivity = () => {
    if (JSON.parse(lsRef.getItem('login')).expireTime < Date.now()) {
      handleLogout();
    }
  };

  // This method is used to update the Expire Date to new Date...
  const updateExpireTime = () => {
    const newExpireTime = Date.now() + 3600000;
    setExpiredTime(newExpireTime);
  };

  // Use Effect for tracking user's Inactivity
  useEffect(() => {
    let interval;
    if (loggedIn) {
      interval = setInterval(() => {
        checkForInactivity();
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [loggedIn]);

  // Update Expire Time on the following 4 activities
  useEffect(() => {
    if (loggedIn) {
      window.addEventListener('click', updateExpireTime);
      window.addEventListener('keypress', updateExpireTime);
      window.addEventListener('scroll', updateExpireTime);
      window.addEventListener('mousemove', updateExpireTime);
    }

    return () => {
      window.removeEventListener('click', updateExpireTime);
      window.removeEventListener('keypress', updateExpireTime);
      window.removeEventListener('scroll', updateExpireTime);
      window.removeEventListener('mousemove', updateExpireTime);
    };
  }, [loggedIn]);

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
        loggedIn,
        setLoggedIn,
        authUser,
        setAuthUser,
        expiredTime,
        setExpiredTime,
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
