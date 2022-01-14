import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import humps from 'humps';
import { useToast } from 'hooks';

import { subscribe, charge } from 'state/actions/subscriptionActions';
import { getBilling, createCard } from 'state/actions/billingActions';

export default stripe => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { showErrorToast } = useToast();

  const createCreditCard = async billing => {
    const {
      name,
      email,
      fighter,
      team,
      business,
      organization,
      orgEvent,
      type,
      price,
      referalCode
    } = billing;

    setLoading(true);

    const { token, error } = await stripe.createToken();

    if (error) {
      const { message } = error;
      showErrorToast(message);
    } else {
      const { card, id } = token;

      const { brand, country, zipcode, last4, expYear, expMonth } = humps.camelizeKeys(card);

      const data = {
        token,
        stripeToken: id,
        brand,
        country,
        zipCode: zipcode,
        last_4: last4,
        expMonth,
        expYear
      };
      if (type === 'subscription') {
        await dispatch(
          subscribe({
            token: data.token,
            name,
            email,
            fighter,
            team,
            business,
            organization,
            price,
            referalCode,
            card_data: data
          })
        );
      } else {
        await dispatch(
          charge({
            token: data.token,
            name,
            email,
            fighter,
            price,
            orgEvent,
            referalCode,
            card_data: data
          })
        );
      }
    }

    setLoading(false);
  };

  const addCreditCard = async () => {
    setLoading(true);

    const { token, error } = await stripe.createToken();

    if (error) {
      const { message } = error;
      showErrorToast(message);
    } else {
      await dispatch(createCard({ token, isUpdate: false }));
    }

    setLoading(false);
  };

  const getCreditCard = () => {
    dispatch(getBilling());
  };

  return {
    createCreditCard,
    addCreditCard,
    loading,
    stripe,
    getCreditCard,
    getCardLoading: getBilling,
    creditCard: useSelector(({ payments: { creditCard } }) => creditCard)
  };
};
