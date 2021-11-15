import { createReducer } from '@rootstrap/redux-tools';
import { getOrganizations } from 'state/actions/organizationActions';

const initialState = {
  organizations: []
};

const actionHandlers = {
  [getOrganizations.success]: (state, { payload }) => {
    state.organizations = payload;
  }
};

export default createReducer(initialState, actionHandlers);
