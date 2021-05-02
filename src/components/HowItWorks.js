import React, { useState, useEffect } from 'react';
import { useDispatch, useSession } from 'hooks';
import { SUCCESS, useStatus } from '@rootstrap/redux-tools';

import { useIntl } from 'react-intl';

import { signUp } from 'state/actions/userActions';
import CommonModal from './common/CommonModal';
import SignUpForm from './user/SignUpForm';

import Award from '../assets/Award.svg';
import Browser from '../assets/Browser.svg';
import Clicking from '../assets/Clicking.svg';
import Account from '../assets/Account.svg';

const HowItWorks = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { authenticated } = useSession();
  const status = useStatus(signUp);
  const signUpRequest = useDispatch(signUp);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (status === SUCCESS) {
      setModalIsOpen(false);
    }
  }, [dispatch, status]);
  return (
    <div className="foot-banner">
      <div className="col-12">
        <h2 className="bold">{intl.formatMessage({ id: 'fighter.start.title' })}</h2>
        <br />
        <div className="text row">
          <div className="col-5 col-md-3">
            <img src={Clicking} alt="cwm" />
            <p>{intl.formatMessage({ id: 'fighter.start.item1' })}</p>
          </div>
          <div className="col-5 col-md-2" onClick={() => !authenticated && setModalIsOpen(true)}>
            <img src={Account} alt="cwm" />
            <p>{intl.formatMessage({ id: 'fighter.start.item2' })}</p>
          </div>
          <div className="col-5 col-md-2">
            <img src={Browser} alt="cwm" />
            <p>{intl.formatMessage({ id: 'fighter.start.item3' })}</p>
          </div>
          <div className="col-5 col-md-2">
            <img src={Award} alt="cwm" />
            <p>{intl.formatMessage({ id: 'fighter.start.item4' })}</p>
          </div>
        </div>
      </div>
      <CommonModal
        title={intl.formatMessage({ id: 'login.title' })}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
      >
        <div className="registration-container">
          <SignUpForm onSubmit={signUpRequest} />
          <br />
          <p className="small-copy">
            {intl.formatMessage({ id: 'legal.signup' })}
            <a href="/privacy">{intl.formatMessage({ id: 'legal.privacy' })}</a> &
            <a href="/terms">{intl.formatMessage({ id: 'legal.terms' })}</a>.
          </p>
        </div>
      </CommonModal>
    </div>
  );
};

export default HowItWorks;
