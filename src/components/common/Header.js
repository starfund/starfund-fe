import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSession, useDispatch } from 'hooks';

import { signUp, login } from 'state/actions/userActions';

import LogoWhite from 'assets/LogoWhite.svg';
import CommonModal from './CommonModal';
import LoginForm from '../user/LoginForm';
import SignUpForm from '../user/SignUpForm';
import LogoutButton from '../user/LogoutButton';
import './index.css';

const Header = () => {
  const history = useHistory();
  const { authenticated } = useSession();
  const signUpRequest = useDispatch(signUp);
  const loginRequest = useDispatch(login);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
            <span className="navbar-text" onClick={() => setModalIsOpen(true)}>
              {authenticated ? 'LOG OUT' : 'LOG IN'}
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
          <>
            {signIn ? (
              <>
                <LoginForm onSubmit={loginRequest} />
                <p>
                  {' '}
                  Need an account? <a onClick={() => setSignIn(false)}> Sign up </a>
                </p>
              </>
            ) : (
              <>
                <SignUpForm onSubmit={signUpRequest} />
                <p>
                  {' '}
                  Already have an account? <a onClick={() => setSignIn(true)}> Sign in </a>
                </p>
              </>
            )}
          </>
        )}
      </CommonModal>
    </>
  );
};

export default Header;
