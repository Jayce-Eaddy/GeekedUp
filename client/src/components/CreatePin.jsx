import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../client';
import Spinner from './Spinner';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import userImage from '../assets/userImage.png';
import { categories } from '../utils/data';

const CreatePin = () => {

  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];
    if (type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type === 'image/gif' || type === 'image/tiff') {
      setWrongImageType(false);
      setLoading(true);

      client.assets
        .upload('image', e.target.files[0], { contentType: type, filename: name })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('There has been an error uploading your file!', error);
        })
    } else {
      setWrongImageType(true);
    }
  }

  const savePin = () => {
    if(title && about && category && imageAsset?._id){
      const doc = {
        _type: 'pin',
        title,
        about,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id
          }
        },
        // userId: user._id,
        // postedBy: {
        //   _type: 'postedBy',
        //   _ref: user._id,
        // },
        // category,
      }

      client.create(doc)
      .then(() => {
        navigate('/')
      })
    } else {
      setFields(true);
      setTimeout(() => setFields(false), 2000)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
      {fields && (
        <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>
          Please fill in all the fields!
        </p>
      )}
      <div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
        <div className='bg-green-200 p-3 flex flex-0.7 w-full rounded'>
          <div className='flex justify-center items-center flex-col border-2 border-dotted border-gray-500 p-3 w-full h-440 rounded'>
            {loading && <Spinner />}
            {wrongImageType && <p>Oops, wrong image type!</p>}
            {!imageAsset ? (
              <label>
                <div className='flex flex-col items-center justify-center h-full'>
                  <div className='flex flex-col justify-center items-center'>
                    <p className='font-bold text-2xl'>
                      <AiOutlineCloudUpload />
                    </p>
                    <p className='text-lg'>Click to Upload!</p>
                  </div>
                  <p className='mt-32 text-green-500'>
                    Recommended to use small files!
                  </p>
                </div>
                <input
                  type='file'
                  name='upload-image'
                  onChange={uploadImage}
                  className='w-9 h-0'
                >

                </input>
              </label>
            ) : (
              <div className='relative h-full'>
                <img src={imageAsset?.url} alt='uploadedFile' className='h-full w-full' />
                <button
                  type='button'
                  className='bg-red-400 w-9 h-9 rounded-full flex items-center justify-center text-white text-xl opacity-90'
                  onClick={() => setImageAsset(null)}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Add Title here!'
            className='outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2'
          />

          <div className='flex gap-2 my-2 items-center bg-white rounded-lg'>
            <img src={userImage} alt='userImg' className='w-12 rounded-full'></img>
            <p className='font-bold'>Jayce Eaddy</p>
          </div>
          <input
            type='text'
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder='Add your About here!'
            className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
          />
          <input
            type='text'
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder='Put your Image Link Address here! (If Applicable)'
            className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
          />
          <div className='flex flex-col'>
            <div>
              <p className='mb-2 font-semibold text-lg sm:text-xl'>
                Please choose a Post Category
              </p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className='outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'
              >

                <option value='other' className='bg-white'>
                  <p className='text-gray-200'>Select Category!</p>
                </option>

                {categories.map((category) => (
                  <option className='text-base border-0 outline-none capitalize bg-white text-black' value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex justify-end items-end mt-5'>
              <button
              type='button'
              onClick={savePin}
              className='bg-green-300 text-black font-bold p-2 rounded-full w-28 outline-none'
              >
                Save Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePin