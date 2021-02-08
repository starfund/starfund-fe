import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getFighters } from '../state/actions/fighterActions';

const HomeStars = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFighters());
  }, [dispatch]);
  const fighters = useSelector(state => state.fighters.fighters);

  return (
    <div className="stars-container">
      <h1> STARFUND STARS </h1>
      <div className="fighters-container">
        {fighters.length > 0 &&
          fighters.map(f => (
            <div key={f.id} className="card fighter-card">
              <img className="card-img-top" src={f.attachments[0]?.url} alt="Card cap" />
              <div className="card-body">
                <p className="card-text">
                  {f.firstName} {f.lastName}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomeStars;
