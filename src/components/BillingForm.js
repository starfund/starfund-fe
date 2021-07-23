import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cards from 'react-credit-cards';
import { object, string } from 'prop-types';
import { CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import { useIntl } from 'react-intl';
import ReactGA from 'react-ga';

import Loading from 'components/common/Loading';
import withStripe from 'components/hocs/withStripe';
import usePayments from 'hooks/usePayments';
import Field from 'components/common/StripeField';
import { useStatus, LOADING, ERROR } from '@rootstrap/redux-tools';

import Button from './common/Button';
import Input from './common/Input';

import {
  subscribe,
  updatePassword,
  requestDream,
  charge
} from '../state/actions/subscriptionActions';

import 'react-credit-cards/lib/styles.scss';

const BillingForm = ({ stripe, elements, email, fighter, team, business, type }) => {
  ReactGA.modalview(`/${type}`);
  const { status: subStatus, error } = useStatus(subscribe);
  const { status: chargeStatus, error: chargeError } = useStatus(charge);
  const { status: updateStatus } = useStatus(updatePassword);
  const dispatch = useDispatch();
  const intl = useIntl();
  const [cvc] = useState('XXX');
  const [expiry] = useState('');
  const [focus, setFocus] = useState('');
  const [emailField, setEmailField] = useState(email);
  const [name, setName] = useState('');
  const [number] = useState('4242');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState(''); // eslint-disable-line no-unused-vars
  const [numberStripe, setNumberStripe] = useState({});
  const [cvcStripe, setCvcStripe] = useState({});
  const [expiryStripe, setExpiryStripe] = useState({});
  const { createCreditCard: onSubmit } = usePayments(stripe, elements);

  const newUser = useSelector(state => state.subscriptions.newUser);
  const dream = useSelector(state => state.subscriptions.ppvRequest);
  const shouldUpdatePassword = useSelector(state => state.subscriptions.shouldUpdatePassword);

  const pay = () => {
    if (type === 'ppv') {
      dispatch(requestDream(dream));
    }
    onSubmit({ name, email: emailField, fighter, team, business, type });
  };

  return (
    <div className="row no-gutters checkout-container">
      {subStatus === ERROR && <strong>{error}</strong>}
      {chargeStatus === ERROR && <strong>{chargeError}</strong>}
      {(subStatus === LOADING || updateStatus === LOADING) && (
        <Loading className="align-self-center justify-content-center" />
      )}
      {chargeStatus === LOADING && <Loading className="align-self-center justify-content-center" />}
      {newUser && shouldUpdatePassword && updateStatus !== LOADING && (
        <div className="col-12">
          <form className="newbie-form">
            <div className="missing-email">
              <Input
                name="password"
                type="password"
                placeholder={intl.formatMessage({ id: 'billing.password' })}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="missing-email">
              <Input
                name="confirmPassword"
                type="password"
                placeholder={intl.formatMessage({ id: 'billing.confirmPassword' })}
                onChange={e => setPasswordConfirmation(e.target.value)}
              />
            </div>
            <br />
            <br />
            <Button
              onClick={() => dispatch(updatePassword(password))}
              labelId="billing.confirmAccountPassword"
              type="submit"
              className="btn btn-primary pay-button"
            />
          </form>
        </div>
      )}
      {!newUser && (
        <React.Fragment>
          <form className="col-12 card-form">
            <div className="new-card-form col-12">
              <div className="">
                <div className="">
                  <div className="card-field row" id="PaymentForm">
                    <div className="col-12 col-md-5">
                      <Cards cvc={cvc} expiry={expiry} focused={focus} number={number} />
                    </div>
                    <div className="col-12 col-md-6 offset-md-1">
                      <div className="offset-1 offset-sm-2 offset-md-0 col-12">
                        <Field
                          onChange={setNumberStripe}
                          StripeComponent={CardNumberElement}
                          error={numberStripe.error}
                          onFocus={() => setFocus('number')}
                          placeholder={intl.formatMessage({ id: 'billing.number' })}
                          width={16}
                        />
                        <Input
                          name="name"
                          placeholder={intl.formatMessage({ id: 'billing.name' })}
                          onFocus={e => setFocus(e.target.name)}
                          onChange={e => setName(e.target.value)}
                          className="stripe-name"
                        />
                        <div className="flex">
                          <Field
                            onChange={setExpiryStripe}
                            StripeComponent={CardExpiryElement}
                            error={expiryStripe.error}
                            width={10}
                            placeholder={intl.formatMessage({ id: 'billing.expiry' })}
                            onFocus={() => setFocus('expiry')}
                            className="expiry"
                          />
                          <Field
                            onChange={setCvcStripe}
                            StripeComponent={CardCVCElement}
                            error={cvcStripe.error}
                            placeholder={intl.formatMessage({ id: 'billing.cvc' })}
                            width={6}
                            onFocus={() => setFocus('cvc')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {!email && (
                    <div className="missing-email">
                      <Input
                        name="email"
                        type="email"
                        placeholder={intl.formatMessage({ id: 'billing.email' })}
                        onChange={e => setEmailField(e.target.value)}
                      />
                    </div>
                  )}
                  <Button
                    onClick={() => pay()}
                    labelId="billing.createPaymentMethod"
                    type="submit"
                    className="btn btn-primary pay-button"
                  />
                </div>
              </div>
            </div>
          </form>
          <p className="small-copy">
            {intl.formatMessage({ id: 'billing.copy' })}
            <a href="/terms" target="_blank">
              {intl.formatMessage({ id: 'billing.legal' })}
            </a>
            {intl.formatMessage({ id: 'billing.copy2' })}
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
