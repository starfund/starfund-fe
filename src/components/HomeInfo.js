import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ReactPlayer from 'react-player';
import SecondarySlider from './common/SecondarySlider';

import '../styles/components/_home-info.scss';

const initialDimensions = { width: 950, height: 501 };

const HomeInfo = () => {
  const fighters = useSelector(state => state.fighters.fighters);
  const [activeFighter, setActiveFighter] = useState();
  const [dimensions, setDimensions] = useState(initialDimensions);

  const thereWasRezise = () => {
    const { innerWidth: width } = window;
    if (width < 1200) {
      setDimensions({ width: 600, height: 400 });
    } else {
      setDimensions(initialDimensions);
    }
  };

  useEffect(() => {
    setActiveFighter(fighters[0]?.id);
  }, [fighters]);

  useEffect(() => {
    thereWasRezise();

    window.addEventListener('resize', thereWasRezise);

    return () => window.removeEventListener('resize', thereWasRezise);
  }, []);

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
              {fighters?.slice(0, 4).map(f => (
                <li key={f.id}>
                  <button
                    type="button"
                    onClick={() => setActiveFighter(f.id)}
                    className={`${activeFighter === f.id ? 'active' : ''} info-fighter-wrapper`}
                  >
                    <img
                      src={f?.profilePicture}
                      className="info-fighter-avatar"
                      alt="fighter-avatar"
                    />
                    <span className="" aria-current="page">
                      {`${f.firstName} ${f.lastName}`}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <SecondarySlider>
          {fighters[activeFighter] &&
            fighters[activeFighter].publicVideos.map((v, index) => (
              <div className="homeinfo-slider-card slide-left" key={index}>
                <ReactPlayer
                  title="fighter-video"
                  className="homeinfo-slider-video"
                  controls
                  autoPlay
                  url={v.url}
                  width={dimensions.width}
                  height={dimensions.height}
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
