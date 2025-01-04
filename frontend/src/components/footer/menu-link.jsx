import { Link } from 'react-router-dom';
import { MdDoubleArrow } from 'react-icons/md';

export default function MenuLink({ to = '/', pageName }) {
  return (
    <Link
      to={to}
      className='flex items-center gap-1 hover:translate-x-1 hover:text-golden-red duration-300'
    >
      <MdDoubleArrow />
      <span>{pageName}</span>
    </Link>
  );
}
