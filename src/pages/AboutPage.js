import React from 'react';
import { useIntl } from 'react-intl';

const AboutPage = () => {
  const intl = useIntl();
  return (
    <div className="about-container">
      <p>{intl.formatMessage({ id: 'comingSoon' })}</p>
    </div>
  );
};

export default AboutPage;
