import { createThunk } from '@rootstrap/redux-tools';
import businessService from 'services/businessService';
import parseError from 'utils/parseError';

export const getBusinesses = createThunk('GET_BUSINESSES', async () => {
  try {
    const { data } = await businessService.getBusinesses();
    return data;
  } catch ({ response: { data } }) {
    throw parseError(data);
  }
});
