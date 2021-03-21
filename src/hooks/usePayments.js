import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import humps from 'humps';
import { useToast } from 'hooks';

import { subscribe } from 'state/actions/subscriptionActions';
import { getBilling } from 'state/actions/billingActions';

export default stripe => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { showErrorToast } = useToast();

  const createCreditCard = async billing => {
    const { name, email } = billing;

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
        cardHolderFirstName: name,
        cardHolderLastName: name,
        expMonth,
        expYear
      };
      await dispatch(subscribe({ token: data.token, email, fighter: 1, amount: 5 }));
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
