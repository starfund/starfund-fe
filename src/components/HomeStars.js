import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { getFighters } from '../state/actions/fighterActions';
import { getTeams } from '../state/actions/teamActions';

import Slider from './common/Slider';

import '../styles/components/_home-starts.scss';

const HomeStars = ({ title }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const intl = useIntl();
  useEffect(() => {
    dispatch(getFighters(true));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getTeams(true));
  }, [dispatch]);
  const fighters = useSelector(state => state.fighters.fighters);
  const teams = useSelector(state => state.teams.teams);

  return (
    <div className="stars-container">
      <h1 className="stars-title"> {title} </h1>
      <div className="fighters-slider-wrapper">
        {fighters.length == 0 && (
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height="90vh" />
          </SkeletonTheme>
        )}
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
          {teams.map(t => (
            <Link
              key={t.id}
              className="fighter-card-link"
              href=""
              onClick={() => history.push(`/team/${t.name}`)}
            >
              <div key={t.id} className="fighter-card">
                <img className="fighter-card-image" src={t?.profilePicture} alt="Card cap" />
                <div className="fighter-card-overlay">
                  <div className="fighter-card-name-wrapper">
                    <span className="fighter-card-text">{intl.formatMessage({ id: 'team' })}</span>
                    <span className="fighter-card-text secondary">{t.name} </span>
                  </div>
                  <div className="fighter-card-separator" />
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
