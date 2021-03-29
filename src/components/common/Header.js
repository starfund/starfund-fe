import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSession, useDispatch } from 'hooks';

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
  }, [dispatch, status, status2.status]);

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
                <a className="nav-link" href="" onClick={() => history.push('/fighters')}>
                  Stars <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item text-right">
                <a className="nav-link" href="" onClick={() => history.push('/watch')}>
                  Watch
                </a>
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
                    ACTIONS
                  </span>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <Link to="/profile" className="dropdown-item" type="button">
                      PROFILE
                    </Link>
                    <div className="dropdown-divider" />
                    <LogoutButton />
                  </div>
                </div>
              )}
              {!authenticated && (
                <React.Fragment>
                  <span className="navbar-text" onClick={() => setModalIsOpen(true)}>
                    Login
                  </span>
                </React.Fragment>
              )}
            </div>
          </div>
        </nav>
      </header>
      <CommonModal
        title={authenticated ? 'Are you sure to logout?' : 'Log In'}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
      >
        {authenticated ? (
          <LogoutButton />
        ) : (
          <div className="registration-container">
            {signIn ? (
              <React.Fragment>
                <LoginForm onSubmit={loginRequest} />
                <br />
                <br />
                <p>
                  Need an account?
                  <a
                    role="button"
                    tabIndex="0"
                    onClick={e => {
                      setSignIn(false);
                      e.preventDefault();
                    }}
                  >
                    {' '}
                    Sign up{' '}
                  </a>
                </p>
                <br />
                <p className="small-copy">
                  By logging in, you agree to our <a href="/privacy">Privacy Policy</a> and
                  <a href="/terms">Terms of Service</a>.
                </p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <SignUpForm onSubmit={signUpRequest} />
                <p>
                  Already have an account? <a onClick={() => setSignIn(true)}> Sign in </a>
                </p>
                <br />
                <p className="small-copy">
                  By signing up, you agree to our <a href="/privacy">Privacy Policy</a> and{' '}
                  <a href="/terms">Terms of Service</a>.
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
