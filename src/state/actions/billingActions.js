import { SubmissionError } from 'redux-form/immutable';
import { createThunk } from '@rootstrap/redux-tools';
import billingService from 'services/billingService';
import paymentService from 'services/paymentService';
import parseError from 'utils/parseError';

import { getErrors } from 'utils/helpers';

export const getBilling = createThunk('GET_BILLING', async () => {
  try {
    const { data } = await billingService.getBilling();
    return data.creditCard;
  } catch ({ response: { data } }) {
    throw parseError(data);
  }
});

export const getDonations = createThunk('GET_DONATIONS', async () => {
  try {
    const { data } = await paymentService.getPayments();
    return data;
  } catch ({ response: { data } }) {
    throw parseError(data);
  }
});

export const donate = createThunk('DONATE', async amount => {
  try {
    const { data } = await paymentService.donate(amount);
    return data;
  } catch ({ response: { data } }) {
    throw parseError(data);
  }
});

export const createCard = createThunk('CREATE_CARD', async ({ token, isUpdate }) => {
  try {
    const {
      id,
      email,
      card: {
        name,
        addressLine1,
        addressLine2,
        addressCity,
        addressState,
        addressCountry,
        addressZip,
        brand,
        last4
      }
    } = token;
    const tokenToSend = { id, email };
    const tokenToSave = {
      email,
      name,
      addressLine1,
      addressLine2,
      addressCity,
      addressState,
      addressCountry,
      addressZip,
      brand,
      last4
    };
    if (isUpdate) {
      const { data } = await billingService.updateBilling({
        token: tokenToSend,
        newCard: tokenToSave
      });
      return data.creditCard;
    }
    const { data } = await billingService.saveBilling({ token: tokenToSend });
    return data.creditCard;
  } catch ({ errors, error }) {
    throw new SubmissionError(getErrors(error, errors));
  }
});
