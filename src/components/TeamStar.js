import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import ReactGA from 'react-ga';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useIntl } from 'react-intl';
import { useParams, Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSession } from 'hooks';
import { getTeams } from '../state/actions/teamActions';
import { getSubscriptions } from '../state/actions/subscriptionActions';

import TeamVideos from './TeamVideos';
import FighterTeamHome from './FighterTeamHome';
import HomeStars from './HomeStars';
import HomeFooter from './HomeFooter';

import '../styles/components/_home-starts.scss';

const TeamStar = () => {
  const { name } = useParams();
  const intl = useIntl();
  const dispatch = useDispatch();
  const { authenticated } = useSession();
  const [setModalIsOpen] = useState(false);
  const [videos, setVideos] = useState(false);
  useEffect(() => {
    dispatch(getTeams(true));
  }, [dispatch]);
  useEffect(() => {
    if (authenticated) {
      dispatch(getSubscriptions());
    }
  }, [authenticated, dispatch]);
  useEffect(() => {
    ReactGA.pageview(`/teams/${name}`);
  }, [name]);

  const supporting = useSelector(state => state.subscriptions?.subscriptions);
  const team = useSelector(state => state.teams.teams.filter(t => t.name == name)[0]);
  const payedTeam = supporting.map(sub => sub.team?.name);

  useEffect(() => {
    if (payedTeam && team) {
      payedTeam.includes(team.name) && setVideos(true);
    }
  }, [payedTeam, team]);

  return (
    <div className="fighter-container">
      {!payedTeam.includes(team?.name) && (
        <div className="cover-container">
          {team ? (
            <LazyLoadImage className="fighter-cover" src={team.coverPhoto} alt="Cover" />
          ) : (
            <SkeletonTheme color="#202020" highlightColor="#444">
              <Skeleton height="90vh" />
            </SkeletonTheme>
          )}
          {team && (
            <div className="centered">
              <br />
              <br />
              <h1>
                {'Team '}
                {team.name}{' '}
              </h1>
              {authenticated &&
                supporting &&
                team &&
                !supporting.filter(s => s.team?.id === team.id).length > 0 && (
                  <button
                    type="button"
                    className="btn btn-danger btn-lg"
                    onClick={() => setModalIsOpen(true)}
                  >
                    {intl.formatMessage({ id: 'button.subscribe' })}
                  </button>
                )}
              {!authenticated && (
                <button
                  type="button"
                  className="btn btn-danger btn-lg"
                  onClick={() => setModalIsOpen(true)}
                >
                  {intl.formatMessage({ id: 'button.subscribe' })}
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {!payedTeam.includes(team?.name) && (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              {team && payedTeam && !payedTeam.includes(team.id) && (
                <li className={cn('nav-item', { active: !videos })}>
                  <Link className="nav-link" href="" onClick={() => setVideos(false)}>
                    {intl.formatMessage({ id: 'header.home' })}{' '}
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
              )}
              <li className={cn('nav-item', { active: videos })}>
                <Link className="nav-link" onClick={() => setVideos(true)}>
                  {intl.formatMessage({ id: 'header.videos' })}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
      {!videos && (
        <FighterTeamHome
          isTeam
          team={team}
          supporting={supporting}
          authenticated={authenticated}
          videos={team?.fighters
            .filter(f => f?.publicVideos.length > 0)
            .map(j => j.publicVideos)
            .flat()}
        />
      )}
      {videos && (
        <TeamVideos
          team={team}
          supporting={supporting}
          subscribeAction={() => setModalIsOpen(true)}
        />
      )}
      <div className="stars-container">
        <HomeStars title={intl.formatMessage({ id: 'fighter.discoverMore' })} />
      </div>
      <HomeFooter />
    </div>
  );
};

export default TeamStar;
