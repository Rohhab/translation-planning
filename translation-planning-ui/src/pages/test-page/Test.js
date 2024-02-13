import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
// import { useFormik, Field } from 'formik';
import axios from 'axios';
// import './Test.css';

import { Formik, Form, Field } from 'formik';

function validateEmail(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

function validateUsername(value) {
  let error;
  if (value === 'admin') {
    error = 'Nice try!';
  }
  return error;
}

function Test() {
  const [selectedForm, setSelectedForm] = useState('');

  return (
    <div>
      <div>
        <h1>Signup</h1>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          onSubmit={(values) => {
            if (selectedForm === 'SIGNUP') {
              axios
                .post('http://localhost:3100/auth/login/signup', values)
                .then((response) => {
                  console.log('Response from the API:', response.data);
                })
                .catch((error) => {
                  console.error('Error:', error);
                });
              console.log('Form submitted with values:', values);
            }
          }}
        >
          {({ errors, touched, isValidating }) => (
            <Form>
              <Field
                name="username"
                placeholder="Username"
                validate={validateUsername}
              />
              {errors.username && touched.username && (
                <div>{errors.username}</div>
              )}

              <Field
                name="email"
                placeholder="Email"
                validate={validateEmail}
              />
              {errors.email && touched.email && <div>{errors.email}</div>}

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
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
        </div>
      </div>
    </div>
  );
}

// function Test() {

//   const Form = () => {

//     return (
//       <form onSubmit={formik.handleSubmit}>
//         <label htmlFor="name">Username:</label>
//         <input
//           id="name"
//           name="name"
//           type="username"
//           placeholder="Enter your username"
//           disabled={
//             selectedForm === 'SIGNUP'
//               ? false
//               : selectedForm === 'SIGNIN_USERNAME'
//               ? false
//               : true
//           }
//           onChange={formik.handleChange}
//           value={formik.values.username}
//         />
//         {/* {formik.errors.username && formik.touched.username && (
//           <div>{formik.errors.username}</div>
//         )} */}

//         <label htmlFor="email">Email Address:</label>
//         <input
//           id="email"
//           name="email"
//           type="email"
//           placeholder="Enter your E-mail address"
//           disabled={
//             selectedForm === 'SIGNUP'
//               ? false
//               : selectedForm === 'SIGNIN_EMAIL'
//               ? false
//               : true
//           }
//           onChange={formik.handleChange}
//           value={formik.values.email}
//         />
//         {/* {formik.errors.email && formik.touched.email && (
//           <div>{formik.errors.email}</div>
//         )} */}

//         <label htmlFor="password">Password:</label>
//         <input
//           id="password"
//           name="password"
//           type="password"
//           placeholder="Enter your password"
//           onChange={formik.handleChange}
//           disabled={
//             selectedForm === 'SIGNUP'
//               ? false
//               : selectedForm === 'SIGNIN_USERNAME'
//               ? false
//               : selectedForm === 'SIGNIN_EMAIL'
//               ? false
//               : true
//           }
//           value={formik.values.password}
//         />
//         {/* {formik.errors.password && formik.touched.password && (
//           <div>{formik.errors.password}</div>
//         )} */}

//         <button type="submit">Submit</button>
//       </form>
//     );
//   };

//   return (

//   );
// }

export default Test;
