// import React, { useContext, useState } from 'react';
// import { loginUser } from '../api/userApi';
// import { Link, useNavigate, Navigate, redirect } from 'react-router-dom'; // Assuming you're using react-router-dom for routing
// import './login.css'; // Importing the CSS file
// import { UserContext } from "../useContext.jsx"; // Import the UserProvider

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const { setUser } = useContext(UserContext); // Access the context
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage(''); // Reset error message before each submit

//     try {
//       console.log(formData, " ");
//       // delete the previous one if new user logged in 

//       const response = await loginUser(formData);
//       setUser(formData);

//       if (response) {
//         // Store the response in local storage
//         if (response.body) {
//           localStorage.setItem('loggedinuser', JSON.stringify(response.body));
//           alert("Successfully Logged in"); // Or redirect to another page if needed
//           navigate('/');;
//           return;
//         }
        
//         console.error("Error: No token found in response");
//       }

//     } catch (error) {
//       // Check if the error is "user doesn't exist"
//       if (error.message === 'Invalid credentials') {
//         setErrorMessage('User does not exist. Please sign up first.');
//       } else {
//         console.log(error.message);
//         setErrorMessage(error.message); // Display any other error messages
//       }
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2 className="login-title">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="input-container">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               className="input-field"
//               required
//             />
//           </div>
//           <div className="input-container">
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               className="input-field"
//               required
//             />
//           </div>
//           {errorMessage && <p className="error-message">{errorMessage}</p>}
//           <button type="submit" className="login-button">Login</button>
//         </form>

//         <div className="signup-prompt">
//           <p>Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useContext, useState } from 'react';
import { loginUser } from '../api/userApi';
import { Link, useNavigate, Navigate, redirect } from 'react-router-dom'; // Assuming you're using react-router-dom for routing
import './login.css'; // Importing the CSS file
import { UserContext } from "../useContext.jsx"; // Import the UserProvider
 
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
 
  const { setUser } = useContext(UserContext); // Access the context
  const [errorMessage, setErrorMessage] = useState('');
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message before each submit
 
    try {
      console.log(formData, " ");
      // delete the previous one if new user logged in 
 
      const response = await loginUser(formData);
      setUser(formData);
 
      if (response) {
        // Store the response in local storage
        if (response.body) {
          localStorage.setItem('loggedinuser', JSON.stringify(response.body));
          alert("Successfully Logged in"); // Or redirect to another page if needed
          navigate('/');;
          return;
        }
 
        console.error("Error: No token found in response");
      }
 
    } catch (error) {
      // Check if the error is "user doesn't exist"
      if (error.message === 'Invalid credentials') {
        setErrorMessage('User does not exist. Please sign up first.');
      } else {
        console.log(error.message);
        setErrorMessage(error.message); // Display any other error messages
      }
    }
  };
 
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="login-button">Login</button>
        </form>
 
        <div className="signup-prompt">
          <p>Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};
 
export default Login;
 


// import React, { useState, useContext } from 'react';
// import { loginUser } from '../api/userApi';
// import { Link, useNavigate } from 'react-router-dom';
// import { UserContext } from "../useContext.jsx"; // Import the UserContext
// // import { UserProvider } from "../useContext.jsx"; // Import the UserProvider
// import "./login.css";

// const Login = () => {

//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [errorMessage, setErrorMessage] = useState('');
//   const { setUser } = useContext(UserContext); // Access the context
//   const navigate = useNavigate(); // To redirect after login

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');
//     try {
//       const response = await loginUser(formData);
//       if (response.message) {
//         alert(response.message);
//         setUser(response.user); // Set the user in context
//         navigate('/'); // Redirect to a protected route after login
//       }
//     } catch (error) {
//       if (error.message === 'Invalid credentials') {
//         setErrorMessage('User does not exist. Please sign up first.');
//       } else {
//         setErrorMessage(error.message);
//       }
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2 className="login-title">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="input-container">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               className="input-field"
//               required
//             />
//           </div>
//           <div className="input-container">
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               className="input-field"
//               required
//             />
//           </div>
//           {errorMessage && <p className="error-message">{errorMessage}</p>}
//           <button type="submit" className="login-button">Login</button>
//         </form>
//         <div className="signup-prompt">
//           <p>Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
