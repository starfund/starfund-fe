import React from 'react';
import { useSelector } from 'react-redux';
import { useSession } from 'hooks';

import UserHomePage from './UserHomePage';
import ParalaxHome from '../components/ParalaxHome';
import HomeStars from '../components/HomeStars';
import HomeInfo from '../components/HomeInfo';
import HomeFooter from '../components/HomeFooter';
import HomeAnnouncements from '../components/HomeAnnouncements';
import FAQS from '../components/FAQS';
import HomeExclusive from '../components/HomeExclusive';

const HomePage = () => {
  const { authenticated } = useSession();
  const newUser = useSelector(state => state.subscriptions.newUser);
  const shouldUpdatePassword = useSelector(state => state.subscriptions.shouldUpdatePassword);

  if (!newUser && !shouldUpdatePassword && authenticated) {
    return <UserHomePage />;
  }
  return (
    <div className="home">
      <ParalaxHome />
      <HomeStars title="Explore Athletes" />
      <HomeInfo />
      <HomeAnnouncements />
      <FAQS />
      <HomeExclusive />
      <HomeFooter />
    </div>
  );
};

export default HomePage;
