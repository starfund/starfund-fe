import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useIntl } from 'react-intl';
import { useHistory, Link } from 'react-router-dom';
import ReactGA from 'react-ga';

import { getSubscriptions } from '../state/actions/subscriptionActions';
import { getContent } from '../state/actions/contentActions';

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
  const currentUser = useSelector(state => state.session.user);
  const supporting = useSelector(state => state.subscriptions.subscriptions);
  const feedContent = useSelector(state => state.contents.content.content);
  const likes = useSelector(state => state.contents.content.likes);
  const language = useSelector(state => state.language.language);

  useEffect(() => {
    ReactGA.pageview('/user_home/');
  }, []);

  return (
    <div className="user-home">
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
                    <div
                      key={s.id}
                      className="fighter-sub flex"
                      onClick={() => history.push(`/fighter/${s.fighter.id}`)}
                    >
                      <img src={s.fighterPicture} alt="sub" />
                      <p>{s.fighter.firstName}</p>
                    </div>
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
              {feedContent &&
                feedContent
                  .filter(c => c.feed === true)
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
