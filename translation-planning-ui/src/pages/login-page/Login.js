import React from 'react';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import axios from 'axios';
import toltec from '../toltec.webp';
import './Login.css';

const formTypes = {
  SIGNIN_USERNAME: 'signin_username',
  SIGNIN_EMAIL: 'signin_email',
  SIGNUP: 'signup',
};

function Login() {
  const [formType, setFormType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleFormTypeChange = (type) => {
    setFormType(type);
    setFormData({
      name: '',
      email: '',
      password: '',
    });
    setResponseMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formType === formTypes.SIGNIN_USERNAME) {
      axios
        .post('http://localhost:3100/auth/login/signin', formData)
        .then((response) => {
          console.log('Response from API:', response.data);

          setResponseMessage(JSON.stringify(response.data));
          window.location = '/books';
        })
        .catch((error) => {
          console.error('Error:', error.response.data.message);

          setResponseMessage(JSON.stringify(error.response.data.message));
        });
    } else if (formType === formTypes.SIGNIN_EMAIL) {
      axios
        .post('http://localhost:3100/auth/login/signin', formData)
        .then((response) => {
          console.log('Response from API:', response.data);

          setResponseMessage(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error('Error:', error.response.data.message);

          setResponseMessage(JSON.stringify(error.response.data.message));
        });
    } else if (formType === formTypes.SIGNUP) {
      axios
        .post('http://localhost:3100/auth/login/signup', formData)
        .then((response) => {
          console.log('Response from API:', response.data);

          setResponseMessage(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error('Error:', error);

          setResponseMessage(JSON.stringify(error.response.data.message));
        });
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const renderFormFields = () => {
    if (formType === formTypes.SIGNIN_USERNAME) {
      return (
        <>
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
            {formType === formTypes.SIGNIN_USERNAME
              ? 'Sign In with Username'
              : formType === formTypes.SIGNIN_EMAIL
              ? 'Sign In with Email'
              : 'Sign Up'}
          </button>
        </>
      );
    } else if (formType === formTypes.SIGNIN_EMAIL) {
      return (
        <>
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
            {formType === formTypes.SIGNIN_USERNAME
              ? 'Sign In with Username'
              : formType === formTypes.SIGNIN_EMAIL
              ? 'Sign In with Email'
              : 'Sign Up'}
          </button>
        </>
      );
    } else if (formType === formTypes.SIGNUP) {
      return (
        <>
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
            {formType === formTypes.SIGNIN_USERNAME
              ? 'Sign In with Username'
              : formType === formTypes.SIGNIN_EMAIL
              ? 'Sign In with Email'
              : 'Sign Up'}
          </button>
        </>
      );
    }

    return null;
  };

  return (
    <div className="Container">
      <div>
        <Helmet>
          <title>Login to TranslationPlanning</title>
        </Helmet>
      </div>

      <div className="Image-container">
        <div className="Background-image">
          <img src={toltec} alt="The Toltec Warrior" />
        </div>
      </div>
      <div className="Left-column">
        <div className="Centered-content">
          <p
            className={`toggle-link ${
              formType === formTypes.SIGNIN_USERNAME ? 'active' : ''
            }`}
            onClick={() => handleFormTypeChange(formTypes.SIGNIN_USERNAME)}
          >
            Sign in with username
          </p>
          <p
            className={`toggle-link ${
              formType === formTypes.SIGNIN_EMAIL ? 'active' : ''
            }`}
            onClick={() => handleFormTypeChange(formTypes.SIGNIN_EMAIL)}
          >
            Sign in with email
          </p>
          <p
            className={`toggle-link ${
              formType === formTypes.SIGNUP ? 'active' : ''
            }`}
            onClick={() => handleFormTypeChange(formTypes.SIGNUP)}
          >
            Sign up
          </p>
          <form onSubmit={handleSubmit}>{renderFormFields()}</form>
        </div>
      </div>
      <div className="Right-column">
        <button
          className="Home-button"
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Home Page
        </button>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
    </div>
  );
}

export default Login;
