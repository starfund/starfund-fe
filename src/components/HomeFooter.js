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
            <a onClick={() => window.open('/fighters', '_self')}> Athletes </a>
          </div>
          <div className="col-md-3">
            <a onClick={() => window.open('/about-us', '_self')}> Who we are </a>
          </div>
          <div className="col-md-3 flex">
            <img src={Instagram} alt="Instagram" />
            <a onClick={() => window.open('https://www.instagram.com/starfund.co/', '_blank')}>
              {' '}
              Instagram{' '}
            </a>
          </div>
          <div className="col-md-3">
            <Link to="/join-us" type="button" className="btn btn-lg">
              ENROLL AS STAR
            </Link>
          </div>
        </div>
        <div className="row row-1">
          <div className="col-md-3">
            <a onClick={() => window.open('/watch', '_self')}> Watch </a>
          </div>
          <div className="col-md-3">
            <p> </p>
          </div>
          <div className="col-md-3 flex">
            <img src={Youtube} alt="Youtube" />
            <a
              onClick={() =>
                window.open('https://www.youtube.com/channel/UCocOwXWltbLzvtyDBu9Y5tA', '_blank')
              }
            >
              {' '}
              Youtube{' '}
            </a>
          </div>
          <div className="col-md-3" />
        </div>
        <div className="row row-1">
          <div className="col-md-3" />
          <div className="col-md-3">
            <p> </p>
          </div>
          <div className="col-md-3 flex">
            <img src={Facebook} alt="Facebook" />
            <a onClick={() => window.open('http://facebook.com/starfundapp', '_blank')}>Facebook</a>
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
