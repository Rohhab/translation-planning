import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
//import { useState } from 'react';
//import axios from 'axios';
import toltec from './toltec.webp';
import './App.css';

function App() {
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
    <div className="App">
      <header className="App-header">
        <img src={toltec} alt="The Toltec Warrior" />
        {/* <p>{message}</p> */}
        <p ref={textBoxRef}>
          An average man cares that things are either true or false, but a
          <i> warrior</i> doesn't. <br />
          An average man proceeds in a specific way with things that he knows
          are true, and in a different way with things that he knows are not
          true. If things are said to be true, he acts and believes in what he
          does. But if things are said to be untrue, he doesn't care to act, or
          he doesn't believe in what he does. <br />A <i> warrior</i>, on the
          other hand, acts in both instances. If things are said to be true, he
          would act in order to do doing. If things are said to be untrue, he
          still would act in order to do not-doing. <br />
          See what I mean?
        </p>

        <button
          onClick={() => {
            window.location.href = '/auth/login';
          }}
        >
          Let's do the job!
        </button>
      </header>
    </div>
  );
}

export default App;
