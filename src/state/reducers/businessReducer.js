import { createReducer } from '@rootstrap/redux-tools';
import { getBusinesses } from 'state/actions/businessActions';

const initialState = {
  businesses: []
};

const actionHandlers = {
  [getBusinesses.success]: (state, { payload }) => {
    state.businesses = payload;
  }
};

export default createReducer(initialState, actionHandlers);
