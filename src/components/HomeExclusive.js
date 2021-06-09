import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

import ExclusiveImage from '../assets/ExclusiveImage.png';
import ExclusiveImageMobile from '../assets/ExclusiveImageMobile.png';
import ConfirmationModal from './common/ConfirmationModal';
import BillingForm from './BillingForm';
import './index.css';

const HomeExclusive = ({ fighter }) => {
  const intl = useIntl();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isFighter = window.location.href.indexOf('fighter') > -1;
  const currentUser = useSelector(state => state.session.user);
  const isMobile = useMediaQuery({
    query: '(max-width: 512px)'
  });
  const fighterId =
    isFighter && window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

  return (
    <div className="exclusive-container">
      <div className="container">
        <div className="row">
          <div className="col-md-4 home-text">
            <h1>{intl.formatMessage({ id: 'home.exclusive.title' })}</h1>
            <br />
            <p>{intl.formatMessage({ id: 'home.exclusive.subTitle' })}</p>
            <br />
            {isFighter ? (
              <React.Fragment>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setModalIsOpen(true)}
                >
                  {intl.formatMessage({
                    id: fighter?.support ? 'button.supportNow' : 'button.subscribeNow'
                  })}
                </button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link type="button" className="btn btn-danger" to="/fighters">
                  {intl.formatMessage({ id: 'button.findAthlete' })}
                </Link>
              </React.Fragment>
            )}
          </div>
          <div className="col-md-8 d-flex justify-content-center">
            <img
              className="home-exclusive-image"
              src={isMobile ? ExclusiveImageMobile : ExclusiveImage}
              alt="Exlusive Fighters"
            />
          </div>
        </div>
      </div>
      <ConfirmationModal
        title={intl.formatMessage({ id: 'billing.title' })}
        explain={intl.formatMessage({ id: 'modal.header.explain' })}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        isDelete={false}
        price={fighter?.subPrice}
        fighter={fighterId}
        email={currentUser?.email}
      >
        <BillingForm email={currentUser?.email} fighter={fighterId} />
      </ConfirmationModal>
    </div>
  );
};

export default HomeExclusive;
