import { createReducer } from '@rootstrap/redux-tools';
import { subscribe, updatePassword } from 'state/actions/subscriptionActions';

const initialState = {
  subscription: {},
  newUser: false,
  shouldUpdatePassword: false
};

const actionHandlers = {
  [subscribe.request]: state => {
    state.newUser = true;
  },
  [subscribe.success]: (state, { payload }) => {
    state.subscription = payload;
    state.newUser = payload.newbie;
    state.shouldUpdatePassword = payload.shouldUpdatePassword;
  },
  [updatePassword.success]: (state, { payload }) => {
    state.shouldUpdatePassword = payload.shouldUpdatePassword;
    state.newbie = payload.newbie;
  }
};

export default createReducer(initialState, actionHandlers);
