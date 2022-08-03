import React, { useState, useEffect } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';
import userImage from '../assets/userImage.png';

const PinDetail = () => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const { pinId } = useParams();

  const fetchPinDetails = () => {

    let query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query)
        .then((data) => {
          setPinDetail(data[0]);

          if (data[0]) {
            query = pinDetailMorePinQuery(data[0]);

            client.fetch(query)
              .then((res) => setPins(res));
          }
        })
    }
  }

  useEffect(() => {
    fetchPinDetails();
  }, [pinId])

  if (!pinDetail) return <Spinner message='Loading post...' />

  return (
    <div className='flex xl-flex-row flex-col m-auto bg-white' style={{ maxWidth: '1500px', borderRadius: '32px' }}>
      <div className='flex justify-center items-center md:items-start flex-initial'>
        <img
          src={pinDetail?.image && urlFor(pinDetail.image).url()}
          className='rounded-t-3xl rounded-b-lg'
          alt='user-post'
        />
      </div>
      <div className='w-full p-5 flex-1 xl:min-w-620'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <a
              href={`${pinDetail.image?.asset?.url}?dl=`}
              download
              onClick={(e) => e.stopPropagation()}
              className='bg-green-300 w-12 h-12 rounded-full flex items-center justify-center text-dark text-xl'
            >
              ▼
            </a>
            <p className='font-extrabold'>Download</p>
          </div>
          <a
          href={pinDetail.destination}
          target='blank'
          rel='noreferrer'
          >
            {pinDetail.destination}
          </a>
        </div>
        <div>
          <h1 className='text-4xl font-bold break-words mt-3 underline underline-offset-8'>
            {pinDetail.title}
          </h1>
          <p className='mt-3'>{pinDetail.about}</p>
          <Link to={`user-profile`}>
            <img src={userImage} alt='userImg' className='w-12 rounded-full'></img>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PinDetail