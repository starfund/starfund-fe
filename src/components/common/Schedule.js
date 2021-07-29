import React, { memo } from 'react';
import { string } from 'prop-types';

const Schedule = ({ title }) => {
  return (
    <div className="schedule">
      <h2> {title} </h2>
      <br />
      <table className="table table-dark table-borderless">
        <tbody>
          <tr>
            <td />
            <td className=""> Lun a Vie 8:00 - 12:00 </td>
          </tr>
          <tr>
            <td> Musculacion </td>
            <td className=""> Lun a Vie 15:00 - 21:00 </td>
          </tr>
          <tr>
            <td />
            <td className=""> Sab 9:00 - 12:00 </td>
          </tr>
        </tbody>
      </table>
      <br />
      <table className="table table-striped">
        <thead className="thead-light">
          <tr>
            <th />
            <th> Lun </th>
            <th> Mar </th>
            <th> Mie </th>
            <th> Jue </th>
            <th> Vie </th>
          </tr>
        </thead>
        <tbody className="table-dark">
          <tr>
            <th scope="row">8:00 - 9:00</th>
            <td className="">Funcional</td>
            <td />
            <td className="">Funcional</td>
            <td />
            <td className="">Funcional</td>
          </tr>
          <tr>
            <th scope="row" className="table-secondary" />
            {[1, 2, 3, 4, 5].map(() => (
              <td className="table-secondary" />
            ))}
          </tr>
          <tr>
            <th scope="row">18:00 - 19:00</th>
            <td className=""> FULL BODY</td>
            <td className=""> POWER FUNCIONAL</td>
            <td className=""> FULL BODY</td>
            <td className=""> POWER FUNCIONAL</td>
            <td className=""> FULL BODY</td>
          </tr>
          <tr>
            <th scope="row">19:00 - 20:00</th>
            <td className=""> POWER HIT</td>
            <td className=""> POWER CROSS</td>
            <td className=""> POWER HIT</td>
            <td className=""> POWER CROSS</td>
            <td className=""> POWER HIT</td>
          </tr>
          <tr>
            <th scope="row">19:00 - 20:00</th>
            <td className=""> THAI BOXING</td>
            <td />
            <td className=""> THAI BOXING</td>
            <td />
            <td className=""> THAI BOXING</td>
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
