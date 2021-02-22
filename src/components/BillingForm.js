import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { object } from 'prop-types';
import { CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import withStripe from 'components/hocs/withStripe';
import usePayments from 'hooks/usePayments';
import Field from 'components/common/StripeField';
import { getBilling, getDonations } from 'state/actions/billingActions';

import Button from './common/Button';

const BillingForm = ({ stripe, elements }) => {
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

  return (
    <div className="row no-gutters checkout-container">
      <div className="new-card-form col-md-12">
        <div className="">
          <div className="">
            <div className="half-row">
              <Field
                onChange={setCardState}
                label="Card information"
                StripeComponent={CardNumberElement}
                error={cardState.error}
              />
            </div>
            <div className="half-row">
              <Field
                onChange={setExpiryState}
                StripeComponent={CardExpiryElement}
                error={expiryState.error}
              />
              <Field
                onChange={setCVCState}
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
      </div>
      <div className="checkout-footer col-md-12">
        <h4 className="card-header">100% secure purchase</h4>
      </div>
    </div>
  );
};

BillingForm.propTypes = {
  stripe: object,
  elements: object
};

export default withStripe(BillingForm);
