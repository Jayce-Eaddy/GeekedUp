import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

import { Sidebar, UserProfile } from '../components';
import Pins from './Pins';
import { userQuery } from '../utils/data';
import logoblack from '../assets/logoblack.png';
import userImage from '../assets/userImage.png';
import { client } from '../client';
import { fetchUser } from '../utils/fetchUser';

const Home = () => {

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();
  const scrollRef = useRef(null);

  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  }, []);

  return (
    <div className='flex bg-slate md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user && user} />
      </div>
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md bg-gray-700'>
          <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)} />
          <Link to='/'>
            <img src={logoblack} className='w-28' />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={userImage} alt='userImg' className='w-12 rounded-full'></img>
          </Link>
        </div>
      </div>
      {toggleSidebar && (
        <div className='fixed w-4/5 bg-green-300 h-screen overflow-y-auto shadow-md z-10 animate-slide-in animate-slide-out'>
          <div className='absolute w-full flex justify-end items-center p-2'>
            <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => setToggleSidebar(false)} />
          </div>
          <Sidebar user={user && user} />
        </div>
      )}
      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home