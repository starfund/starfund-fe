import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getSubscriptions } from '../state/actions/subscriptionActions';
import DefaultAvatar from '../assets/DefaultAvatar.jpeg';

import FighterDashboard from '../components/reports/FighterDashboard';
import UserInfoForm from '../components/user/UserInfoForm';

const ProfilePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubscriptions());
  }, [dispatch]);

  const currentUser = useSelector(state => state.session.user);
  const supporting = useSelector(state => state.subscriptions?.subscriptions);

  return (
    <div className="profile-container">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-4 user-container">
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
                {currentUser.isFighter && <UserInfoForm currentUser={currentUser} />}
              </div>
              <div className="blank-line" />
              {!currentUser.isFighter && (
                <React.Fragment>
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
                  {supporting.length == 0 && (
                    <React.Fragment>
                      <p> You are not subscribed to any athletes yet. </p>
                      <br />
                      <Link type="button" className="btn btn-lg link-button" to="/fighters">
                        FIND ATHLETES YOU LOVE{' '}
                      </Link>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </div>
            <div className="credit-card-info" />
            {!currentUser.isFighter && <UserInfoForm currentUser={currentUser} />}
          </div>
          {currentUser && currentUser.isFighter && <FighterDashboard currentUser={currentUser} />}
        </div>
        <div className="col-sm-4">
          <div className="cc-info" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
