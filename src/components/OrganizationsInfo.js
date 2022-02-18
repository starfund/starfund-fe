import React from 'react';

import { useMediaQuery } from 'react-responsive';
import { useIntl } from 'react-intl';

import OrgImg from 'assets/organizations.png';

const OrganizationsInfo = () => {
  const intl = useIntl();

  const isMobile = useMediaQuery({
    query: '(max-width: 1024px)'
  });
  const getStarted = () => {
    window.scrollTo(0, 1800);
  };

  return (
    <div className="stars-container">
      <div className="organizations-info-container">
        <div className="image-background">
          <div className="image-overlay">
            <h1>{intl.formatMessage({ id: 'organizations.title' })}</h1>
            <div className="org-info-text">
              {intl.formatMessage({ id: 'organizations.subtitle' })}
            </div>
          </div>
          <br />
          <br />
          <br />
          <button
            type="button"
            onClick={() => {
              getStarted();
            }}
          >
            {intl.formatMessage({ id: 'organizations.getstart' })}
          </button>
        </div>
        <div className="organizations-info-more">
          <h2>{intl.formatMessage({ id: 'organizations.exclusive' })}</h2>
          <p className="org-info-text-2">{intl.formatMessage({ id: 'organizations.unlock' })}</p>
          <br />
          <br />
          <br />
          <br />
          <br />
          {isMobile && <br />}
          {isMobile && <br />}
          {isMobile && <br />}
          {isMobile && <br />}
          {isMobile && <br />}
          {!isMobile && <h3>{intl.formatMessage({ id: 'organizations.oneplatform' })}</h3>}
          {isMobile && <h2>{intl.formatMessage({ id: 'organizations.oneplatform' })}</h2>}
          <br />
          <br />
          <img src={OrgImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default OrganizationsInfo;
