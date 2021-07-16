import { createReducer } from '@rootstrap/redux-tools';
import { getFighters, getReport } from 'state/actions/fighterActions';

const initialState = {
  fighters: [],
  report: {},
  selected: 0
};

const actionHandlers = {
  [getFighters.success]: (state, { payload }) => {
    state.fighters = payload;
  },
  [getReport.success]: (state, { payload }) => {
    state.report = payload;
  }
};

export default createReducer(initialState, actionHandlers);
