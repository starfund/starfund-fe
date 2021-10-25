import React, { useState } from 'react';
import cn from 'classnames';

import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import background from '../assets/poster_ppv.png';
import OrganizationHome from './OrganizationHome';

const OrganizationView = () => {
  const intl = useIntl();
  const organization = { id: '1', name: 'CageZilla' };
  const [home, setHome] = useState(true);
  const [allevents, setAllEvents] = useState(false);
  const [ppv, setPPV] = useState(false);

  return (
    <div className="fighter-container">
      <div className="cover-container">
        {organization ? (
          <LazyLoadImage className="fighter-cover" src={background} alt="Cover" />
        ) : (
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height="90vh" />
          </SkeletonTheme>
        )}
        {organization && (
          <div className="centered">
            <br />
            <br />
            {organization && (
              <button type="button" className="btn btn-danger btn-lg">
                {intl.formatMessage({ id: 'organization.button.watch' })}
              </button>
            )}
          </div>
        )}
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-collapse" id="navbarText">
          <React.Fragment>
            <ul className="navbar-nav navbar-center mr-auto">
              {organization && (
                <li className={cn('nav-item', { active: home })}>
                  <Link
                    className="nav-link"
                    href=""
                    onClick={() => {
                      setHome(true);
                      setAllEvents(false);
                      setPPV(false);
                    }}
                  >
                    {intl.formatMessage({ id: 'header.home' })}{' '}
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
              )}
              <li className={cn('nav-item', { active: allevents })}>
                <Link
                  className="nav-link"
                  href=""
                  onClick={() => {
                    setHome(false);
                    setAllEvents(true);
                    setPPV(false);
                  }}
                >
                  {intl.formatMessage({ id: 'header.allevents' })}{' '}
                </Link>
              </li>
              <li className={cn('nav-item', { active: ppv })}>
                <Link
                  className="nav-link"
                  onClick={() => {
                    setHome(false);
                    setAllEvents(false);
                    setPPV(true);
                  }}
                >
                  {intl.formatMessage({ id: 'header.ppv' })}
                </Link>
              </li>
            </ul>
          </React.Fragment>
        </div>
      </nav>
      {home && <OrganizationHome organization={organization} />}
    </div>
  );
};

export default OrganizationView;
