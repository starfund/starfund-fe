import React from 'react';
import { useIntl } from 'react-intl';

const BecomeStarPage = () => {
  const intl = useIntl();
  return (
    <div className="contact-container">
      <div className="container">
        <div className="row center">
          <h1>{intl.formatMessage({ id: 'emailUs' })}</h1>
          <br />
          <h2>
            <u>starfundapp@gmail.com</u>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BecomeStarPage;
