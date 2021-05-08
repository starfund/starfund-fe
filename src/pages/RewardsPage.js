import React from 'react';
import { useIntl } from 'react-intl';

import FighterLottery from '../components/FighterLottery';
import HomeFooter from '../components/HomeFooter';

const RewardsPage = () => {
  const intl = useIntl();
  return (
    <React.Fragment>
      <div className="about-container">
        <div className="center">
          <h2> {intl.formatMessage({ id: 'rewards.title' })} </h2>
        </div>
        <br />
        <FighterLottery />
      </div>
      <HomeFooter />
    </React.Fragment>
  );
};

export default RewardsPage;
