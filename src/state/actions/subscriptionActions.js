import { createThunk } from '@rootstrap/redux-tools';
import subscriptionService from 'services/subscriptionService';
import parseError from 'utils/parseError';
import userService from '../../services/userService';

export const subscribe = createThunk('SUBSCRIBE', async sub => {
  try {
    const { data } = await subscriptionService.subscribe(sub);
    return data.subscription;
  } catch ({ response: data }) {
    throw parseError(data);
  }
});

export const updatePassword = createThunk('UPDATE_PASSWORD', async password => {
  try {
    const { data } = await userService.setNewbiePassword(password);
    return data.user;
  } catch ({ response: data }) {
    throw parseError(data);
  }
});

export const getSubscriptions = createThunk('GET_SUBSCRIPTIONS', async () => {
  try {
    const { data } = await subscriptionService.userSubs();
    return data;
  } catch ({ response: data }) {
    throw parseError(data);
  }
});

export const setPPVRequest = createThunk('SET_PPV_REQUEST', async dream => {
  return dream;
});
