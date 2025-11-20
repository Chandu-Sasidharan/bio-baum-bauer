import { Link } from 'react-router-dom';
import { MdDoubleArrow } from 'react-icons/md';
import useLocalizedPath from '@/hooks/use-localized-path';

const isAbsolutePath = value =>
  typeof value === 'string' &&
  (value.startsWith('/') || /^[a-z]+:/i.test(value));

export default function MenuLink({ to = 'home', pageName }) {
  const { buildPath } = useLocalizedPath();
  const destination = (() => {
    if (isAbsolutePath(to)) {
      return to;
    }

    if (Array.isArray(to)) {
      return buildPath(...to);
    }

    if (typeof to === 'string') {
      return buildPath(to);
    }

    return buildPath('home');
  })();

  return (
    <Link
      to={destination}
      className='flex items-center gap-1 hover:translate-x-1 hover:text-golden-red duration-300'
    >
      <MdDoubleArrow />
      <span>{pageName}</span>
    </Link>
  );
}
