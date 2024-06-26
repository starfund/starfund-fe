import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getSubscriptions } from '../state/actions/subscriptionActions';
import { getOrganizations } from '../state/actions/organizationActions';
import DefaultAvatar from '../assets/DefaultAvatar.jpeg';

import FighterDashboard from '../components/reports/FighterDashboard';
import UserInfoForm from '../components/user/UserInfoForm';
import BillingInfo from '../components/user/BillingInfo';

const ProfilePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubscriptions());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);

  const currentUser = useSelector(state => state.session.user);
  const supporting = useSelector(state => state.subscriptions?.subscriptions);
  const organizations = useSelector(state => state.organizations.organizations);
  const orgSubs = useSelector(state => state.subscriptions.orgSubscriptions);
  const eventPPV = useSelector(state => state.subscriptions.ppvCharges);

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
                {currentUser.isFighter && (
                  <React.Fragment>
                    <div className="blank-line" />
                    <UserInfoForm currentUser={currentUser} />
                  </React.Fragment>
                )}
              </div>
              <div className="blank-line" />
              {!currentUser.isFighter && (
                <React.Fragment>
                  <BillingInfo />
                  <h3>
                    <center> SUPPORTING </center>
                  </h3>
                  {supporting?.length > 0 &&
                    supporting
                      .filter(s => s.fighter)
                      .map(s => (
                        <div key={s.id} className="fighter-sub flex">
                          <img src={s.fighterPicture} alt="sub" />
                          <p>
                            {' '}
                            {s.fighter?.firstName} {s.fighter?.lastName}{' '}
                          </p>
                        </div>
                      ))}
                  {supporting?.length > 0 &&
                    supporting.filter(s => s.team).length > 0 &&
                    supporting
                      .filter(s => s.team)
                      .map(s => (
                        <div key={s.id} className="fighter-sub flex">
                          <img src={s.fighterPicture} alt="sub" />
                          <p> {s.team?.name} </p>
                        </div>
                      ))}
                  <div className="blank-line" />
                  {supporting.length == 0 && (
                    <React.Fragment>
                      <p> You are not subscribed to any athletes yet. </p>
                      <br />
                      <Link type="button" className="btn btn-lg link-button" to="/fighters">
                        FIND ATHLETES YOU LOVE{' '}
                      </Link>
                    </React.Fragment>
                  )}
                  <h3>
                    <center> EVENTS & SUBS </center>
                  </h3>
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
                  <div className="blank-line" />
                </React.Fragment>
              )}
            </div>
            <div className="credit-card-info" />
          </div>
          {!currentUser.isFighter && (
            <div className="col-12 col-sm-6 offset-sm-2 offset-md-1">
              <UserInfoForm currentUser={currentUser} />
            </div>
          )}
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
