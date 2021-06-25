import React from 'react';
import { useIntl } from 'react-intl';

import HomeBusinesses from '../components/HomeBusinesses';
import HomeFooter from '../components/HomeFooter';

const BusinessesPage = () => {
  const intl = useIntl();
  return (
    <React.Fragment>
      <div className="stars-preview-container">
        <HomeBusinesses title={intl.formatMessage({ id: 'findBusiness' })} />
      </div>
      <HomeFooter />
    </React.Fragment>
  );
};

export default BusinessesPage;
