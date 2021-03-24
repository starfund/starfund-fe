import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from 'state/store/configureStore';
import App from 'components/App';
import httpClient from 'httpClient';
import applyDefaultInterceptors from 'httpClient/applyDefaultInterceptors';
import 'styles/styles.scss';

require('../src/favicon.ico'); // Tell webpack to load favicon.ico

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const { persistor, store } = configureStore(preloadedState);

const renderApp = Component => {
  hydrate(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer>
            <Component />
          </AppContainer>
        </PersistGate>
      </Provider>,
    document.getElementById('app')
  );
};

applyDefaultInterceptors(store, httpClient);
renderApp(App);

if (module.hot) {
  module.hot.accept();
}
