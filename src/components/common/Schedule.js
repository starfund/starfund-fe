import React, { memo } from 'react';
import { string } from 'prop-types';

const Schedule = ({ title }) => {
  return (
    <div className="schedule">
      <h2> {title} </h2>
      <br />
      <table className="table">
        <tbody className="table-light">
          <tr>
            <td> Musculacion </td>
            <td className="table-warning"> Lun a Vie 8:00 - 12:00 </td>
          </tr>
          <tr>
            <td />
            <td className="table-warning"> Lun a Vie 15:00 - 21:00 </td>
          </tr>
          <tr>
            <td />
            <td className="table-warning"> Sab 9:00 - 12:00 </td>
          </tr>
        </tbody>
      </table>
      <table className="table">
        <thead className="table-light">
          <tr>
            <th />
            <th> Lun </th>
            <th> Mar </th>
            <th> Mie </th>
            <th> Jue </th>
            <th> Vie </th>
          </tr>
        </thead>
        <tbody className="table-light">
          <tr>
            <th scope="row">
              8:00 <br /> - <br /> 9:00
            </th>
            <td className="table-info">Funcional</td>
            <td />
            <td className="table-info">Funcional</td>
            <td />
            <td className="table-info">Funcional</td>
          </tr>
          <tr>
            <th scope="row" className="table-secondary" />
            {[1, 2, 3, 4, 5].map(() => (
              <td className="table-secondary" />
            ))}
          </tr>
          <tr>
            <th scope="row">
              18:00
              <br /> - <br /> 19:00
            </th>
            <td className="table-info"> FULL BODY</td>
            <td className="table-danger"> POWER FUNCIONAL</td>
            <td className="table-info"> FULL BODY</td>
            <td className="table-danger"> POWER FUNCIONAL</td>
            <td className="table-info"> FULL BODY</td>
          </tr>
          <tr>
            <th scope="row">
              19:00
              <br /> - <br /> 20:00
            </th>
            <td className="table-violet"> POWER HIT</td>
            <td className="table-orange"> POWER CROSS</td>
            <td className="table-violet"> POWER HIT</td>
            <td className="table-orange"> POWER CROSS</td>
            <td className="table-violet"> POWER HIT</td>
          </tr>
          <tr>
            <th scope="row">
              19:00
              <br /> - <br /> 20:00
            </th>
            <td className="table-success"> THAI BOXING</td>
            <td />
            <td className="table-success"> THAI BOXING</td>
            <td />
            <td className="table-success"> THAI BOXING</td>
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
