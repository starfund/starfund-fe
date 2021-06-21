import React from 'react';
import { useIntl } from 'react-intl';

import HomeStars from '../components/HomeStars';
import HomeFooter from '../components/HomeFooter';

const FightersPPVPage = () => {
  const intl = useIntl();
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
