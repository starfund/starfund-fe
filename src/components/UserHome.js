import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import ReactPlayer from 'react-player';

import { getSubscriptions } from '../state/actions/subscriptionActions';

import DefaultAvatar from '../assets/DefaultAvatar.jpeg';

const UserHome = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  useEffect(() => {
    dispatch(getSubscriptions());
  }, [dispatch]);
  const currentUser = useSelector(state => state.session.user);
  const supporting = useSelector(state => state.subscriptions.subscriptions);
  const publicContent = useSelector(state => state.subscriptions.public);

  return (
    <div className="user-home">
      <div className="container">
        <div className="row">
          <div className="col">
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
                    <div key={s.id} className="fighter-sub flex">
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
          <div className="col-sm-8 col-lg-9 user-feed-container">
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
              {supporting &&
                supporting.map(
                  sup =>
                    sup.content &&
                    sup.content
                      .filter(c => c.feed === true)
                      .map(content => (
                        <React.Fragment key={content.title}>
                          <div className="content-row">
                            <div className="fighter-title flex">
                              <img
                                src={sup.fighter.profilePicture}
                                className="fighter-img"
                                alt="title"
                              />
                              <p>
                                {' '}
                                {sup.fighter.firstName} {sup.fighter.lastName}{' '}
                              </p>
                            </div>
                            <br />
                            {content.image && (
                              <img
                                className="content-img"
                                src={content.image}
                                height="300"
                                alt="content"
                              />
                            )}
                            {content.video && (
                              <ReactPlayer url={content.video} width="200" height="200" controls />
                            )}
                            <h2>{content.title}</h2>
                            <h4>
                              {content.description} *{' '}
                              {formatDistance(new Date(content.eventDate), new Date(), {
                                addSuffix: true
                              })}
                            </h4>
                          </div>
                          <div className="blank-line" />
                        </React.Fragment>
                      ))
                )}
              {publicContent &&
                publicContent
                  .filter(c => c.feed === true)
                  .map(content => (
                    <React.Fragment key={content.title}>
                      <div className="content-row">
                        <div className="fighter-title flex">
                          <img src={content.profilePicture} className="fighter-img" alt="title" />
                          <p>{content.fighterName}</p>
                        </div>
                        <br />
                        {content.image && (
                          <img
                            className="content-img"
                            src={content.image}
                            height="300"
                            alt="content"
                          />
                        )}
                        {content.video && (
                          <ReactPlayer url={content.video} width="200" height="200" controls />
                        )}
                        <h2>{content.title}</h2>
                        <h4>
                          {content.description} *{' '}
                          {formatDistance(new Date(content.eventDate), new Date(), {
                            addSuffix: true
                          })}{' '}
                        </h4>
                      </div>
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
