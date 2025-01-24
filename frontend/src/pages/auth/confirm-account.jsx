import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from '@/utils/axios';
import { useUser } from '@/context/auth-context';
import Spinner from '@/components/elements/spinner';

export default function ConfirmAccount() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { setAuthUser, isUserLoading, setIsUserLoading } = useUser();

  useEffect(() => {
    if (token) {
      confirmAccount(token);
    }
  }, [token]);

  const confirmAccount = async token => {
    try {
      setIsUserLoading(true);
      // Send the token to the backend for verification
      const response = await axios.post('/api/auth/confirm-account', { token });
      if (response.status === 200) {
        setAuthUser(response.data.user);
        setIsProcessing(false);
        navigate('/account');
      } else {
        showAlert(
          'error',
          'Sign up failed',
          response.data.message || 'Something went wrong!'
        );
        setIsProcessing(false);
        navigate('/');
      }
    } catch (error) {
      showAlert(
        'error',
        'Sign up failed',
        error.response.data.message || 'Something went wrong!'
      );
      setIsProcessing(false);
      navigate('/');
    }
  };

  if (isUserLoading) {
    return <Spinner />;
  }

  return null;
}
