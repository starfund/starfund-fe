import { createThunk } from '@rootstrap/redux-tools';
import fighterService from 'services/fighterService';
import parseError from 'utils/parseError';

export const getFighters = createThunk('GET_FIGHTERS', async withContent => {
  try {
    const { data } = await fighterService.getFighters(withContent);
    return data;
  } catch ({ response: { data } }) {
    throw parseError(data);
  }
});
