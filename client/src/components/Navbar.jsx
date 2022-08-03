import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdCreate, IoMdSearch } from 'react-icons/io';


const Navbar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7 bg-white'>
      <div className='flex justify-start items-center w-full px-2 rounded-md bg-gray-400 border-none outline-none focus-within:shadow-sm'>
        <IoMdSearch fontSize={21} className='ml-1'/>
        <input
        type='text'
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search'
        value={searchTerm}
        onFocus={() => navigate('/search')}
        className='p-2 w-full bg-white outline-none'
        />
      </div>
      
      <Link to='create-pin' className='bg-green-300 rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'>
        <IoMdCreate />
      </Link>

      </div>
  )
}

export default Navbar