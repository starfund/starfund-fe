import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useIntl } from 'react-intl';
import homeImg from '../assets/homeImg.png';
import Auth from './common/Auth';

const HomeView = () => {
  const intl = useIntl();
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  const isMobileBig = useMediaQuery({
    query: '(max-width: 1024px)'
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [signup, setSignup] = useState();

  return (
    <div className="home-view">
      <div className="home-info">
        <br />
        <br />
        {intl.formatMessage({ id: 'home.title' })}
        <br />
        <br />
        <div className="home-buttons">
          {!isMobile && (
            <button
              type="button"
              onClick={() => {
                setSignup(true);
                setModalIsOpen(true);
              }}
            >
              {intl.formatMessage({ id: 'login.signup' })}
            </button>
          )}
          {!isMobile && (
            <button
              type="button"
              className="login-button"
              onClick={() => {
                setSignup(false);
                setModalIsOpen(true);
              }}
            >
              {intl.formatMessage({ id: 'signup.signin' })}
            </button>
          )}
        </div>
      </div>
      <div>
        <img
          src={homeImg}
          alt=""
          className="home-image"
          onClick={() => {
            setSignup(false);
            setModalIsOpen(true);
          }}
        />
        {!isMobile && !isMobileBig && (
          <div className="home-welcome">{intl.formatMessage({ id: 'home.welcome.short' })}</div>
        )}
        <div className="home-info home-buttons">
          {isMobile && <br />}
          {isMobile && (
            <button
              type="button"
              onClick={() => {
                setSignup(false);
                setModalIsOpen(true);
              }}
            >
              {intl.formatMessage({ id: 'login.signup' })}
            </button>
          )}
          {isMobile && (
            <button
              type="button"
              className="login-button"
              onClick={() => {
                setSignup(false);
                setModalIsOpen(true);
              }}
            >
              {intl.formatMessage({ id: 'signup.signin' })}
            </button>
          )}
        </div>
      </div>
      {isMobile && <br />}
      {isMobile && <br />}
      {isMobile && <br />}
      <Auth modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} isSignUp={signup} />
    </div>
  );
};

export default HomeView;
