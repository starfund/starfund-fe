import React from 'react';

import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

import LanguageDropdown from './common/LanguageDropdown';

import Facebook from '../assets/Facebook.svg';
import Instagram from '../assets/Instagram.svg';
import Youtube from '../assets/Youtube.svg';
import './index.css';

const HomeFooter = () => {
  const intl = useIntl();
  return (
    <footer className="footer">
      <div className="container row">
        <div className="col-lg-4 col-6 row-1">
          <div className="">
            <h3>{intl.formatMessage({ id: 'header.explore' })}</h3>
          </div>
          <div className="center-50">
            <a onClick={() => window.open('/about-us', '_self')}>
              {intl.formatMessage({ id: 'header.about' })}
            </a>
          </div>
          <div className="center-50">
            <a onClick={() => window.open('/athletes', '_self')}>
              {intl.formatMessage({ id: 'header.athletes' })}
            </a>
          </div>
          <div className="center-50">
            <a onClick={() => window.open('/watch', '_self')}>
              {intl.formatMessage({ id: 'header.watch' })}
            </a>
          </div>
        </div>
        <div className="col-lg-4 col-6 row-1">
          <div className="contact">
            <h3>{intl.formatMessage({ id: 'header.contact' })}</h3>
          </div>
          <div className="center-50">
            <p> info@starfun.app </p>
          </div>
          <div className="flex center-50 social-container">
            <img
              src={Instagram}
              alt="Instagram"
              onClick={() => window.open('https://www.instagram.com/starfund.co/', '_blank')}
            />
            <img
              src={Youtube}
              alt="Youtube"
              onClick={() =>
                window.open('https://www.youtube.com/channel/UCocOwXWltbLzvtyDBu9Y5tA', '_blank')
              }
            />
            <img
              src={Facebook}
              alt="Facebook"
              onClick={() => window.open('http://facebook.com/starfundapp', '_blank')}
            />
          </div>
        </div>
        <div className="col-sm-4 col-6">
          <div className="col">
            <h3>{intl.formatMessage({ id: 'header.join' })}</h3>
          </div>
          <div className="center-50">
            <Link
              to="/join-us"
              type="button"
              className="btn btn-lg enroll-as-a-star-btn rounded-pill"
            >
              {intl.formatMessage({ id: 'button.enroll' })}
            </Link>
          </div>
          <div className="">
            <br />
          </div>
          <div className="center-50 d-flex align-items-center">
            <LanguageDropdown />
          </div>
        </div>
        <div className="row last-row">
          <a href="/terms">{intl.formatMessage({ id: 'legal.conditions' })}</a>
          <p>|</p>
          <a href="/privacy">{intl.formatMessage({ id: 'legal.privacy' })}</a>
          <p>|</p>
          <a href="/help">{intl.formatMessage({ id: 'legal.help' })}</a>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
