import React from 'react';
import { useSelector } from 'react-redux';
import { formatName, formatGoal } from 'utils/translationsHelper';
import Facebook from '../../assets/FacebookColor.png';

const BusinessHome = ({ business, setPrograms }) => {
  const language = useSelector(state => state.language.language);
  return (
    <div className="main-content row business-courses offset-md-1 offset-lg-0">
      {business &&
        business.courses.map(c => (
          <div key={c.id} className="card-container col-12 col-sm-6 col-md-5 col-lg-4">
            <div className="card" style={{ width: '100%' }}>
              <div onClick={() => setPrograms(true)} className="clickable">
                <img className="card-img-top" src={c.cover} alt="asdf" />
                <div className="card-body">
                  <h2 className="card-title">{formatName(c, language)?.toUpperCase()}</h2>
                  <p className="card-text">
                    <center>{formatGoal(c, language)}</center>
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <b>Level:</b> {c.level}
                  </li>
                </ul>
              </div>
              <div className="card-body flex">
                <img src={Facebook} alt="Facebook" />
                <div>
                  <a
                    className="social"
                    onClick={() => window.open(business.facebookLink, '_blank')}
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BusinessHome;
