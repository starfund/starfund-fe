import React from 'react';
import { useIntl } from 'react-intl';

const BusinessPrograms = ({ business, setVideos }) => {
  const intl = useIntl();

  return (
    <div className="business-program-container">
      <center>
        <h2> {intl.formatMessage({ id: 'business.programs.title' })} </h2>
      </center>
      {business &&
        business.courses.map(c => (
          <React.Fragment key={c.id}>
            <div className="blank-line" />
            <div className="row">
              <div className="col-6 col-md-4 offset-2 offset-md-2">
                <img src={c.cover} alt="cover" />
              </div>
              <div className="center-text col-12 col-md-4 offset-md-1">
                <h2>
                  <u> {c.name.toUpperCase()} </u>
                </h2>
                <h4> Level: {c.level} </h4>
                <br />
                <h3>{c.courseGoal}</h3>
                <br />
                <button
                  type="button"
                  className="btn btn-danger btn-lg"
                  onClick={() => setVideos(true)}
                >
                  {intl.formatMessage({ id: 'business.watch' })}
                </button>
              </div>
            </div>
          </React.Fragment>
        ))}
    </div>
  );
};

export default BusinessPrograms;
