import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { formatName, formatGoal } from 'utils/translationsHelper';

const BusinessPrograms = ({ business, setVideos }) => {
  const intl = useIntl();
  const language = useSelector(state => state.language.language);

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
                  <u> {formatName(c, language)?.toUpperCase()} </u>
                </h2>
                <h4> Level: {c.level} </h4>
                <br />
                <h3>{formatGoal(c, language)}</h3>
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
