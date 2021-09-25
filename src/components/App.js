import React, { useEffect } from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import ReactGA from 'react-ga';
import useHotjar from 'react-use-hotjar';
import '@fontsource/montserrat';
import { ActionCableProvider } from 'react-actioncable-provider';

import { useSession } from 'hooks';
import RouteFromPath from 'components/routes/RouteFromPath';
import ScrollToTop from 'components/hocs/ScrollToTop';
import IntlWrapper from './IntlWrapper';
import routes from '../routes';
import Header from './common/Header';

const App = () => {
  const myCustomLogger = console.info;
  const { authenticated, user } = useSession();
  const { initHotjar } = useHotjar();

  useEffect(() => {
    ReactGA.initialize(process.env.GA_KEY);
  });

  useEffect(() => {
    initHotjar(process.env.HOTJAR_KEY, 6, myCustomLogger);
  }, [initHotjar, myCustomLogger]);

  return (
    <React.Fragment>
      <IntlWrapper>
        <BrowserRouter>
          <Helmet>
            <title>Offering exclusivity from your Stars | StarFund</title>
          </Helmet>
          <Header />
          <ScrollToTop>
            <ActionCableProvider url={`${process.env.API_WS_ROOT}?user=${user?.id}`}>
              <Switch>
                {routes.map((route, index) => (
                  <RouteFromPath key={`route${index}`} {...route} authenticated={authenticated} />
                ))}
              </Switch>
            </ActionCableProvider>
          </ScrollToTop>
        </BrowserRouter>
      </IntlWrapper>
    </React.Fragment>
  );
};

export default App;
