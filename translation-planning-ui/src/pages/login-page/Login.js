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
        .post('http://localhost:3100/auth/login/signup', values)
        .then((response) => {
          console.log('Response from the API:', response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      console.log('Form submitted with values:', values);
    }
  };
  //     axios
  //       .post('http://localhost:3100/auth/login/signup', formData)
  //       .then((response) => {
  //         console.log('Response from API:', response.data);

  //         setResponseMessage(JSON.stringify(response.data));
  //       })
  //       .catch((error) => {
  //         console.error('Error:', error);

  //         setResponseMessage(JSON.stringify(error.response.data.message));
  //       });
  //   }

  const Form = () => {
    const formik = useFormik({
      initialValues: {
        name: '',
        email: '',
        password: '',
      },
      onSubmit: handleSubmit,
      // validate: (values) => {
      //   let errors = {};
      //   if (selectedForm === 'SIGNUP' || selectedForm === 'SIGNIN_USERNAME') {
      //     if (!values.username) {
      //       errors.username = 'Required';
      //     }
      //   }
      //   if (selectedForm === 'SIGNUP' || selectedForm === 'SIGNIN_EMAIL') {
      //     if (!values.email) {
      //       errors.email = 'Required';
      //     }
      //   }
      //   if (!values.password) {
      //     errors.password = 'Required';
      //   }
      //   return errors;
      // },
    });

    return (
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Username:</label>
        <input
          id="name"
          name="name"
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
          value={formik.values.username}
        />
        {/* {formik.errors.username && formik.touched.username && (
          <div>{formik.errors.username}</div>
        )} */}

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
          value={formik.values.email}
        />
        {/* {formik.errors.email && formik.touched.email && (
          <div>{formik.errors.email}</div>
        )} */}

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {/* {formik.errors.password && formik.touched.password && (
          <div>{formik.errors.password}</div>
        )} */}

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
      </div>
    </div>
  );
}

export default Login;

// const [formType, setFormType] = useState(null);
// const [formData, setFormData] = useState({
//   name: '',
//   email: '',
//   password: '',
// });
// const [responseMessage, setResponseMessage] = useState('');

// const handleFormTypeChange = (type) => {
//   setFormType(type);
//   setFormData({
//     name: '',
//     email: '',
//     password: '',
//   });
//   setResponseMessage('');
// };

// const handleSubmit = async (event) => {
//   event.preventDefault();

//   if (formType === formTypes.SIGNIN_USERNAME) {
//     axios
//       .post('http://localhost:3100/auth/login/signin', formData)
//       .then((response) => {
//         console.log('Response from API:', response.data);

//         setResponseMessage(JSON.stringify(response.data));
//         window.location = '/books';
//       })
//       .catch((error) => {
//         console.error('Error:', error.response.data.message);

//         setResponseMessage(JSON.stringify(error.response.data.message));
//       });
//   } else if (formType === formTypes.SIGNIN_EMAIL) {
//     axios
//       .post('http://localhost:3100/auth/login/signin', formData)
//       .then((response) => {
//         console.log('Response from API:', response.data);

//         setResponseMessage(JSON.stringify(response.data));
//       })
//       .catch((error) => {
//         console.error('Error:', error.response.data.message);

//         setResponseMessage(JSON.stringify(error.response.data.message));
//       });
//   } else if (formType === formTypes.SIGNUP) {
//     axios
//       .post('http://localhost:3100/auth/login/signup', formData)
//       .then((response) => {
//         console.log('Response from API:', response.data);

//         setResponseMessage(JSON.stringify(response.data));
//       })
//       .catch((error) => {
//         console.error('Error:', error);

//         setResponseMessage(JSON.stringify(error.response.data.message));
//       });
//   }
// };

// const handleChange = (event) => {
//   setFormData({
//     ...formData,
//     [event.target.name]: event.target.value,
//   });
// };

// const renderFormFields = () => {
//   if (formType === formTypes.SIGNIN_USERNAME) {
//     return (
//       <>
//         <label>
//           Name:
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <button type="submit" className="Login-button">
//           {formType === formTypes.SIGNIN_USERNAME
//             ? 'Sign In with Username'
//             : formType === formTypes.SIGNIN_EMAIL
//             ? 'Sign In with Email'
//             : 'Sign Up'}
//         </button>
//       </>
//     );
//   } else if (formType === formTypes.SIGNIN_EMAIL) {
//     return (
//       <>
//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <button type="submit" className="Login-button">
//           {formType === formTypes.SIGNIN_USERNAME
//             ? 'Sign In with Username'
//             : formType === formTypes.SIGNIN_EMAIL
//             ? 'Sign In with Email'
//             : 'Sign Up'}
//         </button>
//       </>
//     );
//   } else if (formType === formTypes.SIGNUP) {
//     return (
//       <>
//         <label>
//           Name:
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//         </label>
//         <br />
//         <button type="submit" className="Login-button">
//           {formType === formTypes.SIGNIN_USERNAME
//             ? 'Sign In with Username'
//             : formType === formTypes.SIGNIN_EMAIL
//             ? 'Sign In with Email'
//             : 'Sign Up'}
//         </button>
//       </>
//     );
//   }

//   return null;
// };
