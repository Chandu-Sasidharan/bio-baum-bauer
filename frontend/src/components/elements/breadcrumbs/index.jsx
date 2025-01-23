import { Link, useLocation } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <nav className='py-3 text-sm'>
      <ol className='list-reset flex'>
        <li>
          <Link
            to='/'
            className='text-accent hover:text-golden-red flex items-center gap-1 duration-100'
          >
            <HiHome /> Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/');
          const isLast = index === pathSegments.length - 1;
          return (
            <li key={href} className='flex items-center'>
              <span className='mx-2'>/</span>
              {isLast ? (
                <span className='text-gray-500'>
                  {capitalizeFirstLetter(segment)}
                </span>
              ) : (
                <Link
                  to={href}
                  className='text-accent hover:text-golden-red duration-100'
                >
                  {capitalizeFirstLetter(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
