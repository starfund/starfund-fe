import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getFighters } from '../state/actions/fighterActions';

const HomeStars = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getFighters());
  }, [dispatch]);
  const fighters = useSelector(state => state.fighters.fighters);

  return (
    <div className="stars-container">
      <h1> Featured Athletes </h1>
      <div className="fighters-container">
        {fighters.length > 0 &&
          fighters.map(f => (
            <div key={f.id} className="card fighter-card">
              <img className="card-img-top" src={f?.profilePicture} alt="Card cap" />
              <div className="card-body">
                <a href="#" className="card-text" onClick={() => history.push(`/fighter/${f.id}`)}>
                  {f.firstName} {f.lastName}
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomeStars;
