import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import logo from '../assets/logo.png';
import footage from '../assets/footage.mp4';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {

  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID Token: ' + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: '177521330141-k8r8cvu434l85liovgam29dckgvp16q1.apps.googleusercontent.com',
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' }
    );
    
  }, []);

  return (

    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={footage}
          type='video/mp4'
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-o left-0 bottom-0 bg-blackOverlay'>
          <div className='p=5 object-center'>
            <img src={logo} width='200px' />
          </div>
          <div>
            {/* {user ? (
              <div>Logged In</div>
            ) : (
              <GoogleLogin
              onSuccess={(response) =>
              createOrGetUser(response)}
              onError={() => console.log
              ('Error')}
              />
            )} */}
          
            <div className='App'>
              <div id='signInDiv'>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Login;