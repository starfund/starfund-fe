import React, { useState } from 'react';

import { useMediaQuery } from 'react-responsive';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';

import ConfirmationModal from './common/ConfirmationModal';
import BillingForm from './BillingForm';
import './index.css';

const ParalaxHome = () => {
  const intl = useIntl();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  return (
    <div className="container home-container">
      <div className="row">
        <div className="col-md-4 home-text">
          <h1>{intl.formatMessage({ id: 'home.paralax.title' })}</h1>
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
                url={require('../assets/HomeVideoBig.mp4')}
              />
            </div>
          )}
          <p>{intl.formatMessage({ id: 'home.paralax.subTitle' })}</p>
          <br />
          <Link to="/fighters" type="button" className="btn btn-danger">
            {intl.formatMessage({ id: 'home.paralax.subscribe' })}
          </Link>
          <br />
          <br />
          <p className="small mb-4 mt-2">
            {intl.formatMessage({ id: 'legal.share' })}
            <a href="/terms" target="_blank">
              {intl.formatMessage({ id: 'legal.terms' })}
            </a>
            &
            <a href="/privacy" target="_blank">
              {intl.formatMessage({ id: 'legal.privacy' })}
            </a>
          </p>
        </div>
        {!isMobile && (
          <div className="col-md-7 offset-md-1">
            <ReactPlayer
              title="preview"
              width="760"
              height="515"
              playing
              muted
              loop
              playsInline
              url={require('../assets/HomeVideoBig.mp4')}
            />
          </div>
        )}
      </div>
      <ConfirmationModal
        title={intl.formatMessage({ id: 'billing.title' })}
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
