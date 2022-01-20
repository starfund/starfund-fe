import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
// eslint-disable-next-line import/no-unresolved
import CardDisplay from 'react-credit-card-display';
import { cardBrand } from 'utils/paymentHelper';
import CommonModal from '../common/CommonModal';
import CCForm from '../CCForm';

import { getBilling } from '../../state/actions/billingActions';

const BillingInfo = () => {
  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    dispatch(getBilling());
  }, [dispatch]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const cardInfo = useSelector(state => state.payments.creditCard);

  return (
    <div className="billing-info">
      <h3>
        <center> BILLING INFO </center>
      </h3>
      <br />
      <div className="card-info flex center-50">
        <CardDisplay expand square={false} active={cardBrand(cardInfo?.brand)} />
        <p> xxxx xxxx xxxx {cardInfo?.last4 || '----'} </p>
      </div>
      <br />
      {!cardInfo.cardId && (
        <button type="button" className="btn btn-warning" onClick={setModalIsOpen}>
          Add Payment method
        </button>
      )}
      <div className="blank-line" />
      <CommonModal
        title={intl.formatMessage({ id: 'billing.addCard' })}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        customWidth="80%"
      >
        <CCForm onSubmit={setModalIsOpen} />
      </CommonModal>
    </div>
  );
};

export default BillingInfo;
