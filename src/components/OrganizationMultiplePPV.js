import React from 'react';

const OrganizationMultiplePPV = ({ events }) => {
  return (
    <div className="many-ppv-container">
      {events?.map(e => <div className="many-ppv-card">{e?.name}</div>)}
    </div>
  );
};

export default OrganizationMultiplePPV;
