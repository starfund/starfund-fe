import { createReducer } from '@rootstrap/redux-tools';
import { getMessages, newMessage } from 'state/actions/messageActions';

const initialState = {
  messages: []
};

const actionHandlers = {
  [getMessages.success]: (state, { payload }) => {
    state.messages = payload;
  },
  [newMessage.success]: (state, { payload }) => {
    state.messages.comments.push(payload);
  }
};

export default createReducer(initialState, actionHandlers);
