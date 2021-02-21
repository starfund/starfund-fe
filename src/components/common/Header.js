import React from 'react';
import { useHistory } from 'react-router-dom';

import logo from 'assets/starfund-logo.png';
import './index.css';

const Header = () => {
  const history = useHistory();

  return (
    <header className="custom-header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div onClick={() => history.push('/')}>
          <img src={logo} alt="logo" />
        </div>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#" onClick={() => history.push('/fighters')}>
                Stars <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => history.push('/shop')}>
                Shop
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => history.push('/about-us')}>
                About us
              </a>
            </li>
          </ul>
          <span className="navbar-text">Login</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
