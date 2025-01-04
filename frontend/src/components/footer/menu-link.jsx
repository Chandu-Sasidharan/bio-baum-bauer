import { Link } from 'react-router-dom';
import { MdDoubleArrow } from 'react-icons/md';

export default function MenuLink({ to = '/', pageName }) {
  return (
    <Link
      to={to}
      className='flex items-center gap-1  transform hover:translate-x-2 motion-reduce:transition-none motion-reduce:hover:transform-none hover:text-white transition duration-5000 ease-linear  '
    >
      <MdDoubleArrow />
      <span>{pageName}</span>
    </Link>
  );
}
