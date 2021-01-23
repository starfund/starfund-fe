import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { object } from 'prop-types';
import { CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import withStripe from 'components/hocs/withStripe';
import usePayments from 'hooks/usePayments';
import Field from 'components/common/StripeField';
import { getBilling, getDonations, donate } from 'state/actions/billingActions';

import Button from './common/Button';

const BillingForm = ({ stripe, elements }) => {
  const payments = useSelector(state => state.payments.payments);
  const creditCard = useSelector(state => state.payments.creditCard);
  const [cardState, setCardState] = useState({});
  const [expiryState, setExpiryState] = useState({});
  const [CVCState, setCVCState] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBilling());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDonations());
  }, [dispatch]);

  const { createCreditCard: onSubmit } = usePayments(stripe, elements);

  const makeDonation = amount => {
    dispatch(donate(amount));
  };

  return (
    <div className="row no-gutters">
      <div className="new-card-form offset-md-1 col-md-4">
        <div className="card">
          <h4 className="card-header">Billing</h4>
          <div className="card-body">
            <div className="half-row">
              <Field
                onChange={setCardState}
                label="Credit Card Info"
                StripeComponent={CardNumberElement}
                error={cardState.error}
              />
            </div>
            <div className="half-row">
              <Field
                onChange={setExpiryState}
                label="ExpiryDate"
                StripeComponent={CardExpiryElement}
                error={expiryState.error}
              />
              <Field
                onChange={setCVCState}
                label="CVC"
                StripeComponent={CardCVCElement}
                error={CVCState.error}
                width={13}
              />
            </div>
          </div>
          <Button
            onClick={() => onSubmit({})}
            labelId="createPaymentMethod"
            type="primary"
            size="small"
            className="btn btn-primary"
          />
        </div>
        <div className="card">
          <h4 className="card-header">Billing Info (coming soon)</h4>
        </div>
      </div>
      <div className="card offset-md-1 col-sm-4">
        <div className="card-header">Existing Card</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {' '}
            {creditCard && `${creditCard.brand} ending in ${creditCard.last4}`}{' '}
          </li>
          <li className="list-group-item"> Total payments: {payments.length} </li>
          <li className="list-group-item">
            Donate:
            <div className="row">
              <div className="offset-md-6">
                <Button
                  onClick={() => makeDonation(1)}
                  labelId="payment1"
                  type="primary"
                  size="small"
                  className="btn btn-info"
                />
              </div>
              <div className="offset-md-1">
                <Button
                  onClick={() => makeDonation(100)}
                  labelId="payment2"
                  type="primary"
                  size="small"
                  className="btn btn-success"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

BillingForm.propTypes = {
  stripe: object,
  elements: object
};

export default withStripe(BillingForm);
