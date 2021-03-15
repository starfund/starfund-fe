import React from 'react';

import ParalaxHome from '../components/ParalaxHome';
import HomeStars from '../components/HomeStars';
import HomeInfo from '../components/HomeInfo';
import HomeFooter from '../components/HomeFooter';
import HomeAnnouncements from '../components/HomeAnnouncements';
import FAQS from '../components/FAQS';
import HomeExclusive from '../components/HomeExclusive';

const HomePage = () => {
  return (
    <div className="home">
      <ParalaxHome />
      <HomeStars title="Explore Other Athletes" />
      <HomeInfo />
      <HomeAnnouncements />
      <FAQS />
      <HomeExclusive />
      <HomeFooter />
    </div>
  );
};

export default HomePage;
