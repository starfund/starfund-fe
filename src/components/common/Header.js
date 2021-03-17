import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
  const { status2 } = useStatus(signUp);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (status === SUCCESS) {
      setModalIsOpen(false);
    }
  }, [dispatch, status]);
  useEffect(() => {
    if (status2 === SUCCESS) {
      setModalIsOpen(false);
    }
  }, [dispatch, status2]);

  const signUpRequest = useDispatch(signUp);
  const loginRequest = useDispatch(login);
  const [signIn, setSignIn] = useState(true);

  return (
    <>
      <header className="custom-header">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div onClick={() => history.push('/')}>
            <img src={LogoWhite} alt="logo" />
          </div>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="" onClick={() => history.push('/fighters')}>
                  Stars <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="" onClick={() => history.push('/shop')}>
                  Shop
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="" onClick={() => history.push('/about-us')}>
                  Watch
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="" onClick={() => history.push('/about-us')}>
                  About us
                </a>
              </li>
            </ul>
            <img src={ProfileUser} alt="profile" />
            <span className="navbar-text" onClick={() => setModalIsOpen(true)}>
              {authenticated ? 'Logout' : 'Login'}
            </span>
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
              <>
                <LoginForm onSubmit={loginRequest} />
                <br />
                <br />
                <p>
                  Need an account? <a onClick={() => setSignIn(false)}> Sign up </a>
                </p>
                <br />
                <p className="small-copy">
                  By logging in, you agree to our <a href="/privacy">Privacy Policy</a> and
                  <a href="/terms">Terms of Service</a>.
                </p>
              </>
            ) : (
              <>
                <SignUpForm onSubmit={signUpRequest} />
                <p>
                  Already have an account? <a onClick={() => setSignIn(true)}> Sign in </a>
                </p>
                <br />
                <p className="small-copy">
                  By signing up, you agree to our <a href="/privacy">Privacy Policy</a> and{' '}
                  <a href="/terms">Terms of Service</a>.
                </p>
              </>
            )}
          </div>
        )}
      </CommonModal>
    </>
  );
};

export default Header;
