import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { getSubscriptions } from '../state/actions/subscriptionActions';

import DefaultAvatar from '../assets/DefaultAvatar.jpeg';

const UserHome = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubscriptions());
  }, [dispatch]);
  const currentUser = useSelector(state => state.session.user);
  const supporting = useSelector(state => state.subscriptions?.subscriptions);

  return (
    <div className="user-home">
      <div className="container">
        <div className="row">
          <div className="col-sm-2 col-lg-2 user-container">
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
              <h3> SUPPORTING </h3>
              <div className="blank-line" />
              {supporting?.length > 0 &&
                supporting.map(s => (
                  <div key={s.id} className="fighter-sub flex">
                    <img src={s.fighterPicture} alt="sub" />
                    <p>
                      {' '}
                      {s.fighter.firstName} {s.fighter.lastName}{' '}
                    </p>
                  </div>
                ))}
              {!supporting && <p> You are not subscribed to any athletes yet. </p>}
            </div>
          </div>
          <div className="col-sm-8 col-lg-8 user-feed-container">
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid user-feed">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="">
                      All Posts
                    </a>
                  </li>
                </ul>
                <span className="btn btn-outline-secondary" type="button">
                  Showing: All Athletes
                </span>
              </div>
            </nav>
            <div className="feed-content">
              {!supporting && (
                <div className="no-support">
                  <p> Subsribe to your favorite athlete to see post in your feed </p>
                  <br />
                  <Link type="button" className="btn btn-lg link-button" to="/fighters">
                    FIND ATHLETES YOU LOVE{' '}
                  </Link>
                </div>
              )}
              {supporting &&
                supporting.map(sup =>
                  sup.content.map(content => (
                    <React.Fragment key={content.title}>
                      <div className="content-row">
                        {content.image && <img src={content.image} height="300" alt="content" />}
                        {content.video && (
                          <ReactPlayer url={content.video} width="200" height="200" controls />
                        )}
                        <br />
                        <p>{content.eventDate}</p>
                        <h2>{content.title}</h2>
                        <h3>{content.description}</h3>
                      </div>
                      <div className="blank-line" />
                    </React.Fragment>
                  ))
                )}
            </div>
          </div>
          <div className="col-sm-2 col-lg-2">
            <div className="find-athletes">
              <h4> FIND ATHLETES YOU LOVE </h4>
              <div className="blank-line" />
              <p> Search your favorite Athletes to check out all their content and news. </p>
              <br />
              <Link className="btn btn-outline-secondary link-button" type="button" to="/fighters">
                FIND ATHLETES
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
