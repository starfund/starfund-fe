import React from 'react';
import { FormattedMessage } from 'react-intl';
import { format } from 'date-fns';
import { useMediaQuery } from 'react-responsive';

import FighterLottery from '../components/FighterLottery';
import HomeFooter from '../components/HomeFooter';

const RewardsPage = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  return (
    <React.Fragment>
      <div className="about-container">
        {isMobile && (
          <div className="center">
            <h4>
              <FormattedMessage
                id="rewards.title"
                values={{ date: format(new Date(2021, 5, 14), 'dd/MM/yyyy') }}
              />
            </h4>
          </div>
        )}
        <br />
        <FighterLottery />
      </div>
      <HomeFooter />
    </React.Fragment>
  );
};

export default RewardsPage;
