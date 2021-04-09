import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSession, useDispatch } from 'hooks';
import { useIntl } from 'react-intl';

import { signUp, login } from 'state/actions/userActions';
import { SUCCESS, useStatus } from '@rootstrap/redux-tools';

import LogoWhite from 'assets/LogoWhite.svg';
import CommonModal from './CommonModal';
import LoginForm from '../user/LoginForm';
import SignUpForm from '../user/SignUpForm';
import LogoutButton from '../user/LogoutButton';
import ProfileUser from '../../assets/ProfileUser.svg';
import './index.css';

const Header = () => {
  const history = useHistory();
  const { authenticated } = useSession();
  const dispatch = useDispatch();

  const { status } = useStatus(login);
  const status2 = useStatus(signUp);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (status === SUCCESS) {
      setModalIsOpen(false);
    }
  }, [dispatch, status]);
  useEffect(() => {
    if (status === SUCCESS) {
      setModalIsOpen(false);
    }
    if (status2.status === SUCCESS) {
      setModalIsOpen(false);
    }
  }, [dispatch, status, status2.status]);

  const intl = useIntl();
  const signUpRequest = useDispatch(signUp);
  const loginRequest = useDispatch(login);
  const [signIn, setSignIn] = useState(true);

  return (
    <React.Fragment>
      <header className="custom-header">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="main-logo" onClick={() => history.push('/')}>
            <img src={LogoWhite} alt="logo" />
          </div>
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
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active text-right">
                <Link to="/fighters" className="nav-link">
                  {intl.formatMessage({ id: 'header.stars' })}{' '}
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item text-right">
                <Link to="/watch" className="nav-link">
                  {intl.formatMessage({ id: 'header.watch' })}
                </Link>
              </li>
            </ul>
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
          </div>
        </nav>
      </header>
      <CommonModal
        title={intl.formatMessage({ id: 'signup.title' })}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
      >
        {!authenticated && (
          <div className="registration-container">
            {signIn ? (
              <React.Fragment>
                <LoginForm onSubmit={loginRequest} />
                <br />
                <br />
                <p>
                  {intl.formatMessage({ id: 'registration.needAccount' })}
                  <a
                    role="button"
                    tabIndex="0"
                    onClick={e => {
                      setSignIn(false);
                      e.preventDefault();
                    }}
                  >
                    {intl.formatMessage({ id: 'login.signup' })}
                  </a>
                </p>
                <br />
                <p className="small-copy">
                  {intl.formatMessage({ id: 'legal.login' })}
                  <a href="/privacy">{intl.formatMessage({ id: 'legal.privacy' })}</a> &
                  <a href="/terms">{intl.formatMessage({ id: 'legal.terms' })}</a>.
                </p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <SignUpForm onSubmit={signUpRequest} />
                <p>
                  {intl.formatMessage({ id: 'registration.haveAccount' })}
                  <a onClick={() => setSignIn(true)}>
                    {intl.formatMessage({ id: 'signup.signin' })}
                  </a>
                </p>
                <br />
                <p className="small-copy">
                  {intl.formatMessage({ id: 'legal.signup' })}
                  <a href="/privacy">{intl.formatMessage({ id: 'legal.policy' })}</a> &
                  <a href="/terms">{intl.formatMessage({ id: 'legal.terms' })}</a>.
                </p>
              </React.Fragment>
            )}
          </div>
        )}
      </CommonModal>
    </React.Fragment>
  );
};

export default Header;
