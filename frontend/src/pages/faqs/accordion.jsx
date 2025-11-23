import { useState } from 'react';

export default function Accordion({ data }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='space-y-4 text-lg'>
      {data.map((item, index) => (
        <div
          key={index}
          className='border-primary overflow-hidden rounded-md border shadow-sm'
        >
          <button
            onClick={() => toggleAccordion(index)}
            className='hover:bg-primary-light flex w-full items-center justify-between px-4 py-3 transition duration-200'
          >
            <span>
              <span className='text-lg font-semibold'>{index + 1}.&nbsp;</span>
              <span className='text-lg font-semibold'>
                <span dangerouslySetInnerHTML={{ __html: item.question }} />
              </span>
            </span>
            <span>
              {openIndex === index ? (
                <span className='text-lg font-bold'>−</span>
              ) : (
                <span className='text-lg font-bold'>+</span>
              )}
            </span>
          </button>
          {openIndex === index && (
            <div className='text-stone prose max-w-none px-4 py-3 pt-0 text-lg'>
              <div dangerouslySetInnerHTML={{ __html: item.answer }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
