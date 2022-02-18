import React from 'react';
import { Link } from 'react-router-dom';

const OrganizationCard = ({ organization }) => {
  return (
    <div className="org-card">
      <div>
        <img
          className="image-org-card"
          src={
            organization?.organizationIcon
              ? organization?.organizationIcon
              : organization?.mobileCoverPhotos[0]?.image
          }
          alt=""
        />
      </div>
      <Link className="card-button" to={`organization/${organization?.name}`}>
        {organization?.name}
      </Link>
    </div>
  );
};

export default OrganizationCard;
