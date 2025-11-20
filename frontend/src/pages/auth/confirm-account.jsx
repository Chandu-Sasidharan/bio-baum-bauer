import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useUser } from '@/context/auth-context';
import Spinner from '@/components/spinner';
import showAlert from '@/utils/alert';
import useCopy from '@/hooks/use-copy';
import useLocalizedPath from '@/hooks/use-localized-path';

const copy = {
  de: {
    alertTitle: 'Ungültiger Link',
    alertBody: 'Token fehlt oder ist ungültig',
  },
  en: {
    alertTitle: 'Invalid Link',
    alertBody: 'Token is missing or invalid',
  },
};

export default function ConfirmAccount() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { isUserLoading, confirmAccount } = useUser();
  const text = useCopy(copy);
  const { buildPath } = useLocalizedPath();

  useEffect(() => {
    if (token) {
      confirmAccount(token);
    } else {
      showAlert('error', text.alertTitle, text.alertBody);
      navigate(buildPath('home'));
    }
  }, [token, text.alertBody, text.alertTitle, navigate, confirmAccount, buildPath]);

  if (isUserLoading) {
    return <Spinner />;
  }

  return null;
}
