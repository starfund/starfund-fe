import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import SecondarySlider from './common/SecondarySlider';

import '../styles/components/_home-info.scss';

const HomeInfo = () => {
  const fighters = useSelector(state => state.fighters.fighters);
  const [activeFighter, setActiveFighter] = useState(0);
  return (
    <div className="info-container">
      <div className="">
        <div className="info-container-header">
          <div className="row text-row info-container-header-text">
            <div className="col-md-6">
              <h2 className="info-container-title"> Exclusive Contents </h2>
            </div>
            <div className="col-md-6 info-container-description">
              <p>
                {' '}
                We love supporting athletes to create amazing exclusive content and products their
                fans will love.{' '}
              </p>
            </div>
          </div>
          <div className="row">
            <ul className="info-container-fighters row">
              {fighters?.slice(0, 4).map((f, index) => (
                <li key={f.id}>
                  <button
                    type="button"
                    onClick={() => setActiveFighter(index)}
                    className={`${activeFighter === index ? 'active' : ''} info-fighter-wrapper`}
                  >
                    <img
                      src={f?.profilePicture}
                      className="info-fighter-avatar"
                      alt="fighter-avatar"
                    />
                    <span className="" aria-current="page">
                      Loik Radzhabov
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <SecondarySlider>
          {fighters.map(f => (
            <div className="homeinfo-slider-card slide-left" key={f.id}>
              <iframe
                title="fighter-video"
                className="homeinfo-slider-video"
                src={`${f.previewUrl}?controls=0&modestbranding=1&rel=0`}
              />
              <div>
                <div className="homeinfo-slider-card-overlay">
                  <span className="no-wrap">Loid Radzavob</span>
                  <span>Las vegas / Nevada</span>
                </div>
              </div>
            </div>
          ))}
        </SecondarySlider>
      </div>
    </div>
  );
};

export default HomeInfo;
