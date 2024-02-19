import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import axios from 'axios';
import './Login.css';

function Login() {
  const [selectedForm, setSelectedForm] = useState('');

  const handleSubmit = (values) => {
    if (selectedForm === 'SIGNUP') {
      axios
        .post('http://localhost:3100/api/auth/login/signup', values)
        .then((response) => {
          console.log('Response from the API:', response.data);
          // if (response.status === 201) {
          //   window.location.href = '../books';
          // }
        })
        .catch((error) => {
          console.error('Error:', error);
          console.log('Error', error.response.data.message);
        });
    } else if (selectedForm === 'SIGNIN_USERNAME') {
      axios
        .post('http://localhost:3100/api/auth/login/signin', values)
        .then((response) => {
          console.log('Response from the API:', response.data);
          // if (response.status === 201) {
          //   window.location.href = '../books';
          // }
        })
        .catch((error) => {
          console.error('Error:', error);
          console.log('Error', error.response.data.message);
        });
    } else if (selectedForm === 'SIGNIN_EMAIL') {
      axios
        .post('http://localhost:3100/api/auth/login/signin', values)
        .then((response) => {
          console.log('Response from the API:', response.data);
          // if (response.status === 201) {
          //   window.location.href = '../books';
          // }
        })
        .catch((error) => {
          console.error('Error:', error.response.data.message);
          console.log('Error', error.response.data.message);
        });
    }
  };

  const Form = () => {
    const formik = useFormik({
      initialValues: {
        username: '',
        email: '',
        password: '',
      },
      validate: (values) => {
        const errors = {};

        if (selectedForm === 'SIGNIN_USERNAME') {
          if (formik.touched.username && !values.username) {
            errors.username = 'Username is required for login';
          } else if (/admin/i.test(values.username)) {
            errors.username = 'Nice try!';
          }

          if (formik.touched.password && !values.password) {
            errors.password = 'Password is required';
          }
        }

        if (selectedForm === 'SIGNIN_EMAIL') {
          if (formik.touched.email && !values.email) {
            errors.email = 'Email is required for login';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = 'Email address is invalid';
          }

          if (formik.touched.password && !values.password) {
            errors.password = 'Password is required';
          }
        }

        if (selectedForm === 'SIGNUP') {
          if (formik.touched.username && !values.username) {
            errors.username = 'Username is required to sign you up';
          } else if (/admin/i.test(values.username)) {
            errors.username = 'Nice try!';
          }

          if (formik.touched.email && !values.email) {
            errors.email = 'Email is required to sign you up';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = 'Email address is invalid';
          }

          if (formik.touched.password && !values.password) {
            errors.password = 'Password is required';
          }
        }

        return errors;
      },
      onSubmit: handleSubmit,
    });

    return (
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          type="username"
          placeholder="Enter your username"
          disabled={
            selectedForm === 'SIGNUP'
              ? false
              : selectedForm === 'SIGNIN_USERNAME'
              ? false
              : true
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.errors.username && <div>{formik.errors.username}</div>}

        <label htmlFor="email">Email Address:</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your E-mail address"
          disabled={
            selectedForm === 'SIGNUP'
              ? false
              : selectedForm === 'SIGNIN_EMAIL'
              ? false
              : true
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email && <div>{formik.errors.email}</div>}

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={
            selectedForm === 'SIGNUP'
              ? false
              : selectedForm === 'SIGNIN_USERNAME'
              ? false
              : selectedForm === 'SIGNIN_EMAIL'
              ? false
              : true
          }
          value={formik.values.password}
        />
        {formik.errors.password && <div>{formik.errors.password}</div>}

        <button type="submit">Submit</button>
      </form>
    );
  };

  return (
    <div className="LoginPage">
      <div className="LoginPage__background"></div>
      <div className="LoginPage__sidebar">
        <a href="/">Home Page</a>
        <button onClick={() => setSelectedForm('SIGNIN_USERNAME')}>
          Sign in with username
        </button>
        <button onClick={() => setSelectedForm('SIGNIN_EMAIL')}>
          Sign in with email
        </button>
        <button onClick={() => setSelectedForm('SIGNUP')}>Sign up</button>
      </div>
      <div className="LoginPage__content">
        <Helmet>
          <title>Login to TranslationPlanning</title>
        </Helmet>

        <Form />
        <button
          onClick={() =>
            (window.location.href =
              'http://localhost:3100/api/auth/login/google')
          }
        >
          Sign in with Google!
        </button>
      </div>
    </div>
  );
}

export default Login;
