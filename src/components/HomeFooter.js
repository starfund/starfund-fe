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
      <div className="container row">
        <div className="col-lg-3 col-6 ">
          <div className="">
            <p> Explore </p>
          </div>
          <div className="">
            <a onClick={() => window.open('/fighters', '_self')}> Athletes </a>
          </div>
          <div className="">
            <a onClick={() => window.open('/watch', '_self')}> Watch </a>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="">
            <p> About </p>
          </div>
          <div className="">
            <a onClick={() => window.open('/about-us', '_self')}> Who we are </a>
          </div>

          <div className="">
            <Link
              to="/join-us"
              type="button"
              className="btn btn-lg enroll-as-a-star-btn rounded-pill"
            >
              ENROLL AS STAR
            </Link>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="">
            <p> Social </p>
          </div>
          <div className="flex">
            <img src={Instagram} alt="Instagram" />
            <a onClick={() => window.open('https://www.instagram.com/starfund.co/', '_blank')}>
              {' '}
              Instagram{' '}
            </a>
          </div>
          <div className="flex">
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
          <div className="flex">
            <img src={Facebook} alt="Facebook" />
            <a onClick={() => window.open('http://facebook.com/starfundapp', '_blank')}>Facebook</a>
          </div>
        </div>
        <div className="col-sm-3 col-6">
          <div className="col">
            <p> Join Us </p>
          </div>
          <div className="" />
          <div className="">
            <p> </p>
          </div>

          <div className=" d-flex align-items-center">
            <LanguageDropdown />
          </div>
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
