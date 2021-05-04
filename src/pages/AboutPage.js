import React from 'react';
import { useIntl } from 'react-intl';

import FAQS from '../components/FAQS';

const AboutPage = () => {
  const intl = useIntl();
  return (
    <div className="about-container">
      <div className="center">
        <h2> {intl.formatMessage({ id: 'about.title' })} </h2>
        <h4> {intl.formatMessage({ id: 'about.subTitle' })} </h4>
      </div>
      <br />
      <FAQS />
    </div>
  );
};

export default AboutPage;
