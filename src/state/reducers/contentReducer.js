import { createReducer } from '@rootstrap/redux-tools';
import { getContent, increaseLikes, decreaseLikes } from 'state/actions/contentActions';

const initialState = {
  content: []
};

const actionHandlers = {
  [getContent.success]: (state, { payload }) => {
    state.content = payload;
  },
  [increaseLikes.success]: (state, { payload }) => {
    const index = state.content.content.findIndex(c => c.id === payload.id);
    const newArray = [...state.content.content];
    newArray[index] = payload;
    state.content.content = newArray;
  },
  [decreaseLikes.success]: (state, { payload }) => {
    const index = state.content.content.findIndex(c => c.id === payload.id);
    const newArray = [...state.content.content];
    newArray[index] = payload;
    state.content.content = newArray;
  }
};

export default createReducer(initialState, actionHandlers);
