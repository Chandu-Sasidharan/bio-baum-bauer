import { useState, useEffect } from 'react';
import { MdKeyboardDoubleArrowUp } from 'react-icons/md';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 140) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <div className='bg-accent fixed bottom-4 right-4 rounded-full p-2 shadow-lg duration-300 hover:scale-110'>
        <a href='#'>
          <MdKeyboardDoubleArrowUp className='text-gray-light text-3xl' />
        </a>
      </div>
    )
  );
}
