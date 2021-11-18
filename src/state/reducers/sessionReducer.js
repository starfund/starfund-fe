import { createReducer } from '@rootstrap/redux-tools';
import { login, signUp, logout, updateSession, update } from 'state/actions/userActions';
import { subscribe, charge } from 'state/actions/subscriptionActions';
import { deleteCard } from 'state/actions/billingActions';

const initialState = {
  authenticated: false,
  user: null,
  info: {}
};

const actionHandlers = {
  [login.success]: (state, { payload }) => {
    state.user = payload;
  },
  [signUp.success]: (state, { payload }) => {
    state.user = payload;
  },
  [updateSession]: (state, { payload }) => {
    state.info = payload;
    state.authenticated = true;
  },
  [subscribe.success]: (state, { payload }) => {
    state.user = payload.user;
  },
  [charge.success]: (state, { payload }) => {
    state.user = payload.user;
  },
  [update.success]: (state, { payload }) => {
    state.user = payload;
  },
  [deleteCard.success]: state => {
    state.user.cardId = null;
  },
  [logout.success]: () => initialState
};

export default createReducer(initialState, actionHandlers);
