import { combineReducers } from 'redux';
import localForage from 'localforage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { statusReducer } from '@rootstrap/redux-tools';
import session from './sessionReducer';
import payments from './billingReducer';
import fighters from './fighterReducer';
import businesses from './businessReducer';
import teams from './teamReducer';
import contents from './contentReducer';
import messages from './messageReducer';
import subscriptions from './subscriptionReducer';
import language from './languageReducer';

const sessionPersistConfig = {
  key: 'session',
  storage: localForage,
  whitelist: ['authenticated', 'info', 'user', 'subscriptions'],
  stateReconciler: autoMergeLevel2
};

const languagePersistConfig = {
  key: 'language',
  storage: localForage,
  whitelist: ['language', 'languageWasSet'],
  stateReconciler: autoMergeLevel2
};

const rootReducer = () =>
  combineReducers({
    session: persistReducer(sessionPersistConfig, session),
    statusReducer,
    payments,
    fighters,
    businesses,
    teams,
    contents,
    messages,
    subscriptions,
    language: persistReducer(languagePersistConfig, language)
  });

export default rootReducer;
