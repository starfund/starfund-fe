import React from 'react';
import { useIntl } from 'react-intl';

const OrganizationMultiplePPV = ({ events, selectEvent }) => {
  const intl = useIntl();

  const months = [
    'jan.long',
    'feb.long',
    'mar.long',
    'apr.long',
    'may.long',
    'jun.long',
    'jul.long',
    'aug.long',
    'sep.long',
    'oct.long',
    'nov.long',
    'dec.long'
  ];

  function EventDate(d) {
    const date = new Date(d);
    return `${intl.formatMessage({
      id: `organization.months.${months[date?.getMonth()]}`
    })} ${date?.getDate()}, ${date.getFullYear()}`;
  }

  return (
    <div className="many-ppv-container">
      <div className="row">
        <div className="col-12 many-ppv-title">
          <h2>All upcoming PPV events</h2>
        </div>
        <br />
        <br />
        {events?.map(e => (
          <div className="col-12 col-md-4">
            <div className="many-ppv-card">
              <div className="many-ppv-card-title">{e?.name}</div>
              <div className="many-ppv-card-date">{EventDate(e?.eventDate)}</div>
              <button type="button" onClick={() => selectEvent(e)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationMultiplePPV;
