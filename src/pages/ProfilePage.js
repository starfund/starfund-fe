import React from 'react';
import { useSelector } from 'react-redux';

import Input from '../components/common/Input';
import DefaultAvatar from '../assets/DefaultAvatar.jpeg';

const ProfilePage = () => {
  const currentUser = useSelector(state => state.session.user);
  const supporting = useSelector(state => state.session.user?.supporting);

  return (
    <div className="profile-container">
      <div className="container">
        <div className="row">
          <div className="col-sm-3 col-lg-4 user-container">
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
            <div className="credit-card-info" />
          </div>
          <div className="col-sm-4 col-lg-4 offset-sm-1">
            <h2> User Information </h2>
            <Input name="firstName" placeholder="First Name" />
            <Input name="lastName" placeholder="Last Name" />
            <Input name="birthdate" placeholder="Birthdate" />
          </div>
          <div className="col-sm-3 col-lg-3">
            <h2> Last Activity </h2>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="cc-info">
            <h3> Billing Information </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
