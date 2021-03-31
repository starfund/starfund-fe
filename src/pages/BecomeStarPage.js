import React from 'react';
import { useIntl } from 'react-intl';

const BecomeStarPage = () => {
  const intl = useIntl();
  return (
    <div className="watch-container">
      <div className="container">
        <div className="row">
          <h1>{intl.formatMessage({ id: 'emailUs' })}</h1>
          <br />
          <h2> starfundapp@gmail.com </h2>
        </div>
      </div>
    </div>
  );
};

export default BecomeStarPage;
