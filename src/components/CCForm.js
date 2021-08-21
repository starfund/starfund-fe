import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import { object } from 'prop-types';
import { CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import { useIntl } from 'react-intl';
import ReactGA from 'react-ga';

import Loading from 'components/common/Loading';
import withStripe from 'components/hocs/withStripe';
import usePayments from 'hooks/usePayments';
import Field from 'components/common/StripeField';
import { useStatus, LOADING, ERROR } from '@rootstrap/redux-tools';

import Button from './common/Button';

import { subscribe } from '../state/actions/subscriptionActions';

import 'react-credit-cards/lib/styles.scss';

const CCForm = ({ stripe, elements }) => {
  ReactGA.modalview('/addCC');
  const { status: subStatus, error } = useStatus(subscribe);
  const intl = useIntl();
  const [cvc] = useState('XXX');
  const [expiry] = useState('');
  const [focus, setFocus] = useState('');
  const [number] = useState('4242');
  const [numberStripe, setNumberStripe] = useState({});
  const [cvcStripe, setCvcStripe] = useState({});
  const [expiryStripe, setExpiryStripe] = useState({});
  const { createCreditCard: onSubmit } = usePayments(stripe, elements);

  return (
    <div className="row no-gutters checkout-container">
      {subStatus === ERROR && <strong>{error}</strong>}
      {subStatus === LOADING && <Loading className="align-self-center justify-content-center" />}
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
              <Button
                onClick={onSubmit}
                labelId="billing.addCard"
                type="submit"
                className="btn btn-primary pay-button"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

CCForm.propTypes = {
  stripe: object,
  elements: object
};

export default withStripe(CCForm);
