import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../useContext.jsx"; // Import the UserProvider
import "./nav.css";
 
export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, setUser } = useContext(UserContext); // usecontext
 
  // Check if the user is authenticated (e.g., by checking localStorage)
  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Assuming token is stored on login
    setIsAuthenticated(!!token); // Set to true if token exists, otherwise false
  }, []);
 
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
 
  const logout = () => {
    // local storage delete the user
    try {
      localStorage.removeItem("loggedinuser");
 
      if (!localStorage.getItem("loggedinuser")) {
        window.location.reload();
      }
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };
 
  return (
    <>
      <header id="nav-wrapper">
        <nav id="nav" className={menuOpen ? "nav-visible" : ""}>
          <div className="nav left">
            <span className="gradient skew">
              <h1 className="logo un-skew">
                <Link to="/">Logo Here</Link>
              </h1>
            </span>
            <button id="menu" className="btn-nav" onClick={toggleMenu}>
              <span className="fas fa-bars"></span>
            </button>
          </div>
          <div className={`nav right ${menuOpen ? "show" : ""}`}>
            <Link to="/" className="nav-link active">
              Home
            </Link>
            {isAuthenticated && (
              <Link to="/results" className="nav-link">
                Results
              </Link>
            )}
            <Link to="/speechToText" className="nav-link">
              Interview
            </Link>
 
            {localStorage.getItem("loggedinuser") ? (
              <>
<Link to="/results" className="nav-link">
                Results
              </Link>
              <span className="nav-link" onClick={logout}>Logout</span></>
            ) : (
              <Link to="/login" className="nav-link">
                Login/Signup
              </Link>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};