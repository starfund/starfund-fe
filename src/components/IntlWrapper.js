import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import includes from 'lodash/includes';
import { node } from 'prop-types';

import locales from 'locales';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from 'constants/constants';

import LanguageContext from '../Contexts/LanguageContext';

// Fix for browsers that don't implement Intl by default e.g.: Safari)
if (!window.Intl) {
  require.ensure(
    [
      '@formatjs/intl-relativetimeformat',
      '@formatjs/intl-relativetimeformat/dist/include-aliases.js',
      '@formatjs/intl-relativetimeformat/dist/locale-data/en.js',
      '@formatjs/intl-relativetimeformat/dist/locale-data/es.js'
    ],
    require => {
      require('@formatjs/intl-relativetimeformat/polyfill');
      require('@formatjs/intl-relativetimeformat/dist/include-aliases');
      require('@formatjs/intl-relativetimeformat/dist/locale-data/en.js');
      require('@formatjs/intl-relativetimeformat/dist/locale-data/es.js');
    }
  );
}

const usersLocale = navigator.language.split('-')[0];
const supportedUserLocale = includes(SUPPORTED_LANGUAGES, usersLocale);
const locale = supportedUserLocale ? usersLocale : DEFAULT_LANGUAGE;

const IntlWrapper = ({ children }) => {
  const [currentLocal, setCurrentLocal] = useState(locale);
  const messages = locales[currentLocal];

  return (
    <LanguageContext.Provider value={setCurrentLocal}>
      <IntlProvider locale={currentLocal} messages={messages} defaultLocale="en">
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

IntlWrapper.defaultProps = {
  children: node
};

export default IntlWrapper;
