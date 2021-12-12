import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory, Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import FlashMessage from 'react-flash-message';

import { getSubscriptions } from '../state/actions/subscriptionActions';
import { getContent } from '../state/actions/contentActions';
import { getOrganizations } from '../state/actions/organizationActions';

import Tick from '../assets/tick.png';
import FeedContent from './FeedContent';
import DefaultAvatar from '../assets/DefaultAvatar.jpeg';

const UserHome = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const history = useHistory();
  useEffect(() => {
    dispatch(getSubscriptions());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getContent());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);
  const currentUser = useSelector(state => state.session.user);
  const supporting = useSelector(state => state.subscriptions.subscriptions);
  const organizations = useSelector(state => state.organizations.organizations);
  const orgSubs = useSelector(state => state.subscriptions.orgSubscriptions);
  const fighterIds = supporting.map(sub => sub.fighter && sub.fighter.id);
  const payedTeamFighterIds = supporting.map(sub => sub.team && sub.team.fighters?.map(f => f.id));
  const payedFighters = fighterIds + payedTeamFighterIds;
  // const feedContent = useSelector(state => state.contents.content.content);
  const feedContent = undefined;
  const likes = useSelector(state => state.contents.content.likes);
  const language = useSelector(state => state.language.language);
  const eventPPV = useSelector(state => state.subscriptions.ppvCharges);
  const value = window.history.state?.new;
  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const originalevents = organizations.map(o => o.events.slice()).flat();
  const events = [...originalevents].map(e => {
    const eventDate = new Date(e.eventDate);
    const currDate = new Date();
    const newEvent = { ...e };
    if (addDays(eventDate, 30) - currDate > 0) {
      newEvent.isActive = true;
    } else {
      newEvent.isActive = false;
    }
    return newEvent;
  });

  useEffect(() => {
    ReactGA.pageview('/user_home/');
  }, []);

  return (
    <div className="user-home">
      {value && (
        <div className="flash-message-container">
          <FlashMessage duration={5000} persistOnHover>
            <div className="flash-message">
              <img style={{ width: '8vh' }} src={Tick} alt="" />
              <div className="flash-message-text">
                <h4>{intl.formatMessage({ id: 'password.create.title' })}</h4>
                {intl.formatMessage({ id: 'password.create.message' })}
              </div>
            </div>
          </FlashMessage>
        </div>
      )}
      <div className="container">
        <div className="row">
          <div className="col col-sm-4 col-md-4 offset-sm-0">
            <div className="user-container">
              <div className="user-avatar">
                <div className="info">
                  {currentUser && (
                    <React.Fragment>
                      <img
                        className="center"
                        alt="user"
                        src={currentUser?.profilePic ? currentUser.profilePic : DefaultAvatar}
                      />
                      <br />
                      <p>
                        {' '}
                        {currentUser.firstName} {currentUser.lastName}{' '}
                      </p>
                    </React.Fragment>
                  )}
                </div>
                <div className="blank-line" />
                <h3>{intl.formatMessage({ id: 'user.home.supporting' })}</h3>
                <div className="blank-line" />
                {supporting?.length > 0 &&
                  supporting.map(s => (
                    <React.Fragment key={s.id}>
                      {s.fighter && (
                        <div
                          className="fighter-sub flex"
                          onClick={() => history.push(`/fighter/${s.fighter.id}`)}
                        >
                          <img src={s.fighterPicture} alt="sub" />
                          <p>{s.fighter?.firstName}</p>
                        </div>
                      )}
                      {s.team &&
                        s.team.fighters &&
                        s.team.fighters.map(f => (
                          <div
                            key={f.id}
                            className="fighter-sub flex"
                            onClick={() => history.push(`/team/${s.team.name}`)}
                          >
                            <img src={f.profilePicture} alt="sub" />
                            <p>{f?.firstName}</p>
                          </div>
                        ))}
                    </React.Fragment>
                  ))}
                {organizations &&
                  orgSubs?.length > 0 &&
                  orgSubs.map(s => (
                    <React.Fragment key={s.id}>
                      <div className="fighter-sub flex" onClick>
                        <img
                          src={
                            organizations.filter(o => o.name === s.orgName)[0].coverPhoto ||
                            DefaultAvatar
                          }
                          alt="sub"
                        />
                        <Link
                          style={{ color: 'white', marginLeft: '1vw', marginTop: '1vh' }}
                          to={`/organization/${s.orgName}`}
                        >
                          {s.orgName}
                        </Link>
                      </div>
                    </React.Fragment>
                  ))}
                {organizations &&
                  eventPPV?.length > 0 &&
                  eventPPV.map(c => (
                    <React.Fragment key={c.id}>
                      <div className="fighter-sub flex">
                        {events.filter(e => e.id === c.orgEvent && e.isActive).length > 0 && (
                          <img
                            src={
                              organizations.filter(o => o.name === c.orgName)[0].coverPhoto ||
                              DefaultAvatar
                            }
                            alt="sub"
                          />
                        )}
                        <Link
                          style={{ color: 'white', marginLeft: '1vw', marginTop: '1vh' }}
                          to={`/organization/${c.orgName}`}
                        >
                          {`${
                            events.filter(e => e.id === c.orgEvent && e.isActive)[0]?.name
                          } - PPV`}
                        </Link>
                      </div>
                    </React.Fragment>
                  ))}
                {supporting.length == 0 && (
                  <div className="no-support">
                    <p>{intl.formatMessage({ id: 'user.home.supporting.nothing' })}</p>
                    <br />
                  </div>
                )}
              </div>
            </div>
            <div className="find-athletes-container">
              <div className="find-athletes">
                <h4>{intl.formatMessage({ id: 'user.home.find' })}</h4>
                <div className="blank-line" />
                <p>{intl.formatMessage({ id: 'user.home.find.text' })}</p>
                <br />
                <Link
                  className="btn btn-outline-secondary link-button"
                  type="button"
                  to="/fighters"
                >
                  {intl.formatMessage({ id: 'user.home.findSimple' })}
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-8 col-lg-7 user-feed-container">
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid user-feed">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="">
                      {intl.formatMessage({ id: 'user.home.posts' })}
                    </a>
                  </li>
                </ul>
                <span className="btn btn-outline-secondary" type="button">
                  {intl.formatMessage({ id: 'user.home.showing' })}
                </span>
              </div>
            </nav>
            <div className="feed-content">
              {supporting.length === 0 && (
                <div className="no-support">
                  <p>{intl.formatMessage({ id: 'user.home.subscribe' })}</p>
                  <br />
                  <Link type="button" className="btn btn-lg link-button" to="/fighters">
                    {intl.formatMessage({ id: 'user.home.find' })}
                  </Link>
                </div>
              )}
              {feedContent && (
                <React.Fragment>
                  {feedContent
                    .filter(c => c.feed === true && payedFighters.includes(c.fighterId))
                    .sort((a, b) => b.eventDate - a.eventDate)
                    .map(content => (
                      <React.Fragment key={content.title}>
                        <FeedContent
                          content={content}
                          fighterInfo={content}
                          language={language}
                          likes={likes}
                        />
                        <div className="blank-line" />
                      </React.Fragment>
                    ))}
                  <h2>
                    <center> {intl.formatMessage({ id: 'user.home.other_news' })} </center>
                  </h2>
                  <div className="blank-line" />
                  {feedContent
                    .filter(c => c.feed === true && !payedFighters.includes(c.fighterId))
                    .sort((a, b) => b.eventDate - a.eventDate)
                    .map(content => (
                      <React.Fragment key={content.title}>
                        <FeedContent
                          content={content}
                          fighterInfo={content}
                          language={language}
                          likes={likes}
                        />
                        <div className="blank-line" />
                      </React.Fragment>
                    ))}
                </React.Fragment>
              )}
              {organizations &&
                orgSubs?.length > 0 &&
                orgSubs.map(s => (
                  <React.Fragment key={s.id}>
                    <div className="fighter-sub flex" onClick>
                      <img
                        src={
                          organizations.filter(o => o.name === s.orgName)[0].coverPhoto ||
                          DefaultAvatar
                        }
                        alt="sub"
                      />
                      <p>
                        <FormattedMessage id="home.welcomepost" values={{ new: s.orgName }} />
                      </p>
                    </div>
                    <img
                      className="welcome-photo"
                      src={
                        organizations.filter(o => o.name === s.orgName)[0]?.coverPhoto ||
                        DefaultAvatar
                      }
                      alt="sub"
                    />
                  </React.Fragment>
                ))}
              {organizations &&
                eventPPV?.length > 0 &&
                eventPPV.map(c => (
                  <React.Fragment key={c.id}>
                    <div className="fighter-sub flex">
                      {events.filter(e => e.id === c.orgEvent && e.isActive).length > 0 && (
                        <img
                          src={
                            organizations.filter(o => o.name === c.orgName)[0].coverPhoto ||
                            DefaultAvatar
                          }
                          alt="sub"
                        />
                      )}
                      <p>
                        <FormattedMessage
                          id="home.welcomepost"
                          values={{
                            new: events.filter(e => e.id === c.orgEvent && e.isActive)[0]?.name
                          }}
                        />
                      </p>
                    </div>
                    <img
                      className="welcome-photo"
                      src={
                        organizations.filter(o => o.name === c.orgName)[0]?.coverPhoto ||
                        DefaultAvatar
                      }
                      alt="sub"
                    />
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
