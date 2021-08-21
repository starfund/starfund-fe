import React from 'react';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import CardDisplay from 'react-credit-card-display';
import { useMediaQuery } from 'react-responsive';
import { cardBrand } from 'utils/paymentHelper';

import { deleteCard, updateCard } from '../../state/actions/billingActions';

const BillingInfo = ({ currentUser }) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  return (
    <div className="billing-info">
      <h3>
        <center> BILLING INFO </center>
      </h3>
      <br />
      <div className="card-info flex center-50">
        <CardDisplay expand square={false} active={cardBrand(currentUser.brand)} />
        <p> xxxx xxxx xxxx {currentUser.last4 || '----'} </p>
      </div>
      <br />
      {currentUser.cardId && (
        <React.Fragment>
          <div className="card-update flex center-50">
            <button
              type="button"
              className={`btn btn-warning ${isMobile && 'btn-sm'}`}
              onClick={() => dispatch(updateCard(currentUser))}
            >
              UPDATE
            </button>
            <button
              type="button"
              className={`btn btn-danger ${isMobile && 'btn-sm'}`}
              onClick={() => dispatch(deleteCard())}
            >
              REMOVE
            </button>
          </div>
        </React.Fragment>
      )}
      {!currentUser.cardId && (
        <button type="button" className="btn btn-warning">
          Add Payment method
        </button>
      )}
      <div className="blank-line" />
    </div>
  );
};

export default BillingInfo;
