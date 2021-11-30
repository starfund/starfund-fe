import React, { useState } from 'react';
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
  const [exploreDropdown, setExploreDropdown] = useState(true);
  const [contactDropdown, setContactDropdown] = useState(true);
  const [joinDropdown, setJoinDropdownn] = useState(true);

  return (
    <footer className="footer">
      <div className="container row">
        <div className="col-lg-2 col-sm-0 col-0 row-1" />
        <div className="col-lg-2 col-sm-4 col-12 row-1">
          <div className={isMobile ? 'mobile-title-dropdown' : ''}>
            <h3>{intl.formatMessage({ id: 'header.explore' })}</h3>
            {isMobile && exploreDropdown && (
              <svg
                onClick={() => setExploreDropdown(false)}
                width="13"
                height="8"
                viewBox="0 0 13 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.335805 2.11453L5.63841 7.35533C5.75331 7.47118 5.89002 7.56314 6.04064 7.62589C6.19127 7.68864 6.35282 7.72095 6.51599 7.72095C6.67917 7.72095 6.84072 7.68864 6.99135 7.62589C7.14197 7.56314 7.27868 7.47118 7.39358 7.35533L12.6344 2.11453C12.7502 1.99962 12.8422 1.86292 12.9049 1.71229C12.9677 1.56167 13 1.40011 13 1.23694C13 1.07377 12.9677 0.912213 12.9049 0.76159C12.8422 0.610967 12.7502 0.47426 12.6344 0.359354C12.4028 0.129141 12.0895 -7.58171e-05 11.763 -7.58171e-05C11.4364 -7.58171e-05 11.1232 0.129141 10.8916 0.359354L6.51599 4.73493L2.14042 0.359354C1.91019 0.131004 1.59945 0.00226879 1.27519 0.000903606C1.11252 -3.67165e-05 0.951265 0.0311418 0.80067 0.0926528C0.650074 0.154164 0.513102 0.244797 0.397606 0.359354C0.277617 0.470126 0.180769 0.603576 0.112655 0.751994C0.0445404 0.900412 0.00651169 1.06086 0.000764847 1.22406C-0.00498199 1.38726 0.0216684 1.54998 0.079175 1.70282C0.136682 1.85566 0.223905 1.99559 0.335805 2.11453Z"
                  fill="white"
                />
              </svg>
            )}
            {isMobile && !exploreDropdown && (
              <svg
                onClick={() => setExploreDropdown(true)}
                width="13"
                height="8"
                viewBox="0 0 13 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.335805 5.60642L5.63841 0.365618C5.75331 0.249766 5.89002 0.157812 6.04064 0.0950602C6.19127 0.0323082 6.35282 0 6.51599 0C6.67917 0 6.84072 0.0323082 6.99135 0.0950602C7.14197 0.157812 7.27868 0.249766 7.39358 0.365618L12.6344 5.60642C12.7502 5.72132 12.8422 5.85803 12.9049 6.00865C12.9677 6.15928 13 6.32083 13 6.48401C13 6.64718 12.9677 6.80873 12.9049 6.95936C12.8422 7.10998 12.7502 7.24669 12.6344 7.36159C12.4028 7.59181 12.0895 7.72102 11.763 7.72102C11.4364 7.72102 11.1232 7.59181 10.8916 7.36159L6.51599 2.98602L2.14042 7.36159C1.91019 7.58994 1.59946 7.71868 1.27519 7.72004C1.11252 7.72098 0.951265 7.68981 0.80067 7.62829C0.650074 7.56678 0.513101 7.47615 0.397606 7.36159C0.277618 7.25082 0.180769 7.11737 0.112655 6.96895C0.0445406 6.82054 0.00651135 6.66009 0.000764847 6.49689C-0.00498165 6.33369 0.0216687 6.17097 0.079175 6.01813C0.136681 5.86529 0.223905 5.72535 0.335805 5.60642Z"
                  fill="white"
                />
              </svg>
            )}
          </div>
          <div className={exploreDropdown ? 'explore-div' : 'hidden-div'}>
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
        <div className="col-lg-4 col-sm-4 col-12 row-1">
          <div className={isMobile ? 'mobile-title-dropdown' : ''}>
            <h3>{intl.formatMessage({ id: 'header.contact' })}</h3>
            {isMobile && contactDropdown && (
              <svg
                onClick={() => setContactDropdown(false)}
                width="13"
                height="8"
                viewBox="0 0 13 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.335805 2.11453L5.63841 7.35533C5.75331 7.47118 5.89002 7.56314 6.04064 7.62589C6.19127 7.68864 6.35282 7.72095 6.51599 7.72095C6.67917 7.72095 6.84072 7.68864 6.99135 7.62589C7.14197 7.56314 7.27868 7.47118 7.39358 7.35533L12.6344 2.11453C12.7502 1.99962 12.8422 1.86292 12.9049 1.71229C12.9677 1.56167 13 1.40011 13 1.23694C13 1.07377 12.9677 0.912213 12.9049 0.76159C12.8422 0.610967 12.7502 0.47426 12.6344 0.359354C12.4028 0.129141 12.0895 -7.58171e-05 11.763 -7.58171e-05C11.4364 -7.58171e-05 11.1232 0.129141 10.8916 0.359354L6.51599 4.73493L2.14042 0.359354C1.91019 0.131004 1.59945 0.00226879 1.27519 0.000903606C1.11252 -3.67165e-05 0.951265 0.0311418 0.80067 0.0926528C0.650074 0.154164 0.513102 0.244797 0.397606 0.359354C0.277617 0.470126 0.180769 0.603576 0.112655 0.751994C0.0445404 0.900412 0.00651169 1.06086 0.000764847 1.22406C-0.00498199 1.38726 0.0216684 1.54998 0.079175 1.70282C0.136682 1.85566 0.223905 1.99559 0.335805 2.11453Z"
                  fill="white"
                />
              </svg>
            )}
            {isMobile && !contactDropdown && (
              <svg
                onClick={() => setContactDropdown(true)}
                width="13"
                height="8"
                viewBox="0 0 13 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.335805 5.60642L5.63841 0.365618C5.75331 0.249766 5.89002 0.157812 6.04064 0.0950602C6.19127 0.0323082 6.35282 0 6.51599 0C6.67917 0 6.84072 0.0323082 6.99135 0.0950602C7.14197 0.157812 7.27868 0.249766 7.39358 0.365618L12.6344 5.60642C12.7502 5.72132 12.8422 5.85803 12.9049 6.00865C12.9677 6.15928 13 6.32083 13 6.48401C13 6.64718 12.9677 6.80873 12.9049 6.95936C12.8422 7.10998 12.7502 7.24669 12.6344 7.36159C12.4028 7.59181 12.0895 7.72102 11.763 7.72102C11.4364 7.72102 11.1232 7.59181 10.8916 7.36159L6.51599 2.98602L2.14042 7.36159C1.91019 7.58994 1.59946 7.71868 1.27519 7.72004C1.11252 7.72098 0.951265 7.68981 0.80067 7.62829C0.650074 7.56678 0.513101 7.47615 0.397606 7.36159C0.277618 7.25082 0.180769 7.11737 0.112655 6.96895C0.0445406 6.82054 0.00651135 6.66009 0.000764847 6.49689C-0.00498165 6.33369 0.0216687 6.17097 0.079175 6.01813C0.136681 5.86529 0.223905 5.72535 0.335805 5.60642Z"
                  fill="white"
                />
              </svg>
            )}
          </div>
          <div className={contactDropdown ? 'contact-div' : 'hidden-div'}>
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
        </div>
        <div className="col-12 col-lg-2 col-sm-4 col-6 row-1">
          <div className={isMobile ? 'mobile-title-dropdown' : ''}>
            <h3>{intl.formatMessage({ id: 'header.join' })}</h3>
            {isMobile && joinDropdown && (
              <svg
                onClick={() => setJoinDropdownn(false)}
                width="13"
                height="8"
                viewBox="0 0 13 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.335805 2.11453L5.63841 7.35533C5.75331 7.47118 5.89002 7.56314 6.04064 7.62589C6.19127 7.68864 6.35282 7.72095 6.51599 7.72095C6.67917 7.72095 6.84072 7.68864 6.99135 7.62589C7.14197 7.56314 7.27868 7.47118 7.39358 7.35533L12.6344 2.11453C12.7502 1.99962 12.8422 1.86292 12.9049 1.71229C12.9677 1.56167 13 1.40011 13 1.23694C13 1.07377 12.9677 0.912213 12.9049 0.76159C12.8422 0.610967 12.7502 0.47426 12.6344 0.359354C12.4028 0.129141 12.0895 -7.58171e-05 11.763 -7.58171e-05C11.4364 -7.58171e-05 11.1232 0.129141 10.8916 0.359354L6.51599 4.73493L2.14042 0.359354C1.91019 0.131004 1.59945 0.00226879 1.27519 0.000903606C1.11252 -3.67165e-05 0.951265 0.0311418 0.80067 0.0926528C0.650074 0.154164 0.513102 0.244797 0.397606 0.359354C0.277617 0.470126 0.180769 0.603576 0.112655 0.751994C0.0445404 0.900412 0.00651169 1.06086 0.000764847 1.22406C-0.00498199 1.38726 0.0216684 1.54998 0.079175 1.70282C0.136682 1.85566 0.223905 1.99559 0.335805 2.11453Z"
                  fill="white"
                />
              </svg>
            )}
            {isMobile && !joinDropdown && (
              <svg
                onClick={() => setJoinDropdownn(true)}
                width="13"
                height="8"
                viewBox="0 0 13 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.335805 5.60642L5.63841 0.365618C5.75331 0.249766 5.89002 0.157812 6.04064 0.0950602C6.19127 0.0323082 6.35282 0 6.51599 0C6.67917 0 6.84072 0.0323082 6.99135 0.0950602C7.14197 0.157812 7.27868 0.249766 7.39358 0.365618L12.6344 5.60642C12.7502 5.72132 12.8422 5.85803 12.9049 6.00865C12.9677 6.15928 13 6.32083 13 6.48401C13 6.64718 12.9677 6.80873 12.9049 6.95936C12.8422 7.10998 12.7502 7.24669 12.6344 7.36159C12.4028 7.59181 12.0895 7.72102 11.763 7.72102C11.4364 7.72102 11.1232 7.59181 10.8916 7.36159L6.51599 2.98602L2.14042 7.36159C1.91019 7.58994 1.59946 7.71868 1.27519 7.72004C1.11252 7.72098 0.951265 7.68981 0.80067 7.62829C0.650074 7.56678 0.513101 7.47615 0.397606 7.36159C0.277618 7.25082 0.180769 7.11737 0.112655 6.96895C0.0445406 6.82054 0.00651135 6.66009 0.000764847 6.49689C-0.00498165 6.33369 0.0216687 6.17097 0.079175 6.01813C0.136681 5.86529 0.223905 5.72535 0.335805 5.60642Z"
                  fill="white"
                />
              </svg>
            )}
          </div>
          <div className={isMobile ? 'footer-items' : 'center-50'}>
            <div className={joinDropdown ? 'join-div' : 'hidden-div'}>
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
        </div>
        {isMobile && <br />}
        <div className="col-lg-2 col-sm-4 col-0 row-1" />
        <div
          className={
            isMobile
              ? 'col-12 col-sm-12 col-lg-6 last-row-mobile'
              : 'col-12 col-sm-12 col-lg-6 last-row'
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
