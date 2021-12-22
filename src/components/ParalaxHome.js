import React, { useState } from 'react';

import { useMediaQuery } from 'react-responsive';
import { useIntl } from 'react-intl';
import ReactPlayer from 'react-player';
import FlashMessage from 'react-flash-message';

import ConfirmationModal from './common/ConfirmationModal';
import BillingForm from './BillingForm';
import './index.css';
import Tick from '../assets/tick.png';

const ParalaxHome = () => {
  const intl = useIntl();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });
  const value = window.history.state?.new;

  return (
    <div className="container home-container">
      {value && (
        <div className="flash-message-container">
          <FlashMessage duration={5000} persistOnHover>
            <div style={{ marginTop: '-10vh' }} className="flash-message">
              <img style={{ width: '8vh' }} src={Tick} alt="" />
              <div className="flash-message-text">
                <h4>{intl.formatMessage({ id: 'password.reset.title' })}</h4>
                {intl.formatMessage({ id: 'password.reset.message' })}
              </div>
            </div>
          </FlashMessage>
        </div>
      )}
      <div className="row home-stars-container">
        <div className="col-md-4 home-text">
          <div className="home-stars-title">{intl.formatMessage({ id: 'home.paralax.title' })}</div>
          <br />
          {isMobile && (
            <div className="col-md-7 offset-md-1">
              <ReactPlayer
                title="preview"
                width="760"
                height="515"
                playing
                muted
                loop
                playsInline
                defaultMuted
                url={require('../assets/HomeVideoBig.mp4')}
              />
            </div>
          )}
          <div className="home-stars-description">
            {intl.formatMessage({ id: 'home.paralax.subTitle' })}
          </div>
          <button type="button">SUBSCRIBE TO STARS</button>
        </div>
        {!isMobile && (
          <div className="col-md-7 offset-md-1">
            <ReactPlayer
              title="preview"
              width="51.3vw"
              height="55vh"
              muted
              loop
              playing
              playsInline
              url={require('../assets/HomeVideoBig.mp4')}
            />
          </div>
        )}
        <div className="line" />
      </div>
      <ConfirmationModal
        title={intl.formatMessage({ id: 'billing.title' })}
        explain={intl.formatMessage({ id: 'modal.header.explain' })}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        isDelete={false}
      >
        <BillingForm />
      </ConfirmationModal>
    </div>
  );
};

export default ParalaxHome;
