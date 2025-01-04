import { Link } from 'react-router-dom';

export default function SocialLink({ href = 'https://', children }) {
  return (
    <Link
      className='p-2 text-lg rounded-md bg-gray-light shadow-sm hover:shadow-lg hover:bg-accent hover:text-gray-light duration-300'
      href={href}
      target='_blank'
      rel='noopener noreferrer'
    >
      {children}
    </Link>
  );
}
