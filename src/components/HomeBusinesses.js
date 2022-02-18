import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useMediaQuery } from 'react-responsive';

import { getOrganizations } from '../state/actions/organizationActions';
import OrganizationCard from './OrganizationCard';

import '../styles/components/_home-starts.scss';

const HomeBusinesses = ({ title }) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });
  useEffect(() => {
    dispatch(getOrganizations(true));
  }, [dispatch]);
  const organizations = useSelector(state => state.organizations.organizations);

  return (
    <div className="stars-container">
      {isMobile ? (
        <h3 className="stars-title"> {title} </h3>
      ) : (
        <h2 className="stars-title"> {title} </h2>
      )}
      <br />
      {organizations.length == 0 && (
        <div className="fighters-slider-wrapper">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height="90vh" />
          </SkeletonTheme>
        </div>
      )}
      <div className="row cards-container">
        {organizations?.length > 0 &&
          organizations.map(o => (
            <div className="col-12 col-md-4">
              <OrganizationCard organization={o} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomeBusinesses;
