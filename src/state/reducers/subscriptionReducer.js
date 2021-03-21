import { createReducer } from '@rootstrap/redux-tools';
import { subscribe } from 'state/actions/subscriptionActions';

const initialState = {
  subscription: {},
  newUser: false
};

const actionHandlers = {
  [subscribe.success]: (state, { payload }) => {
    state.subscription = payload;
    state.newUser = true;
  }
};

export default createReducer(initialState, actionHandlers);
