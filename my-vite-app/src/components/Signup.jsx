import React, { useState } from "react";
import { registerUser } from "../api/userApi";
import "./signup.css"; // Importing the CSS file
import { useNavigate } from "react-router-dom"; // For navigation

export const Signup = () => {
  const [formData, setFormData] = useState({
    username: "", // Ensuring all fields have an initial value
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password.length < 8) {
        window.alert("Password length is less than 8");
        return;
      }
      console.log(formData);
        const response = await registerUser(formData);
        alert(response.message);
        navigate("/login"); // Redirect to login page on success
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(
          "User with this email already exists. Please use a different email."
        );
      } else {
        alert(error.message); // Handle other errors
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              name="username" // Updated to match the state key
              placeholder="Username"
              value={formData.username} // Correct value binding
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="input-container">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email} // Correct value binding
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
              value={formData.password} // Correct value binding
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
