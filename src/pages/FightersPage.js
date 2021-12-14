import React from 'react';
import { useIntl } from 'react-intl';

import HomeStars from '../components/HomeStars';
import HomeFooter from '../components/HomeFooter';
import ParalaxHome from '../components/ParalaxHome';
import FAQS from '../components/FAQS';

const FightersPage = () => {
  const intl = useIntl();
  return (
    <React.Fragment>
      <div className="home">
        <ParalaxHome />
      </div>
      <br />
      <br />
      <br />
      <div className="stars-preview-container">
        <HomeStars title={intl.formatMessage({ id: 'findFighter' })} />
      </div>
      <FAQS />
      <HomeFooter />
    </React.Fragment>
  );
};

export default FightersPage;
