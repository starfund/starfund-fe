import React, { useState } from 'react';

import ExclusiveImage from '../assets/ExclusiveImage.png';
import ConfirmationModal from './common/ConfirmationModal';
import BillingForm from './BillingForm';
import './index.css';

const HomeExclusive = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
            <button type="button" className="btn btn-danger" onClick={() => setModalIsOpen(true)}>
              GET STARTED
            </button>
          </div>
          <div className="col-md-4 offset-md-1">
            <img src={ExclusiveImage} alt="Exlusive Fighters" />
          </div>
        </div>
      </div>
      <ConfirmationModal
        title="MONTHLY MEMBERSHIP"
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        isDelete={false}
        confirmationAction={() => console.log}
      >
        <BillingForm />
      </ConfirmationModal>
    </div>
  );
};

export default HomeExclusive;
