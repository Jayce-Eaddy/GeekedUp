import React from 'react';
import { Puff } from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const Spinner = ({ message }) => {
    return (
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <Puff color="#99c4a0" height={80} width={80}/>

            <p className='text-lg text-center px-2'>{message}</p>
        </div>
    );
}

export default Spinner;