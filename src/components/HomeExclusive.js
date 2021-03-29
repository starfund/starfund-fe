import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import ExclusiveImage from '../assets/ExclusiveImage.png';
import ConfirmationModal from './common/ConfirmationModal';
import BillingForm from './BillingForm';
import './index.css';

const HomeExclusive = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isFighter = window.location.href.indexOf('fighter') > -1;
  const currentUser = useSelector(state => state.session.user);
  const fighter =
    isFighter && window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

  return (
    <div className="exclusive-container">
      <div className="container">
        <div className="row">
          <div className="col-md-4 home-text">
            <h1> Be an Exclusive Fan </h1>
            <br />
            <p>
              {' '}
              Connect directly with your athlete. Enjoy videos, behind the scenes and products.{' '}
            </p>
            <br />
            {isFighter ? (
              <React.Fragment>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setModalIsOpen(true)}
                >
                  SUBSCRIBE NOW
                </button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link type="button" className="btn btn-danger" to="/fighters">
                  FIND YOUR STAR ATHLETE
                </Link>
              </React.Fragment>
            )}
          </div>
          <div className="col-md-8 d-flex justify-content-center">
            <img className="home-exclusive-image" src={ExclusiveImage} alt="Exlusive Fighters" />
          </div>
        </div>
      </div>
      <ConfirmationModal
        title="MONTHLY MEMBERSHIP"
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        isDelete={false}
        fighter={fighter}
        email={currentUser?.email}
      >
        <BillingForm email={currentUser?.email} fighter={fighter} />
      </ConfirmationModal>
    </div>
  );
};

export default HomeExclusive;
