import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { getOrganizations } from '../state/actions/organizationActions';

import Slider from './common/Slider';

import '../styles/components/_home-starts.scss';

const HomeBusinesses = ({ title }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getOrganizations(true));
  }, [dispatch]);
  const organizations = useSelector(state => state.organizations.organizations);

  return (
    <div className="stars-container">
      <h1 className="stars-title"> {title} </h1>
      <div className="fighters-slider-wrapper">
        {organizations.length == 0 && (
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height="90vh" />
          </SkeletonTheme>
        )}
        <Slider>
          {organizations.length > 0 &&
            organizations.map(b => (
              <Link
                key={b.id}
                className="fighter-card-link"
                href=""
                onClick={() => history.push(`/organization/${b.name}`)}
              >
                <div key={b.id} className="fighter-card">
                  <img className="fighter-card-image" src={b?.mobileCoverPhoto} alt="Card cap" />
                  <div className="organizations-card-overlay">
                    <div className="fighter-card-name-wrapper">
                      <span className="fighter-card-text">{b.name} </span>
                      <br />
                      <br />
                      <br />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomeBusinesses;
