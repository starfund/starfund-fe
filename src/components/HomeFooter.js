import React from 'react';

import { Link } from 'react-router-dom';
import LanguageDropdown from './common/LanguageDropdown';

import Facebook from '../assets/Facebook.svg';
import Instagram from '../assets/Instagram.svg';
import Youtube from '../assets/Youtube.svg';
import './index.css';

const HomeFooter = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row footer-header">
          <div className="col-md-3">
            <p> Explore </p>
          </div>
          <div className="col-md-3">
            <p> About </p>
          </div>
          <div className="col-md-3">
            <p> Social </p>
          </div>
          <div className="col-md-3">
            <p> Join Us </p>
          </div>
        </div>
        <div className="row row-1">
          <div className="col-md-3">
            <p> Athletes </p>
          </div>
          <div className="col-md-3">
            <p> Who we are </p>
          </div>
          <div className="col-md-3 flex">
            <img src={Instagram} alt="Instagram" />
            <p> Instagram </p>
          </div>
          <div className="col-md-3">
            <Link to="/join-us" type="button" className="btn btn-lg">
              ENROLL AS STAR
            </Link>
          </div>
        </div>
        <div className="row row-1">
          <div className="col-md-3">
            <p> Shop </p>
          </div>
          <div className="col-md-3">
            <p> Career </p>
          </div>
          <div className="col-md-3 flex">
            <img src={Youtube} alt="Youtube" />
            <p> Youtube </p>
          </div>
          <div className="col-md-3" />
        </div>
        <div className="row row-1">
          <div className="col-md-3">
            <p> Watch </p>
          </div>
          <div className="col-md-3">
            <p> News </p>
          </div>
          <div className="col-md-3 flex">
            <img src={Facebook} alt="Facebook" />
            <p> Facebook </p>
          </div>
          <div className="col-md-3 d-flex align-items-center">
            <LanguageDropdown />
          </div>
        </div>
        <div className="row language-row">
          <div className="col-md-3" />
          <div className="col-md-3" />
          <div className="col-md-3" />
          <div className="col-md-3" />
        </div>
        <div className="row last-row">
          <a href="/terms"> Terms & Conditions </a>
          <p>
            {' '}
            <span className="dot" />{' '}
          </p>
          <a href="/privacy"> Privacy Policy </a>
          <p>
            <span className="dot" />
          </p>
          <a href="/help"> Help & Support </a>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
