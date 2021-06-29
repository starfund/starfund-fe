import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { getSubscriptions } from '../state/actions/subscriptionActions';
import { update } from '../state/actions/userActions';

import Input from '../components/common/Input';
import DefaultAvatar from '../assets/DefaultAvatar.jpeg';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  useEffect(() => {
    dispatch(getSubscriptions());
  }, [dispatch]);
  const currentUser = useSelector(state => state.session.user);
  const supporting = useSelector(state => state.subscriptions?.subscriptions);
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [phone, setPhone] = useState(currentUser?.phone);
  const [birthdate, setBirthdate] = useState(currentUser.birthdate);

  return (
    <div className="profile-container">
      <div className="container">
        <div className="row">
          {currentUser && currentUser.isFighter && (
            <div className="dashboard row col-12">
              <div className="col-4">
                <h2>{intl.formatMessage({ id: 'dashboard.pageVisits' })}</h2>
                <h4> 80 </h4>
              </div>
              <div className="col-4">
                <h2>{intl.formatMessage({ id: 'dashboard.newSubs' })}</h2>
                <h4> 80 </h4>
              </div>
              <div className="col-4">
                <h2>{intl.formatMessage({ id: 'dashboard.percentageVisitsPerSub' })}</h2>
                <h4> 80 </h4>
              </div>
              <div className="col-4">
                <h2>{intl.formatMessage({ id: 'dashboard.income' })}</h2>
                <h4> 80 </h4>
              </div>
            </div>
          )}
          <div className="col-12">
            <div className="blank-line" />
          </div>
          <div className="col-sm-3 col-lg-4 user-container">
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
              {supporting.length == 0 && (
                <React.Fragment>
                  <p> You are not subscribed to any athletes yet. </p>
                  <br />
                  <Link type="button" className="btn btn-lg link-button" to="/fighters">
                    FIND ATHLETES YOU LOVE{' '}
                  </Link>
                </React.Fragment>
              )}
            </div>
            <div className="credit-card-info" />
          </div>
          <div className="col-sm-4 col-lg-4 offset-sm-1">
            <h2> YOUR INFORMATION </h2>
            <Input
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <Input
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            <Input
              name="phone"
              placeholder="Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <Input
              name="birthdate"
              placeholder="Birthdate"
              value={birthdate}
              type="date"
              onChange={e => setBirthdate(e.target.value)}
            />
            <button
              type="button"
              className="link-button update-btn"
              onClick={() => dispatch(update({ firstName, lastName, birthdate }))}
            >
              UPDATE
            </button>
          </div>
          <div className="col-sm-3 col-lg-3" />
        </div>
        <div className="col-sm-4">
          <div className="cc-info" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
