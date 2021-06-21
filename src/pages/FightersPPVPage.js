import React from 'react';
import { useIntl } from 'react-intl';
import ReactGA from 'react-ga';

import HomeStars from '../components/HomeStars';
import HomeFooter from '../components/HomeFooter';

const FightersPPVPage = () => {
  const intl = useIntl();
  ReactGA.pageview('/fighters/ppv');

  return (
    <React.Fragment>
      <div className="stars-preview-container">
        <HomeStars title={intl.formatMessage({ id: 'ppvTitle' })} />
      </div>
      <HomeFooter />
    </React.Fragment>
  );
};

export default FightersPPVPage;
