import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import includes from 'lodash/includes';
import useDispatch from 'hooks/useDispatch';
import { node } from 'prop-types';

import { setBrowserLanguage } from 'state/actions/appActions';

import locales from 'locales';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from 'constants/constants';

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
  const setLanguageRequest = useDispatch(setBrowserLanguage);
  const language = useSelector(({ language: { language } }) => language);

  const messages = locales[language];

  useEffect(() => {
    setLanguageRequest(locale);
  }, [setLanguageRequest]);

  return (
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      {children}
    </IntlProvider>
  );
};

IntlWrapper.defaultProps = {
  children: node
};

export default IntlWrapper;
