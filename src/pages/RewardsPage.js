import React from 'react';
import { Redirect } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useMediaQuery } from 'react-responsive';

import { useSession } from 'hooks';
import FighterLottery from '../components/FighterLottery';
import HomeFooter from '../components/HomeFooter';

const RewardsPage = () => {
  const intl = useIntl();
  const { authenticated } = useSession();
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  if (true) {
    return <Redirect to="/fighter/5" />;
  }

  return (
    <React.Fragment>
      <div className="rewards-container">
        {isMobile && (
          <div className="center-text">
            <h3>
              {intl.formatMessage({ id: authenticated ? 'rewards.refer.title' : 'rewards.title' })}
            </h3>
          </div>
        )}
        <FighterLottery />
      </div>
      <HomeFooter />
    </React.Fragment>
  );
};

export default RewardsPage;
