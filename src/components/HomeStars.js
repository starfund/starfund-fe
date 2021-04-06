import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { getFighters } from '../state/actions/fighterActions';

import Slider from './common/Slider';

import '../styles/components/_home-starts.scss';

const HomeStars = ({ title }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getFighters());
  }, [dispatch]);
  const fighters = useSelector(state => state.fighters.fighters);

  return (
    <div className="stars-container">
      <h1 className="stars-title"> {title} </h1>
      <div className="fighters-slider-wrapper">
        <Slider>
          {fighters.length > 0 &&
            fighters.map(f => (
              <Link
                key={f.id}
                className="fighter-card-link"
                href=""
                onClick={() => history.push(`/fighter/${f.id}`)}
              >
                <div key={f.id} className="fighter-card">
                  <img className="fighter-card-image" src={f?.profilePicture} alt="Card cap" />
                  <div className="fighter-card-overlay">
                    <div className="fighter-card-name-wrapper">
                      <span className="fighter-card-text">{f.firstName} </span>
                      <span className="fighter-card-text secondary">{f.lastName} </span>
                    </div>
                    <div className="fighter-card-separator" />
                    <span className="fighter-card-text">{f.organization} </span>
                  </div>
                </div>
              </Link>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomeStars;
