import { createReducer } from '@rootstrap/redux-tools';
import {
  getBilling,
  createCard,
  getDonations,
  donate,
  deleteCard
} from 'state/actions/billingActions';
import { login } from 'state/actions/userActions';

const initialState = {
  loading: false,
  creditCard: {},
  payments: {}
};

const actionHandlers = {
  [getBilling.success]: (state, { payload }) => {
    state.creditCard = payload;
  },
  [createCard.success]: (state, { payload }) => {
    state.creditCard = payload;
  },
  [getDonations.success]: (state, { payload }) => {
    state.payments = payload;
  },
  [donate.success]: (state, { payload }) => {
    state.payments = state.payments.concat(payload);
  },
  [deleteCard.success]: state => {
    state.creditCard = {};
  },
  [login.success]: (state, { payload }) => {
    state.creditCard = {
      brand: payload.brand,
      last4: payload.last4,
      cardId: payload.cardId
    };
  }
};

export default createReducer(initialState, actionHandlers);
