import React from 'react';
import { useIntl } from 'react-intl';

import HomeStars from '../components/HomeStars';

const FightersPage = () => {
  const intl = useIntl();
  return (
    <div className="stars-preview-container">
      <HomeStars title={intl.formatMessage({ id: 'findFighter' })} />
    </div>
  );
};

export default FightersPage;
