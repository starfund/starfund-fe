import React, { useState } from 'react';
import Cards from 'react-credit-cards';
// import { useDispatch } from 'react-redux';
import { object } from 'prop-types';
// import { CardElement } from 'react-stripe-elements';
import { CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import withStripe from 'components/hocs/withStripe';
import usePayments from 'hooks/usePayments';
import Field from 'components/common/StripeField';

import Button from './common/Button';
import Input from './common/Input';

import 'react-credit-cards/lib/styles.scss';

const BillingForm = ({ stripe, elements }) => {
  // const dispatch = useDispatch();
  const [cvc] = useState('XXX');
  const [expiry] = useState('');
  const [focus, setFocus] = useState('');
  const [number] = useState('5252');
  const [numberStripe, setNumberStripe] = useState({});
  const [cvcStripe, setCvcStripe] = useState({});
  const [expiryStripe, setExpiryStripe] = useState({});
  const { createCreditCard: onSubmit } = usePayments(stripe, elements);

  return (
    <div className="row no-gutters checkout-container">
      <div className="new-card-form col-md-12">
        <div className="">
          <div className="">
            <div className="card-field flex" id="PaymentForm">
              <Cards cvc={cvc} expiry={expiry} focused={focus} number={number} />
              <div className="stripe-container">
                <Field
                  onChange={setNumberStripe}
                  StripeComponent={CardNumberElement}
                  error={numberStripe.error}
                  onFocus={() => setFocus('number')}
                  width={15}
                />
                <Input
                  name="name"
                  placeholder="Holder Name"
                  onFocus={e => setFocus(e.target.name)}
                  className="stripe-name"
                />
                <div className="flex">
                  <Field
                    onChange={setExpiryStripe}
                    StripeComponent={CardExpiryElement}
                    error={expiryStripe.error}
                    width={9}
                    onFocus={() => setFocus('expiry')}
                    className="expiry"
                  />
                  <Field
                    onChange={setCvcStripe}
                    StripeComponent={CardCVCElement}
                    error={cvcStripe.error}
                    width={6}
                    onFocus={() => setFocus('cvc')}
                  />
                </div>
              </div>
            </div>
            <Button
              onClick={() => onSubmit({})}
              labelId="createPaymentMethod"
              type="primary"
              className="btn btn-primary pay-button"
            />
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
