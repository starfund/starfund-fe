import React, { useEffect } from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga';
import useHotjar from 'react-use-hotjar';
import '@fontsource/montserrat';

import { useSession } from 'hooks';
import RouteFromPath from 'components/routes/RouteFromPath';
import IntlWrapper from './IntlWrapper';
import routes from '../routes';
import Header from './common/Header';

const App = () => {
  const myCustomLogger = console.info;
  const { authenticated } = useSession();
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
            <title>Supporting Fighters and Athletes | StarFund</title>
          </Helmet>
          <Header />
          <Switch>
            {routes.map((route, index) => (
              <RouteFromPath key={`route${index}`} {...route} authenticated={authenticated} />
            ))}
          </Switch>
        </BrowserRouter>
      </IntlWrapper>
    </React.Fragment>
  );
};

export default App;
