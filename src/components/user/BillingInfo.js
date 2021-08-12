import React from 'react';
// eslint-disable-next-line import/no-unresolved
import CardDisplay from 'react-credit-card-display';
import { cardBrand } from 'utils/paymentHelper';

const BillingInfo = ({ currentUser }) => {
  return (
    <div className="billing-info">
      <h3>
        <center> BILLING INFO </center>
      </h3>
      <br />
      <div className="card-info flex">
        <CardDisplay expand square={false} active={cardBrand(currentUser.brand)} />
        <p> xxxx xxxx xxxx {currentUser.last4 || '----'} </p>
      </div>
      <div className="blank-line" />
    </div>
  );
};

export default BillingInfo;
