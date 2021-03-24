import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cards from 'react-credit-cards';
import { object, string } from 'prop-types';
// import { CardElement } from 'react-stripe-elements';
import { CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import withStripe from 'components/hocs/withStripe';
import usePayments from 'hooks/usePayments';
import Field from 'components/common/StripeField';

import Button from './common/Button';
import Input from './common/Input';

import { updatePassword } from '../state/actions/subscriptionActions';

import 'react-credit-cards/lib/styles.scss';

const BillingForm = ({ stripe, elements, email, fighter }) => {
  const dispatch = useDispatch();
  const [cvc] = useState('XXX');
  const [expiry] = useState('');
  const [focus, setFocus] = useState('');
  const [emailField, setEmailField] = useState(email);
  const [name, setName] = useState('');
  const [number] = useState('5252');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState(''); // eslint-disable-line no-unused-vars
  const [numberStripe, setNumberStripe] = useState({});
  const [cvcStripe, setCvcStripe] = useState({});
  const [expiryStripe, setExpiryStripe] = useState({});
  const { createCreditCard: onSubmit } = usePayments(stripe, elements);

  const newUser = useSelector(state => state.subscriptions.newUser);
  const shouldUpdatePassword = useSelector(state => state.subscriptions.shouldUpdatePassword);

  return (
    <div className="row no-gutters checkout-container">
      {newUser && shouldUpdatePassword && (
        <React.Fragment>
          <form className="newbie-form">
            <div className="missing-email">
              <Input
                name="password"
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="missing-email">
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={e => setPasswordConfirmation(e.target.value)}
              />
            </div>
            <br />
            <br />
            <Button
              onClick={() => dispatch(updatePassword(password))}
              labelId="confirmAccountPassword"
              type="submit"
              className="btn btn-primary pay-button"
            />
          </form>
        </React.Fragment>
      )}
      {!newUser && (
        <React.Fragment>
          <form className="card-form">
            {!email && (
              <div className="missing-email">
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={e => setEmailField(e.target.value)}
                />
              </div>
            )}
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
                        onChange={e => setName(e.target.value)}
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
                    onClick={() => onSubmit({ name, email: emailField, fighter: fighter })}
                    labelId="createPaymentMethod"
                    type="submit"
                    className="btn btn-primary pay-button"
                  />
                </div>
              </div>
            </div>
          </form>
          <p className="small-copy">
            By clicking "Place Secure Order", you agree to enroll in our monthly subscription plan
            and to our{' '}
            <a href="/terms" target="_blank">
              Offer Terms and Terms of Service
            </a>
            . Your payment method will be charged the price above the first month and monthly
            thereafter at the then-current rate. Prices are non-tax inclusive. Cancel any time in
            Settings. No refunds for partial unused periods, or after gift is redeemed.
          </p>
        </React.Fragment>
      )}
    </div>
  );
};

BillingForm.propTypes = {
  stripe: object,
  elements: object,
  email: string
};

export default withStripe(BillingForm);
