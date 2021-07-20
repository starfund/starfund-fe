import React from 'react';
import { useIntl } from 'react-intl';

const BusinessPrograms = ({ business }) => {
  const intl = useIntl();

  return (
    <div className="business-program-container">
      <center>
        <h2> {intl.formatMessage({ id: 'business.programs.title' })} </h2>
      </center>
      {business &&
        business.courses.map(c => (
          <React.Fragment key={c.id}>
            <div className="row">
              <img src={c.cover} alt="cover" />
              <div>
                <h2>
                  <u> {c.name.toUpperCase()} </u>
                </h2>
                <h4> Level: {c.level} </h4>
                <br />
                <div className="row">
                  <h3>{c.courseGoal}</h3>
                </div>
              </div>
            </div>
            <div className="blank-line" />
          </React.Fragment>
        ))}
    </div>
  );
};

export default BusinessPrograms;
