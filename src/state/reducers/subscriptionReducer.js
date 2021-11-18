import { createReducer } from '@rootstrap/redux-tools';
import { logout } from 'state/actions/userActions';
import {
  subscribe,
  updatePassword,
  getSubscriptions,
  setPPVRequest,
  charge,
  requestDream
} from 'state/actions/subscriptionActions';

const initialState = {
  subscriptions: [],
  gymSubscriptions: [],
  orgSubscriptions: [],
  ppvCharges: [],
  public: [],
  newUser: false,
  ppvRequest: [],
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
    state.subscriptions = [...state.subscriptions, payload];
    state.newUser = payload.newbie;
    state.shouldUpdatePassword = payload.shouldUpdatePassword;
  },
  [updatePassword.success]: (state, { payload }) => {
    state.shouldUpdatePassword = payload.shouldUpdatePassword;
    state.newbie = payload.newbie;
  },
  [updatePassword.error]: state => {
    state.newbie = false;
  },
  [getSubscriptions.success]: (state, { payload }) => {
    state.subscriptions = payload.subscriptions;
    state.gymSubscriptions = payload.businessSubscription;
    state.orgSubscriptions = payload.orgSubscription;
    state.ppvCharges = payload.ppvCharges;
    state.public = payload.publicContent;
  },
  [setPPVRequest.success]: (state, { payload }) => {
    state.ppvRequest.push(payload);
  },
  [charge.request]: state => {
    state.newUser = true;
  },
  [charge.success]: (state, { payload }) => {
    // See how to store used requested a video if exp is a winner
    state.newUser = payload.newbie;
    state.shouldUpdatePassword = payload.shouldUpdatePassword;
  },
  [charge.error]: state => {
    state.newUser = false;
    state.shouldUpdatePassword = false;
  },
  [requestDream.success]: state => {
    state.ppvRequest = [];
  },
  [logout.success]: () => initialState
};

export default createReducer(initialState, actionHandlers);
