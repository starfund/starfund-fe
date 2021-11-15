import { createThunk } from '@rootstrap/redux-tools';
import organizationService from 'services/organizationService';
import parseError from 'utils/parseError';

export const getOrganizations = createThunk('GET_ORGANIZATIONS', async () => {
  try {
    const { data } = await organizationService.getOrganizations();
    return data;
  } catch ({ response: { data } }) {
    throw parseError(data);
  }
});
