import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import humps from 'humps';

import { createCard, getBilling } from 'state/actions/billingActions';
import { useToast } from 'hooks';

export default stripe => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { showErrorToast } = useToast();

  const createCreditCard = async billing => {
    const { firstName, lastName } = billing;

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
        cardHolderFirstName: firstName,
        cardHolderLastName: lastName,
        expMonth,
        expYear
      };
      await dispatch(createCard({ customerId: 1, token: data.token, isUpdate: false }));
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
