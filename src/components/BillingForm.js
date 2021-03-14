import React, { useState } from 'react';
import Cards from 'react-credit-cards';
// import { useDispatch } from 'react-redux';
import { object } from 'prop-types';
//import { CardElement } from 'react-stripe-elements';
import { CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import withStripe from 'components/hocs/withStripe';
import usePayments from 'hooks/usePayments';
import Field from 'components/common/StripeField';

import Button from './common/Button';
import Input from './common/Input';

import 'react-credit-cards/lib/styles.scss';

const BillingForm = ({ stripe, elements }) => {
  // const dispatch = useDispatch();
  const [cvc, setCvc] = useState({});
  const [cvcLabel, setCvcLabel] = useState('');
  const [expiry, setExpiry] = useState({});
  const [expiryLabel, setExpiryLabel] = useState('');
  const [focus, setFocus] = useState('');
  const [number, setNumber] = useState({});
  const [numberLabel, setNumberLabel] = useState('');
  const [name, setName] = useState({});
  const [nameLabel, setNameLabel] = useState('');
  const { createCreditCard: onSubmit } = usePayments(stripe, elements);

  return (
    <div className="row no-gutters checkout-container">
      <div className="new-card-form col-md-12">
        <div className="">
          <div className="">
            <div className="card-field flex" id="PaymentForm">
              <Cards
                cvc={cvcLabel}
                expiry={expiryLabel}
                focused={focus}
                name={nameLabel}
                number={numberLabel}
              />
              <Field
                onChange={setNumber}
                label="Credit Card Info"
                StripeComponent={CardNumberElement}
                error={number.error}
              />
              <Field
                onChange={setExpiry}
                label="Credit Card Info"
                StripeComponent={CardExpiryElement}
                error={expiry.error}
              />
              <Field
                onChange={setCvc}
                label="Credit Card Info"
                StripeComponent={CardCVCElement}
                error={cvc.error}
              />
            </div>
          </div>
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
