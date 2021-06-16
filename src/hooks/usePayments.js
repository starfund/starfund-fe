import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import humps from 'humps';
import { useToast } from 'hooks';

import { subscribe, charge } from 'state/actions/subscriptionActions';
import { getBilling } from 'state/actions/billingActions';

export default stripe => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { showErrorToast } = useToast();

  const createCreditCard = async billing => {
    const { name, email, fighter, type } = billing;

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
        await dispatch(subscribe({ token: data.token, name, email, fighter, card_data: data }));
      } else {
        await dispatch(charge({ token: data.token, name, email, fighter, card_data: data }));
      }
    }

    setLoading(false);
  };

  const getCreditCard = () => {
    dispatch(getBilling());
  };

  return {
    createCreditCard,
    loading,
    stripe,
    getCreditCard,
    getCardLoading: getBilling,
    creditCard: useSelector(({ payments: { creditCard } }) => creditCard)
  };
};
