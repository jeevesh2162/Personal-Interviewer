// Make sure to include these imports:
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const {GoogleGenerativeAI} = require("@google/generative-ai");
app.use(express.json());
app.use(bodyParser.json());


app.get('/gemini',(req,res)=>{
    res.send("hello world");
})


const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = `
import React, { useContext, useState } from 'react';
import { loginUser } from '../api/userApi';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for routing
import './login.css'; // Importing the CSS file
import { UserContext } from "../useContext.jsx"; // Import the UserProvider


const Login = () => {
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
      console.log(formData," ");
      const response = await loginUser(formData);
      setUser(formData);
      if (response.message) {
        alert(response.message); // Or redirect to another page if needed
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



add code to check if the user is already logged in or not
`;// set a prompt for output

const generate = async (p)=>{
    try{
        const result = await model.generateContent(p);
        console.log(result.response.text());
    }catch(err){
        console.log(err);
    }
}

generate(prompt);

app.listen(3000, ()=>{
    console.log("Server is running");
})