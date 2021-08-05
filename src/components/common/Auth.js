import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { signUp, login, forgotPass } from 'state/actions/userActions';
import { SUCCESS, useStatus } from '@rootstrap/redux-tools';
import { useSession, useDispatch } from 'hooks';

import CommonModal from './CommonModal';
import LoginForm from '../user/LoginForm';
import ForgotPassForm from '../user/ForgotPassForm';
import SignUpForm from '../user/SignUpForm';

const Auth = ({ modalIsOpen, setModalIsOpen }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const loginRequest = useDispatch(login);
  const signUpRequest = useDispatch(signUp);
  const forgotPassRequest = useDispatch(forgotPass);

  const { authenticated } = useSession();
  const { status } = useStatus(login);
  const status2 = useStatus(signUp);
  const status3 = useStatus(forgotPass);
  const [signIn, setSignIn] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);

  useEffect(() => {
    if (status === SUCCESS) {
      setModalIsOpen(false);
    }
  }, [dispatch, setModalIsOpen, status]);
  useEffect(() => {
    if (status === SUCCESS) {
      setModalIsOpen(false);
    }
    if (status2.status === SUCCESS) {
      setModalIsOpen(false);
    }
    if (status3.status === SUCCESS) {
      setModalIsOpen(false);
    }
  }, [dispatch, setModalIsOpen, status, status2.status, status3.status]);

  const formatTitle = () => {
    if (signIn) {
      return intl.formatMessage({ id: forgotPassword ? 'login.forgot_password' : 'login.title' });
    }
    return intl.formatMessage({ id: 'login.signup' });
  };

  return (
    <React.Fragment>
      <CommonModal title={formatTitle()} isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        {!authenticated && (
          <div className="registration-container">
            {signIn ? (
              <React.Fragment>
                {!forgotPassword && <LoginForm onSubmit={loginRequest} />}
                {forgotPassword && <ForgotPassForm onSubmit={forgotPassRequest} />}
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
                    <u>{intl.formatMessage({ id: 'login.signup' })}</u>
                  </a>
                </p>
                {!forgotPassword && (
                  <Link onClick={() => setForgotPassword(true)}>
                    {intl.formatMessage({ id: 'login.forgot_password' })}
                  </Link>
                )}
                {forgotPassword && (
                  <Link onClick={() => setForgotPassword(false)}>
                    {intl.formatMessage({ id: 'signup.signin' })}
                  </Link>
                )}
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
                    <u>{intl.formatMessage({ id: 'signup.signin' })}</u>
                  </a>
                </p>
                <br />
                <p className="small-copy">
                  {intl.formatMessage({ id: 'legal.signup' })}
                  <a href="/privacy">{intl.formatMessage({ id: 'legal.privacy' })}</a> &
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

export default Auth;
