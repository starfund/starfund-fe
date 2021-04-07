import { createReducer } from '@rootstrap/redux-tools';
import { setLanguage, setBrowserLanguage } from 'state/actions/appActions';

const initialState = {
  language: 'en',
  languageWasSet: false
};

const actionHandlers = {
  [setLanguage]: (state, { payload }) => {
    state.language = payload;
  },
  [setBrowserLanguage]: (state, { payload }) => {
    if (!state.languageWasSet) {
      state.language = payload;
      state.languageWasSet = true;
    }
  }
};

export default createReducer(initialState, actionHandlers);
