import React from 'react';
import { arrayOf, string, object, func } from 'prop-types';

import '../../../styles/components/_dropdown.scss';

const DropDown = ({ name, options = [], onChange, value }) => (
  <select
    className="dropdown-container"
    name={name}
    onChange={e => {
      e.persist();
      onChange(e.target.value);
    }}
    value={value}
  >
    {options.map(({ label, value }, index) => (
      <option key={index} value={value}>
        {label}
      </option>
    ))}
  </select>
);

DropDown.propTypes = {
  options: arrayOf(object),
  name: string,
  onChange: func.isRequired,
  value: string.isRequired
};

export default DropDown;
