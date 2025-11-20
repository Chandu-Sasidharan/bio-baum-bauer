import { Link } from 'react-router-dom';
import { MdDoubleArrow } from 'react-icons/md';
import useLocalizedPath from '@/hooks/use-localized-path';

const getDestination = (path, buildPath) => {
  if (typeof path === 'string') return buildPath(path);
  return buildPath('home');
};

export default function MenuLink({ to = 'home', pageName }) {
  const { buildPath } = useLocalizedPath();
  const destination = getDestination(to, buildPath);

  return (
    <Link
      to={destination}
      className='hover:text-golden-red flex items-center gap-1 duration-300 hover:translate-x-1'
    >
      <MdDoubleArrow />
      <span>{pageName}</span>
    </Link>
  );
}
