import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useUser } from '@/context/auth-context';
import Spinner from '@/components/elements/spinner';
import showAlert from '@/utils/alert';

export default function ConfirmAccount() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { isUserLoading, confirmAccount } = useUser();

  useEffect(() => {
    if (token) {
      confirmAccount(token);
    } else {
      showAlert('error', 'Invalid Link', 'Token is missing or invalid');
      navigate('/');
    }
  }, [token]);

  if (isUserLoading) {
    return <Spinner />;
  }

  return null;
}
