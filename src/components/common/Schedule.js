import React, { memo } from 'react';
import { string } from 'prop-types';

const Schedule = ({ title }) => {
  return (
    <div className="schedule">
      <h2> {title} </h2>
    </div>
  );
};

Schedule.propTypes = {
  title: string.isRequired
};

export default memo(Schedule);
