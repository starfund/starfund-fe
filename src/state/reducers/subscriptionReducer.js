import { createReducer } from '@rootstrap/redux-tools';
import { subscribe, updatePassword } from 'state/actions/subscriptionActions';

const initialState = {
  subscriptions: [],
  newUser: false,
  shouldUpdatePassword: false
};

const actionHandlers = {
  [subscribe.request]: state => {
    state.newUser = true;
  },
  [subscribe.error]: state => {
    state.newUser = false;
    state.shouldUpdatePassword = false;
  },
  [subscribe.success]: (state, { payload }) => {
    state.subscriptions = [...state.subscriptions, [payload]];
    state.newUser = payload.newbie;
    state.shouldUpdatePassword = payload.shouldUpdatePassword;
  },
  [updatePassword.success]: (state, { payload }) => {
    state.shouldUpdatePassword = payload.shouldUpdatePassword;
    state.newbie = payload.newbie;
  },
  [updatePassword.error]: state => {
    state.newbie = false;
  }
};

export default createReducer(initialState, actionHandlers);
