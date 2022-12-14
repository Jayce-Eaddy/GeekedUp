import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';

import logo_mini from '../assets/logo_mini.png';
import userImage from '../assets/userImage.png';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray hover:text-green-300 transition-all duration-200 ease-in-out capitalize'
const isActiveStyle = 'flex items-center px-5 gap-3 font-bold border-r-2 border-black transition-all duration-200 ease-in-out capitalize'

const categories = [
  { name: 'Movies & TV 🎬' },
  { name: 'Anime 🌸' },
  { name: 'Books 📚' },
  { name: 'Games 🎮' },
  { name: 'Other 🤔' }
]

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  }

  return (
    <div className='flex flex-col justify-between bg-gray-700 h-full overflow-y-scroll min-w-210 hide-scrollbar'>
      <div className='flex flex-col'>
        <Link
          to='/'
          className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
          onClick={handleCloseSidebar}
        >
          <img src={logo_mini} alt='logo' className='w-full' />
        </Link>
        <div className='flex flex-col gap-5 text-white'>
          <NavLink
            to='/'
            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className='text-white mt-2 text=-base 2xl:text-xl pl-5 underline underline-offset-8'>Discover</h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
              onClick={handleCloseSidebar}
              key={category.name}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      <div>
      <Link
        to={`user-profile/undefined`}
        className='flex my-5 mb-1 gap-2 p-2 items-center text-white'
      >
        <img src={userImage} className='w-10 h-10 rounded-full'></img>
        <p>Jayce Eaddy</p>
      </Link>
        <Link
          to={`login/`}
          className='bg-green-300 text-black font-bold p-2 rounded w-20 outline-none ml-5'
        >
          Back to Login Page
        </Link>
      </div>
    </div>
  )
}

export default Sidebar