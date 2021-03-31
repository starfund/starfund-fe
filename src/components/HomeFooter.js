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
        <div className="col-lg-3 col-6 ">
          <div className="">
            <p>{intl.formatMessage({ id: 'header.explore' })}</p>
          </div>
          <div className="">
            <a onClick={() => window.open('/fighters', '_self')}>
              {intl.formatMessage({ id: 'header.athletes' })}
            </a>
          </div>
          <div className="">
            <a onClick={() => window.open('/watch', '_self')}>
              {intl.formatMessage({ id: 'header.watch' })}
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="">
            <p>{intl.formatMessage({ id: 'header.about' })}</p>
          </div>
          <div className="">
            <a onClick={() => window.open('/about-us', '_self')}>
              {intl.formatMessage({ id: 'header.who' })}
            </a>
          </div>
          <div className="">
            <Link
              to="/join-us"
              type="button"
              className="btn btn-lg enroll-as-a-star-btn rounded-pill"
            >
              {intl.formatMessage({ id: 'button.enroll' })}
            </Link>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="">
            <p>{intl.formatMessage({ id: 'header.social' })}</p>
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
            <p>{intl.formatMessage({ id: 'header.join' })}</p>
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
          <a href="/terms">{intl.formatMessage({ id: 'legal.conditions' })}</a>
          <p>
            {' '}
            <span className="dot" />{' '}
          </p>
          <a href="/privacy">{intl.formatMessage({ id: 'legal.privacy' })}</a>
          <p>
            <span className="dot" />
          </p>
          <a href="/help">{intl.formatMessage({ id: 'legal.help' })}</a>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
