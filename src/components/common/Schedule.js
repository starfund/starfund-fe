import React, { memo } from 'react';
import { string } from 'prop-types';

const Schedule = ({ title }) => {
  return (
    <div className="schedule">
      <h2> {title} </h2>
      <br />
      <table className="table">
        <thead className="table-light">
          <tr>
            <th />
            <th> Lun </th>
            <th> Mar </th>
            <th> Mie </th>
            <th> Jue </th>
            <th> Vie </th>
            <th> Sab </th>
            <th> Dom </th>
          </tr>
        </thead>
        <tbody className="table-light">
          <tr>
            <th scope="row">9:00 - 10:00</th>
            <td className="table-primary">Fighting</td>
            <td />
            <td />
            <td />
            <td className="table-primary">Fighting</td>
            <td />
            <td />
          </tr>
          <tr>
            <th scope="row">10:00 - 11:00</th>
            <td />
            <td />
            <td className="table-primary">Fighting</td>
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <th scope="row" className="table-secondary" />
            {[1, 2, 3, 4, 5, 6, 7].map(() => (
              <td className="table-secondary" />
            ))}
          </tr>
          <tr>
            <th scope="row">16:00 - 17:00</th>
            <td className="table-warning">Open Gym</td>
            <td />
            <td />
            <td className="table-success"> Fittness</td>
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <th scope="row">17:00 - 18:00</th>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <th scope="row">18:00 - 19:00</th>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Schedule.propTypes = {
  title: string.isRequired
};

export default memo(Schedule);
