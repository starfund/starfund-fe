import { createReducer } from '@rootstrap/redux-tools';
import { getTeams } from 'state/actions/teamActions';

const initialState = {
  teams: []
};

const actionHandlers = {
  [getTeams.success]: (state, { payload }) => {
    state.teams = payload;
  }
};

export default createReducer(initialState, actionHandlers);
