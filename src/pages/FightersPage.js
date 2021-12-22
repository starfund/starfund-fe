import React from 'react';
import { useIntl } from 'react-intl';

import HomeStars from '../components/HomeStars';
import HomeFooter from '../components/HomeFooter';
import ParalaxHome from '../components/ParalaxHome';
import MailchimpForm from '../components/MailchimpForm';

const FightersPage = () => {
  const intl = useIntl();
  return (
    <React.Fragment>
      <div className="stars-container">
        <ParalaxHome />
      </div>
      <div className="stars-preview-container">
        <HomeStars title={intl.formatMessage({ id: 'findFighter' })} />
      </div>
      <MailchimpForm />
      <HomeFooter />
    </React.Fragment>
  );
};

export default FightersPage;
