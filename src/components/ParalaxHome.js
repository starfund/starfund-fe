import React, { useState } from 'react';

import Input from './common/Input';
import ConfirmationModal from './common/ConfirmationModal';
import BillingForm from './BillingForm';
import './index.css';

const ParalaxHome = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="container home-container">
      <div className="row">
        <div className="col-md-4 home-text">
          <h1> Change the way to connect with your STAR </h1>
          <br />
          <p>
            {' '}
            Be an exclusive fan, enjoy videos, behind the scenes and products. Connect directly with
            your athlete.
          </p>
          <br />
          <Input name="email" type="email" />
          <br />
          <button type="button" className="btn btn-danger" onClick={() => setModalIsOpen(true)}>
            SUBSCRIBE
          </button>
          <br />
          <p className="small">
            {' '}
            By sharing your email, you agree to our Terms of Service and Privacy Policy.{' '}
          </p>
        </div>
        <div className="col-md-7 offset-md-1">
          <iframe
            title="preview"
            width="760"
            height="515"
            src={`${require('../assets/HomeVid.mp4')}?controls=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
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

export default ParalaxHome;
