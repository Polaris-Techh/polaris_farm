// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/pngwing.com(1).png';
import '../static/Navbar.css';

function Navbar() {
  return (
    <div className='nav'>
      <header>
        <div className="left">
          <Link to="/">
            <img src={logo} alt="Polaris Tech" style={{ filter: 'grayscale(100%)' }} />
          </Link>
        </div>
        <div className="right">
          <nav>
            <ul className="nav-list">
              <li className="nav-item">
                <a href="#section-1" className="nav-link">Home</a>
              </li>
              <li className="nav-item">
                <a href="#section-2" className="nav-link">Contact</a>
              </li>
              <li className="nav-item">
                <a href="#section-3" className="nav-link">About Us</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
