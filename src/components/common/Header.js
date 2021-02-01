import React from 'react';

import logo from 'assets/starfund-logo.png';
import './index.css';

const Header = () => (
  <header className="custom-header">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <img src={logo} alt="logo" />
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Stars <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Shop
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              About us
            </a>
          </li>
        </ul>
        <span className="navbar-text">Login</span>
      </div>
    </nav>
  </header>
);

export default Header;
