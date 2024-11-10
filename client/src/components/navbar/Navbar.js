// Navbar.jsx
import React, { useState } from 'react';
import './Navbar.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <>
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Task Manager
        </Link>

        {/* Mobile menu button */}
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>

        {/* Desktop navigation links */}
        <nav className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <ul >
            <li><Link to="/" className="nav-item">Home</Link></li>
            <li><Link to="/about" className="nav-item">About</Link></li>
            <li><Link to="/login" className="nav-item">SignIn</Link></li>
            <li><Link to="/register" className="nav-item">Register</Link></li>
          </ul>
        </nav>
      </div>
    </header>
      <hr /></>

  );
};

export default Navbar;
