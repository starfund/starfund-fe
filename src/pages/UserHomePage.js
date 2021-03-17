import React from 'react';

import HomeFooter from '../components/HomeFooter';
import UserHome from '../components/UserHome';

const UserHomePage = () => {
  return (
    <div className="user-home-container">
      <UserHome />
      <HomeFooter />
    </div>
  );
};

export default UserHomePage;
