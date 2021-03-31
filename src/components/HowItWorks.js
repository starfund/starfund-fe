import React from 'react';

import { useIntl } from 'react-intl';

import Award from '../assets/Award.svg';
import Browser from '../assets/Browser.svg';
import Clicking from '../assets/Clicking.svg';
import Account from '../assets/Account.svg';

const HowItWorks = () => {
  const intl = useIntl();
  return (
    <div className="foot-banner">
      <div className="col-12">
        <h2 className="bold">{intl.formatMessage({ id: 'fighter.start.title' })}</h2>
        <br />
        <div className="text row">
          <div className="col-5 col-md-3">
            <img src={Clicking} alt="cwm" />
            <p>{intl.formatMessage({ id: 'fighter.start.item1' })}</p>
          </div>
          <div className="col-5 col-md-2">
            <img src={Account} alt="cwm" />
            <p>{intl.formatMessage({ id: 'fighter.start.item2' })}</p>
          </div>
          <div className="col-5 col-md-2">
            <img src={Browser} alt="cwm" />
            <p>{intl.formatMessage({ id: 'fighter.start.item3' })}</p>
          </div>
          <div className="col-5 col-md-2">
            <img src={Award} alt="cwm" />
            <p>{intl.formatMessage({ id: 'fighter.start.item4' })}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
