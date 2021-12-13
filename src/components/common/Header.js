import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSession } from 'hooks';
import { useIntl } from 'react-intl';
import cn from 'classnames';
import { useMediaQuery } from 'react-responsive';

import routePaths from 'constants/routesPaths';
import LogoWhite from 'assets/starfund-logo.png';
import LogoutButton from '../user/LogoutButton';
import ProfileUser from '../../assets/ProfileUser.svg';
import LanguageSelect from './LanguageSelect';
import Auth from './Auth';
import './index.css';

const Header = () => {
  const history = useHistory();
  const { authenticated } = useSession();
  const pathname = history.location?.pathname;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  const intl = useIntl();

  const goHome = () => {
    if (window.location.href.indexOf('starfund-stage') === -1) {
      history.push('/');
    }
  };

  return (
    <React.Fragment>
      <header className={isMobile ? 'custom-header-mobile' : 'custom-header'}>
        <nav className="navbar navbar-expand-lg navbar-dark">
          {!isMobile && (
            <div className="main-logo" onClick={() => goHome()}>
              <img src={LogoWhite} alt="logo" />
            </div>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            {isMobile && pathname != '/organization/Demo' && (
              <div className="nav-actions flex">
                {authenticated && <img src={ProfileUser} alt="profile" />}
                {authenticated && (
                  <div className="dropdown">
                    <span
                      className="dropdown-toggle"
                      type="button"
                      id="dropdownMenu2"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {intl.formatMessage({ id: 'header.actions' })}
                    </span>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                      {' '}
                      <Link to="/profile" className="dropdown-item" type="button">
                        {intl.formatMessage({ id: 'header.profile' })}
                      </Link>
                      <div className="dropdown-divider" />
                      <LogoutButton />
                    </div>
                  </div>
                )}
                {!authenticated && (
                  <React.Fragment>
                    <span className="navbar-text" onClick={() => setModalIsOpen(true)}>
                      {intl.formatMessage({ id: 'header.login' })}
                    </span>
                  </React.Fragment>
                )}
              </div>
            )}
            {pathname != '/organization/Demo' && (
              <ul className="navbar-nav mr-auto">
                <li
                  className={cn('nav-item text-right', {
                    active: pathname === routePaths.fighters || pathname === routePaths.athletes
                  })}
                >
                  <Link to="/fighters" className="nav-link">
                    {intl.formatMessage({ id: 'header.stars' })}{' '}
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li
                  className={cn('nav-item text-right', {
                    active: pathname === routePaths.businesses
                  })}
                >
                  <Link to={routePaths.businesses} className="nav-link">
                    {intl.formatMessage({ id: 'header.business' })}
                  </Link>
                </li>
              </ul>
            )}
            {pathname != '/organization/Demo' && (
              <div
                style={isMobile ? { display: 'flex', marginLeft: '30px', marginTop: '10px' } : {}}
              >
                <LanguageSelect />
              </div>
            )}
            {!isMobile && pathname != '/organization/Demo' && (
              <div className="nav-actions flex justify-content-end">
                <img src={ProfileUser} alt="profile" />
                {authenticated && (
                  <div className="dropdown">
                    <span
                      className="dropdown-toggle"
                      type="button"
                      id="dropdownMenu2"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {intl.formatMessage({ id: 'header.actions' })}
                    </span>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                      {' '}
                      <Link to="/profile" className="dropdown-item" type="button">
                        {intl.formatMessage({ id: 'header.profile' })}
                      </Link>
                      <div className="dropdown-divider" />
                      <LogoutButton />
                    </div>
                  </div>
                )}
                {!authenticated && (
                  <React.Fragment>
                    <span className="navbar-text" onClick={() => setModalIsOpen(true)}>
                      {intl.formatMessage({ id: 'header.login' })}
                    </span>
                  </React.Fragment>
                )}
              </div>
            )}
          </div>
          {isMobile && (
            <div className="main-logo" onClick={() => goHome()}>
              <img src={LogoWhite} alt="logo" />
            </div>
          )}
        </nav>
      </header>
      <Auth modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </React.Fragment>
  );
};

export default Header;
