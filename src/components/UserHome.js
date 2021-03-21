import React from 'react';
import { useSelector } from 'react-redux';

import DefaultAvatar from '../assets/DefaultAvatar.jpeg';

const UserHome = () => {
  const currentUser = useSelector(state => state.session.user);
  const supporting = useSelector(state => state.session.user?.supporting);

  return (
    <div className="user-home">
      <div className="container">
        <div className="row">
          <div className="col-sm-2 col-lg-2 user-container">
            <div className="user-avatar">
              <div className="info">
                {currentUser && (
                  <>
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
                  </>
                )}
              </div>
              <div className="blank-line" />
              <h3> SUPPORTING </h3>
              <div className="blank-line" />
              {supporting?.length > 0 && supporting.map()}
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
                <button className="btn btn-outline-secondary" type="button">
                  Showing: All Athletes
                </button>
              </div>
            </nav>
            <div className="feed-content">
              {!supporting && (
                <div className="no-support">
                  <p> Subsribe to your favorite athlete to see post in your feed </p>
                  <br />
                  <button type="button" className="btn btn-lg">
                    {' '}
                    FIND ATHLETES YOU LOVE{' '}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="col-sm-2 col-lg-2">
            <div className="find-athletes">
              <h4> FIND ATHLETES YOU LOVE </h4>
              <div className="blank-line" />
              <p> Search your favorite Athletes to check out all their content and news. </p>
              <br />
              <button className="btn btn-outline-secondary" type="button">
                FIND ATHLETES
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
