import React from 'react';

const BusinessHome = ({ business }) => {
  return (
    <div className="main-content row business-courses offset-md-1 offset-lg-0">
      {business &&
        business.courses.map(c => (
          <div className="card-container col-12 col-sm-6 col-md-5 col-lg-4">
            <div className="card" style={{ width: '100%' }}>
              <img className="card-img-top" src={c.cover} alt="asdf" />
              <div className="card-body">
                <h2 className="card-title">{c.name.toUpperCase()}</h2>
                <p className="card-text">
                  <center>{c.courseGoal}</center>
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Level:</b> {c.level}
                </li>
              </ul>
              <div className="card-body">
                <a href="#" className="card-link">
                  Contact
                </a>
                <a href="#" className="card-link">
                  See More
                </a>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BusinessHome;
