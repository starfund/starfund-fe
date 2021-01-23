import { createReducer } from '@rootstrap/redux-tools';
import { getBilling, createCard, getDonations, donate } from 'state/actions/billingActions';

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
  }
};

export default createReducer(initialState, actionHandlers);
