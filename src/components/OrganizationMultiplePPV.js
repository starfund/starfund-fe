import React from 'react';
import { useIntl } from 'react-intl';

const OrganizationMultiplePPV = ({ events, selectEvent, supportingPPV }) => {
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
          <h2>
            {intl.formatMessage({
              id: 'organization.manyppv.title'
            })}
          </h2>
        </div>
        <br />
        <br />
        {events?.map(e => (
          <div className="col-12 col-md-4">
            <div className="many-ppv-card">
              <div className="many-ppv-card-title">{e?.name}</div>
              <div className="many-ppv-card-date">{EventDate(e?.eventDate)}</div>
              <img alt="" src={e?.coverPhoto} className="many-ppv-card-image" />
              <button type="button" onClick={() => selectEvent(e)}>
                {!supportingPPV.map(s => s.orgEvent).includes(e?.id)
                  ? intl.formatMessage({
                      id: 'organization.manyppv.details'
                    })
                  : intl.formatMessage({
                      id: 'organization.manyppv.watchnow'
                    })}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationMultiplePPV;
