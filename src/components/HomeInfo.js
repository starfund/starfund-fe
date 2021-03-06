import React from 'react';

const HomeInfo = () => {
  return (
    <div className="info-container">
      <div className="container">
        <div className="row text-row">
          <div className="col-md-4">
            <h2> Exclusive Contents </h2>
          </div>
          <div className="col-md-6 offset-md-2">
            <p>
              {' '}
              We love supporting athletes to create amazing exclusive content and products their
              fans will love.{' '}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="offset-md-1">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Loik Radzhabov
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Nurullo Aliev
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Tagir Ulanbekov
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Zarrukh Adashev
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInfo;
