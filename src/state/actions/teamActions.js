import { createThunk } from '@rootstrap/redux-tools';
import teamService from 'services/teamService';
import parseError from 'utils/parseError';

export const getTeams = createThunk('GET_TEAMS', async withContent => {
  try {
    const { data } = await teamService.getTeams(withContent);
    return data;
  } catch ({ response: { data } }) {
    throw parseError(data);
  }
});
