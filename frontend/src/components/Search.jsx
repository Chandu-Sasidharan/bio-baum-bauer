import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import axios from '@/utils/axios';

// eslint-disable-next-line react/prop-types
export default function Search({ updateTree, limit, skip }) {
  const [searchParam, setSearchParam] = useState('');
  const searchHandler = async () => {
    try {
      console.log(searchParam);

      const response = searchParam
        ? await axios.get(`/api/tree/search/${searchParam}`)
        : await axios.get(`/api/tree/get?limit=${limit}&skip=${skip}`);
      console.log('Search Item Front:', response.data);
      if (response.status === 200) {
        if (searchParam) {
          updateTree(response.data);
        } else {
          updateTree(response.data.trees);
        }
      }
    } catch (error) {
      console.error('Error fetching Trees:', error.response.data.error); // Access the custom error message
      throw error;
    }
  };

  return (
    <>
      <div className='backdrop-search'></div>
      <div className='bg-primary-light h-20 px-2 py-10'>
        <div className='max-w-auto md:max-h-m mx-auto overflow-hidden rounded-lg sm:max-w-xs md:max-w-xl'>
          <div className='md:flex'>
            <div className='w-full p-3'>
              <div className='md:max-h-m relative'>
                <i className='fa fa-search absolute left-4 top-5 text-gray-100'></i>
                <input
                  type='text'
                  placeholder='Search...'
                  className='border-primary-dark input !important h-14 w-full rounded-lg bg-white px-12 text-xl italic hover:cursor-pointer'
                  name=''
                  defaultValue={searchParam}
                  onChange={event => {
                    setSearchParam(event.target.value);
                    // Call the search function on every change
                  }}
                ></input>
                <button
                  className='absolute right-5 top-4 cursor-pointer border-l pl-4'
                  onClick={searchHandler}
                >
                  <IoIosSearch className='iconsearch text-primary-dark' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
