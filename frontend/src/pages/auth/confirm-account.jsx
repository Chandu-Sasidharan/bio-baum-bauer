import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from '@/utils/axiosInstance';
import { useUser } from '@/store/auth-context';
import Spinner from '@/components/elements/spinner';

export default function ConfirmAccount() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { setAuthUser } = useUser();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    if (token) {
      confirmAccount(token);
    }
  }, [token]);

  const confirmAccount = async token => {
    try {
      // Send the token to the backend for verification
      const response = await axios.post('/api/auth/confirm-account', { token });
      if (response.status === 200) {
        setAuthUser(response.data.user);
        navigate('/account');
      }
      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return <Spinner />;
  }

  return null;
}
