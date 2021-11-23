import React from 'react';

import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useMediaQuery } from 'react-responsive';

import Facebook from '../assets/Facebook.png';
import Linkedin from '../assets/Linkedin.png';
import Instagram from '../assets/Instagram.png';
import Youtube from '../assets/Youtube.png';
import './index.css';

const HomeFooter = () => {
  const intl = useIntl();
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });
  return (
    <footer className="footer">
      <div className="container row">
        <div className="col-sm-2 col-0 row-1" />
        <div className="col-sm-2 col-12 row-1">
          <div>
            <h3>{intl.formatMessage({ id: 'header.explore' })}</h3>
          </div>
          <div className="explore-div">
            <div className={isMobile ? 'footer-items' : 'center-50'}>
              <a onClick={() => window.open('/about-us', '_self')}>
                {intl.formatMessage({ id: 'header.about' })}
              </a>
            </div>
            <div className={isMobile ? 'footer-items' : 'center-50'}>
              <a onClick={() => window.open('/athletes', '_self')}>
                {intl.formatMessage({ id: 'header.athletes' })}
              </a>
            </div>
            <div className={isMobile ? 'footer-items' : 'center-50'}>
              <a onClick={() => window.open('/watch', '_self')}>
                {intl.formatMessage({ id: 'header.watch.lower' })}
              </a>
            </div>
            <div className={isMobile ? 'footer-items' : 'center-50'}>
              <a onClick={() => window.open('/watch', '_self')}>
                {intl.formatMessage({ id: 'header.business.lower' })}
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-4 col-12 row-1">
          <div className="contact">
            <h3>{intl.formatMessage({ id: 'header.contact' })}</h3>
          </div>
          <div className={isMobile ? 'footer-items' : 'center-50'}>
            <p> info@starfund.app </p>
          </div>
          <div className={isMobile ? 'flex social-container-mobile' : 'flex social-container'}>
            <img
              src={Facebook}
              alt="Facebook"
              onClick={() => window.open('http://facebook.com/starfundapp', '_blank')}
            />
            <img
              src={Linkedin}
              alt="Linkedin"
              onClick={() => window.open('http://linkedin.com/company/starfund-inc', '_blank')}
            />
            <img
              src={Youtube}
              alt="Youtube"
              onClick={() =>
                window.open('https://www.youtube.com/channel/UCocOwXWltbLzvtyDBu9Y5tA', '_blank')
              }
            />
            <img
              src={Instagram}
              alt="Instagram"
              onClick={() => window.open('https://www.instagram.com/starfund.co/', '_blank')}
            />
          </div>
        </div>
        <div className="col-12 col-sm-2 col-6 row-1">
          <div className="col join-col">
            <h3>{intl.formatMessage({ id: 'header.join' })}</h3>
          </div>
          <div className={isMobile ? 'footer-items' : 'center-50'}>
            <Link
              to="/join-us"
              type="button"
              className={
                isMobile
                  ? 'btn-mob btn-lg enroll-as-a-star-btn rounded-pill'
                  : 'btn btn-lg enroll-as-a-star-btn rounded-pill'
              }
            >
              {intl.formatMessage({ id: 'button.enroll' })}
            </Link>
          </div>
        </div>
        <div className="col-sm-2 col-0 row-1" />
        <div
          className={
            isMobile
              ? 'col-12 col-sm-12 col-md-6 last-row-mobile'
              : 'col-12 col-sm-12 col-md-6 last-row'
          }
        >
          <a href="/terms">{intl.formatMessage({ id: 'legal.conditions' })}</a>
          <p>|</p>
          <a href="/privacy">{intl.formatMessage({ id: 'legal.privacy' })}</a>
          <p>|</p>
          <a href="/help">{intl.formatMessage({ id: 'legal.help' })}</a>
        </div>
        <div className={isMobile ? 'col-12 last-row-mobile' : 'col-12 last-row'}>
          <div className="copyright-div">
            {' '}
            Copyright © {new Date().getFullYear()} STARFUND All rights reserved{' '}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
