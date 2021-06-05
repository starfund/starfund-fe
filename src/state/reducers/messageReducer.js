import { createReducer } from '@rootstrap/redux-tools';
import { getMessages } from 'state/actions/messageActions';

const initialState = {
  messages: []
};

const actionHandlers = {
  [getMessages.success]: (state, { payload }) => {
    state.messages = payload;
  }
};

export default createReducer(initialState, actionHandlers);
