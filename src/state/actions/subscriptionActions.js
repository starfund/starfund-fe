import { createThunk } from '@rootstrap/redux-tools';
import subscriptionService from 'services/subscriptionService';
import parseError from 'utils/parseError';

export const subscribe = createThunk('SUBSCRIBE', async sub => {
  try {
    const { data } = await subscriptionService.subscribe(sub);
    return data.subscription;
  } catch ({ response: data }) {
    throw parseError(data);
  }
});
