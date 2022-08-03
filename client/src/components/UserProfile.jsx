import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import userImage from '../assets/userImage.png';
import footage from '../assets/footage.mp4';

const randomImage = 'https://source.unsplash.com/1600x900/?film,food-drink,street-photography';

const activeBtnStyles = 'bg-green-300 text-black font-bold p-2 rounded-full w-20 outline-none'
const notActiveBtnStyles = 'bg-primary mr-4 font-bold text-black p-2 rounded-full w-20 outline-none'

const UserProfile = () => {

  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
  }, [userId])

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <video
              src={footage}
              type='video/mp4'
              loop
              controls={false}
              muted
              autoPlay
              className='w-full h-370 2xl:h-510 shadow-lg object-cover'
              alt='banner'
            />
            <img src={userImage} alt='userImg' className='w-20 h-20 rounded-full -mt-10 shadow-xl object-cover'></img>
            <h1 className='font-bold text-3xl text-center mt-3'>
              Jayce Eaddy
            </h1>
          </div>
        </div>
        <div className='text-center mb-7'>
          <button
            type='button'
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('created');
            }}
            className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Created
          </button>
        </div>
        {pins?.length ? (
          <div className='px-2'>
            <MasonryLayout pins={pins} />
          </div>
        ) : (
          <div>
            <p className='flex justify-center font-bold items-center w-full text-xl mt-2'>
              No Posts Here!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile