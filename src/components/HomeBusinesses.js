import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { getBusinesses } from '../state/actions/businessActions';

import Slider from './common/Slider';

import '../styles/components/_home-starts.scss';

const HomeBusinesses = ({ title }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getBusinesses(true));
  }, [dispatch]);
  const businesses = useSelector(state => state.businesses.businesses);

  return (
    <div className="stars-container">
      <h1 className="stars-title"> {title} </h1>
      <div className="fighters-slider-wrapper">
        {businesses.length == 0 && (
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height="90vh" />
          </SkeletonTheme>
        )}
        <Slider>
          {businesses.length > 0 && (
            <React.Fragment>
              {businesses.map(b => (
                <Link
                  key={b.id}
                  className="fighter-card-link"
                  href=""
                  onClick={() => history.push(`/business/${b.id}`)}
                >
                  <div key={b.id} className="fighter-card">
                    <img className="fighter-card-image" src={b?.profilePicture} alt="Card cap" />
                    <div className="fighter-card-overlay">
                      <div className="fighter-card-name-wrapper">
                        <span className="fighter-card-text">{b.name} </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </React.Fragment>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default HomeBusinesses;
