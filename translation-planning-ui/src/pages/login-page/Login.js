import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
//import { useState } from 'react';
//import axios from 'axios';
import toltec from './toltec.webp';
import './Login.css';

function LoginFunc() {
  const textBoxRef = useRef(null);

  useEffect(() => {
    const textBoxHeight = textBoxRef.current.offsetHeight;
    document.documentElement.style.setProperty(
      '--text-box-height',
      `${textBoxHeight}px`
    );
  }, []);
  // const [message, setMessage] = useState('');
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:3100')
  //     .then((response) => {
  //       setMessage(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  return (
    <div className="Login">
      <header className="Login-header">
        <img src={toltec} alt="The Toltec Warrior" />
        {/* <p>{message}</p> */}
        <p ref={textBoxRef}>The new one!</p>
        <button
          onClick={() => {
            window.location.href = 'http://localhost:3100';
          }}
        >
          Login / Sign up
        </button>
        <button
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Home Page
        </button>
      </header>
    </div>
  );
}

export default LoginFunc;
