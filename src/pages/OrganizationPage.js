import React from 'react';

import { useParams } from 'react-router-dom';

import OrganizationViewDemo from '../components/OrganizationViewDemo';
import OrganizationView from '../components/OrganizationView';

const OrganizationPage = () => {
  const { name } = useParams();
  return (
    <div className="fighter-container">
      {name === 'Cagezilla' && <OrganizationView />}
      {name === 'Extreme Cage Fighting' && <OrganizationViewDemo />}
    </div>
  );
};

export default OrganizationPage;
