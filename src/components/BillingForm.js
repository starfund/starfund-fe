import React from 'react';
// import { useDispatch } from 'react-redux';
import { object } from 'prop-types';
import { CardElement } from 'react-stripe-elements';
import withStripe from 'components/hocs/withStripe';
import usePayments from 'hooks/usePayments';
// import Field from 'components/common/StripeField';

import Button from './common/Button';

const BillingForm = ({ stripe, elements }) => {
  // const dispatch = useDispatch();
  const { createCreditCard: onSubmit } = usePayments(stripe, elements);

  return (
    <div className="row no-gutters checkout-container">
      <div className="new-card-form col-md-12">
        <div className="">
          <div className="">
            <div className="card-field">
              <span> Card info </span>
              <CardElement style={{ base: { fontSize: '18px', border: 'solid 1px black' } }} />
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
      </div>
      <p className="small-copy">
        By clicking "Place Secure Order", you agree to enroll in our monthly subscription plan and
        to our{' '}
        <a href="/terms" target="_blank">
          Offer Terms and Terms of Service
        </a>
        . Your payment method will be charged the price above the first month and monthly thereafter
        at the then-current rate. Prices are non-tax inclusive. Cancel any time in Settings. No
        refunds for partial unused periods, or after gift is redeemed.
      </p>
    </div>
  );
};

BillingForm.propTypes = {
  stripe: object,
  elements: object
};

export default withStripe(BillingForm);
