import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { getFighters } from '../state/actions/fighterActions';

import Slider from './common/Slider';

import '../styles/components/_home-starts.scss';

const HomeStars = ({ title, selectedFighter }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getFighters(true));
  }, [dispatch]);
  const fighters = useSelector(state => state.fighters.fighters);

  const fighterLink = fighter => {
    if (fighter.team) {
      history.push(`/team/${fighter.team.name}`);
    } else {
      history.push(`/fighter/${fighter.id}`);
    }
  };

  return (
    <div className="stars-container">
      <h2 className="stars-title"> {title} </h2>
      <div className="fighters-slider-wrapper">
        {fighters.length == 0 && (
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height="90vh" />
          </SkeletonTheme>
        )}
        <Slider>
          {fighters.length > 0 &&
            (selectedFighter ? fighters.filter(f => f.id !== selectedFighter.id) : fighters).map(
              f => (
                <Link
                  key={f.id}
                  className="fighter-card-link"
                  href=""
                  onClick={() => fighterLink(f)}
                >
                  <div key={f.id} className="fighter-card">
                    <img className="fighter-card-image" src={f?.profilePicture} alt="Card cap" />
                    <div className="fighter-card-overlay">
                      <div className="fighter-card-name-wrapper">
                        <span className="fighter-card-text">{f.firstName} </span>
                        <span className="fighter-card-text secondary">{f.lastName} </span>
                      </div>
                      <div className="fighter-card-separator" />
                      <span className="fighter-card-text">
                        {f.organization != '' ? f.organization : '★'}{' '}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            )}
        </Slider>
      </div>
    </div>
  );
};

export default HomeStars;
