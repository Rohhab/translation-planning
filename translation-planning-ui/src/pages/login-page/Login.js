import React from 'react';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
// import { useEffect } from 'react';
// import { useRef } from 'react';
import axios from 'axios';
import toltec from './toltec.webp';
import './Login.css';

function LoginFunc() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:3100/auth/login/signup', formData)
      .then((response) => {
        console.log('Response from API:', response.data);

        setResponseMessage(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="Login">
      <div>
        <Helmet>
          <title>Login to TranslationPlanning</title>
        </Helmet>
      </div>

      <div className="Background-image">
        <img src={toltec} alt="The Toltec Warrior" />
      </div>

      <div className="Login-form">
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit" className="Login-button">
            Login
          </button>
        </form>

        <div className="right-column">
          <button
            className="Home-button"
            onClick={() => {
              window.location.href = '/';
            }}
          >
            Home Page
          </button>
        </div>
      </div>
      <div>{responseMessage && <p>{responseMessage}</p>}</div>
    </div>
  );
}

export default LoginFunc;
