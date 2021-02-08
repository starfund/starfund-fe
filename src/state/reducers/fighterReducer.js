import { createReducer } from '@rootstrap/redux-tools';
import { getFighters } from 'state/actions/fighterActions';

const initialState = {
  fighters: {}
};

const actionHandlers = {
  [getFighters.success]: (state, { payload }) => {
    state.fighters = payload;
  }
};

export default createReducer(initialState, actionHandlers);
