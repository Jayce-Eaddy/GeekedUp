import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdArrowCircleDown } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { client, urlFor } from '../client'
import { fetchUser } from '../utils/fetchUser';
import userImage from '../assets/userImage.png';

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
    const [postHovered, setPostHovered] = useState(false);
    const [savingPost, setSavingPost] = useState(false);
    const navigate = useNavigate();
    const userInfo = fetchUser();

    const deletePin = (id) => {
        client
        .delete(id)
        .then(() => {
            window.location.reload();
        })
    }

    return (
        <div className='m-2'>
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${_id}`)}
                className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
            >
                <img className='rounded-lg w-full' alt='userPost' src={urlFor(image).width(250).url()} />
                {postHovered && (
                    <div
                        className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50 cursor-pointer'
                        style={{ height: '100%' }}
                    >
                        <div className='flex items-center justify-between'>
                            <div className='flex gap-2'>
                                <a
                                    href={`${image?.asset?.url}?dl=`}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className='bg-green-300 w-9 h-9 rounded-full flex items-center justify-center text-white text-xl opacity-75'
                                >
                                    ▼
                                </a>
                            </div>
                            <button
                            type='button'
                            onClick={(e) => {
                                e.stopPropagation();
                                deletePin(_id);
                            }}
                            className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75'>
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <img src={userImage} alt='userImg' className='w-8 rounded-full'></img>
            <p className='font-semibold capitalize'>
                Jayce Eaddy
            </p>
        </div>
    )
}

export default Pin