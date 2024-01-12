import React from 'react';
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';
import { useRef } from 'react';
//import { useState } from 'react';
//import axios from 'axios';
import toltec from './toltec.webp';
import './Books.css';

function Books() {
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
    <div className="Books">
      <Helmet>
        <title>TranslationPlanning</title>
      </Helmet>
      <header className="Books-header">
        <img src={toltec} alt="The Toltec Warrior" />
        {/* <p>{message}</p> */}
        <p ref={textBoxRef}>Agili gigili migili!</p>

        <table>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
          <tr>
            <td>Anom</td>
            <td>19</td>
            <td>Male</td>
          </tr>
          <tr>
            <td>Megha</td>
            <td>19</td>
            <td>Female</td>
          </tr>
          <tr>
            <td>Subham</td>
            <td>25</td>
            <td>Male</td>
          </tr>
        </table>

        <button
          onClick={() => {
            window.location.href = '/';
          }}
        >
          WTF?
        </button>
      </header>
    </div>
  );
}

export default Books;
